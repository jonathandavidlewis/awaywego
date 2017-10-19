var express = require('express');
var path = require('path');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var JwtStrategy = require('passport-jwt');

// Port
const port = process.env.PORT || 1337;

let app = express();

app.use(morgan('[:date[clf]] | ":method :url" | STATUS: :status :res[content-length] ":referrer"'));

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

// app.get('/home',)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/dist/index.html'));
});

app.listen(port, () => {
  console.log('Running on ' + port);
});
