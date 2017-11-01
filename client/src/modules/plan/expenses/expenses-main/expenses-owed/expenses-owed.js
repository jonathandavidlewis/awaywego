import angular from 'angular';

// imports for this component
import template from './expenses-owed.html';
import './expenses-owed.css';

class ExpensesOwedController {
  constructor(ExpensesService) {
    this.ExpensesService = ExpensesService;
    this.transactions = '';
  }

  $onInit() {
    this.transactions = this.ExpensesService.filterUserTransactions();
    console.log('Expenses OWED', this.transactions);
  }
}

ExpensesOwedController.$inject = ['ExpensesService'];

const ExpensesOwedComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: ExpensesOwedController
};


export default ExpensesOwedComponent;
