console.log('Starting notes.js');

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
    console.log('WARNING!!! NOTE NOT CREATED!');
    console.log('A note with similar title already exists');
  }
};
var getAll = () => {
  console.log('Getting all notes');
};
var getNote = (title) => {
  console.log('Fetching data', title );
};
var removeNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};
module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote
};
