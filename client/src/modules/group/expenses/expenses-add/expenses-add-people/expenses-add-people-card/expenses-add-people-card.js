import angular from 'angular';

// imports for this component
import template from './expenses-add-people-card.html';
import './expenses-add-people-card.css';

class ExpensesAddPeopleCardController {
  constructor() {
    this.checked = false;
  }

  clickPerson() {
    this.checked = !this.checked;
    console.log('card', this.member);
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
