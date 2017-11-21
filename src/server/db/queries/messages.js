const knex = require('../connection');

function getAllMessages() {
    return knex('messages')
        .select('*');
}
function getSingleMessage(id) {
    return knex('messages')
        .select('*')
        .where({ id: parseInt(id) });
}
function addMessage(message) {
	return knex('messages')
		.insert(message)
		.returning('*');
}
function updateMessage(id, message) {
    return knex('messages')
		.update(message)
		.where({ id: parseInt(id) })
		.returning('*');
}
function deleteMessage(id) {
    return knex('messages')
        .del()
        .where({ id: parseInt(id) })
        .returning('*');
}

module.exports = {
    getAllMessages,
    getSingleMessage,
	addMessage,
	updateMessage,
    deleteMessage
}
