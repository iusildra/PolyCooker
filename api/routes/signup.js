const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const format = require("pg-format");
const pool = require("../db");
const uuid = require("uuid");

const userMiddleware = require("../middleware/user");

router
    .post("/", userMiddleware.validateRegister, (req, res, next) => {
        const sql_username = format(
            `SELECT username
        FROM users
        WHERE LOWER(username)=LOWER(%L)`,
            req.body.username
        );
        const sql_email = format(
            `SELECT email
        FROM users
        WHERE LOWER(email)=LOWER(%L)`,
            req.body.email
        );
        pool.query(sql_username, (err1, results1) => {
            if (err1) {
                return res
                    .status(500)
                    .send({ msg: "DB Error, please try again" });
            }
            if (results1.rows.length > 0) {
                return res
                    .status(409)
                    .send({ msg: "Username already in use !" });
            }
            pool.query(sql_email, (err2, results2) => {
                if (err2) {
                    return res
                        .status(500)
                        .send({ msg: "DB Error, please try again" });
                }
                if (results2.rows.length > 0) {
                    return res
                        .status(409)
                        .send({ msg: "Email already in use !" });
                }
                bcryptjs.hash(req.body.passwd, 10, (err_hash, hash) => {
                    if (err_hash) return res.status(500).send({ msg: "hash" });
                    else {
                        const sql = format(
                            `INSERT INTO users VALUES
                        (%L, %L, %L, %L, %L, NOW())`,
                            uuid.v4(),
                            req.body.email,
                            req.body.username,
                            req.body.isAdmin,
                            hash
                        );
                        pool.query(sql, (err) => {
                            if (err) {
                                return res.status(500).send({
                                    msg: err,
                                });
                            } else
                                return res.status(200).send({
                                    msg: "Your account has been registered !",
                                });
                        });
                    }
                });
            });
        });
    })
    .get((req, res) => {
        return res.status(405).send({ msg: "Action not authorized !" });
    })
    .delete((req, res) => {
        return res.status(405).send({ msg: "Action not authorized !" });
    })
    .put((req, res) => {
        return res.status(405).send({ msg: "Action not authorized !" });
    })
    .delete((req, res) => {
        return res.status(405).send({ msg: "Action not authorized !" });
    })
    .patch((req, res) => {
        return res.status(405).send({ msg: "Action not authorized !" });
    });

module.exports = router;
