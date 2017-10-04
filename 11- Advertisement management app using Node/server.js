const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb');
const bodyParser= require('body-parser');
const app = express();
var db;
var CONFIG = require('./public/config.json');


var userName = CONFIG.uname;
var passWord = CONFIG.pword;
var dbName = CONFIG.dbname;

var URL='mongodb://'+userName+':'+passWord+'@ds161190.mlab.com:61190/'+dbName;
console.log(URL);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

MongoClient.connect(URL, (err, database) => {
  if (err) 
    return console.log(err);
  db = database;
  app.listen(3000, () => {
    console.log('listening on 3000');
  })
})

app.get('/products', (req, res) => {
    db.collection('products').find().toArray(function(err, results) {
    console.log(results)
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(results));
    })
})

app.post('/product/add', (req, res) => {
    db.collection('products').find({id:req.body.id}).toArray(function(err, result) {
        console.log(result);
        if(result.length == 0){
            db.collection('products').save(req.body, (err, result) => {
            if (err)
                return console.log(err);
            console.log('saved to database');
            res.end();
            })
        }else{
            db.collection('products', function(err, collection) {
                collection.remove({id: req.body.id});
                db.collection('products').save(req.body, (err, result) => {
                    if (err)
                        return console.log(err);
                    console.log('exisiting ad updated in the database');
                    res.end();
                })
            });
        }
    })
})