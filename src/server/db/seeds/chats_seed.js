exports.seed = (knex, Promise) => {
	// Deletes ALL existing entries
	return knex('chats').del()
		.then(() =>{
			// Inserts seed entries
			return knex('chats').insert([
				{ created_at: Date.now() },
				{ created_at: Date.now() }
			]);
		});
};
