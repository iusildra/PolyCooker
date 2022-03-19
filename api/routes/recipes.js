const router = require("express").Router();
const format = require("pg-format");
const pool = require("../db");
const defaultLimit = 25;

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
        const sql = format(
            `SELECT 
				recipe_id, recipe_name, username,
				recipe_for, season_name, recipe_type,
				recipe_diet, recipe_difficulty, recipe_cost,
				creation_date
			FROM recipes
			INNER JOIN users ON user_id=recipe_author
			LEFT JOIN seasons ON recipe_season=season_id
			LIMIT %L OFFSET %L`,
            limit,
            offset
        );
        pool.query(sql, (err, results) => {
            if (err) res.status(500).send({msg: "DB Error, please try again"});
            else res.status(200).json(results.rows);
        });
    })
    .post((req, res) => {
        const sql = format(
            `INSERT INTO recipes(recipe_name, recipe_author, recipe_for, recipe_steps, recipe_season, recipe_type, recipe_diet, recipe_difficulty, recipe_cost, creation_date) VALUES
			(%L, %L, %L, %L, %L, %L, %L, %L, %L, %L)`,
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
            if (err) res.status(500).send({msg: "DB Error, please try again"});
            else res.status(200);
        });
    })

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
        let sql = `SELECT 
				recipe_id, recipe_name, username,
				recipe_for, recipe_steps, season_name, 
				recipe_type, recipe_diet, recipe_difficulty, 
				recipe_cost, creation_date
			FROM recipes
			INNER JOIN users ON user_id=recipe_author
			LEFT JOIN seasons ON recipe_season=season_id
            WHERE ${cond}
			LIMIT %L OFFSET %L`;
        sql = format(sql, req.params["id"], limit, offset);
        pool.query(sql, (err, results) => {
            console.log("test 2", err);
            console.log(sql);
            if (err) res.status(500).send({msg: "DB Error, please try again"});
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
            if (err) res.status(500).send({msg: "DB Error, please try again"});
            else res.status(200);
        });
    });

module.exports = router;

// exports.recipeContains = (id, callback) => {
//     const sql = format(
//         `SELECT the_ingredient, quantity, contained_unit unit,
//             ingredient_name, is_allergen, ingredient_season
//         FROM contains
//         INNER JOIN ingredients ON the_ingredient=ingredient_id
//         WHERE in_recipe=%L`,
//         id
//     )
//     pool.query(sql, callback)
// }
