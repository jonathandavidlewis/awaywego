import angular from 'angular';

// imports for this component
import template from './expenses-summary.html';
import './expenses-summary.css';

class ExpensesSummaryController {
  constructor(ExpensesService, UserService, $stateParams) {
    this.ExpensesService = ExpensesService;
    this.UserService = UserService;
    this.stateParams = $stateParams;

    this.settle = this.settle.bind(this);
  }

  settle(transaction) {
    let expense = {
      groupId: this.stateParams.groupId,
      description: `${transaction.from.name} paid ${transaction.to.name}`,
      amount: transaction.amount,
      transactions: [{from: transaction.to, to: transaction.from, amount: transaction.amount}]
    };

    console.log('settle', expense);
    this.ExpensesService.newExpense(expense).then(() => {
      console.log('Settled');
    }).catch(err => {
      console.log('There was an error processing your request, please contact the server admin', err);
    });
  }
}

ExpensesSummaryController.$inject = ['ExpensesService', 'UserService', '$stateParams'];

const ExpensesSummaryComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: ExpensesSummaryController
};


export default ExpensesSummaryComponent;
