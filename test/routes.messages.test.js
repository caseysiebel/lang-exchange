process.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

const server = require('../src/server/index');
const knex = require('../src/server/db/connection');

describe('routes : messages', () => {
	beforeEach(() => {
		return knex.migrate.rollback()
			.then(() => knex.migrate.latest())
			.then(() => knex.seed.run())
	});

	afterEach(() => knex.migrate.rollback());

	after(() => server.close());

	describe('GET /api/v1/messages', () => {
		it('should return all messages', (done) => {
			chai.request(server)
				.get('/api/v1/messages')
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.equal(200);
					res.type.should.equal('application/json');
					res.body.status.should.eql('success');
					res.body.data.length.should.eql(2);
					res.body.data[0].should.include.keys('id', 'created_at', 'chat_id', 'sender_id', 'body');
					done();
				})
		});
	});

	describe('GET /api/v1/messages/:id', () => {
		it('should return a single message', (done) => {
			chai.request(server)
				.get('/api/v1/messages/1')
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.equal(200);
					res.type.should.equal('application/json');
					res.body.status.should.eql('success');
					res.body.data[0].should.include.keys('id', 'created_at');
					done();
				});
		});
		it('should throw an error if the message does not exist', (done) => {
			chai.request(server)
				.get('/api/v1/messages/999999999')
				.end((err, res) => {
					should.exist(err);
					res.status.should.equal(404);
					res.type.should.equal('application/json');
					res.body.status.should.eql('error');
					res.body.message.should.eql('That message does not exist.');
					done();
				});
		});
	});
	describe('POST /api/v1/message', () => {
		it('should return the message that was added', (done) => {
			chai.request(server)
				.post('/api/v1/messages')
				.send({
					created_at: Date.now()
				})
				.end((err, res) => {
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
	describe('PUT /api/v1/messages', () => {
		it('should return the message that was updated', (done) => {
			knex('messages')
				.select('*')
				.then((message) => {
					const messageObject = message[0];
					chai.request(server)
						.put(`/api/v1/messages/${messageObject.id}`)
						.send({
							created_at: Date.now()
						})
						.end((err, res) => {
							should.not.exist(err);
							res.status.should.equal(200);
							res.type.should.equal('application/json');
							res.body.status.should.eql('success');
							res.body.data[0].should.include.keys('id', 'created_at');
							const newMessageObject = res.body.data[0];
                            newMessageObject.created_at.should.not.eql(messageObject.created_at);
							done();
						});
				});
		});
		it('should throw an error if the message does not exist', (done) => {
			chai.request(server)
				.put('/api/v1/messages/999999999')
				.send({
					created_at: Date.now()
				})
				.end((err, res) => {
					should.exist(err);
					res.status.should.equal(404);
					res.type.should.equal('application/json');
					res.body.status.should.eql('error');
					res.body.message.should.eql('That message does not exist.');
					done();
				});
		});
	});
	describe('DELETE /api/v1/messages/:id', () => {
		it('should return the message that was deleted', (done) => {
			knex('messages')
				.select('*')
				.then((messages) => {
					const messageObject = messages[0];
					const lengthBeforeDelete = messages.length;
					chai.request(server)
						.delete(`/api/v1/messages/${messageObject.id}`)
						.end((err, res) => {
							should.not.exist(err);
							res.status.should.equal(200);
							res.type.should.equal('application/json');
							res.body.status.should.eql('success');
							res.body.data[0].should.include.keys('id', 'created_at');
							knex('messages').select('*')
								.then((updatedMessages) => {
									updatedMessages.length.should.eql(lengthBeforeDelete - 1);
									done();
								});
						});
				});
		});
		it('should throw an error if the message does not exist', (done) => {
			chai.request(server)
				.delete('/api/v1/messages/999999999')
				.end((err, res) => {
					should.exist(err);
					res.status.should.equal(404);
					res.type.should.equal('application/json');
					res.body.status.should.eql('error');
					res.body.message.should.eql('That message does not exist.');
					done();
				});
		});
	});
});
