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

var schemaUserConnection = new mongoose.Schema({
  Connection:
  {connectionID: String,
  connectionPlatform: String,
  connectionName: String,
  connectionTopic: String,
  details: String,
  dateTime: String,
  location: String},
  rsvp: String
}, {collection: 'userConnection'});

var userConnection = mongoose.model('userConnection', schemaUserConnection);

module.exports = userConnection;
