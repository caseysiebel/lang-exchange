exports.seed = (knex, Promise) => {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(() =>{
            // Inserts seed entries
            return knex('users').insert([
                { username: 'leptone', password: '1245' },
                { username: 'csiebel', password: '1245' },
            ]);
        });
};
