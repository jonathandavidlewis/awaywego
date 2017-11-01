const mongoose = require('mongoose');
const db = require('../config.js');
const Schema = mongoose.Schema;


const transactionSchema = new Schema({
  from: { type: Schema.ObjectId, ref: 'User', required: true },
  to: { type: Schema.ObjectId, ref: 'User', required: true },
  amount: Number,
  expenseId: { type: Schema.ObjectId, ref: 'Expense', required: true },
  planId: { type: Schema.ObjectId, ref: 'Plan', required: true },
  status: String
}, { timestamps: true });

var Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
