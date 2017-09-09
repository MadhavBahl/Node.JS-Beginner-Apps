var express = require('express');
var nodemailer = require('nodemailer');
var bodyparser = require('body-parser');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'madhavbahl20@gmail.com',
    pass: 'ENTER YOUR PASSWORD'
  }
});

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



  var show = `<h1> YOUR DATA IS SAFE WITH US :)</h1>`
    + `<h2>Name: ${fName} ${lName} </h2>`
    + `<h2>Email: ${email} </h2>`
    + `<h2>Contact No: ${mobile} </h2>`
    + `<h2>Address: ${address} </h2>`;

  var send = `Hi ${fName}, \nWe just recieved your information through the form.
    \nVery Nice to meet you :)`;
  res.send(show);

  var mailOptions = {
    from: 'madhavbahl20@gmail.com',
    to: email,
    subject: 'Personal Information',
    text: send
  }

  transporter.sendMail(mailOptions,(err,info) => {
    if(err) console.log(err);
    else console.log(info.response);
  });

});

app.listen(port,() => {
  console.log(`App is up on server ${port}`);
})
