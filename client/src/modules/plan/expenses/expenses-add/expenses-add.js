import angular from 'angular';

// imports for this component
import template from './expenses-add.html';
import './expenses-add.css';

class ExpensesAddController {
  constructor(PlanService) {
    this.PlanService = PlanService;
    this.members = PlanService.currentPlan.members;
    this.checkedMembers = {};
    this.displayCheckedMembers = [];
    this.amount = '';

    this.showAddPeople = false;

    this.toggleMember = this.toggleMember.bind(this);
    this.renderCheckedMembers = this.renderCheckedMembers.bind(this);
    this.toggleShowAddPeople = this.toggleShowAddPeople.bind(this);
  }

  toggleShowAddPeople() {
    this.showAddPeople = !this.showAddPeople;
  }

  createTransaction(from, to, amount) {
    let transaction = {
      from: from,
      to: to,
      amount: amount
    };

    return transaction;
  }

  toggleMember(member) {
    if (this.checkedMembers[member.name]) {
      delete this.checkedMembers[member.name];
    } else {
      this.checkedMembers[member.name] = member;
    }
    console.log('toggled', this.checkedMembers);
    this.renderCheckedMembers();
  }

  renderCheckedMembers() {
    this.displayCheckedMembers = Object.keys(this.checkedMembers);
    console.log(this.displayCheckedMembers);
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
