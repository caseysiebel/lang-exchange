const knex = require('../connection');

function getAllChats() {
    return knex('chats')
        .select('*');
}

function getSingleChat(id) {
    return knex('chats')
        .select('*')
        .where({ id: parseInt(id) });
}

module.exports = {
    getAllChats,
    getSingleChat,

}
