import angular from 'angular';

// imports for this component
import template from './expenses-add-people-card.html';
import './expenses-add-people-card.css';

class ExpensesAddPeopleCardController {
  constructor(UserService) {
    this.UserService = UserService;
    this.checked = false;

    this.clickPerson = this.clickPerson.bind(this);
  }

  $onInit() {
    if (this.member._id === this.UserService.user.id || this.isPayer) {
      this.checked = !this.checked;
      if (this.toggle) {
        this.toggle(this.member);
      }
    }
  }

  clickPerson() {
    if (this.isPayer) {
      return;
    }
    this.checked = !this.checked;
    this.toggle(this.member);
  }


}

ExpensesAddPeopleCardController.$inject = ['UserService'];

const ExpensesAddPeopleCardComponent = {
  restrict: 'E',
  bindings: {
    member: '<',
    toggle: '<',
    amount: '<',
    selectedMembers: '<',
    isPayer: '<',
    transactionType: '<'
  },
  template: template,
  controller: ExpensesAddPeopleCardController
};

export default ExpensesAddPeopleCardComponent;
