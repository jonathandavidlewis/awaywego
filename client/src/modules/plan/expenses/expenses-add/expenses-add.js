import angular from 'angular';

// imports for this component
import template from './expenses-add.html';
import './expenses-add.css';

class ExpensesAddController {
  constructor(PlanService) {
    this.PlanService = PlanService;
    this.members = PlanService.currentPlan.members;
    this.checkedMembers = {};
    this.transactions = [];
    this.amount = '';
    this.payerToggle = false;
    this.payers = {};

    this.showAddPeople = false;
    this.transactionType = 'equal';

    this.toggleShowAddPeople = this.toggleShowAddPeople.bind(this);
    this.toggleMember = this.toggleMember.bind(this);
    this.createEqualTransactions = this.createEqualTransactions.bind(this);
  }

  toggleShowAddPeople(payerToggle) {
    this.showAddPeople = !this.showAddPeople;
    if (payerToggle) {
      this.payerToggle = true;
    } else {
      this.payerToggle = false;
    }

  }

  updateTransactions() {
    if (this.transactionType === 'equal') {
      this.createEqualTransactions();
    }
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
    let checked = this.checkedMembers;
    if (this.payerToggle) {
      checked = this.payers;
    }
    if (checked[member.name]) {
      delete checked[member.name];
    } else {
      checked[member.name] = member;
    }
    console.log('toggled', this.checkedMembers);

    if (this.transactionType === 'equal') {
      this.createEqualTransactions();
    }
  }

  createEqualTransactions() {
    console.log('These people paid: ', this.payers, this.payerToggle);
    let numberOfPeople = Object.keys(this.checkedMembers).length;
    let numberOfPayers = Object.keys(this.payers).length;
    let portion = this.amount / numberOfPayers / (numberOfPeople + numberOfPayers);
    console.log('number of people: ', numberOfPeople, numberOfPayers);
    console.log('Equal transactions run', portion);
    let transactions = [];
    for (let member in this.checkedMembers) {
      for (let payer in this.payers) {
        if (this.checkedMembers[member]._id !== this.payers[payer]._id) {
          transactions.push(this.createTransaction(this.checkedMembers[member], this.payers[payer], portion));
        }
      }
    }
    this.transactions = transactions;
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
