var db = require('./db.js');

module.exports.handleSignup = (email,password) => {
  // Checkif email exists
  db.saveUser({email,password});
  // Send the welcome Email
};
