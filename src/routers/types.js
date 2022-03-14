const express = require("express")
const router = express.Router();
const Pool = require("pg").Pool;


const pool = new Pool({
	user: "polycooker",
    password: "![*w>&k=\\JK1Gdu~-F>",
    host: "/run/postgresql",
    database: "PolyCooker",
    port: "5432",
})


const getTypes = (req, res) => {
	pool.query(`SELECT * FROM types WHERE type_id=${id} ORDER BY type_name ASC`, (err, results) => {
		if (err) {
			throw err;
		}
		console.log(results);
		res.status(200).json(results.rows);
	});
}

router.get("/", getTypes);