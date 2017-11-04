import angular from 'angular';

// imports for this component
import template from './expenses-main.html';
import './expenses-main.css';

class ExpensesMainController {
  constructor(ExpensesService) {
    this.ExpensesService = ExpensesService;

    this.settleTransaction = this.settleTransaction.bind(this);
    this.removeTransaction = this.removeTransaction.bind(this);
    this.removeExpense = this.removeExpense.bind(this);

  }

  $onInit() {
    this.ExpensesService.getExpenses();
  }

  removeExpense(expenseId) {
    this.ExpensesService.removeExpense(expenseId);
  }

  settleTransaction(transactionId) {
    this.ExpensesService.settleTransaction(transactionId);
  }

  removeTransaction(transactionId) {
    this.ExpensesService.removeTransaction(transactionId);
  }
}

ExpensesMainController.$inject = ['ExpensesService'];

const ExpensesMainComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: ExpensesMainController
};

export default ExpensesMainComponent;
