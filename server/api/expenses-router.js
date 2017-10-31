const expensesRouter = require('express').Router();

expensesRouter.post('/', (req, res) => {
  console.log('Post to expenses router', req.body);
});


module.exports = expensesRouter;
