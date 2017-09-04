var express = require('express');
var nodemailer = require('nodemailer');
var bodyparser = require('body-parser');

const port = process.env.PORT || 8080;

var app = express();
app.use(bodyparser());

app.use(express.static(__dirname + '/views'));

app.get('/',(req,res) => {
  res.render('index.html');
});

app.post('/submit',(req,res) => {
  var fName = req.body.firstName;
  var lName = req.body.lastName;
  var email = req.body.email;
  var mobile = req.body.mobileNo;
  var address = req.body.address;

  console.log(`Name: ${fName} ${lName}`);
  console.log(`Email: ${email}`);
  console.log(`Contact No: ${mobile}`);
  console.log(`Address: ${address}`);

});

app.listen(port,() => {
  console.log(`App is up on server ${port}`);
})
