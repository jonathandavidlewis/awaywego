const mongoose = require('mongoose');
const db = require('../config.js');
const Schema = mongoose.Schema;


const transactionSchema = new Schema({
  from: { type: Schema.ObjectId, ref: 'User', required: true },
  to: { type: Schema.ObjectId, ref: 'User', required: true },
  amount: Number
}, { timestamps: true });

var Friend = mongoose.model('Friend', friendSchema);
module.exports = Friend;
