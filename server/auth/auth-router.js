const authRouter = require('express').Router();
const { jwtAuth, pwdAuth, jwtOptions } = require('./auth-config.js');
const googleRouter = require('./google/google-router');
const { loginUser, createUser} = require('./auth-utils');

authRouter.use('/google', googleRouter);

authRouter.post('/login', pwdAuth, loginUser);

authRouter.post('/signup', createUser);

module.exports = authRouter;
