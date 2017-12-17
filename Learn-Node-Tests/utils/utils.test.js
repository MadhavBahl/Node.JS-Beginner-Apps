const expect = require('expect');

const utils = require('./utils.js');

it('should add two numbers', () => {
    var res = utils.add(2,5);
    
    expect(res).toBe(7).toBeA('number');
});

it('should async add two numbers', (done) => {
    utils.asyncAdd(4,3, (sum) => {
        expect(sum).toBe(7).toBeA('number');
        done();
    });
});

it('should square two numbers', () => {
    var res = utils.square(5);
    
    expect(res).toBe(25).toBeA('number');
});

it('should async square two numbers', (done) => {
    utils.asyncSquare(5, (square) => {
        expect(square).toBe(25).toBeA('number');
        done();
    });
});

// it('should expect some values', () => {
//     // expect(12).toNotBe(11);
//     // expect({name: 'Madhav'}).toNotEqual({name: 'madhav'});
//     // expect([2,3,4,5]).toExclude(1);
//     expect({
//         name: 'Madhav',
//         age: 19,
//         location: 'Vellore'
//     }).toInclude({
//         name: 'Madhav'
//     });
// });

it('should verify first and last names are set', () => {
    var ourUser = {
        age: 19,
        location: 'Vellore'
    };
    var fullName = 'Madhav Bahl';
    utils.setName(ourUser, fullName);

    expect(ourUser).toInclude({
        firstName: 'Madhav',
        lastName: 'Bahl'
    });
})