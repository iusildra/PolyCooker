const express = require("express");
const bodyParser = require("body-parser");
const Pool = require("pg").Pool;
const format = require("pg-format");

const app = express();
const port = 4000;
const pool = new Pool({
    user: "polycooker",
    password: "![*w>&k=\\JK1Gdu~-F>",
    host: "/run/postgresql",
    database: "PolyCooker",
    port: "5432",
});

const getTypes = (req, res) => {
    pool.query("SELECT * FROM types ORDER BY type_name ASC", (err, results) => {
        if (err) {
            throw err;
        }
        console.log(results);
        res.status(200).json(results.rows);
    });
};

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get("/types", getTypes);

app.get("/", (req, res) => {
    res.json("Go to /types to get all types");
});
app.listen(port, () => {
    console.log(`router running on port ${port}.`);
});
