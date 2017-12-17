const express = require('express');

var app = express();

app.get('/', (req,res) => {
    res.status(404).send({
        error: 'Page not found.',
        name: 'TodoApp v1.0'
    });
});

app.get('/users', (req,res) => {
    res.status(200).send([
        {
            name: 'Madhav Bahl',
            age: 19
        }, {
            name: 'Andrew',
            age: 25
        }, {
            name: 'MD',
            age: 20
        }, {
            name: 'xyz',
            age: 22
        }
    ]);
}); 

app.listen(3000);

module.exports.app = app;