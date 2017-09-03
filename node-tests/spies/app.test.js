const expect = require('expect');
const rewire = require('rewire');

var app = rewire('./app');

describe('App',() => {
  var db = {
    saveUser: expect.createSpy()
  };
  app.__set__('db',db);

  it('should call the spy correct',() => {
      var spy = expect.createSpy();
      spy('Andrew',25);
      expect(spy).toHaveBeenCalledWith('Andrew',25);
  });

  it('should call save user with user object', () => {
    var email = 'MD@gmail.com';
    var password = '123abc';

    app.handleSignup(email,password);
    expect(db.saveUser).toHaveBeenCalledWith({email,password});
  });

});
