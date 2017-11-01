import angular from 'angular';

// imports for this component
import template from './transaction-page.html';
import './transaction-page.css';

class TransactionPageController {
  constructor(ExpensesService, UserService) {
    this.ExpensesService = ExpensesService;
    this.UserService = UserService;
    this.userId = this.UserService.user.id;
    this.transactions = '';
    this.filteredTransactions = '';

  }

  $onInit() {
    this.transactions = this.ExpensesService.filterUserTransactions();
    console.log('Expenses OWED', this.transactions);
  }
}

TransactionPageController.$inject = ['ExpensesService', 'UserService'];

const TransactionPageComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: TransactionPageController
};


export default TransactionPageComponent;
