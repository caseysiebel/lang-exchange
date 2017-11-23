process.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

const server = require('../src/server/index');
const knex = require('../src/server/db/connection');

describe('routes : user_chat', () => {
	beforeEach(() => {
		return knex.migrate.rollback()
			.then(() => knex.migrate.latest())
			.then(() => knex.seed.run())
	});

	afterEach(() => knex.migrate.rollback());

	after(() => server.close());

    describe('POST /api/v1/chats/:id/user/:userId', () => {
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
    describe('DELETE /api/v1/chats/:id/user/:userId', () => {
		it('should return the chat that was deleted', (done) => {
			knex('user_chat')
				.select('*')
				.then((userChat) => {
					const userChatObject = userChat[0];
					const lengthBeforeDelete = userChat.length;
					chai.request(server)
						.delete(`/api/v1/chats/${userChatObject.id}`)
						.end((err, res) => {
							should.not.exist(err);
							res.status.should.equal(200);
							res.type.should.equal('application/json');
							res.body.status.should.eql('success');
                            res.body.data[0].should.include.keys('id', 'user_id', 'chat_id');
							knex('user_chat').select('*')
								.then((updatedUserChats) => {
									updatedUserChats.length.should.eql(lengthBeforeDelete - 1);
									done();
								});
						});
				});
		});
		it('should throw an error if the chat does not exist', (done) => {
			chai.request(server)
                .delete('/api/v1/chats/1/user999999999')
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
