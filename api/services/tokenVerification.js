const jwt = require("jsonwebtoken");

exports.validateToken = (token, callback) => {
    jwt.verify(
        token,
        "4jRU=HyTeSf*$4JxN9&BupHJxaBNFX-A&F!NvR=JJ&L$LrPYYJqG8%HRNLKY!MKmcnXxGr!88nzXPgA8snQb6ad93NdrjjgK^F7K",
        (err, data) => callback(err, data)
    );
};
