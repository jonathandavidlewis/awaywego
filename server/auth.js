var express = require('express');
var authRouter = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'start something awesome away we go'
};

authRouter.post('/login', (req, res) => {
  var token = jwt.sign({username: 'username'}, jwtOptions.secretOrKey);
  res.json({message: 'Log In was successful', token: token});
});

authRouter.post('/signup', (req, res) => {
  var token = jwt.sign({username: 'username'}, jwtOptions.secretOrKey);
  res.status(200).json({message: 'Registration was successful', token: token});
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
  done(null, {username: 'username'});
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

