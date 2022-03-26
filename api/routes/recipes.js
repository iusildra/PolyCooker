const validate = require("../services/tokenVerification");
const router = require("express").Router();
const format = require("pg-format");
const pool = require("../db");
const uuid = require("uuid");
const defaultLimit = 25;
const defaultoffset = 0;

const getRecipeById = `SELECT recipe_name, username, recipe_for,
    recipe_steps, season_name, type_name, 
    diet_name, recipe_difficulty, recipe_cost,
    creation_date, recipe_duration
FROM recipes
INNER JOIN users ON user_id=recipe_author
LEFT JOIN seasons ON recipe_season=season_name
LEFT JOIN types ON recipe_type=type_name
LEFT JOIN diets ON recipe_diet=diet_name
WHERE recipe_id=%L`;
const getRecipeIngredients = `SELECT ingredient_name, quantity, unit_name
FROM contains
INNER JOIN ingredients ON the_ingredient=ingredient_name
INNER JOIN units ON contained_unit=unit_name
WHERE in_recipe=%L`;

const someRecipes = format(
    `SELECT 
recipe_id, recipe_name, username,
recipe_for, season_name, type_name,
diet_name, recipe_difficulty, recipe_cost,
creation_date, recipe_author
FROM recipes
INNER JOIN users ON user_id=recipe_author
LEFT JOIN seasons ON recipe_season=season_name
LEFT JOIN types ON recipe_type=type_name
LEFT JOIN diets ON recipe_diet=diet_name`
);

const recipeIngredients = `
SELECT in_recipe, the_ingredient, quantity/recipe_for "Q per person", contained_unit
FROM contains
INNER JOIN recipes ON in_recipe=recipe_id
WHERE in_recipe IN (
`;

function makeRecipeRequest(
    params = { search: "{}", id: "", limit: defaultLimit, offset: 0 }
) {
    let getSomeRecipes = someRecipes;
    const search = JSON.parse(params.search);
    if (Object.keys(search).length > 0) {
        getSomeRecipes += "\nWHERE";
        if (search.author != null)
            getSomeRecipes += format(
                ` LOWER(username) LIKE LOWER('%%%s%%') AND`,
                search.author
            );
        if (search.recipe != null) {
            getSomeRecipes += format(
                ` LOWER(recipe_name) LIKE LOWER('%%%s%%') AND`,
                search.recipe
            );
        }
        if (search.ingredients != null) {
            getSomeRecipes += ` recipe_id IN(
                SELECT in_recipe
                FROM contains
                INNER JOIN ingredients ON ingredient_name=the_ingredient
                WHERE ingredient_name IN (`;
            search.ingredients.forEach((ingredient) => {
                getSomeRecipes += format("%L,", ingredient);
            });
            getSomeRecipes = getSomeRecipes.slice(0, -1) + ")) AND";
        }

        if (search.seasonID != null)
            getSomeRecipes += format(` recipe_season=%L AND`, search.seasonID);
        if (search.typeID != null)
            getSomeRecipes += format(` recipe_type=%L AND`, search.typeID);
        if (search.dietID != null)
            getSomeRecipes += format(` recipe_diet=%L AND`, search.dietID);
        if (params.id.length > 0)
            getSomeRecipes += format(` user_id=%L AND`, params.id);

        getSomeRecipes = getSomeRecipes.slice(
            0,
            getSomeRecipes.lastIndexOf(" ")
        );
    } else {
        if (params.id.length > 0) {
            getSomeRecipes += format(`\nWHERE user_id=%L`, params.id);
        }
    }
    const offset =
        params.offset != null && parseInt(params.offset) != null
            ? parseInt(params.offset)
            : defaultoffset;
    const limit =
        params.limit != null && parseInt(params.limit) != null
            ? parseInt(params.limit)
            : defaultLimit;

    getSomeRecipes += format(`\nOFFSET %L LIMIT %L`, offset, limit);

    return getSomeRecipes;
}

function makeIngredientRequest(meals) {
    let getIngredients = recipeIngredients;
    for (const id of meals) {
        getIngredients += format("%L", id) + ",";
    }
    getIngredients = getIngredients.slice(0, -1) + ")";
    return getIngredients;
}

const insertRecipe = `INSERT INTO recipes VALUES
        (%L, %L, %L, %L, %L, %L, %L, %L, %L, %L, %L, NOW())`;
router
    .route("/")
    .get((req, res) => {
        let sql = "";
        if (Object.keys(req.query).length > 0)
            sql = makeRecipeRequest(req.query);
        else sql = makeRecipeRequest();

        pool.query(sql, (err, results) => {
            if (err) res.status(500).send(err);
            else res.status(200).json(results.rows);
        });
    })
    .post((req, res) => {
        validate.validateToken(
            req.headers.authorization.split(" ")[1],
            (err, data) => {
                if (err) return res.status(401).send({msg: "You are not logged in !"});
                let recipe_uuid = uuid.v4();
                let post_recipe = format(
                    insertRecipe,
                    recipe_uuid,
                    req.body.author,
                    req.body.name,
                    req.body.for,
                    req.body.duration,
                    req.body.steps,
                    req.body.season.length > 0 ? req.body.season : null,
                    req.body.type.length > 0 ? req.body.type : null,
                    req.body.diet.length > 0 ? req.body.diet : null,
                    req.body.difficulty,
                    req.body.cost
                );
                pool.query(post_recipe, (err) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    let insertIngredients = `INSERT INTO contains VALUES `;
                    req.body.ingredients.forEach((elt) => {
                        insertIngredients += format(
                            `('${recipe_uuid}', %L, %L, %L),`,
                            elt.name,
                            elt.quantity,
                            elt.unit
                        );
                    });
                    insertIngredients = insertIngredients.slice(0, -1);
                    pool.query(insertIngredients, (err1) => {
                        if (err1) {
                            pool.query(
                                `DELETE FROM recipes WHERE recipe_id=${recipe_uuid}`
                            );
                            return res.status(500).send(err1);
                        } else
                            return res
                                .status(200)
                                .json({ msg: "Recipe successfully created !" });
                    });
                });
            }
        );
    });

router.route("/ingredients/").get((req, res) => {
    if (req.query.meals == null) return res.status(400);

    let query = makeIngredientRequest(req.query.meals);
    pool.query(query, (err, results) => {
        if (err) return res.status(500).json(err);
        return res.status(200).send(results.rows);
    });
    res.status(200);
});

router
    .route("/id/:id")
    .all((req, res, next) => {
        next();
    })
    .get((req, res) => {
        let get_recipe = format(getRecipeById, req.params["id"]);
        pool.query(get_recipe, (err, results) => {
            if (err) return res.status(500).send(err);
            else if (results.rows.length == 0) return res.status(400);

            get_recipe = format(getRecipeIngredients, req.params["id"]);
            pool.query(get_recipe, (err1, results1) => {
                if (err1) return res.status(500);
                else if (results1.rows.length == 0) return res.status(400);

                results.rows[0]["ingredients"] = results1.rows;
                return res.status(200).json(results.rows[0]);
            });
        });
    })
    .delete((req, res) => {
        const token = req.headers.authorization.split(" ")[1];
        validate.validateToken(token, (err, data) => {
            if (err) return res.status(401).send({msg: "You're not loggin in !"});
            const sql = format(
                `SELECT recipe_author FROM recipes WHERE recipe_id=%L`,
                req.params.id
            );
            pool.query(sql, (err0, results) => {
                if (err0) return res.status(500).send(err0);
                if (results.rowCount == 0) return res.status(404).send({msg: "Unknown recipe"});
                if (results.rows[0]["recipe_author"] != data.userid)
                    return res.status(403).send({msg: "You're not authorized !"});

                const sql_delete = format(
                    `DELETE FROM recipes
                    WHERE recipe_id=%L`,
                    req.params["id"]
                );
                pool.query(sql_delete, (err1) => {
                    if (err1) res.status(500).send(err1);
                    else
                        res.status(200).json({
                            msg: "Recipe successfully deleted !",
                        });
                });
            });
        });

        res.status(200);
    });

module.exports = router;
