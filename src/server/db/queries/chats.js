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
function addChat(chat) {
	return knex('chats')
		.insert(chat)
		.returning('*');
}

module.exports = {
    getAllChats,
    getSingleChat,
	addChat,

}
