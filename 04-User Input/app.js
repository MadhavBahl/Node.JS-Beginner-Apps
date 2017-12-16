var prompt = require('prompt');
const fs = require('fs');

var dataToStore;
var JSONdataToStore;
 //
 // Start the prompt
 //

 prompt.start();

 //
 // Get two properties from the user: username and email
 //
 prompt.get(['username', 'email', 'Id'], function (err, result) {

   console.log('Command-line input received:');
   console.log('  username: ' + result.username);
   console.log('  email: ' + result.email);
   console.log('  ID:  ' + result.Id);

   dataToStore = {
     username: result.username,
     email: result.email,
     Id: result.Id
   };
   console.log(dataToStore);
   JSONdataToStore = JSON.stringify(dataToStore);
   fs.writeFileSync('inputData.json',JSONdataToStore);
   console.log(JSONdataToStore);

 });
