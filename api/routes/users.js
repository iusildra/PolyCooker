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
            `SELECT user_id, username, registration
			FROM users
			OFFSET %L LIMIT %L`,
            offset,
            limit
        );
        pool.query(sql, (err, results) => {
            if (err) res.status(500).send({msg: "DB Error, please try again"});
            else res.status(200).json(results.rows);
        });
    })
    .patch((req, res) => {});

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
        let cond = isNaN(parseInt(req.params["id"])) ? "LOWER(username) LIKE LOWER('%%%s%%')" : "user_id=%L"
        const sql = format(
            `SELECT user_id, username, registration,
				recipe_id, recipe_name, recipe_for,
				recipe_season, recipe_type, recipe_diet,
				recipe_difficulty, recipe_cost, creation_date
			FROM users
			INNER JOIN recipes ON recipe_author=user_id
			WHERE ${cond}
			ORDER BY recipe_name
			OFFSET %L LIMIT %L`,
            req.params["id"],
            offset,
            limit
        );
		pool.query(sql, (err, results) => {
			if (err) res.status(500).send({msg: "DB Error, please try again"});
			else res.status(200).json(results.rows)
		})
    })
    .patch((req, res) => {})
	.delete((req, res) => {
		const sql = format(
			`DELETE FROM users
			WHERE user_id=%L`,
			req.params["id"]
		)
		pool.query(sql, err => {
			if (err) res.status(500).send({msg: "DB Error, please try again"})
			else res.status(200)
		})
	});

module.exports = router;
