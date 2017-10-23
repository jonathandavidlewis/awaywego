const apiRouter = require('express').Router();
const planRouter = require('./plan-router');
const friendRouter = require('./friend-router');

apiRouter.use('/plan', planRouter);
apiRouter.use('/friends', friendRouter);

module.exports = apiRouter;
