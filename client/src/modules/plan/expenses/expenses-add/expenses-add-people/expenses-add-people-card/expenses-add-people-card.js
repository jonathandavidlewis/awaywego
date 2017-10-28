import angular from 'angular';

// imports for this component
import template from './expenses-add-people-card.html';
import './expenses-add-people-card.css';

class ExpensesAddPeopleCardController {
  constructor() {
    this.selected = false;
  }

  clickPerson() {
    this.selected = !this.selected;
    console.log('selected');
  }
}

ExpensesAddPeopleCardController.$inject = [];

const ExpensesAddPeopleCardComponent = {
  restrict: 'E',
  bindings: {
    member: '<'
  },
  template: template,
  controller: ExpensesAddPeopleCardController
};

export default ExpensesAddPeopleCardComponent;
