const Router = require('koa-router');
const queries = require('../db/queries/user_chat');

const router = new Router();
const BASE_URL = `/api/v1/chats`;

router.post(`${BASE_URL}/:chat_id/user/:user_id`, async (ctx) => {
    try {
        const userChat = await queries.addUserChat(ctx.params.user_id, ctx.params.chat_id);
        if (userChat.length) {
            ctx.status = 201;
            ctx.body = {
                status: 'success',
                data: userChat
            };
        }
        else {
            ctx.status = 400;
            ctx.body = {
                status: 'error',
                message: 'Something went wrong.'
            };
        }
    }
    catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.chat || 'Sorry, an error has occured.'
        };
    }

});
router.delete(`${BASE_URL}/:chat_id/user/:user_id`, async (ctx) => {
    try {
        const userChat = await queries.deleteUserChat(ctx.params.user_id, ctx.params.chat_id);
        if (userChat.length) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: userChat
            }
        }
        else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That user_chat does not exist.'
            }
        }
    }
    catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occured.'
        };
    }
})
module.exports = router;
