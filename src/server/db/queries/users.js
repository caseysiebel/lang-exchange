const knex = require('../connection');

function getAllUsers() {
    return knex('users')
        .select('*');
}
function getSingleUser(id) {
    return knex('users')
        .select('*')
        .where({ id: parseInt(id) });
}
function addUser(user) {
    return knex('users')
        .insert(user)
        .returning('*');
}
function updateUser(id, user) {
    return knex('users')
        .update(user)
        .where({ id: parseInt(id) })
        .returning('*');
}
function deleteUser(id) {
    return knex('users')
        .del()
        .where({ id: parseInt(id) })
        .returning('*');
}

module.exports = {
    getAllUsers,
    getSingleUser,
    addUser,
    updateUser,
    deleteUser
};
