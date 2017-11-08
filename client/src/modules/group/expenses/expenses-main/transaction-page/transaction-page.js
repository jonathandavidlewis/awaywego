import angular from 'angular';

// imports for this component
import template from './transaction-page.html';
import './transaction-page.css';

class TransactionPageController {
  constructor(ExpensesService) {
    this.ExpensesService = ExpensesService;
    this.header = '';
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
