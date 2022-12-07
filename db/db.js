const { MongoClient } = require("mongodb");
const connectionString =
  "mongodb+srv://Into:ViruOqHp9okOZy4B@cluster0.zjsb2o8.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return err;
      }
      
      dbConnection = db.db("pokemon5g");
      console.log("Vous êtes bien connecté à MongoDB.");
    });
  },

  getDb: function () {
    return dbConnection;
  },
};