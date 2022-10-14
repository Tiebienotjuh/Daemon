const config = require("../config.json");

function auth(req, res, next) {
    if(req.headers.authorization == config.api.token) {
        next();
    } else {
        res.status(401).json({error: "Unauthorized"});
    }
};

module.exports = {
    auth
};

