const router = require("express").Router();
const pool = require("../db");

router.route("/").all((req, res, next) => {
    pool.query(`SELECT * FROM units`, (err, results) => {
        if (err) res.status(500).send({msg: "DB Error, please try again"});
        else res.status(200).json(results.rows);
    });
});

router
    .route("/:id")
    .all((req, res, next) => {
        next();
    })
    .get((req, res) => {
        const sql = format(`SELECT * FROM units WHERE unit_name=%L`, req.params["id"]);
        pool.query(sql, (err, results) => {
            if (err) res.status(500).send({msg: "DB Error, please try again"});
            else res.status(200).json(results.rows);
        });
    })
    .post((req, res) => {})
    .patch((req, res) => {})
    .delete((req, res) => {});

module.exports = router;
