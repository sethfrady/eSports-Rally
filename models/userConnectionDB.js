var mongoose = require('mongoose');
var schemaUserConnection = require('./schemaUserConnection');

async function getUserConnections() {
    return new Promise((resolve, reject) => {
        schemaUserConnection.find((err, data) => {
          if(err) {
            console.error(err)
            return reject(err)
          };
          resolve(data)
        });
      });
};

async function getUserProfile(id){
    let userProfile;
      try {
        user = await schemaUserConnection.findOne({userID: id});
        console.log(userProfile);
            return userProfile;
      } catch(err){
            console.log(err);
    }
};

async function addRSVP(connectionID, userID, rsvp){
  let userRsvp;
      try {
        userRsvp = await schemaUserConnection.findOneAndUpdate({userID: userID, 'Connection.connectionID': connectionID}, {$set: {userRSVP: rsvp}});
        console.log(userRsvp);
            return userRsvp;
      } catch(err){
            console.log(err);
    }
};

async function updateRSVP(connectionID, userID, rsvp){
  let update;
        try {
          update = await schemaUserConnection.findOneAndUpdate({'Connection.connectionID': connectionID}, {$set: {rsvp: rsvp}});
          console.log(update);
              return update;
        } catch(err){
              console.log(err);
      }
};

async function addConnection(connection, rsvp){
  let add;
      try {
        add = new schemaUserConnection({
        Connection:
          {connectionID: connection.Connection.connectionID,
          connectionPlatform: connection.Connection.connectionPlatform,
          connectionName: connection.Connection.connectionName,
          connectionTopic: connection.Connection.connectionTopic,
          details: connection.Connection.details,
          dateTime: connection.Connection.dateTime,
          location: connection.Connection.location},
        rsvp: rsvp});
        console.log(add);
    await add.save(function (err, data){
        if (err) return console.error(err);
        console.log(data);
        return data;
    });
  }catch(err){
        console.log(err);
}
};

async function removeConnection(connectionID){
  let remove;
    try {
      remove = await schemaUserConnection.deleteOne({'Connection.connectionID': connectionID});
      console.log(remove);
        return remove;
    } catch(err) {
      console.log(err);
    }
};


module.exports.getUserConnections = getUserConnections;
module.exports.getUserProfile = getUserProfile;
module.exports.addRSVP = addRSVP;
module.exports.updateRSVP = updateRSVP;
module.exports.addConnection = addConnection;
module.exports.removeConnection = removeConnection;
