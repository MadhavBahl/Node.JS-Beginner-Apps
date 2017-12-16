var mongo = require('mongodb');

var mongoClient = mongo.MongoClient;
var url = 'mongodb://localhost:27012/myDB';

mongoClient.connect(url,(err,db) => {
  if(err) throw err;
  console.log('DB created');
  db.close();
});
