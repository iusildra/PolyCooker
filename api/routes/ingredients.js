const router = require("express").Router();
const format = require("pg-format");
const pool = require("../db");

router
    .route("/")
    .all((req, res, next) => {
        next();
    })
    .get((req, res) => {
        pool.query(
            `SELECT *
		FROM ingredients
		ORDER BY ingredient_name ASC`,
            (err, results) => {
                if (err)
                    res.status(500).send({ msg: "DB Error, please try again" });
                else res.status(200).json(results.rows);
            }
        );
    })
    .post((req, res) => {
        const sql = format(
            `INSERT INTO ingredients VALUES(%L, %L, %L, %L)`,
            req.query["name"],
            req.query["unit"],
            req.query["allergen"],
            req.query["season"]
        );
        pool.query(sql, (err, results) => {
            if (err)
                res.status(500).send({ msg: "DB Error, please try again" });
            else res.status(200);
        });
    });

router
    .route("/name/:name")
    .all((req, res, next) => {
        next();
    })
    .get((req, res) => {
        const sql = format(
            `SELECT *
			FROM ingredients
			WHERE LOWER(ingredient_name) LIKE LOWER('%s%%')`,
            req.params["name"]
        );
        pool.query(sql, (err, results) => {
            if (err)
                res.status(500).send({ msg: "DB Error, please try again" });
            else res.status(200).json(results.rows);
        });
    })
    .patch((req, res) => {})
    .delete((req, res) => {
        const sql = format(
            `DELETE FROM ingredients
			WHERE LOWER(ingredient_name)=LOWER(%L)`,
            req.params["name"]
        );
        pool.query(sql, (err, results) => {
            if (err)
                res.status(500).send({ msg: "DB Error, please try again" });
            else res.status(200);
        });
    });

module.exports = router;
