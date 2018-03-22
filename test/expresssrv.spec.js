const supertest = require('supertest');
const expect = require('chai').expect;
const log = console.log;

describe('REST API', () => {
    let agent;
    let app;

    before(done => {
        app = require('../classes/expresssrv');
        agent = supertest.agent('http://localhost:1337');
        done();

    });

    it('server should been started', done => {
        agent
        .get('/')
        .expect(200)
        .end(function(err, res) {
            if (err) {
                throw err
            } else {
                done();
            };
        });
    });
    
    it('get users list after start should be empty', done => {
        agent
        .get('/users')
        .expect(200)
        .end(function(err, res) {
            if (err) {
                throw err
            } else {
                expect(res.body).to.be.an.instanceof(Array);
                done();
            };
        });
    });

    it('add a first user should return id = 0', done => {
        agent
        .post('/users')
        .expect(200)
        .send({
            'name':'Alex'
        })
        .end(function(err, res) {
            if (err) {
                throw err
            } else {
                expect(res.body.id).to.equal(0);
                done();
            }
        });
    });

    it('add a second user should return id = 1', done => {
        agent
        .post('/users')
        .expect(200)
        .send({
            'name':'Alex2'
        })
        .end(function(err, res) {
            if (err) {
                throw err
            } else {
                expect(res.body.id).to.equal(1);
                done();
            }
        });
    });

    it('remove expected user should return 200 (OK)', done => {
        agent
        .delete('/users/Alex')
        .expect(200)
        .end(function(err, res) {
            if (err) {
                throw err
            } else {
                done();
            }
        });
    });
    
    it('remove unexpected user should return 404 (Not Found)', done => {
        agent
        .delete('/users/unexpecteduser')
        .expect(404)
        .end(function(err, res) {
            if (err) {
                throw err
            } else {
                done();
            }
        });
    });



    after(() => {
        app.close();
    })
})