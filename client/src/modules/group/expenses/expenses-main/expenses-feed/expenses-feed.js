import angular from 'angular';

// imports for this component
import template from './expenses-feed.html';
import './expenses-feed.css';

class ExpensesFeedController {
  constructor(ExpensesService) {
    this.ExpensesService = ExpensesService;
  }
}

ExpensesFeedController.$inject = ['ExpensesService'];

const ExpensesFeedComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: ExpensesFeedController
};


export default ExpensesFeedComponent;
