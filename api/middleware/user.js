const pool = require("../db");
const jwt = require("jsonwebtoken");
const format = require("pg-format");

const sql_username = `SELECT username
FROM users
WHERE username=%L`;
const sql_email = `SELECT email
FROM users
WHERE email=%L`;
const username_change = sql_username + ` AND user_id != %L`;
const email_change = sql_email + ` AND user_id != %L`;

exports.validateRegister = (req, res, next) => {
    if (!req.body.username || req.body.username.length < 3) {
        return res.status(412).send({
            msg: "Please enter a username with at least 3 characters !",
        });
    }
    if (!req.body.passwd || req.body.passwd.length < 6) {
        return res.status(412).send({
            msg: "Please enter a passwd with min. 6 chars",
        });
    }
    // passwd (repeat) does not match
    if (
        !req.body["passwd_repeat"] ||
        req.body.passwd != req.body["passwd_repeat"]
    ) {
        return res.status(412).send({
            msg: "Both passwords must match",
        });
    }
    pool.query(format(sql_username, req.body.username), (err1, results1) => {
        if (err1) return res.status(500).send(error500(err1));
        if (results1.rows.length > 0) {
            return res.status(409).send({ msg: "Username already in use !" });
        }
        pool.query(format(sql_email, req.body.email), (err2, results2) => {
            if (err2) return res.status(500).send(error500(err2));
            if (results2.rows.length > 0)
                return res.status(409).send({ msg: "Email already in use !" });
            next();
        });
    });
};

exports.validateChange = (req, res, next) => {
    if (!req.body.username || req.body.username.length < 3) {
        return res.status(412).send({
            msg: "Please enter a username with at least 3 characters !",
        });
    }
    if (req.body.passwd && req.body.passwd.length < 6) {
        return res.status(412).send({
            msg: "Please enter a passwd with min. 6 chars",
        });
    }
    if (req.body.passwd)
        if (req.body.passwd != req.body["passwd_repeat"])
            return res.status(412).send({ msg: "Both password must match !" });

    pool.query(
        format(username_change, req.body.username, req.body.id),
        (err1, results1) => {
            if (err1) return res.status(500).send(error500(err1));
            if (results1.rows.length > 0) {
                return res
                    .status(409)
                    .send({ msg: "Username already in use !" });
            }
            pool.query(
                format(email_change, req.body.email, req.body.id),
                (err2, results2) => {
                    if (err2) return res.status(500).send(error500(err2));
                    if (results2.rows.length > 0)
                        return res
                            .status(409)
                            .send({ msg: "Email already in use !" });
                    next();
                }
            );
        }
    );
};

exports.isLoggedIn = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(
            token,
            "4jRU=HyTeSf*$4JxN9&BupHJxaBNFX-A&F!NvR=JJ&L$LrPYYJqG8%HRNLKY!MKmcnXxGr!88nzXPgA8snQb6ad93NdrjjgK^F7K"
        );
        req.userData = decoded;
        next();
    } catch (err) {
        return res.status(401).send({
            msg: "You must be logged in to access this pages !",
        });
    }
};
