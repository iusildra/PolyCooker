const router = require("express").Router();
const format = require("pg-format")
const pool = require("../db");

router
    .route("/")
    .all((req, res, next) => {
        next();
    })
    .post((req, res) => {})
    .patch((req, res) => {})
    .delete((req, res) => {});

router
    .route("/:id")
    .all((req, res, next) => {
        next();
    })
    .get((req, res) => {})
    .post((req, res) => {})
    .patch((req, res) => {})
    .delete((req, res) => {});

module.exports = router