const expensesRouter = require('express').Router();
const Expense = require('../../db/models/expense.js');
const Transaction = require('../../db/models/transaction.js');

expensesRouter.post('/', (req, res) => {
  console.log('Post to expenses router', req.body);
  let transactions = req.body.transactions;

  const newExpense = {
    userId: req.user._id,
    planId: req.body.planId,
    description: req.body.description,
    transactions: []
  };

  Expense.create(newExpense).then((expense) => {
    for (let i = 0; i < transactions.length; i++) {
      transactions[i].expenseId = expense._id;
    }

    Transaction.create(transactions).then(() => {
      console.log('expense', expense);
      res.status(201).json(expense);
    }).catch(err => res.status(500).json({'Server error': err}));
  });

});


module.exports = expensesRouter;
