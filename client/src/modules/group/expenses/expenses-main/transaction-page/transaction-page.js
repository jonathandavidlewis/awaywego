import angular from 'angular';

// imports for this component
import template from './transaction-page.html';
import './transaction-page.css';

class TransactionPageController {
  constructor(ExpensesService) {
    this.ExpensesService = ExpensesService;
    this.header = '';
    this.expense = this.ExpensesService.selectedExpense;
  }

  populatePaidBy() {
    let paid = {};
    this.expense.transactions.forEach((transaction) => {
      if (!paid[transaction.to.name]) {
        paid[transaction.to.name] = true;
      }
    });
    return Object.keys(paid).join(', ').toString();
  }

  populateSplitAmong() {
    let among = {};
    this.expense.transactions.forEach((transaction) => {
      if (!among[transaction.from.name]) {
        among[transaction.from.name] = true;
      }
    });
    return Object.keys(among).join(', ').toString();
  }
}

TransactionPageController.$inject = ['ExpensesService'];

const TransactionPageComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: TransactionPageController
};


export default TransactionPageComponent;
