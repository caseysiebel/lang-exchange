const Router = require('koa-router');
const queries = require('../db/queries/chats');

const router = new Router();
const BASE_URL = `/api/v1/chats`;

router.get(BASE_URL, async (ctx) => {
    try {
        const chats = await queries.getAllChats();
        ctx.body = {
            status: 'success',
            data: chats
        };
    }
    catch (err) {
        console.log(err) ;
    }
});

module.exports = router;
