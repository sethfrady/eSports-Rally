// Profile Controller
const express = require("express");
const router = express.Router();

// POST handling parsers
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// DBs & Models
var connectionDB = require("./../models/connectionDB");
var users = require("./../models/user");
var userList = require('./../models/userDB');
var userProfiles = require('./../models/userProfile');
var userConnection = require('./../models/userConnection');
var userConnectionList = [];
var userProfile;
var userConnectionDB = require('./../models/userConnectionDB');
var schemaConnection = require('./../models/schemaConnection');

router.get('/userConnections', async function (req, res) {
var user = await userList.getUsers()[0];
  if (req.session.theUser === undefined) {
    console.log("creating session");
    await connectionDB.getConnections();
    req.session.theUser = users;
    // Default hardcoded connections
    //userConnectionList.push(new userConnection.userConnection(await connectionDB.getConnection('1'), 'Yes'));
    //userConnectionList.push(new userConnection.userConnection(await connectionDB.getConnection('2'), 'No'));
    var userConnection = await userConnectionDB.getUserConnections();
    //for (i = 0; i < userConnectionList.length; i++) {
    //  console.log(userConnectionList[i]);
    userProfile = new userProfiles.userProfile(req.session.theUser, userConnectionList);
    // req.session.theUser.userProfile = userProfile;
    res.render('savedConnections', {data:userConnection, theUser:req.session.theUser});
  } else if (req.session.theUser) {
    userConnection = await userConnectionDB.getUserConnections();
    res.render('savedConnections', {data:userConnection, theUser:req.session.theUser});
  }
});


router.get('/delete', urlencodedParser, async function (req, res) {
var id;
  if (req.session.theUser){
    if (Object.keys(req.query)[0] === 'connectionID') {
      id = req.query.connectionID;
      console.log(id);
      console.log(typeof id);
      await userConnectionDB.removeConnection(id);
      userConnections = await userConnectionDB.getUserConnections();
      // connectionID = req.query.connectionID;
      //userProfile.removeConnection(connectionID);
      //req.session.theUser.userProfile = userProfile;
      res.render('savedConnections', {data: userConnections, theUser: req.session.theUser});
      //res.redirect('/userConnections');
    }
  }
});

router.get('/update', urlencodedParser, function (req, res) {
var id;
  if (Object.keys(req.query)[0] === 'connectionID') {
    id = req.query.connectionID;
    res.redirect('/connection?connectionID='+ id);
  }
});

router.get('/rsvp', urlencodedParser, function (req, res) {
var id;
  //start a connection list to store data
  if (Object.keys(req.query)[0] === 'connectionID'){
    connectionID = req.query.connectionID;
    console.log(typeof connectionID);
    userID = req.session.theUser.userID;
    var rsvp = req.query.rsvp;
    console.log(typeof rsvp);
    console.log("profileController rsvp: " + rsvp);
    userConnectionDB.updateRSVP(connectionID, userID, rsvp).then(async function(data){
      if (data) {
        userConnections = await userConnectionDB.getUserConnections();
        res.render('savedConnections', {data: userConnections, theUser: req.session.theUser});
      } else {
          var anotherConnection = await connectionDB.getConnection(connectionID);
          var member = new userConnection.userConnection(anotherConnection, rsvp);
          console.log(member);
          await userConnectionDB.addConnection(member, rsvp);
          userConnections = await userConnectionDB.getUserConnections();
          res.render('savedConnections', {data: userConnections, theUser: req.session.theUser});
      }
    });
  };
});

router.get('/logout', function (req, res) {
  user = undefined;
  userConnectionList = [];
  userProfile = undefined;
  req.session.theUser = undefined;
  res.redirect('/');
});

module.exports = router;
