import angular from 'angular';

// imports for this component
import template from './expenses-add.html';
import './expenses-add.css';

class ExpensesAddController {
  constructor(GroupService, ExpensesService, $state, $stateParams) {
    this.state = $state;
    this.stateParams = $stateParams;
    // Brings in GroupService to get current group's members
    this.GroupService = GroupService;
    this.members = GroupService.currentGroup.members;

    // Brings in Expenses service to make POST API calls.
    this.ExpensesService = ExpensesService;


    // Total bill amount
    this.amount = '';


    this.description = '';

    // This is recalculated every time there is a change to amount, owers, or payers
    this.transactions = [];

    // Object for storing selected payers
    this.payers = {};

    // Object for storing selected owers
    this.checkedMembers = {};

    // Toggle for displaying add people screen
    this.showAddPeople = false;

    // This allows us to reuse expenses-add-people for both adding payers and owers
    this.payerToggle = false;

    // Currently defaults to equal. TODO: Make transactions able to have custom input.
    this.transactionType = 'equal';

    this.toggleShowAddPeople = this.toggleShowAddPeople.bind(this);
    this.toggleMember = this.toggleMember.bind(this);
    this.createEqualTransactions = this.createEqualTransactions.bind(this);
    this.addExpense = this.addExpense.bind(this);
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

    // If payer toggle is true, work with this.payers instead
    if (this.payerToggle) {
      checked = this.payers;
    }
    if (checked[member.name]) {
      delete checked[member.name];
    } else {
      checked[member.name] = member;
    }

    if (this.transactionType === 'equal') {
      this.createEqualTransactions();
    }
  }

  createEqualTransactions() {
    let numberOfPeople = Object.keys(this.checkedMembers).length;
    let numberOfPayers = Object.keys(this.payers).length;
    let portion = this.roundMoney(this.amount / numberOfPayers / (numberOfPeople + numberOfPayers));
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

  addExpense() {
    if (Object.keys(this.payers).length === 0 || Object.keys(this.checkedMembers).length === 0) {
      console.log('Payers or owers is empty, cannot submit');
      return;
    }
    let expense = {
      groupId: this.stateParams.groupId,
      description: this.description,
      amount: this.amount,
      transactions: this.transactions
    };
    this.ExpensesService.newExpense(expense).then(() => {
      this.state.go('app.group.expenses.main.feed');
    }).catch(err => {
      console.log('Server error: ', err);
    });
  }

  roundMoney(value) {
    return Number(Math.round(value + 'e+2') + 'e-2');
  }

}

ExpensesAddController.$inject = ['GroupService', 'ExpensesService', '$state', '$stateParams'];

const ExpensesAddComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: ExpensesAddController
};

export default ExpensesAddComponent;
