/*
const db = require('../connection');
const user_chats = db('user_chat');
*/
const knex = require('../connection');

/*
module.exports = {
    addUserChat: (user_id, chat_id) => {
        console.log('in addUserChat');
        console.log('user_id', user_id);
        console.log('chat_id', chat_id);
        return knex('user_chat')
            .insert({ user_id, user_chat })
            .returning('*');
        console.log('temp', temp);
        return temp;
    },
    deleteUserChat: (id) => {
        return user_chats
            .del()
            .where({ id: parseInt(id) })
            .returning('*');
    },
};
*/
function addUserChat (user_id, chat_id)  {
    console.log('in addUserChat');
    console.log('user_id', user_id);
    console.log('chat_id', chat_id);

    return knex('user_chat')
        .insert({ user_id, user_chat })
        .returning('*');
}
function deleteUserChat (id)  {
    return user_chats
        .del()
        .where({ id: parseInt(id) })
        .returning('*');
}

module.exports = {
    addUserChat,
    deleteUserChat
}
