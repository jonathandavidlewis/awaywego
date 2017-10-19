const mongoose = require('mongoose');
const db = require('../config');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');

let userSchema = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true}
});

var User = mongoose.model('User', userSchema);

userSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});

module.exports = User;