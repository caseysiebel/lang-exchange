const db = require('../connection');

const queries = {
    addUserChat: ( async (user_id, chat_id) => {
        const user_chat = await db('user_chat')
            .insert({ user_id, chat_id })
            .returning('*');
        return user_chat;
    }),
    deleteUserChat: (user_id, chat_id) => {
        return db('user_chat')
            .del()
            .where({ 
                user_id: parseInt(user_id),
                chat_id: parseInt(chat_id)
            })
            .returning('*')
    }
};

module.exports = queries;
