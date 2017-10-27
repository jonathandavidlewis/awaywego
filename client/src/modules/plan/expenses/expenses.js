import angular from 'angular';

// import child Modules
import ExpensesMainComponent from './expenses-main/expenses-main.js';
// imports for this component
import template from './expenses.html';
import './expenses.css';

class ExpensesController {
  constructor() {
  }
}
ExpensesController.$inject = [];

const ExpensesComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: ExpensesController
};

const ExpensesModule = angular.module('app.plan.expenses', [])
  .component('expenses', ExpensesComponent)
  .component('expensesMain', ExpensesMainComponent);




export default ExpensesModule.name;
