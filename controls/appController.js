// App Controller
const express = require("express");
const router = express.Router();

// POST handling parsers
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// DB & Model
var connectionDB = require("../models/connectionDB");
var userModel = require("../models/user");
var schemaUserConnection = require('../models/schemaUserConnection');
var userConnectionDB = require('../models/userConnectionDB');
var userDB = require('../models/userDB');
var schemaConnection = require('../models/schemaConnection');

// Express validation
const { check, validationResult } = require('express-validator');

// Homepage
router.get('/', function(req, res){
  res.render('index', {theUser: req.session.theUser});
});

// Connections Page
router.get('/connections', async function(req, res){
  var connect = await connectionDB.getConnections();
  // console.log(connectionDB.getConnections());
  res.render('connections',  {data:connect, theUser:req.session.theUser});
});

// About Page
router.get('/about', function(req, res){
  res.render('about', {theUser: req.session.theUser});
});

// Contact Page
router.get('/contact', function(req, res){
  res.render('contact', {theUser: req.session.theUser});
});

// Connection Pages (accessed by unique ID)
router.get('/connection', async function(req, res){
  var db = await connectionDB.getConnection(req.query.connectionID);
  // console.log(db);
  res.render('connection', {data:db, theUser:req.session.theUser});
});

// New Connection Page
router.get('/newConnection', urlencodedParser, function(req, res){
  res.render('newConnection', {errors: null, theUser: req.session.theUser});
});

// Submit button page for new connection
router.post('/submit', urlencodedParser, [
  check('Platform').isLength({ min: 2 })
      .withMessage("Invalid platform, must be at least 2 characters"),
  check('Name').isLength({ min: 3 })
      .withMessage("Invalid game/name, must be at least 3 characters"),
  check('Details').isLength({ min: 10 })
      .withMessage("Invalid details, must be at least 10 characters"),
  check('Where').isLength({ min: 3 })
      .withMessage("Invalid location, must be at least 3 characters"),
  check('When').isAfter('2019-12-07T08:00')
      .withMessage("Invalid date/time, must be after 12-7-19 & 8:00am"),
  ], async function(req,res){
    const errors = validationResult(req)
  if (!errors.isEmpty()) {
  console.log(errors.array());
  return res.render('newConnection', {errors: errors.array(), theUser: req.session.theUser});
}
    var Platform = req.body.Platform;
    var Topic = req.body.Name;
    var Name = req.body.Name;
    var Details = req.body.Details;
    var Location = req.body.Where;
    var dateTime = req.body.When;

    var random = Platform.slice(0,2) + Name.slice(0,2) + Details.slice(0,2) + Location.slice(0,2) + dateTime.slice(0,2);

    let add;
      try {
        add = new schemaConnection(
          {connectionID: random,
          connectionPlatform: Platform,
          connectionName: Name,
          connectionTopic: Name,
          details: Details,
          dateTime: dateTime,
          location: Location});
    console.log(add);
    await add.save(function (err, data){
        if (err) return console.error(err);
        console.log(data);
        return data;
    });
  } catch(err){
        console.log(err);
  }
  res.redirect('connections');
});

// Login page
router.get('/login', urlencodedParser, async function(req, res) {
  res.render('login', {errors: null, theUser: req.session.theUser});
});

router.post('/signIn', urlencodedParser,[
    check('Username').isEmail()
          .withMessage("This is an invalid username/email"),
    check('Password').isLength({ min: 7 })
          .withMessage("This is an invalid password"),
    ], async function(req,res){
        const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.render('login', {errors: errors.array(), theUser: req.session.theUser});
    }

    var theUser = req.session.theUser;

    // get user that logged in
    var username = req.body.Username;

    if(username === null || username === undefined){
        res.render('login', {errors: error, theUser: req.session.theUser});
    } else {
        var password = req.body.Password;
        if(password === null || password === undefined){
            res.render('login', {errors: error, theUser: req.session.theUser});
        }
    }

    //print out user to test
    console.log(username);
    console.log(password);

    //get user login info from database
    req.session.theUser = await userDB.getLogin(username, password);

   //print out user to test
   console.log("SignIn data :" + req.session.theUser);

   //get all userConnections
   if (req.session.theUser !== null){
    userConnections = await userConnectionDB.getUserConnections();
    //render data with login info
    res.render('savedConnections', {data: userConnections, theUser: req.session.theUser});
   } else {
    var error = ["Username or password invalid, please try again."];
    res.render('login', {errors: error, theUser: req.session.theUser});
   }
});

router.get('/signUp', urlencodedParser, async function(req, res) {
  res.render('signup', {errors: null, theUser: req.session.theUser});
});

router.post('/signUp', urlencodedParser,[
    check('FirstName').isLength({ min: 3 })
        .withMessage("Invalid first name, must be at least 3 characters"),
    check('LastName').isLength({ min: 3 })
        .withMessage("Invalid last name, must be at least 3 characters"),
    check('Username').isEmail()
          .withMessage("This is an invalid username/email"),
    check('Password').isLength({ min: 7 })
          .withMessage("Invalid password, must be at least 7 characters"),
    check('Confirm').isLength({ min: 7 })
          .withMessage("Invalid password, passwords do not match"),
    ], async function(req,res){
        const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.render('signup', {errors: errors.array(), theUser: req.session.theUser});
    }

    var theUser = req.session.theUser;

    // get user that logged in
        var username = req.body.Username;
        if(username === null || username === undefined){
            res.render('signup', {errors: error, theUser: req.session.theUser});
        } else
          var password = req.body.Password;
          if(password === null || password === undefined){
            res.render('signup', {errors: error, theUser: req.session.theUser});
        } else
          var firstname = req.body.FirstName;
          if(firstname === null || firstname === undefined){
              res.render('signup', {errors: error, theUser: req.session.theUser});
        } else
          var lastname = req.body.LastName;
          if(lastname === null || lastname === undefined){
              res.render('signup', {errors: error, theUser: req.session.theUser});
        } else
          var confirm = req.body.Confirm;
          if(confirm === null || confirm === undefined){
              res.render('signup', {errors: error, theUser: req.session.theUser});
        }

  console.log(username);
  console.log(password);
  console.log(firstname);
  console.log(lastname);
  console.log(confirm);

    //get user login info from database
   req.session.theUser = await userDB.getSignup(firstname, lastname, username, password, confirm);

   //print out user to test
   console.log("SignIn data :" + req.session.theUser);

   //get all userConnections
   if (req.session.theUser !== null){
    userConnections = await userConnectionDB.getUserConnections();
    //render data with login info
    res.render('savedConnections', {data: userConnections, theUser: req.session.theUser});
   } else {
    var error = ["Username or password invalid, please try again."];
    res.render('signup', {errors: error, theUser: req.session.theUser});
   }
});

module.exports = router;
