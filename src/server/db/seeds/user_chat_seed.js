
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_chat').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_chat').insert([
          {
              user_id: 1,
              chat_id: 1
          },
          {
              user_id: 2,
              chat_id: 2
          },
          {
              user_id: 3,
              chat_id: 2
          },
 
      ]);
    });
};
