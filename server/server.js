var express = require('express');
var path = require('path');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var LocalStrategy = require('passport-local');

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'start something awesome away we go'
};

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

// Port
const port = process.env.PORT || 8080;

let app = express();

app.use(morgan('[:date[clf]] | ":method :url" | STATUS: :status :res[content-length] ":referrer"'));

app.post('/login', (req, res) => {
  var token = jwt.sign({username: 'username'}, jwtOptions.secretOrKey);
  res.json({message: 'Log In was successful', token: token});
});

app.post('/signup', (req, res) => {
  var token = jwt.sign({username: 'username'}, jwtOptions.secretOrKey);
  res.json({message: 'Log In was successful', token: token});
});

const jwtAuth = passport.authenticate('jwt', {session: false});

app.post('/testAuth', jwtAuth, (req, res) => {
  res.json('Access granted');
});

// Auth
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

// Serve up static files
app.use(express.static(path.join(__dirname, '../client/public/dist')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/dist/index.html'));
});

app.listen(port, () => {
  console.log('Running on ' + port);
});
