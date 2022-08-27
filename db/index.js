const { MongoClient, ServerApiVersion } = require('mongodb');
const credentials = 'db/cert.pem' // IMPORTANT: NOT PROVIDED
const client = new MongoClient('mongodb+srv://cluster0.i0raeqo.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
  sslKey: credentials,
  sslCert: credentials,
  serverApi: ServerApiVersion.v1
});

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }
      dbConnection = db.db("manolo");
      console.log("Successfully connected to Database.");
      return callback();
    });
  },
  getDb: function () {
    return dbConnection;
  }
}