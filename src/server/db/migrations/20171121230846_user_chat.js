
exports.up = function(knex, Promise) {
    return knex.schema.createTable('user_chat', (table) => {
        table.increments();
        table.bigInteger('user_id').notNullable();
        table.bigInteger('chat_id').notNullable();
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('user_chat');
};
