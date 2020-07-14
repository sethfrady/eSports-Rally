var mongoose = require('mongoose');
var schemaConnection = require('./schemaConnection');

// Database accessed on connection.ejs for each category
// var connectionDB = require('./connection');
// var connection1 = connectionDB.connection('1', 'PC', 'Fortnite: Meet-Up', 'Fortnite', 'We will talk about strategies regarding the new season meta (Season X). We will also focus on how to capitalize on situations where you have minimal loot.', 'September 16th, 2019 || 3:00pm - 4:30pm', 'Student Union (Top Floor)');
// var connection2 = connectionDB.connection('2', 'PC', 'CSGO: Tournament', 'CSGO', 'Come join us for our first ever CSGO tournament. Make sure to bring a duo partner, entry fee is $5 per player.', 'Decemember 5th, 2019 || 1:30pm - 4:00pm', 'Atkins, Room 325');
// var connection3 = connectionDB.connection('3', 'PC', 'LoL: Strategy Gathering', 'LoL', 'We focus solely on strategy when it comes to League of Legends. We look forward to meeting you!', 'November 3rd, 2019 || 10:00am - 11:00am', 'Woodward Hall, Room 425');
// var connection4 = connectionDB.connection('4', 'XBOX', 'Overwatch: Patch Discussion', 'Overwatch', 'This will be a brief overview of the new patch that was released a few days ago.', 'November 19th, 2019 || 1:00pm - 2:03pm', 'Fretwell, Room 233');
// var connection5 = connectionDB.connection('5', 'XBOX', 'Apex Legends: Season 3 Talk', 'Apex Legends', 'Want to know more about Season 3? We have the insider information! Make sure to attend, you do not want to miss out!', 'October 13th, 2019 || 2:00pm - 3:00pm', 'Duke Centennial Hall, Room 157');
// var connection6 = connectionDB.connection('6', 'XBOX', 'PUBG: Royale Tourney', 'PUBG', 'Looking for some competition? Of course you are! Join us for our first ever solo tournament! ', 'November 2nd, 2019 || 8:30am - 12:00pm', 'Grigg Hall, Room 432');
// var connection7 = connectionDB.connection('7', 'PS4', 'NBA 2K20: Interest Gathering', 'NBA 2K20', 'This will be a quick meeting to discuss the new NBA 2K20 game that was just released.', 'October 12th, 2019 || 5:00pm - 6:30pm', 'Burson, Room 124');
// var connection8 = connectionDB.connection('8', 'PS4', 'Call of Duty: League Talk', 'Call of Duty', 'Are you interested in the new CoD League? Well, so are we! We will be discussing current F/A and making our predicitions on who is going to make it in!', 'January 5th, 2020 || 2:30pm - 3:30pm', 'Smith, Room 293');
// var connection9 = connectionDB.connection('9', 'PS4', 'Rocket League: Exploring New Update', 'Rocket League', 'Join us as we dive into some Rocket League action. We will also be looking at the new update!', 'December 8th, 2019 || 8:00pm - 9:00pm', 'Colvard, Room 368');
//
// // Data that gets accessed by getConnections
// var data = [connection1, connection2, connection3, connection4, connection5, connection6, connection7, connection8, connection9]

// Functions to return data
async function getConnections() {
    return new Promise((resolve, reject) => {
        schemaConnection.find((err, data) => {
          if(err) {
            console.error(err)
            return reject(err)
          };
          resolve(data)
        });
      });
};

async function getConnection(id){
    let connection;
      try{
        connection = await schemaConnection.findOne({connectionID: id});
        console.log(connection);
            return connection;
      }catch(err){
            console.log(err);
    }
};

// Exports for other files
module.exports.getConnections = getConnections;
module.exports.getConnection = getConnection;
