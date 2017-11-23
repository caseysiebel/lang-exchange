const db = require('../connection');
const userChats = db('user_chat');

module.exports = {

    addUserChat: (user_id, chat_id) => userChats
                                        .insert({ user_id, chat_id })
                                        .returning('*'),
    deleteUserChat: (user_id, chat_id) => {
        
        console.log('in query')
        console.log('user_id', user_id)
        console.log('chat_id', chat_id)

        return userChats
                                            .del()
                                            .where({ 
                                                user_id: parseInt(user_id),
                                                chat_id: parseInt(chat_id)
                                            })
                                            .returning('*')
    }
};
