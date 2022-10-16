const express = require("express");
const fs = require("fs");
const { auth } = require("../functions/auth");

const router = express.Router()

router.post("/save/:uuid", (req, res) => {
  auth(req, res, () => {
      let path = config.system.path + '/' + req.query.uuid + '/' + req.body.path + '/' + req.body.file;
      try {
        fs.writeFileSync(path, req.body.data);
        res.status(200);
      } catch (error) {
        res.status(500).json({error: error});
      }
    });
});

router.post("/open/:uuid", (req, res) => {
  auth(req, res, () => {
    let path = config.system.path + '/' + req.query.uuid + '/' + req.body.path + '/' + req.body.file;
    try {
      if (!fs.existsSync(path)) return res.status('404').json({error: "File not found"});
      res.status(200).json({data: fs.readFileSync(path, "utf8")});
    } catch (error) {
      res.status(500).json({error: error});
    }
  });
});

module.exports = router
