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
    this.payers = ['Dom'];

    this.showAddPeople = false;
    this.transactionType = 'equal';

    this.toggleShowAddPeople = this.toggleShowAddPeople.bind(this);
    this.toggleMember = this.toggleMember.bind(this);
    this.createEqualTransactions = this.createEqualTransactions.bind(this);
    this.updateCheckedMembers = this.updateCheckedMembers.bind(this);
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

    if (this.transactionType === 'equal') {
      this.createEqualTransactions();
    }
    console.log('toggled', this.checkedMembers);
  }

  createEqualTransactions() {
    let numberOfPeople = Object.keys(this.checkedMembers).length;
    console.log('number of people: ', numberOfPeople);
    let portion = this.amount / numberOfPeople;
    console.log('Equal transactions run', portion);
    let transactions = [];
    for (let member in this.checkedMembers) {
      for (let payer in this.payers) {
        transactions.push(this.createTransaction(this.checkedMembers[member], this.payers[payer], portion / this.payers.length));
      }
    }
    this.displayCheckedMembers = transactions;
  }

  updateCheckedMembers() {
    console.log('render checked members', this.displayCheckedMembers);

  }

  calculatePortion() {
    console.log(this.selectedMembers, this.selectedMembers.length);
    if (this.share === 'equal') {
      this.portion = this.amount / this.selectedMembers.length;
    }
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
