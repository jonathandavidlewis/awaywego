const expensesRouter = require('express').Router();
const Expense = require('../../db/models/expense.js');
const Transaction = require('../../db/models/transaction.js');

expensesRouter.post('/', (req, res) => {
  let newTransactions = req.body.transactions;

  const newExpense = {
    userId: req.user._id,
    planId: req.body.planId,
    description: req.body.description,
    amount: req.body.amount,
    transactions: []
  };

  Expense.create(newExpense).then((expense) => {
    for (let i = 0; i < newTransactions.length; i++) {
      newTransactions[i].expenseId = expense._id;
      newTransactions[i].planId = req.body.planId;
      newTransactions[i].status = 'open';
    }

    Transaction.create(newTransactions).then((transactions) => {
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
  Expense.find({planId: req.params.planId}).then((expenses) => {
    let ledger = {
      expenses: expenses,
      transactions: []
    };

    Transaction.find({planId: req.params.planId}).then((transactions) => {
      ledger.transactions = transactions;
      res.status(200).json(ledger);
    });
  }).catch(err => res.status(500).json({'Server error': err}));
});



module.exports = expensesRouter;
