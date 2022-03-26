const validate = require("../services/tokenVerification");
const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const format = require("pg-format");
const pool = require("../db");
const uuid = require("uuid");

const userMiddleware = require("../middleware/user");

const error405 = { msg: "Action not authorized !" };

router
    .post("/", userMiddleware.validateRegister, (req, res, next) => {
        const token = req.headers.authorization.split(" ")[1];
        let admin = false;

        if (token != null) {
            validate.validateToken(token, (err, authorizedData) => {
                if (err)
                    return res
                        .status(403)
                        .send({ msg: "Unvalid credentials !" });
                if (authorizedData.admin) {
                    admin = req.body.isAdmin;
                }
            });
        }

        bcryptjs.hash(req.body.passwd, 10, (err_hash, hash) => {
            console.log("admin :", admin);
            if (err_hash) return res.status(500).send({ msg: err_hash });
            else {
                const sql = format(
                    `INSERT INTO users VALUES (%L, %L, %L, %L, %L, NOW())`,
                    uuid.v4(),
                    req.body.email,
                    req.body.username,
                    admin,
                    hash
                );
                pool.query(sql, (err) => {
                    const msg = admin
                        ? "Your admin account has been registered !"
                        : "Your normal account has been registered !";
                    if (err) return res.status(500).send(err);
                    else
                        return res.status(200).send({
                            msg: msg,
                        });
                });
            }
        });
    })
    .get((req, res) => {
        return res.status(405).send(error405);
    })
    .delete((req, res) => {
        return res.status(405).send(error405);
    })
    .put((req, res) => {
        return res.status(405).send(error405);
    })
    .patch((req, res) => {
        return res.status(405).send(error405);
    });

module.exports = router;
