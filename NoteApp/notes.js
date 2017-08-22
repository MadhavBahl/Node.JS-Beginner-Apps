console.log('Starting nodes.js');

// console.log(module);

module.exports.addNote = () => {
  console.log('addNote was successful');
  return 'New Note';
};

module.exports.add = (x,y) => {
  return x+y;
};
