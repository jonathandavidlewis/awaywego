import angular from 'angular';

// imports for this component
import template from './expenses-feed-card.html';
import './expenses-feed-card.css';

class ExpensesFeedCardController {
  constructor() {

  }
}
ExpensesFeedCardController.$inject = [];

const ExpensesFeedCardComponent = {
  restrict: 'E',
  bindings: {
    expense: '<',
    removeExpense: '<'
  },
  template: template,
  controller: ExpensesFeedCardController
};


export default ExpensesFeedCardComponent;
