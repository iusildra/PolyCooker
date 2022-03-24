const router = require("express").Router();
const uuid = require("uuid");
const format = require("pg-format");
const pool = require("../db");
const defaultLimit = 25;
const defaultoffset = 0;

const error500 = { msg: "DB Error, please try again" };

const getRecipeById = `SELECT recipe_name, username, recipe_for,
    recipe_steps, season_name, type_name, 
    diet_name, recipe_difficulty, recipe_cost,
    creation_date, recipe_duration
FROM recipes
INNER JOIN users ON user_id=recipe_author
LEFT JOIN seasons ON recipe_season=season_id
LEFT JOIN types ON recipe_type=type_id
LEFT JOIN diets ON recipe_diet=diet_id
WHERE recipe_id=%L`;
const getRecipeIngredients = `SELECT ingredient_name, quantity, unit_name
FROM contains
INNER JOIN ingredients ON the_ingredient=ingredient_id
INNER JOIN units ON contained_unit=unit_id
WHERE in_recipe=%L`;

const someRecipes = format(
    `SELECT 
recipe_id, recipe_name, username,
recipe_for, season_name, type_name,
diet_name, recipe_difficulty, recipe_cost,
creation_date
FROM recipes
INNER JOIN users ON user_id=recipe_author
LEFT JOIN seasons ON recipe_season=season_id
LEFT JOIN types ON recipe_type=type_id
LEFT JOIN diets ON recipe_diet=diet_id`
);

const insertRecipe = `INSERT INTO recipes VALUES
        (%L, %L, %L, %L, %L, %L, %L, %L, %L, %L, %L)`;

function makeRecipeRequest(
    params = { search: "{}", id: "", limit: defaultLimit, offset: 0 }
) {
    let getSomeRecipes = someRecipes;
    const search = JSON.parse(params.search);
    if (Object.keys(search).length > 0) {
        getSomeRecipes += "\nWHERE";
        if (search.author != null)
            getSomeRecipes += format(
                ` username LIKE '%%%s%%' AND`,
                search.author
            );
        if (search.ingredients != null) {
            getSomeRecipes += ` recipe_id IN(
                SELECT in_recipe
                FROM contains
                INNER JOIN ingredients ON ingredient_id=the_ingredient
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

    getSomeRecipes += format(
        `\nOFFSET %L LIMIT %L`,
        parseInt(params.offset, 10),
        parseInt(params.limit, 10)
    );
    console.log(getSomeRecipes);
    return getSomeRecipes;
}

router
    .route("/")
    .get((req, res) => {
        let sql = "";
        if (Object.keys(req.query).length > 0)
            sql = makeRecipeRequest(req.query);
        else sql = makeRecipeRequest();
        pool.query(sql, (err, results) => {
            if (err) res.status(500).send(error500);
            else res.status(200).json(results.rows);
        });
    })
    .post((req, res) => {
        const sql = format(
            insertRecipe,
            uuid.v4(),
            req.query["name"],
            req.query["author"],
            req.query["for"],
            req.query["steps"],
            req.query["season"],
            req.query["type"],
            req.query["diet"],
            req.query["difficulty"],
            req.query["cost"],
            req.query["creation_date"]
        );
        pool.query(sql, (err) => {
            if (err) res.status(500).send(error500);
            else res.status(200);
        });
    });

router
    .route("/:id")
    .all((req, res, next) => {
        next();
    })
    .get((req, res) => {
        console.log(res.params)
        let sql = format(
            getRecipeById,
            req.params["id"],
            defaultLimit,
            defaultoffset
        );
        pool.query(sql, (err, results) => {
            if (err) return res.status(500).send(error500);
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
            if (err) res.status(500).send(error500);
            else res.status(200);
        });
    });

module.exports = router;
