const expect = require('expect');
const rewire = require('rewire');

var app = rewire('./app.js');

describe('App', () => {
    var db = {
        saveUser: expect.createSpy()
    };
    app.__set__('db',db);
    it('should call saveUser with user object', () => {
        var email = 'madhav@gmail.com';
        var password = '123abc';

        app.handleSignup(email,password);
        expect(db.saveUser).toHaveBeenCalled({email,password});
    });

    it('should call the spy correctly', () => {
        var spy = expect.createSpy();
        spy('Madhav',19);
        expect(spy).toHaveBeenCalledWith('Madhav',19);
    });
});