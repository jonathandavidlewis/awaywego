import angular from 'angular';

// imports for this component
import template from './expenses-summary-bar.html';
import './expenses-summary-bar.css';

class ExpensesSummaryBarController {
  constructor(ExpensesService) {
    this.ExpensesService = ExpensesService;
  }
}

ExpensesSummaryBarController.$inject = ['ExpensesService'];

const ExpensesSummaryBarComponent = {
  restrict: 'E',
  bindings: {
    summary: '<'
  },
  template: template,
  controller: ExpensesSummaryBarController
};


export default ExpensesSummaryBarComponent;
