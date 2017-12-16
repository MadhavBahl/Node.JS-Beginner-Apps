const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // deleteMany

  // db.collection('Todos').deleteMany({ text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // },(err) => {
  //   console.log(err);
  // });

  // deleteOne

  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // findOneAndDelete

  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //     console.log(JSON.stringify(result,undefined,2));
  // });

  // CHallenge

  // db.collection('Users').deleteMany({name: 'MD'}).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndDelete({
    _id: new ObjectID("59b21eff1b56af03d016ee61")
  }).then((result) => {
    console.log(JSON.stringify(result,undefined,2));
  });
  // db.close();
});
