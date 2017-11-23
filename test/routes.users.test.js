process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/server/index');
const knex = require('../src/server/db/connection');

describe('routes : users', () => {
    beforeEach(() => {
        return knex.migrate.rollback()
            .then(() => knex.migrate.latest())
            .then(() => knex.seed.run())
    });

    afterEach(() => knex.migrate.rollback());

    after(() => server.close());

    describe('GET /api/v1/users', () => {
        it('should return all users', (done) => {
            chai.request(server)
                .get('/api/v1/users')
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    res.type.should.equal('application/json');
                    res.body.status.should.eql('success');
                    res.body.data.length.should.eql(4);
                    res.body.data[0].should.include.keys('id', 'username', 'password');
                    done();
                });
        });
    });

    describe('GET /api/v1/users/:id', () => {
        it('should return a single user', (done) => {
            chai.request(server)
                .get('/api/v1/users/1')
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    res.type.should.equal('application/json');
                    res.body.status.should.eql('success');
                    res.body.data[0].should.include.keys('id', 'username', 'password');
                    done();
                });
        });
        it('should throw an error if the user does not exist', (done) => {
            chai.request(server)
                .get('/api/v1/users/999999999')
                .end((err, res) => {
                    should.exist(err);
                    res.status.should.equal(404);
                    res.type.should.equal('application/json');
                    res.body.status.should.eql('error');
                    res.body.message.should.eql('That user does not exist.');
                    done();
                });
        });
    });
    describe('POST /api/v1/users', () => {
        it('should return the user that was added', (done) => {
            chai.request(server)
                .post('/api/v1/users')
                .send({
                    username: 'roeny',
                    password: '1234'
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(201);
                    res.type.should.equal('application/json');
                    res.body.status.should.eql('success');
                    res.body.data[0].should.include.keys('id', 'username', 'password');
                    done();
                });
        });
        it('should throw an error if the payload if malformed', (done) => {
            chai.request(server)
                .post('/api/v1/users')
                .send({ username: 'jerry' })
                .end((err, res) => {
                    should.exist(err);
                    res.status.should.equal(400);
                    res.type.should.equal('application/json');
                    res.body.status.should.eql('error');
                    should.exist(res.body.message);
                    done();
                });
        });
    });
    describe('PUT /api/v1/users', () => {
        it('should return the user that was updated', (done) => {
            knex('users')
                .select('*')
                .then((user) => {
                    const userObject = user[0];
                    chai.request(server)
                        .put(`/api/v1/users/${userObject.id}`)
                        .send({
                            password: '43421'
                        })
                        .end((err, res) => {
                            should.not.exist(err);
                            res.status.should.equal(200);
                            res.type.should.equal('application/json');
                            res.body.status.should.eql('success');
                            res.body.data[0].should.include.keys('id', 'username', 'password');
                            const newUserObject = res.body.data[0];
                            newUserObject.password.should.not.eql(userObject.passwod);
                            done();
                        });
                });
        });
        it('should throw an error if the user does not exist', (done) => {
            chai.request(server)
                .put('/api/v1/users/999999999')
                .send({
                    password: '4321'
                })
                .end((err, res) => {
                    should.exist(err);
                    res.status.should.equal(404);
                    res.type.should.equal('application/json');
                    res.body.status.should.eql('error');
                    res.body.message.should.eql('That user does not exist.');
                    done();
                });
        });
    });
    describe('DELETE /api/v1/users/:id', () => {
        it('should return the user that was deleted', (done) => {
            knex('users')
                .select('*')
                .then((users) => {
                    const userObject = users[0];
                    const lengthBeforeDelete = users.length;
                    chai.request(server)
                        .delete(`/api/v1/users/${userObject.id}`)
                        .end((err, res) => {
                            should.not.exist(err);
                            res.status.should.equal(200);
                            res.type.should.equal('application/json');
                            res.body.status.should.eql('success');
                            res.body.data[0].should.include.keys('id', 'username', 'password');
                            knex('users').select('*')
                                .then((updatedUsers) => {
                                    updatedUsers.length.should.eql(lengthBeforeDelete - 1);
                                    done();
                                });
                        });
                });
        });
        it('should throw an error if the user does not exist', (done) => {
            chai.request(server)
                .delete('/api/v1/users/999999999')
                .end((err, res) => {
                    should.exist(err);
                    res.status.should.equal(404);
                    res.type.should.equal('application/json');
                    res.body.status.should.eql('error');
                    res.body.message.should.eql('That user does not exist.');
                    done();
                });
        });
    });
});
