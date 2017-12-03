const Koa = require('koa');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');

const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');
const chatsRoutes = require('./routes/chats');
const messagesRoutes = require('./routes/messages');
const userChatRoutes = require('./routes/user_chat');

const app = new Koa();
//const PORT = process.env.PORT || 1337;
const PORT = process.env.PORT || 3000;

app.use(bodyParser());
//app.use(indexRoutes.routes());
app.use(usersRoutes.routes());
app.use(chatsRoutes.routes());
app.use(userChatRoutes.routes());
app.use(messagesRoutes.routes());

app.use(static('client/public'));

const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
