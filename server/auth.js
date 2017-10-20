const express = require('express');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'start something awesome away we go'
};

const db = require('../db/config');
const User = require('../db/models/user');

authRouter.post('/login', (req, res) => {
  let token = jwt.sign({email: 'email'}, jwtOptions.secretOrKey);
  res.json({message: 'Log In was successful', token: token});
});

authRouter.post('/signup', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  User.findOne({email: email})
    .then((user) => {
    // if user already exist
      if (user) {
      // refuse signup
        res.json({Message: 'User already exists'});
      // else
      } else {
      // create a new user
        User.create({email: email, password: password})
          .then((user) => {
            // give token
            let token = jwt.sign({email: 'email'}, jwtOptions.secretOrKey);
            res.status(200).json({message: 'Registration was successful', token: token});
          });
      }
    });
});

passport.use(new JwtStrategy(jwtOptions, function(jwtPayload, done) {
  // User.findOne({id: jwt_payload.sub}, function(err, user) {
  //   if (err) {
  //     return done(err, false);
  //   }
  //   if (user) {
  //     return done(null, user);
  //   } else {
  //     return done(null, false);
  //     // or you could create a new account
  //   }
  // });
  done(null, {email: 'email'});
}));

passport.use(new LocalStrategy(
  function(email, password, done) {
    // User.findOne({ username: username }, function (err, user) {
    //   if (err) { return done(err); }
    //   if (!user) { return done(null, false); }
    //   if (!user.verifyPassword(password)) { return done(null, false); }
    //   return done(null, user);
    // });
  }
));

module.exports.jwtAuth = passport.authenticate('jwt', {session: false});

module.exports.authRouter = authRouter;

