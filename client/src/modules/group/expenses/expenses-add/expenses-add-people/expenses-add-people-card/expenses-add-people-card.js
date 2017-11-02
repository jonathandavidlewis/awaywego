import angular from 'angular';

// imports for this component
import template from './expenses-add-people-card.html';
import './expenses-add-people-card.css';

class ExpensesAddPeopleCardController {
  constructor() {
  }

  clickPerson() {
    this.selected = !this.selected;
    this.toggle(this.member);
  }
}

ExpensesAddPeopleCardController.$inject = [];

const ExpensesAddPeopleCardComponent = {
  restrict: 'E',
  bindings: {
    member: '<',
    toggle: '<',
    amount: '<',
    selectedMembers: '<'
  },
  template: template,
  controller: ExpensesAddPeopleCardController
};

export default ExpensesAddPeopleCardComponent;
