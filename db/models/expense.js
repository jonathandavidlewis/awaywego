const mongoose = require('mongoose');
const db = require('../config.js');
const Schema = mongoose.Schema;


const expenseSchema = new Schema({
  userId: { type: Schema.ObjectId, ref: 'User', required: true },
  description: String,
  transactions: [{type: Schema.ObjectId, ref: 'Transaction'}]
}, { timestamps: true });

var Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
