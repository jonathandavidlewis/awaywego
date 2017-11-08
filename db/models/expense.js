const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = require('../config.js');
const Schema = mongoose.Schema;
const Transaction = require('./transaction');


const expenseSchema = new Schema({
  userId: { type: Schema.ObjectId, ref: 'User', required: true },
  groupId: { type: Schema.ObjectId, ref: 'Group', required: true },
  description: String,
  amount: {type: Number, required: true},
  transactions: [{type: Schema.ObjectId, ref: 'Transaction'}]
}, { timestamps: true });

expenseSchema.pre('remove', function(next) {
  Transaction.deleteMany({expenseId: this._id}).exec().then(() => next());
});

var Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
