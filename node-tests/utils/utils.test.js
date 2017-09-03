const expect = require('expect');
const utils = require('./utils');
it('should add two numbers',() => {
  var res = utils.add(33,11);

  expect(res).toBe(44,`Expected 44, but got ${res}`).toBeA('number');
  // if(res !== 44){
  //   throw new Error(`Expected 44, but got ${res}`);
  // }
  // throw new Error('Value not correct');
});
it('should square a number', () => {
  var res = utils.square(3);
  expect(res)
    .toBe(9,`The expected result was: 25, \nBut you got: ${res}`)
    .toBeA('number','The expected output is a number.');
  // if(res !== 25) {
  //   throw new Error(`The expected result was: 25, \nBut you got: ${res}`);
  // }
});
// it('should expect some values', () => {
//   // expect(12).toNotBe(11);
//   // var ran = true;
//   // expect(ran).toBeTruthy('ran DOES NOT EXISTS');
//   // expect({name: 'Madhav'}).toNotEqual({name: 'madhav'});
//   // expect([2,3,4]).toExclude(12);
//   expect({
//     name: 'Madhav',
//     age: 19,
//     location: 'Vellore'
//   }).toInclude({
//     age: 19
//   });
// });

it('should include first and last names', () => {
  expect(utils.setName({
      age: 19,
      location: 'vellore'
  },'Madhav Bahl'))
    .toInclude({
      firstName: 'Madhav',
      lastName: 'Bahl'
    }).toBeA('object');

})
