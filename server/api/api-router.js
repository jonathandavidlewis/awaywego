const apiRouter = require('express').Router();
const groupRouter = require('./group-router');
const friendRouter = require('./friend-router');
const eventRouter = require('./event-router');
const messageRouter = require('./message-router');
const commentRouter = require('./comment-router');
const searchRouter = require('./search-router');
const expensesRouter = require('./expenses-router');

apiRouter.use('/group', groupRouter);
apiRouter.use('/friends', friendRouter);
apiRouter.use('/event', eventRouter);
apiRouter.use('/messages', messageRouter);
apiRouter.use('/comments', commentRouter);
apiRouter.use('/search', searchRouter);
apiRouter.use('/expenses', expensesRouter);

module.exports = apiRouter;
