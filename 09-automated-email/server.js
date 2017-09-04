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

app.listen(port,() => {
  console.log(`App is up on server ${port}`);
})
