const oid = require('mongoose').Types.ObjectId;
const Friend = require('../../../db/models/friend.js');
const User = require('../../../db/models/user.js');
const debug = process.env.DEBUG || false;
const jwt = require('jsonwebtoken');
const { jwtAuth, pwdAuth, jwtOptions } = require('./../auth-config.js');

const loginGoogleUser = (req, res) => {
  const name = req.user.displayName;
  const email = req.user.emails[0].value;
  const googleId = req.user.id;
  const newUser = {name: name, email: email, googleId: googleId};

  User.findOne({googleId: googleId}).then((user) => {
    if (user) {
      const token = jwt.sign({name: user.name, userId: user._id, email: user.email}, jwtOptions.secretOrKey);
      res.locals.newToken = token;
      res.locals.googleAccessToken = user.googleAccessToken;
      res.render('index');
    } else {
      console.log('There should have been a Google user, but none was found');
    }
  }).catch((err) => res.status(500).json({message: err}));
};

module.exports.loginGoogleUser = loginGoogleUser;
