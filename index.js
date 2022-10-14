const express = require("express");
const fs = require("fs");

const config = require("./config.json")
var app = express();

fs.readdirSync('./api/').filter((file) => file.endsWith('.js')).forEach((apiroute) => {
    app.use('/' + apiroute.split(".")[0], require(`./api/${apiroute}`));
})

app.listen(config.api.port, () => {
    console.log("Daemon %s is now running on %s:%s", config.daemon.name, config.api.host, config.api.port);
});
