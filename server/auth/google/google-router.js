const googleRouter = require('express').Router();
const debug = process.env.DEBUG || false;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = require('../../../keys.config.js');
const passport = require('passport');
const { loginGoogleUser } = require('./google-login');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, function(req, accessToken, refreshToken, profile, done) {

  /* User.findOrCreate({ googleId: profile.id }, function (err, user) {
   return done(err, user);
 });*/
  console.log("ACCESS:", accessToken);
  console.log("REFRESH:", refreshToken);
  console.log("PROFILE:___:", profile);
  //add userAccessTokenToUser
  // googleAccessToken

  return done(null, profile);
}
));

googleRouter.route('/')
  .get(passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/contacts.readonly']
  }));

googleRouter.get( '/callback', passport.authenticate('google', {
  failureRedirect: '/error/',
  session: false
}), loginGoogleUser);

module.exports = googleRouter;
