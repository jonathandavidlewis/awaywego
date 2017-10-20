const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'start something awesome away we go'
};

const User = require('../../db/models/user.js');
const debug = process.env.DEBUG || false;

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  if (debug) { console.log('JWT token payload received: ', jwtPayload); }
  User.findOneById(jwtPayload.userId).then(user => {
    if (user) { done(null, user); } else { done(null, false); }
  });
}));
module.exports.jwtAuth = passport.authenticate('jwt', {session: false});

passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
  if (debug) { console.log('Local auth - email: ', email); }
  User.findOne({email: email}).then(user => {
    if (user) {
      return user.comparePassword(password).then(match => {
        if (match) { done(null, user); } else { done(null, false, {messages: 'Incorrect password'}); }
      });
    } else {
      done(null, false, {messages: 'User not found'});
    }
  }).catch(err => console.log('Error: ', err));
}));
module.exports.pwdAuth = passport.authenticate('local', {session: false});
module.exports.jwtOptions = jwtOptions;
