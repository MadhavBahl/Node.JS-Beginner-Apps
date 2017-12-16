const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').find({completed: false}).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs,undefined,2));
  // },(err) => {
  //   console.log('Unable to fetch Todos', err);
  // });

  // db.collection('Todos').find({
  //     _id: new ObjectID("59b380d263efb21d296a6619")
  //   }).toArray().then((docs) => {
  //   console.log('Query the ID');
  //   console.log(JSON.stringify(docs,undefined,2));
  // },(err) => {
  //   console.log('Unable to fetch Todos', err);
  // });
  db.collection('Todos').find({completed: false}).count().then((count) => {
    console.log(`Total completed Todos: ${count}`);
  },(err) => {
    console.log('Unable to fetch Todos ', err);
  });

  db.collection('Users').find({name: 'MD'}).toArray().then((docs) => {
    console.log('Users with name MD: ');
    console.log(JSON.stringify(docs,undefined,2));
  },(err) => {
    console.log('Unable to fetch Documents ',err);
  });

  // db.close();
});
