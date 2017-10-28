import angular from 'angular';

// imports for this component
import template from './expenses-add.html';
import './expenses-add.css';

class ExpensesAddController {
  constructor() {
    this.expenses = {
      description: '',
      amount: '',
      transactions: [],
      completed: []
    };
    this.addPeople = false;

    this.toggleAddPeople = this.toggleAddPeople.bind(this);
  }

  toggleAddPeople() {
    this.addPeople = !this.addPeople;
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
