import angular from 'angular';

// imports for this component
import template from './expenses-summary-bar.html';
import './expenses-summary-bar.css';

class ExpensesSummaryBarController {
  constructor(ExpensesService) {
    this.ExpensesService = ExpensesService;
    this.owed = '';
    this.debt = '';
    this.balance = '';

  }

  $onInit() {
    let debts = this.ExpensesService.calculateDebts();
    this.owed = debts.owed;
    this.debt = debts.debt;
    this.balance = debts.balance;
  }


}
ExpensesSummaryBarController.$inject = ['ExpensesService'];

const ExpensesSummaryBarComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: ExpensesSummaryBarController
};


export default ExpensesSummaryBarComponent;
