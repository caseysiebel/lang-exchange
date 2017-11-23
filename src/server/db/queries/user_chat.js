const db = require('../connection');
const userChats = db('user_chat');

module.exports = {

    addUserChat: (user_id, chat_id) => userChats
                                        .insert({ user_id, chat_id })
                                        .returning('*'),
    deleteUserChat: (id) => userChats
                            .del()
                            .where({ id: parseInt(id) })
                            .returning('*'),
};
