import angular from 'angular';

// imports for this component
import template from './expenses-summary.html';
import './expenses-summary.css';

class ExpensesSummaryController {
  constructor(ExpensesService, UserService) {
    this.ExpensesService = ExpensesService;
    this.UserService = UserService;
  }
}

ExpensesSummaryController.$inject = ['ExpensesService', 'UserService'];

const ExpensesSummaryComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: ExpensesSummaryController
};


export default ExpensesSummaryComponent;
