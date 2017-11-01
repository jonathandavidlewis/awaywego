import angular from 'angular';

// imports for this component
import template from './expenses-main.html';
import './expenses-main.css';

class ExpensesMainController {
  constructor(ExpensesService, $stateParams) {
    this.ExpensesService = ExpensesService;
    this.stateParams = $stateParams;
    this.expenses = [];
    this.summary = '';

  }

  $onInit() {
    console.log('init triggered', this.expenses);
    console.log('planId: ', this.stateParams.planId);
    this.ExpensesService.getExpenses(this.stateParams.planId).then(() => {
      this.expenses = this.ExpensesService.returnExpenses();
      this.summary = this.ExpensesService.calculateDebts();
    });
    console.log('after init triggered', this.expenses);
  }


}
ExpensesMainController.$inject = ['ExpensesService', '$stateParams'];

const ExpensesMainComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: ExpensesMainController
};

export default ExpensesMainComponent;
