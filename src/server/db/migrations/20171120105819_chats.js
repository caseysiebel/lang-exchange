
exports.up = function(knex, Promise) {
    return knex.schema.createTable('chats', (table) => {
        table.increments();
        table.bigInteger('created_at');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('chats');
};
