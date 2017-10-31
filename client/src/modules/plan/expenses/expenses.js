import angular from 'angular';

// import services
import PlanService from '../../../services/plan/plan.service';
import ExpensesService from '../../../services/expenses/expenses-service';

// import child Modules
import ExpensesMainComponent from './expenses-main/expenses-main';
import ExpensesAddComponent from './expenses-add/expenses-add';
import ExpensesAddPeopleComponent from './expenses-add/expenses-add-people/expenses-add-people';
import ExpensesAddPeopleCardComponent from './expenses-add/expenses-add-people/expenses-add-people-card/expenses-add-people-card';
import ExpensesSummaryBarComponent from './expenses-main/expenses-summary-bar/expenses-summary-bar';
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
  .component('expensesMain', ExpensesMainComponent)
  .component('expensesAdd', ExpensesAddComponent)
  .component('expensesAddPeople', ExpensesAddPeopleComponent)
  .component('expensesAddPeopleCard', ExpensesAddPeopleCardComponent)
  .component('expensesSummaryBar', ExpensesSummaryBarComponent)
  .service('PlanService', PlanService)
  .service('ExpensesService', ExpensesService);
export default ExpensesModule.name;
