var express = require('express');
var app = express();

// Session handling
var session = require("express-session");
var cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(session({secret: "Secret"}));

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

// Pulling controllers
var appController = require('./controls/appController.js');
var profileController = require('./controls/profileController.js');

// Don't forget npm install path --save
var path = require("path");
var rootDir = path.join(__dirname + "/../");
console.log("dir " + rootDir);

// Mapping requests (routes) to controllers
app.use("/", appController);
app.use("/", profileController);

// Server
app.listen(8080, function() {
  console.log('Application started, running on 8080!')
});
