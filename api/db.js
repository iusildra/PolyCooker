const Pool = require("pg").Pool;
const pool = new Pool({
    user: "polycooker",
    password: "![*w>&k=\\JK1Gdu~-F>",
    host: "/run/postgresql",
    database: "PolyCooker",
    port: "5432",
});

module.exports = pool