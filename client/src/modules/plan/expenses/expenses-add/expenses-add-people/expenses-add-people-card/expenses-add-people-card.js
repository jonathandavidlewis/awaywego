import angular from 'angular';

// imports for this component
import template from './expenses-add-people-card.html';
import './expenses-add-people-card.css';

class ExpensesAddPeopleCardController {
  constructor() {
    this.selected = false;
    this.portion = 0;
  }

  clickPerson() {
    this.selected = !this.selected;
    console.log('selected');
    console.log(this.member);
    this.toggle(this.member);
    console.log('Post toggle', this.selectedMembers);
    this.calculatePortion();
  }

  calculatePortion() {
    console.log(this.selectedMembers, this.selectedMembers.length);
    if (this.share === 'equal') {
      this.portion = this.amount / this.selectedMembers.length;
    }
  }


}

ExpensesAddPeopleCardController.$inject = [];

const ExpensesAddPeopleCardComponent = {
  restrict: 'E',
  bindings: {
    member: '<',
    toggle: '<',
    amount: '<',
    share: '<',
    selectedMembers: '<'
  },
  template: template,
  controller: ExpensesAddPeopleCardController
};

export default ExpensesAddPeopleCardComponent;
