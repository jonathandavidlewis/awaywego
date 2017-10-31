const expensesRouter = require('express').Router();
const Expense = require('../../db/models/expense.js');
const Transaction = require('../../db/models/transaction.js');

expensesRouter.post('/', (req, res) => {
  let transactions = req.body.transactions;

  const newExpense = {
    userId: req.user._id,
    planId: req.body.planId,
    description: req.body.description,
    amount: req.body.amount,
    transactions: []
  };

  Expense.create(newExpense).then((expense) => {
    for (let i = 0; i < transactions.length; i++) {
      transactions[i].expenseId = expense._id;
    }

    Transaction.create(transactions).then((transactions) => {
      for (let i = 0; i < transactions.length; i++) {
        expense.transactions.push(transactions[i]._id);
      }
      expense.save().then(() => {
        console.log('expense', expense);
        res.status(201).json(expense);
      });
    }).catch(err => res.status(500).json({'Server error': err}));
  });
});


expensesRouter.get('/:planId', (req, res) => {
  console.log('get planId for expenses', req.params.planId);
  Expense.find({planId: req.params.planId}).then((expenses) => {
    res.status(200).json(expenses);
  }).catch(err => res.status(500).json({'Server error': err}));
});



module.exports = expensesRouter;
