const googleRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const { jwtAuth, pwdAuth, jwtOptions } = require('../auth-config.js');
const User = require('../../../db/models/user.js');
const Friend = require('../../../db/models/friend.js');
const oid = require('mongoose').Types.ObjectId;
const debug = process.env.DEBUG || false;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = require('../../../keys.config.js');
const passport = require('passport');
const { loginGoogleUser } = require('./google-utils');


passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, function(req, accessToken, refreshToken, profile, done) {

  return done(null, profile);
}
));


/* todo: Create the user or log them in.
          User.findOrCreate({googleId: profile.id}, function(err, user) {
            if (err) {
              return console.error(err);
            }
            //call done here;
          });
    */

//redirect to google.
//when return:
// cehck if account with email exists:
// if so, add google to THAT account.
// Else, create a NEW account id and add this google id to the account.

googleRouter.route('/')
  .get(passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/contacts.readonly']
  }));


googleRouter.get( '/callback', passport.authenticate('google', {
  //successRedirect: '/',
  failureRedirect: '/error/',
  session: false
}), loginGoogleUser);


module.exports = googleRouter;





var extra = function(req, res) {
  console.log('USER IS______________', req.user);
  console.log(JSON.stringify(req.user.emails[0].value));
  console.log('REQUEST BODY:_________', JSON.stringify(req.body));
  //req.user is the profile...
  var token = jwtAuth.encode(req.user);
  res.redirect('/home?token=' + token);
}