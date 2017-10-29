import angular from 'angular';

// imports for this component
import template from './expenses-add-people.html';
import './expenses-add-people.css';

class ExpensesAddPeopleController {
  constructor() {
    this.share = 'equal';

  }

  // TODO: Remove this later if not needed
  // setShare(type) {
  //   if (type === 'equal') {
  //     this.share = 'equal';
  //   } else if (type === 'percentage') {
  //     this.share = 'percentage';
  //   }
  // }

}

ExpensesAddPeopleController.$inject = [];

const ExpensesAddPeopleComponent = {
  restrict: 'E',
  bindings: {
    toggleMember: '<',
    members: '<',
    amount: '<',
    selectedMembers: '<'
  },
  template: template,
  controller: ExpensesAddPeopleController,
  require: {
    expensesAddCtrl: '^expensesAdd'
  }
};

export default ExpensesAddPeopleComponent;
