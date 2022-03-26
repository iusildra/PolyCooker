const valide = require("../services/tokenVerification");
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
                    res.status(500).send({ msg: err });
                else res.status(200).json(results.rows);
            }
        );
    })
    .post((req, res) => {
        valide.validateToken(req.headers.authorization.split(" ")[1], (err, data) => {
            if (err) return res.status(401).send({msg: "You are not logged in !"})
            const sql = format(
                `INSERT INTO ingredients VALUES(%L, %L, %L)`,
                req.body.ingredient_name,
                req.body.is_allergen,
                req.body.ingredient_season
            );
            console.log(sql)
            pool.query(sql, (err, results) => {
                if (err) return res.status(500).send({ msg: err });
                res.status(200).send({msg: "Ingredient successfully added !"})
            });
        })
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
                res.status(500).send({ msg: err });
            else res.status(200).json(results.rows);
        });
    })
    .patch((req, res) => {})
    .delete((req, res) =>
        res.status(405).send({ msg: "Action not allowed !" })
    );

module.exports = router;
