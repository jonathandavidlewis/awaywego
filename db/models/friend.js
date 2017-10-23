const mongoose = require('mongoose');
const db = require('../config.js');
const Schema = mongoose.Schema;

const friendSchema = new Schema({
  from: {type: Schema.ObjectId, ref: 'User', required: true },
  to: {type: Schema.ObjectId, ref: 'User', required: true },
  status: String
}, {timestamps: true});

var Friend = mongoose.model('Friend', planSchema);
module.exports = Friend;
