import angular from 'angular';

// imports for this component
import template from './expenses-add.html';
import './expenses-add.css';

class ExpensesAddController {
  constructor(PlanService, ExpensesService, $state, $stateParams) {
    this.state = $state;
    this.stateParams = $stateParams;
    // Brings in PlanService to get current plan's members
    this.PlanService = PlanService;
    this.members = PlanService.currentPlan.members;

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
    let portion = this.amount / numberOfPayers / (numberOfPeople + numberOfPayers);
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
      planId: this.stateParams.planId,
      description: this.description,
      transactions: this.transactions
    };
    this.ExpensesService.newExpense(expense).then(() => {
      this.state.go('app.plan.expenses.main');
    }).catch(err => {
      console.log('Server error: ', err);
    });
  }

}

ExpensesAddController.$inject = ['PlanService', 'ExpensesService', '$state', '$stateParams'];

const ExpensesAddComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: ExpensesAddController
};

export default ExpensesAddComponent;
