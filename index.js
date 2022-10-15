const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors');
const fs = require("fs");

const config = require("./config.json")
var app = express();

app.use(bodyParser.json());
app.use(cors());


fs.readdirSync('./api/').filter((file) => file.endsWith('.js')).forEach((apiroute) => {
    app.use('/' + apiroute.split(".")[0], require(`./api/${apiroute}`));
})

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
