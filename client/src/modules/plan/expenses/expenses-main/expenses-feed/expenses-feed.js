import angular from 'angular';

// imports for this component
import template from './expenses-feed.html';
import './expenses-feed.css';

class ExpensesFeedController {
  constructor() {

  }
}
ExpensesFeedController.$inject = [];

const ExpensesFeedComponent = {
  restrict: 'E',
  bindings: {
    expenses: '<',
    removeExpense: '<'
  },
  template: template,
  controller: ExpensesFeedController
};


export default ExpensesFeedComponent;
