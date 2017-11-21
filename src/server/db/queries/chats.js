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
function updateChat(id, chat) {
    return knex('chats')
		.update(chat)
		.where({ id: parseInt(id) })
		.returning('*');
}
function deleteChat(id) {
    return knex('chats')
        .del()
        .where({ id: parseInt(id) })
        .returning('*');
}

module.exports = {
    getAllChats,
    getSingleChat,
	addChat,
	updateChat,
    deleteChat
}
