const Router = require('koa-router');
const queries = require('../db/queries/messages');

const router = new Router();
const BASE_URL = `/api/v1/messages`;

router.get(BASE_URL, async (ctx) => {
    try {
        const messages = await queries.getAllMessages();
        ctx.body = {
            status: 'success',
            data: messages
        };
    }
    catch (err) {
        console.log(err) ;
    }
});

router.get(`${BASE_URL}/:id`, async (ctx) => {
    try {
        const message = await queries.getSingleMessage(ctx.params.id);
        if (message.length) {
            ctx.body = {
                status: 'success',
                data: message
            };
        }
        else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That message does not exist.'
            };
        }
    }
    catch (err) {
        console.log(err);
    }
});

router.post(BASE_URL, async (ctx) => {
    try {
        const message = await queries.addMessage(ctx.request.body);
        if (message.length) {
            ctx.status = 201;
            ctx.body = {
                status: 'success',
                data: message
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
            message: err.message || 'Sorry, an error has occured.'
        };
    }
})

router.put(`${BASE_URL}/:id`, async (ctx) => {
    try {
        const message = await queries.updateMessage(ctx.params.id, ctx.request.body);
        if (message.length) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: message
            }
        }
        else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That message does not exist.'
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
        const message = await queries.deleteMessage(ctx.params.id);
        if (message.length) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: message
            }
        }
        else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That message does not exist.'
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
