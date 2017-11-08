const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = require('../config.js');
const Schema = mongoose.Schema;
const Expense = require('./expense');


const transactionSchema = new Schema({
  from: { type: Schema.ObjectId, ref: 'User', required: true },
  to: { type: Schema.ObjectId, ref: 'User', required: true },
  amount: Number,
  expenseId: { type: Schema.ObjectId, ref: 'Expense', required: true },
  groupId: { type: Schema.ObjectId, ref: 'Group', required: true },
  status: String
}, { timestamps: true });

transactionSchema.pre('remove', function(next) {
  Expense.update(
    { transactions: this._id },
    { $pull: { transactions: this._id } }
  ).exec();
  next();
});

var Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
