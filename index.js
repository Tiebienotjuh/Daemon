const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors');
const fs = require("fs");

const config = require("./config.json");
const { auth } = require("./functions/auth");
var app = express();

app.use(bodyParser.json());
app.use(cors());


fs.readdirSync('./api/').filter((file) => file.endsWith('.js')).forEach((apiroute) => {
    app.use('/api/' + apiroute.split(".")[0], require(`./api/${apiroute}`));
})

app.get('/', auth, (req, res) => {
    res.status(200).json({status: "ok"});
});

app.get('*', auth, (req, res) => {
    res.status(404).json({error: "Route doesn't exists"});
});

if(!config.api.token) {
    console.log("There was no API Token found in the config.json file. Please add one and restart the daemon.");
    process.exit(1);

}
//if(!fs.existsSync(config.system.path)) {
//    console.log("Creating data folder...");
//    fs.mkdirSync(config.system.path);
//ss};
        

app.listen(config.api.port, () => {
    console.log("Daemon %s is now running on %s:%s", config.daemon.name, config.api.host, config.api.port);
});
