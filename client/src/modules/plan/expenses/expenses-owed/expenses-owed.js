import angular from 'angular';

// imports for this component
import template from './expenses-owed.html';
import './expenses-owed.css';

class ExpensesOwedController {
  constructor(ExpensesService) {
    this.ExpensesService = ExpensesService;
  }
}

ExpensesOwedController.$inject = ['ExpensesService'];

const ExpensesOwedComponent = {
  restrict: 'E',
  bindings: {
    summary: '<'
  },
  template: template,
  controller: ExpensesOwedController
};


export default ExpensesOwedComponent;
