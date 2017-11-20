const knex = require('../connection');

function getAllChats() {
    return knex('chats')
        .select('*');
}

module.exports = {
    getAllChats,
}
