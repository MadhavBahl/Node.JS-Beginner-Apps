const fs = require('fs');

var fetchNotes = () => {
  try{
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch(e) {
    return [];
  }
};
var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};
var addNote = (title,body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };
  var duplicateNotes = notes.filter((note) => note.title === title);
  if(duplicateNotes.length === 0){
    notes.push(note);
    saveNotes(notes);
    return note;
  } else{

  }
};
var getAll = () => {
  return fetchNotes();
};
var getNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title === title);
  return filteredNotes[0];
};
var removeNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};
var logNote = (note) => {
  debugger;
  console.log('--');
  console.log(`The Title Is : ${note.title}`);
  console.log(`The Body  Is : ${note.body}`);
};
module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
