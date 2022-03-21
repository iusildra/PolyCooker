const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const format = require("pg-format");
const pool = require("../db");
const uuid = require("uuid");

const userMiddleware = require("../middleware/user");

const error500 = (err) => {
    return { msg: "DB Error, please try again", err };
};
const error405 = { msg: "Action not authorized !" };

router
    .post("/", userMiddleware.validateRegister, (req, res, next) => {
        const token = req.headers.authorization.split(" ")[1];
        let admin = false;
        console.log("token :", token)

        if (token!= null) {
            jwt.verify(
                token,
                "4jRU=HyTeSf*$4JxN9&BupHJxaBNFX-A&F!NvR=JJ&L$LrPYYJqG8%HRNLKY!MKmcnXxGr!88nzXPgA8snQb6ad93NdrjjgK^F7K",
                (err, authorizedData) => {
                    if (err)
                        return res
                            .status(403)
                            .send({ msg: "Unvalid credentials !" });
                    admin = authorizedData.admin
                }
            );
        }

        bcryptjs.hash(req.body.passwd, 10, (err_hash, hash) => {
            console.log("admin :", admin);
            if (err_hash)
                return res.status(500).send({ msg: err_hash });
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
                    if (err) return res.status(500).send(error500(err));
                    else
                        return res.status(200).send({
                            msg: "Your account has been registered !",
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
