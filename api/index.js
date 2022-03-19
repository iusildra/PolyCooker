const router = require("./routes/router");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3080;

bodyParser.urlencoded({
    extended: false
});

app.use(cors("http://localhost:3000"));
app.use(bodyParser.json());
app.use("/api", router);

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
