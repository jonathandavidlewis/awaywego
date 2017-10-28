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
    console.log(this.member);
    this.toggle(this.member);
  }
}

ExpensesAddPeopleCardController.$inject = [];

const ExpensesAddPeopleCardComponent = {
  restrict: 'E',
  bindings: {
    member: '<',
    toggle: '<',
    amount: '<'
  },
  template: template,
  controller: ExpensesAddPeopleCardController
};

export default ExpensesAddPeopleCardComponent;
