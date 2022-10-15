const express = require("express");
const fs = require("fs");
const { auth } = require("../functions/auth");

const router = express.Router()

router.post("/save", (req, res) => {
    auth(req, res, () => {
      let path = config.system.path + '/' + req.body.uuid + '/' + req.body.path + '/' + req.body.file;
      try {
        fs.writeFileSync(path, req.body.data);
        res.status(200).json({success: true});
      } catch (error) {
        res.status(500).json({error: error});
      }
    });
});

module.exports = router
