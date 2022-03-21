const router = require("express").Router();
const uuid = require("uuid");
const format = require("pg-format");
const pool = require("../db");
const defaultLimit = 25;

const error500 = { msg: "DB Error, please try again" };
const getAllRecipes = `SELECT 
    recipe_id, recipe_name, username,
    recipe_for, season_name, recipe_type,
    recipe_diet, recipe_difficulty, recipe_cost,
    creation_date
    FROM recipes
    INNER JOIN users ON user_id=recipe_author
    LEFT JOIN seasons ON recipe_season=season_id
    LIMIT %L OFFSET %L`;
const getRecipeByIdOrName = `SELECT 
    recipe_id, recipe_name, username,
    recipe_for, recipe_steps, season_name, 
    recipe_type, recipe_diet, recipe_difficulty, 
    recipe_cost, creation_date
    FROM recipes
    INNER JOIN users ON user_id=recipe_author
    LEFT JOIN seasons ON recipe_season=season_id
    WHERE %s
    LIMIT %L OFFSET %L`;
const insertRecipe = `INSERT INTO recipes VALUES
        (%L, %L, %L, %L, %L, %L, %L, %L, %L, %L, %L)`;

router
    .route("/")
    .all((req, res, next) => {
        next();
    })
    .get((req, res) => {
        let limit = isNaN(req.query["limit"])
            ? defaultLimit
            : req.query["limit"];
        let offset = isNaN(req.query["offset"]) ? 0 : req.query["offset"];
        const sql = format(getAllRecipes, limit, offset);
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
        let limit = isNaN(req.query["limit"])
            ? defaultLimit
            : req.query["limit"];
        let offset = isNaN(req.query["offset"]) ? 0 : req.query["offset"];
        let cond = isNaN(parseInt(req.params["id"], 10))
            ? "LOWER(recipe_name) LIKE LOWER('%%%s%%')"
            : "recipe_id=%L";
        const sql = format(
            format(getRecipeByIdOrName, cond, limit, offset),
            req.params["id"]
        );
        pool.query(sql, (err, results) => {
            if (err) res.status(500).send(error500);
            else if (results != null) res.status(200).json(results.rows);
            else res.status(200).json({});
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

router.route("/?").post((req, res) => {
    res.send("hello")
})

module.exports = router;