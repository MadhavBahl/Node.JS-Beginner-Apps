console.log('Starting notes.js');

var addNote = (title,body) => {
  console.log('Adding note ', title , body);
};
var getAll = () => {
  console.log('Getting all notes');
};
var getNote = (title) => {
  console.log('Fetching data', title );
};
var removeNote = (title) => {
  console.log('Removing a NOTE');
  console.log(title , 'was removed');
};
module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote
};
