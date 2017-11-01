import angular from 'angular';

// import services
import GroupService from '../../../services/group/group.service';
import ExpensesService from '../../../services/expenses/expenses-service';

// import child Modules
import ExpensesMainComponent from './expenses-main/expenses-main';
import TransactionPageComponent from './expenses-main/transaction-page/transaction-page';
import TransactionCardComponent from './expenses-main/transaction-card/transaction-card';
import ExpensesAddComponent from './expenses-add/expenses-add';
import ExpensesAddPeopleComponent from './expenses-add/expenses-add-people/expenses-add-people';
import ExpensesAddPeopleCardComponent from './expenses-add/expenses-add-people/expenses-add-people-card/expenses-add-people-card';
import ExpensesSummaryBarComponent from './expenses-main/expenses-summary-bar/expenses-summary-bar';
import ExpensesFeedComponent from './expenses-main/expenses-feed/expenses-feed';
import ExpensesFeedCardComponent from './expenses-main/expenses-feed/expenses-feed-card/expenses-feed-card';

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

const ExpensesModule = angular.module('app.group.expenses', [])
  .component('expenses', ExpensesComponent)
  .component('expensesMain', ExpensesMainComponent)
  .component('transactionPage', TransactionPageComponent)
  .component('transactionCard', TransactionCardComponent)
  .component('expensesAdd', ExpensesAddComponent)
  .component('expensesAddPeople', ExpensesAddPeopleComponent)
  .component('expensesAddPeopleCard', ExpensesAddPeopleCardComponent)
  .component('expensesSummaryBar', ExpensesSummaryBarComponent)
  .component('expensesFeed', ExpensesFeedComponent)
  .component('expensesFeedCard', ExpensesFeedCardComponent)
  .service('GroupService', GroupService)
  .service('ExpensesService', ExpensesService);
export default ExpensesModule.name;
