const apiRouter = require('express').Router();
const { planRouter } = require('./plan-router');

apiRouter.use('/plan', planRouter);

module.exports.apiRouter = apiRouter;