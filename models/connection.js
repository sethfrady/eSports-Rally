// Connection Model
var connection = function(id, p, n, t, d, dt, l){
  var connectionModel = {connectionID:id, connectionPlatform:p, connectionName:n, connectionTopic:t, details:d, dateTime:dt, location:l};
  return connectionModel;
};

module.exports.connection = connection;
