import angular from 'angular';

// imports for this component
import template from './transaction-page.html';
import './transaction-page.css';

class TransactionPageController {
  constructor(ExpensesService) {
    this.ExpensesService = ExpensesService;
    this.header = '';

    this.filterTransactions = this.filterTransactions.bind(this);
  }

  filterTransactions(transaction) {
    if (this.ExpensesService.filterBy === 'Money You Are Owed') {
      this.header = 'Money You Are Owed';
      return this.ExpensesService.filterByOwed(transaction);
    } else if (this.ExpensesService.filterBy === 'Money You Owe') {
      this.header = 'Money You Owe';
      return this.ExpensesService.filterByOwedTo(transaction);
    } else if (this.ExpensesService.filterBy === 'Expense') {
      this.header = 'Expense - ' + this.ExpensesService.selectedExpense.description;
      return this.ExpensesService.filterByExpenseId(transaction);
    } else {
      this.header = 'All';
      return true;
    }
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
