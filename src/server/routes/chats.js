const Router = require('koa-router');
const queries = require('../db/queries/chats');
const userIntersectionQueries = require('../db/queries/user_chat');

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
        const chat = await queries.addChat(ctx.request.body);
        if (chat.length) {
            ctx.status = 201;
            ctx.body = {
                status: 'success',
                data: chat
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

router.post(`${BASE_URL}/:id/user/:user_id`, async (ctx) => {
    try {
        const userChat = await userIntersectionQueries.addUserChat(ctx.params.user_id, ctx.params.id);
        console.log('userChat', userChat);
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

module.exports = router;
