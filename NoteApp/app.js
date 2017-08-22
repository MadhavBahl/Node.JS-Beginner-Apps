console.log('Starting app.js');

const fs = require('fs');
const os = require('os');
const _ = require('lodash')
const notes = require('./notes.js');

// console.log(_.isString(true));
// console.log(_.isString('MD'));

var filteredArray = _.uniq(['MD',2,'MD',1,2,3,4]);
console.log(filteredArray);
/*
fs.appendFile('greeting.txt',`Hello ${user.username}! You are ${notes.age}`, function(err) {
   if(err){
     console.log('Unable to write to file');
   }
  console.log('File Write was successful :)');
});
*/
