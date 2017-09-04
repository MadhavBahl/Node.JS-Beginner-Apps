const express = require('express');

var app = express();

app.get('/',(req,res) => {
  res.status(404).send({
    error: 'Page not found.',
    name: 'ToDo App v1.0'
  });
})

app.get('/users',(req,res) => {
  res.send([
    {
      name: 'Madhav',
      age: 19
    },
    {
      name: 'Andrew Mead',
      age: 26
    },
    {
      name: 'LX',
      age: 1
    }
  ]);
})

app.listen(3000);

module.exports.app = app;
