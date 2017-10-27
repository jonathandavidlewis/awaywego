const apiRouter = require('express').Router();
const planRouter = require('./plan-router');
const friendRouter = require('./friend-router');
const eventRouter = require('./event-router');
const messageRouter = require('./message-router');

apiRouter.use('/plan', planRouter);
apiRouter.use('/friends', friendRouter);
apiRouter.use('/event', eventRouter);
apiRouter.use('/messages', messageRouter);

module.exports = apiRouter;
