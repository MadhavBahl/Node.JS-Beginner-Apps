console.log('Starting APP');

 const fs = require('fs');
 const os = require('os');

var user = os.userInfo();

fs.appendFile('greeting.txt',`Hello ${user.username}!`, function(err) {
   if(err){
     console.log('Unable to write to file');
   }
  console.log('File Write was successful :)');
});
