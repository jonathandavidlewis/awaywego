const authRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const { jwtAuth, pwdAuth, jwtOptions } = require('./auth-config.js');
const User = require('../../db/models/user.js');
const Friend = require('../../db/models/friend.js');
const oid = require('mongoose').Types.ObjectId;
const debug = process.env.DEBUG || false;

authRouter.post('/login', pwdAuth, (req, res) => {
  if (debug) { console.log('login attempt for: ', req.body.email); }
  const token = jwt.sign({name: req.user.name, userId: req.user._id}, jwtOptions.secretOrKey);
  res.json({message: 'Log In was successful', token: token});
});

authRouter.post('/signup', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const newUser = {name: name, email: email, password: password};

  User.findOne({email: email}).then((user) => {
    if (user) {
      res.status(422).json({message: 'User already exists'});
    } else {
      User.create(newUser).then((user) => {
        const token = jwt.sign({name: user.name, userId: user._id}, jwtOptions.secretOrKey);
        res.status(201).json({message: 'Registration was successful', token: token});
        // once signed up - see if anyone has invited this user
        Friend.update({toEmail: user.email}, {toEmail: '', to: oid(user._id)})
          .catch(err => console.log('Error updating invite-signup: ', err));
      });
    }
  }).catch((err) => res.status(500).json({message: err}));
});



module.exports = authRouter;
