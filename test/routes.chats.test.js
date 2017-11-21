process.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

const server = require('../src/server/index');
const knex = require('../src/server/db/connection');

describe('routes : chats', () => {
	beforeEach(() => {
		return knex.migrate.rollback()
			.then(() => knex.migrate.latest())
			.then(() => knex.seed.run())
	});

	afterEach(() => knex.migrate.rollback());

	after(() => server.close());

	describe('GET /api/v1/chats', () => {
		it('should return all chats', (done) => {
			chai.request(server)
				.get('/api/v1/chats')
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.equal(200);
					res.type.should.equal('application/json');
					res.body.status.should.eql('success');
					res.body.data.length.should.eql(2);
					res.body.data[0].should.include.keys('id', 'created_at');
					done();
				})
		});
	});

	describe('GET /api/v1/chats/:id', () => {
		it('should return a single message', (done) => {
			chai.request(server)
				.get('/api/v1/chats/1')
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.equal(200);
					res.type.should.equal('application/json');
					res.body.status.should.eql('success');
					res.body.data[0].should.include.keys('id', 'created_at');
					done();
				});
		});
		it('should throw an error if the chat does not exist', (done) => {
			chai.request(server)
				.get('/api/v1/chats/999999999')
				.end((err, res) => {
					should.exist(err);
					res.status.should.equal(404);
					res.type.should.equal('application/json');
					res.body.status.should.eql('error');
					res.body.message.should.eql('That chat does not exist.');
					done();
				});
		});
	});
	describe('POST /api/v1/chat', () => {
		it('should return the chat that was added', (done) => {
			chai.request(server)
				.post('/api/v1/chats')
				.send({
					created_at: Date.now()
				})
				.end((err, res) => {
					console.log('err', err);
					should.not.exist(err);
					res.status.should.equal(201);
					res.type.should.equal('application/json');
					res.body.status.should.eql('success');
					res.body.data[0].should.include.keys('id', 'created_at');
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

});
