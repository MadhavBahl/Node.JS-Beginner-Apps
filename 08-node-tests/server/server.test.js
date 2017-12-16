const request = require('supertest');
const expect = require('expect');

var app = require('./server').app;

describe('Server Tests',() => {

  describe('#GET /',() => {
    it('should return hello world response',(done) => {
      request(app)
        .get('/')
        .expect(404)
        .expect((res) => {
          expect(res.body).toInclude({
            error: 'Page not found.'
          });
        })
        .end(done);
    });
  });

  describe('#GET /users',() => {
    it('should return an array of user details',(done) => {
      request(app)
        .get('/users')
        .expect(200)
        .expect((res) => {
          expect(res.body).toInclude({
            name: 'Madhav',
            age: 19
          });
        })
        .end(done);
    });
  });

});
