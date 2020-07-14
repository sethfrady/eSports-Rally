var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/esports', {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  // we're connected!
});

var schemaUser = new mongoose.Schema({
  userID: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  confirm: String
}, {collection: 'users'});

var user = mongoose.model('user', schemaUser);

module.exports = user;
