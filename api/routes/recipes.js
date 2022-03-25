const router = require("express").Router();
const uuid = require("uuid");
const format = require("pg-format");
const pool = require("../db");
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
creation_date
FROM recipes
INNER JOIN users ON user_id=recipe_author
LEFT JOIN seasons ON recipe_season=season_name
LEFT JOIN types ON recipe_type=type_name
LEFT JOIN diets ON recipe_diet=diet_name`
);

function makeRecipeRequest(
    params = { search: "{}", id: "", limit: defaultLimit, offset: 0 }
) {
    let getSomeRecipes = someRecipes;
    const search = JSON.parse(params.search);
    console.log(search);
    if (Object.keys(search).length > 0) {
        getSomeRecipes += "\nWHERE";
        if (search.author != null)
            getSomeRecipes += format(
                ` username LIKE '%%%s%%' AND`,
                search.author
            );
        if (search.recipe != null) {
            getSomeRecipes += format(
                ` recipe_name LIKE '%%%s%%' AND`,
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
    }
    const offset =
        (params.offset != null) & (parseInt(params.offset) != null)
            ? parseInt(params.offset)
            : defaultoffset;
    const limit =
        (params.limit != null) & (parseInt(params.limit) != null)
            ? parseInt(params.limit)
            : defaultLimit;
    
    getSomeRecipes += format(`\nOFFSET %L LIMIT %L`, offset, limit);

    console.log(getSomeRecipes);
    return getSomeRecipes;
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
            console.log(err)
            if (err) res.status(500).send(err);
            else res.status(200).json(results.rows);
        });
    })
    .post((req, res) => {
        console.log(req.body)
        const recipe_uuid = uuid.v4()
        const sql = format(
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
            req.body.cost,
        );
        pool.query(sql, (err) => {
            if (err) {
                console.log("ntm")
                return res.status(500).send(err);
            }
            let insertIngredients = `INSERT INTO contains VALUES `
            req.body.ingredients.forEach(elt => {
                console.log(elt.name)
                insertIngredients += format(`('${recipe_uuid}', %L, %L, %L),`, elt.name, elt.quantity, elt.unit)
            })
            insertIngredients = insertIngredients.slice(0, -1)
            console.log("ici", insertIngredients)
            pool.query(insertIngredients, (err1) => {
                if (err1) return res.status(500).send(err1)
                else return res.status(200).json({msg: "Recipe successfully created !"})
            })
        });
    });

router
    .route("/:id")
    .all((req, res, next) => {
        next();
    })
    .get((req, res) => {
        console.log(req.params);
        let sql = format(
            getRecipeById,
            req.params["id"],
            defaultLimit,
            defaultoffset
        );
        pool.query(sql, (err, results) => {
            if (err) return res.status(500).send(err);
            else if (results.rows.length == 0) return res.status(400);
            sql = format(getRecipeIngredients, req.params["id"]);
            pool.query(sql, (err1, results1) => {
                if (err1) return res.status(500);
                else if (results1.rows.length == 0) return res.status(400);
                results.rows[0]["ingredients"] = results1.rows;
                return res.status(200).json(results.rows[0]);
            });
        });
    })
    .delete((req, res) => {
        const sql = format(
            `DELETE FROM recipes
			WHERE recipe_id=%L`,
            req.params["id"]
        );
        pool.query(sql, (err) => {
            if (err) res.status(500).send(err);
            else res.status(200);
        });
    });

module.exports = router;
