const googleRouter = require('express').Router();
const debug = process.env.DEBUG || false;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = require('../../../keys.config.js');
const passport = require('passport');
const { loginGoogleUser } = require('./google-login');
const request = require ('request');
const User = require('../../../db/models/user.js');
const Friend = require('../../../db/models/friend.js');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, function(accessToken, nothing, refreshToken, profile, done) {

  const userEmail = profile.emails[0].value;
  const googleId = profile.id;
  const name = profile.displayName;
  const user = {
    name: name,
    email: userEmail,
    googleId: googleId,
    googleAccessToken: accessToken
  };
  if (req.user.photos && req.user.photos[0]) {
    newUser.profilePic = req.user.photos[0].value;
  }

  User.findOne({ googleId: googleId }).then((err, user) => {
    if (user) {
      user.update({googleAccessToken: accessToken}).then(() => done(null, profile));
    } else {
      User.findOne({ email: userEmail }).then((err, user) => {
        if (user) {
          user.update({googleAccessToken: accessToken, googleId: googleId }).then(done(null, profile));
        } else {
          User.create({
            name: name,
            email: userEmail,
            googleId: googleId,
            googleAccessToken: accessToken
          }).then(() => {

            // once signed up - see if anyone has invited this user
            Friend.update({toEmail: user.email}, {toEmail: '', to: oid(user._id)})
              .catch(err => console.log('Error updating invite-signup: ', err));

            done(null, profile);
          }).catch((error) => console.log('There was an error creating/updating Google user: ', error));
        }
      });
    }
  });
}));

googleRouter.route('/')
  .get(passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/contacts.readonly', 'https://www.google.com/m8/feeds/']
  }));

googleRouter.get( '/callback', passport.authenticate('google', {
  failureRedirect: '/error/',
  session: false
}), loginGoogleUser);

module.exports = googleRouter;
