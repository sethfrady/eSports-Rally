var user = require('./user');
var userConnection = require('./userConnection');
var userDB = require('./userDB');
var connectionDB = require('./connectionDB');

// User Profile
var userProfile = function (userID, userConnectionList) {
  this.userID = userID;
  this.userConnectionList = userConnectionList;

// Add Connection: if a user is signed in a user can add a connection
  this.addConnection = function (Connection, rsvp) {
    var update = false;
    var connectionObj;
    if (this.userConnectionList == undefined || this.userConnectionList.length == 0) {
      connectionObj = connectionDB.getConnection(Connection);
      var userConnObj = new userConnection.userConnection(connectionObj, rsvp);
      this.userConnectionList.push(userConnObj);
    } else {
      connectionObj = connectionDB.getConnection(Connection);
      update = this.updateConnection(new userConnection.userConnection(connectionObj, rsvp));
      if (update === false) {
        connectionObj = connectionDB.getConnection(Connection);
        var userConnObj = new userConnection.userConnection(connectionObj, rsvp);
        this.userConnectionList.push(userConnObj);
      }
    }
  }

// Get Connections: returns the user connection list
  this.getConnections = function () {
    return this.userConnectionList;
  }

// Remove Connection: deletes a specific connection
  this.removeConnection = function (connection) {
    for (i = 0; i < this.UserConnectionList.length; i++) {
        if(this.UserConnectionList[i].Connection.workshopId === Connection){
            this.UserConnectionList.splice(i,1);
            break;
        }
    }
    }

// Update Connection: updates a connection status via rsvp
  this.updateConnection = function (UserConnection){
    var update = false;
    this.userConnectionList.forEach(element => {
      if (element.Connection.connectionID === UserConnection.Connection.connectionID) {
        element.rsvp = UserConnection.rsvp;
        update = true;
      }
    });
    return update;
  }

// Empty Profile: clears profile contents
  this.emptyProfile = function (){
    this.userConnectionList = [];
  }

};

module.exports.userProfile = userProfile;
