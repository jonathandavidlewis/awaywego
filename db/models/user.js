const mongoose = require('mongoose');
const db = require('../config');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const Promise = require('bluebird');

let userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: false},
  profilePic: String,
  googleId: {type: Number, unique: true},
  googleAccessToken: {type: String, unique: true}
});

userSchema.methods.comparePassword = function(pwd) {
  return bcrypt.compare(pwd, this.password);
};

userSchema.pre('save', function(next) {
  if (this.password) {
    return bcrypt.hash(this.password, 10).then(hash => {
      this.password = hash;
      next();
    });
  } else if (this.googleId) {
    next();
  } else {
    throw new Error('Password or Oauth required');
  }

});

var User = mongoose.model('User', userSchema);
module.exports = User;
