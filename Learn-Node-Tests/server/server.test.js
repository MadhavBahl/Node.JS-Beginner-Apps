const request = require('supertest');
const expect = require('expect');

const app = require('./server.js').app;

it('should return hello world response', (done) => {
    request(app)
        .get('/')
        .expect(404)
        .expect((res) => {
            expect(res.body).toInclude({error: 'Page not found.'})
        })
        .end(done); 
});

it('should contain me as a user', (done) => {
    request(app)
        .get('/users')
        .expect(200)
        .expect((res) => {
            expect(res.body).toInclude({
                name: 'Madhav Bahl',
                age: 19
            })
        })
        .end(done);
});