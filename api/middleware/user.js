const jwt = require("jsonwebtoken");

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
    next();
};

exports.isLoggedIn = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "SECRETKEY");
        req.userData = decoded;
        next();
    } catch (err) {
        return res.status(401).send({
            msg: "You must be logged in to acces this pages !",
        });
    }
};
