import angular from 'angular';

// imports for this component
import template from './expenses-main.html';
import './expenses-main.css';

class ExpensesMainController {
  constructor(ExpensesService) {
    this.ExpensesService = ExpensesService;
  }

  $onInit() {
    this.ExpensesService.getExpenses();
  }
}

ExpensesMainController.$inject = ['ExpensesService'];

const ExpensesMainComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: ExpensesMainController
};

export default ExpensesMainComponent;
