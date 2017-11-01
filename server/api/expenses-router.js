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
        res.status(201).json(expense);
      });
    }).catch(err => res.status(500).json({'Server error': err}));
  });
});


expensesRouter.get('/:planId', (req, res) => {
  Expense.find({planId: req.params.planId})
    .populate({
      path: 'transactions',
      populate: {
        path: 'to',
        model: 'User',
        select: 'name'
      }
    }).populate({
      path: 'transactions',
      populate: {
        path: 'from',
        model: 'User',
        select: 'name'
      }
    }).exec().then((expenses) => {
      console.log('get route ', expenses);
      res.status(200).json(expenses);
    }).catch(err => res.status(500).json({'Server error': err}));
});



module.exports = expensesRouter;
