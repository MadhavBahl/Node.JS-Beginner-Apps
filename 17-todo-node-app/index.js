const express = require('express');
const app = express();
const mustache = require('mustache-express');
const bodyParser = require('body-parser');


app.engine('mustache', mustache() )
app.set('view engine', 'mustache');

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }));

//This array is used to store items in the 'Things to do' list
let todos = [];
//This array is used to store completed items
let complete = [];

app.get('/', function (req, res) {
  res.render('index', {
    todos: todos,
    complete: complete
  });
});

app.post('/', function(req, res){
  //Takes the value of the input with the name listItem
  let item = req.body.listItem;
  //Takes the value of the item next to the 'Completeted' button
  let completeTask = req.body.button
  if(item){
    todos.push(item);
  } else if(completeTask){
      for(let i = 0; i < todos.length; i++){
        if(todos[i] === completeTask){
          todos.splice(i, 1);
        }
      }
    complete.push(completeTask);
  }
  res.redirect('/');
})

app.listen(3000, function () {
  console.log('Successfully started express application!')
});
