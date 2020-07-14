// User Model
var user = function(userID, firstName, lastName, email){
  var userModel = {userID:userID, firstName:firstName, lastName:lastName, email:email};
  return userModel;
};

module.exports.user = user;
