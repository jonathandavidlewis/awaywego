import angular from 'angular';

// imports for this component
import template from './expenses-main.html';
import './expenses-main.css';

class ExpensesMainController {
  constructor(ExpensesService, $stateParams) {
    this.ExpensesService = ExpensesService;
    this.stateParams = $stateParams;
    this.expenses = [];
    this.summary = '';
    this.transactions = '';

    this.updateExpenses = this.updateExpenses.bind(this);
    this.settleTransaction = this.settleTransaction.bind(this);
    this.removeTransaction = this.removeTransaction.bind(this);
    this.removeExpense = this.removeExpense.bind(this);

  }

  $onInit() {
    this.updateExpenses();
  }

  updateExpenses() {
    this.ExpensesService.getExpenses(this.stateParams.planId).then(() => {
      this.expenses = this.ExpensesService.returnExpenses();
      this.summary = this.ExpensesService.calculateDebts();
      this.transactions = this.ExpensesService.filterUserTransactions();
    });
  }

  removeExpense(expenseId) {
    this.ExpensesService.removeExpense(expenseId).then(() => {
      this.updateExpenses();
    });
  }

  settleTransaction(transactionId) {
    this.ExpensesService.settleTransaction(transactionId).then(() => {
      this.updateExpenses();
    });
  }

  removeTransaction(transactionId) {
    this.ExpensesService.removeTransaction(transactionId).then((res) => {
      this.updateExpenses();
    });
  }

}
ExpensesMainController.$inject = ['ExpensesService', '$stateParams'];

const ExpensesMainComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: ExpensesMainController
};

export default ExpensesMainComponent;
