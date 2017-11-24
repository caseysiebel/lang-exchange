const db = require('../connection');
const userChats = db('user_chat');

const queries = {
    addUserChat: (user_id, chat_id) => {
        console.log()
        console.log('in query')
        console.log('user_id', user_id)
        console.log('chat_id', chat_id)
        const user_chat = userChats
            .insert({ user_id, chat_id })
            .returning('*')

        //console.log('user_chat', user_chat)
        return user_chat;
    },
    deleteUserChat: (user_id, chat_id) => {
        return userChats
            .del()
            .where({ 
                user_id: parseInt(user_id),
                chat_id: parseInt(chat_id)
            })
            .returning('*')
    }
};

module.exports = queries;
