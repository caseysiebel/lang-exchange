process.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

const server = require('../src/server/index');
//const knex = require('../src/server/db/connection');
const db = require('../src/server/db/connection');
const userChats = db('user_chat');

describe('routes : user_chat', () => {
	beforeEach(() => db.migrate.rollback()
                    .then(() => db.migrate.latest())
                    .then(() => db.seed.run()));

	afterEach(() => db.migrate.rollback());

	after(() => server.close());

    describe('POST /api/v1/chats/:chat_id/user/:user_id', () => {
		it('should return the user_chat that was added', (done) => {
			chai.request(server)
                .post('/api/v1/chats/1/user/2')
				.send({ })
				.end((err, res) => {
                    should.not.exist(err);
					res.status.should.equal(201);
                    res.type.should.equal('application/json');
                    res.body.status.should.eql('success');
                    res.body.data[0].should.include.keys('id', 'user_id', 'chat_id');
					done();
				});
		});
	});
    describe('DELETE /api/v1/chats/:chat_id/user/:user_id', () => {
        it('should return the user_chat that was deleted', (done) => {
            userChats
				.then((userChat) => {
					const userChatObject = userChat[0];
					const lengthBeforeDelete = userChat.length;
                    const route = `/api/v1/chats/${userChatObject.chat_id}/user/${userChatObject.user_id}`;
					chai.request(server)
                        .delete(route)
						.end((err, res) => {
							should.not.exist(err);
							res.status.should.equal(200);
                            res.type.should.equal('application/json');
							res.body.status.should.eql('success');
                            res.body.data[0].should.include.keys('id', 'user_id', 'chat_id');
                            userChats
								.then((updatedUserChats) => {
									updatedUserChats.length.should.eql(lengthBeforeDelete - 1);
									done();
								});
						});
				});
		});
		it('should throw an error if the chat does not exist', (done) => {
			chai.request(server)
                .delete('/api/v1/chats/1/user/999999999')
				.end((err, res) => {
					should.exist(err);
					res.status.should.equal(404);
					res.type.should.equal('application/json');
					res.body.status.should.eql('error');
					res.body.message.should.eql('That user_chat does not exist.');
					done();
				});
		});
	});

    describe('POST /api/v1/users/:user_id/chat/:chat_id', () => {
		it('should return the user_chat that was added', (done) => {
			chai.request(server)
                .post('/api/v1/user/2/chat/1')
				.send({ })
				.end((err, res) => {
                    should.not.exist(err);
					res.status.should.equal(201);
                    res.type.should.equal('application/json');
                    res.body.status.should.eql('success');
                    res.body.data[0].should.include.keys('id', 'user_id', 'chat_id');
					done();
				});
		});
	});
    describe('DELETE /api/v1/users/:user_id/chat/:chat_id', () => {
		it('should return the user_chat that was deleted', (done) => {
            userChats
				.then((userChat) => {
					const userChatObject = userChat[0];
					const lengthBeforeDelete = userChat.length;
                    const route = `/api/v1/users/${userChatObject.user_id}/chat/${userChatObject.chat_id}`;
					chai.request(server)
                        .delete(route)
						.end((err, res) => {
							should.not.exist(err);
							res.status.should.equal(200);
                            res.type.should.equal('application/json');
							res.body.status.should.eql('success');
                            res.body.data[0].should.include.keys('id', 'user_id', 'chat_id');
                            userChats
								.then((updatedUserChats) => {
									updatedUserChats.length.should.eql(lengthBeforeDelete - 1);
									done();
								});
						});
				});
		});
		it('should throw an error if the chat does not exist', (done) => {
			chai.request(server)
                .delete('/api/v1/chats/1/user/999999999')
				.end((err, res) => {
					should.exist(err);
					res.status.should.equal(404);
					res.type.should.equal('application/json');
					res.body.status.should.eql('error');
					res.body.message.should.eql('That user_chat does not exist.');
					done();
				});
		});
	});
});
