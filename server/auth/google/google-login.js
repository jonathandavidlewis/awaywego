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
  if (req.user.photos && req.user.photos[0]) {
    newUser.profilePic = req.user.photos[0].value;
  }

  User.findOne({email: email}).then((user) => {
    if (user) {
      const token = jwt.sign({name: user.name, userId: user._id, email: user.email}, jwtOptions.secretOrKey);
      res.locals.newToken = token;
      res.render('index');
    } else {
      User.create(newUser).then((user) => {
        const token = jwt.sign({name: user.name, userId: user._id, email: user.email}, jwtOptions.secretOrKey);
        res.render('index', {
          helpers: {
            newToken: () => token
          }
        });
        // once signed up - see if anyone has invited this user
        Friend.update({toEmail: user.email}, {toEmail: '', to: oid(user._id)})
          .catch(err => console.log('Error updating invite-signup: ', err));
      }).catch((err) => res.status(500).json({message: err}));
    }
  }).catch((err) => res.status(500).json({message: err}));
};

module.exports.loginGoogleUser = loginGoogleUser;