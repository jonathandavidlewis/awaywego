import angular from 'angular';

// imports for this component
import template from './expenses-main.html';
import './expenses-main.css';

class ExpensesMainController {
  constructor(ExpensesService, $stateParams) {
    this.ExpensesService = ExpensesService;
    this.stateParams = $stateParams;
    this.expenses = this.ExpensesService.expenses;
    this.summary = this.ExpensesService.summary;
    this.transactions = this.ExpensesService.transactions;

    this.settleTransaction = this.settleTransaction.bind(this);
    this.removeTransaction = this.removeTransaction.bind(this);
    this.removeExpense = this.removeExpense.bind(this);

  }

  $onInit() {
    this.ExpensesService.getExpenses();
  }

  removeExpense(expenseId) {
    this.ExpensesService.removeExpense(expenseId).then(() => {
      this.updateExpenses();
    });
  }

  settleTransaction(transactionId) {
    this.ExpensesService.settleTransaction(transactionId);
  }

  removeTransaction(transactionId) {
    this.ExpensesService.removeTransaction(transactionId);
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
