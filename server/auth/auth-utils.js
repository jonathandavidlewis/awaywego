const oid = require('mongoose').Types.ObjectId;
const Friend = require('../../db/models/friend.js');
const User = require('../../db/models/user.js');
const debug = process.env.DEBUG || false;
const jwt = require('jsonwebtoken');
const { jwtAuth, pwdAuth, jwtOptions } = require('./auth-config.js');

const loginUser = (req, res) => {
  if (debug) { console.log('login attempt for: ', req.body.email); }
  const token = jwt.sign({
    name: req.user.name,
    userId: req.user._id,
    email: req.user.email
  }, jwtOptions.secretOrKey);
  res.json({message: 'Log In was successful', token: token});
};

const createUser = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const newUser = {name: name, email: email, password: password};

  User.findOne({email: email}).then((user) => {
    if (user) {
      res.status(422).json({message: 'User already exists'});
    } else {
      User.create(newUser).then((user) => {
        const token = jwt.sign({name: user.name, userId: user._id, email: user.email, profilePic: user.profilePic}, jwtOptions.secretOrKey);
        res.status(201).json({message: 'Registration was successful', token: token});
        // once signed up - see if anyone has invited this user
        Friend.update({toEmail: user.email}, {toEmail: '', to: oid(user._id)})
          .catch(err => console.log('Error updating invite-signup: ', err));
      });
    }
  }).catch((err) => res.status(500).json({message: err}));
};

module.exports.loginUser = loginUser;
module.exports.createUser = createUser;