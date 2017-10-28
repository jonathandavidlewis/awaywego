import angular from 'angular';

// imports for this component
import template from './expenses-add.html';
import './expenses-add.css';

class ExpensesAddController {
  constructor() {
    this.expenses = {
      description: '',
      amount: '',
      transactions: []
    };
    this.showAddPeople = false;

    this.toggleShowAddPeople = this.toggleShowAddPeople.bind(this);
  }

  toggleShowAddPeople() {
    this.showAddPeople = !this.showAddPeople;
  }








}
ExpensesAddController.$inject = ['PlanService'];

const ExpensesAddComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: ExpensesAddController
};

export default ExpensesAddComponent;
