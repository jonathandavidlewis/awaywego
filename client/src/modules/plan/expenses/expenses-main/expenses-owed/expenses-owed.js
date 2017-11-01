import angular from 'angular';

// imports for this component
import template from './expenses-owed.html';
import './expenses-owed.css';

class ExpensesOwedController {
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

ExpensesOwedController.$inject = ['ExpensesService', 'UserService'];

const ExpensesOwedComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: ExpensesOwedController
};


export default ExpensesOwedComponent;
