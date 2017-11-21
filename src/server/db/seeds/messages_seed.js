exports.seed = (knex, Promise) => {
	// Deletes ALL existing entries
	return knex('messages').del()
		.then(() =>{
			// Inserts seed entries
			return knex('messages').insert([
                {
                    created_at: Date.now(),
                    chat_id: 1,
                    sender_id: 1,
                    body: 'This is a message body' 
                },
                {
                    created_at: Date.now(),
                    chat_id: 2,
                    sender_id: 2,
                    body: 'This is another message body' 
                }
			]);
		});
};
