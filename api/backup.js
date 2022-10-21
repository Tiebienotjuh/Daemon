const express = require("express");
const config = require("../config.json");
const archiver = require("archiver");
const fs = require("fs");
const { auth } = require("../functions/auth");

const router = express.Router()

router.post("/create/:uuid", (req, res) => {
    auth(req, res, () => {
        let path = config.system.path + '/' + req.query.uuid
        if(!fs.existsSync(path)) return res.status(500).json({error: "Server path doesn't exists"}); 

        let output = fs.createWriteStream(path + '/backup.zip');
        let archive = archiver('zip', {
            zlib: { level: 9 } // Sets the compression level.
        });
        
        output.on('close', function() {
            res.status(200).json({data: "Backup created", size: archive.pointer()});
        });

        archive.on('error', function(err) {
            res.status(500).json({error: err});
        });

        archive.pipe(output);
        archive.directory(path, false);
        archive.finalize();

    });
  });
module.exports = router
