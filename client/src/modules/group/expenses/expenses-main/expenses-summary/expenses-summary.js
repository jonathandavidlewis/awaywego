import angular from 'angular';

// imports for this component
import template from './expenses-summary.html';
import './expenses-summary.css';

class ExpensesSummaryController {
  constructor(ExpensesService) {
    this.ExpensesService = ExpensesService;
  }
}

ExpensesSummaryController.$inject = ['ExpensesService'];

const ExpensesSummaryComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: ExpensesSummaryController
};


export default ExpensesSummaryComponent;
