var connection = require("./connection");

// User Connection Model
var userConnection = function(Connection, rsvp){
  var userConnectionModel = {Connection:Connection, rsvp:rsvp};
  return userConnectionModel;
};

module.exports.userConnection = userConnection;
