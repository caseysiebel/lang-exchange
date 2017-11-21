
exports.up = function(knex, Promise) {
    return knex.schema.createTable('messages', (table) => {
        table.increments();
        table.bigInteger('created_at');
        table.integer('chat_id');
        table.integer('sender_id');
        table.string('body');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('messages');
};
