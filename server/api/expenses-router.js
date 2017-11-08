const expensesRouter = require('express').Router();
const Expense = require('../../db/models/expense.js');
const Transaction = require('../../db/models/transaction.js');

expensesRouter.post('/', (req, res) => {
  let newTransactions = req.body.transactions;

  const newExpense = {
    userId: req.user._id,
    groupId: req.body.groupId,
    description: req.body.description,
    amount: req.body.amount,
    transactions: []
  };

  Expense.create(newExpense).then((expense) => {
    for (let i = 0; i < newTransactions.length; i++) {
      newTransactions[i].expenseId = expense._id;
      newTransactions[i].groupId = req.body.groupId;
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


expensesRouter.get('/:groupId', (req, res) => {
  Expense.find({groupId: req.params.groupId})
    .populate({
      path: 'transactions',
      populate: {
        path: 'to',
        model: 'User',
        select: 'name profilePic'
      }
    }).populate({
      path: 'transactions',
      populate: {
        path: 'from',
        model: 'User',
        select: 'name profilePic'
      }
    }).exec().then((expenses) => {
      res.status(200).json(expenses);
    }).catch(err => res.status(500).json({'Server error': err}));
});

expensesRouter.put('/transaction/:transactionId/settle', (req, res) => {
  Transaction.findByIdAndUpdate(req.params.transactionId, {status: 'settled'}).then((transaction) => {
    res.status(200).json(transaction);
  }).catch(err => res.status(500).json({'Server error': err}));
});

expensesRouter.delete('/:expenseId/remove', (req, res) => {
  Expense.findByIdAndRemove(req.params.expenseId).exec().then(() => res.status(200).json({'Message': 'Deleted'}))
    .catch(err => res.status(500).json({'Server error': err}));
});

expensesRouter.delete('/transaction/:transactionId/remove', (req, res) => {
  Transaction.findByIdAndRemove(req.params.transactionId).exec().then(() => res.status(200).json({'Message': 'Deleted'}))
    .catch(err => res.status(500).json({'Server error': err}));
});

module.exports = expensesRouter;
