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
});
