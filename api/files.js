const express = require("express");
const { auth } = require("../functions/auth");

const router = express.Router()

router.get("/test", (req, res) => {
    auth(req, res, () => {
        res.status(200).json({error: "Success"});
    });
});

module.exports = router
