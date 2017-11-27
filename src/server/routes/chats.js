const Router = require('koa-router');
const queries = require('../db/queries/chats');

const user_chat_queries = require('../db/queries/user_chat');

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

router.get(`${BASE_URL}/:id`, async (ctx) => {
    try {
        const chat = await queries.getSingleChat(ctx.params.id);
        if (chat.length) {
            ctx.body = {
                status: 'success',
                data: chat
            };
        }
        else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That chat does not exist.'
            };
        }
    }
    catch (err) {
        console.log(err);
    }
});

router.post(BASE_URL, async (ctx) => {
    try {
        const { created_at , user_ids } = ctx.request.body;
        const chat_list = await queries.addChat({ created_at });
        const chat = chat_list[0];
        if (chat) {
            ctx.status = 201;
            ctx.body = {
                status: 'success',
                data: chat
            };
            try {
                console.log('user_ids', user_ids)
                await Promise.all(user_ids.map((user_id) => {
                    if (user_id === 2) {
                        user_chat_queries.addUserChatTwo(user_id, chat.id)
                    }
                    else if (user_id === 4) {
                        user_chat_queries.addUserChatFour(user_id, chat.id)
                    }
                }));
            }
            catch (err) {
                ctx.status = 400;
                ctx.body = {
                    status: 'error',
                    message: err.chat || 'Sorry, an error has occured.'
                };
            }
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
})

router.put(`${BASE_URL}/:id`, async (ctx) => {
    try {
        const chat = await queries.updateChat(ctx.params.id, ctx.request.body);
        if (chat.length) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: chat
            }
        }
        else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That chat does not exist.'
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


router.delete(`${BASE_URL}/:id`, async (ctx) => {
    try {
        const chat = await queries.deleteChat(ctx.params.id);
        if (chat.length) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: chat
            }
        }
        else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That chat does not exist.'
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
