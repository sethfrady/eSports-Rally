var users = require('./user');
var schemaUser = require('./schemaUser');

async function getUsers() {
    return new Promise((resolve, reject) => {
        schemaUser.find((err, data) => {
          if(err) {
            console.error(err)
            return reject(err)
          };
          resolve(data)
        });
      });
};

async function getUser(id){
    let user;
      try{
        user = await schemaUser.findOne({userID: id});
        console.log(user);
            return user;
      } catch(err){
            console.log(err);
    }
};

async function getLogin(email, password){
    let user;
      try{
        user = await schemaUser.findOne({email: email, password: password});
        console.log(user);
            return user;
      } catch(err){
            console.log(err);
    }
};

async function getSignup(firstname, lastname, email, password, confirm){
    let user;
      try{
        user = await schemaUser.findOne({firstname: firstname, lastname: lastname, email: email, password: password, confirm: confirm});
        console.log(user);
            return user;
      } catch(err){
            console.log(err);
    }
};


module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
module.exports.getLogin = getLogin;
module.exports.getSignup = getSignup;
