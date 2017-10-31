const googleRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const { jwtAuth, pwdAuth, jwtOptions } = require('../auth-config.js');
const User = require('../../../db/models/user.js');
const Friend = require('../../../db/models/friend.js');
const oid = require('mongoose').Types.ObjectId;
const debug = process.env.DEBUG || false;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;




//redirect to google.
//when return:
// cehck if account with email exists:
// if so, add google to THAT account.
// Else, create a NEW account id and add this google id to the account.

router.route('/')
  .get(passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
  }));


googleRouter.get( '/callback', passport.authenticate('google', {
  //successRedirect: '/',
  failureRedirect: '/',
  session: false
}), function(req, res) {
  var token = AuthService.encode(req.user);
  res.redirect('/home?token=' + token);
});


module.exports = googleRouter;
