const express = require("express");
const config = require("../config.json");
const fs = require("fs");
const { auth } = require("../functions/auth");

const router = express.Router()

router.post("/create/:uuid", (req, res) => {
    auth(req, res, () => {
        let path = config.system.path + '/' + req.query.uuid
        if(fs.existsSync(path)) return res.status(500).json({error: "Server already exists"}); {
            fs.mkdirSync(path);
            res.status(200).json({data: "Server created"});
        }
    });
  });

router.post("/delete/:uuid", (req, res) => {
    auth(req, res, () => {
        let path = config.system.path + '/' + req.query.uuid
        if(!fs.existsSync(path)) return res.status(500).json({error: "Server doesn't exists"}); {
            fs.unlink(path);
            res.status(200).json({data: "Server deleted"});
        }
    });
  });

module.exports = router
