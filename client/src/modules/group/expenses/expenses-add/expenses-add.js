import angular from 'angular';

// imports for this component
import template from './expenses-add.html';
import './expenses-add.css';

class ExpensesAddController {
  constructor(GroupService, ExpensesService, $state, $stateParams, UserService) {
    this.state = $state;
    this.stateParams = $stateParams;
    // Brings in GroupService to get current group's members
    this.GroupService = GroupService;
    this.members = GroupService.currentGroup.members;

    // Brings in Expenses service to make POST API calls.
    this.ExpensesService = ExpensesService;

    // Bring in User Service to check self
    this.UserService = UserService;
    this.UserService.user._id = this.UserService.user.id;

    // Form Input
    this.amount = '';
    this.description = '';

    // This is recalculated every time there is a change to amount, owers, or payers
    this.transactions = [];

    // Object for storing selected payers
    this.payers = {};

    // Object for storing selected owers
    this.checkedMembers = {};

    // Toggle for displaying add people screen
    this.owerToggle = false;

    // This allows us to reuse expenses-add-people for both adding payers and owers
    this.payerToggle = false;

    // Currently defaults to equal. TODO: Make transactions able to have custom input.
    this.transactionType = 'equal';

    this.toggleCards = this.toggleCards.bind(this);
    this.toggleOwer = this.toggleOwer.bind(this);
    this.togglePayer = this.togglePayer.bind(this);
    this.createEqualTransactions = this.createEqualTransactions.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.toggleTransactionType = this.toggleTransactionType.bind(this);

    this.busy = false;
  }

  toggleTransactionType(type) {
    this.transactionType = type;
  }

  toggleCards(payerToggle) {
    if (payerToggle) {
      this.payerToggle = !this.payerToggle;
    } else {
      this.owerToggle = !this.owerToggle;
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

  toggleOwer(member) {
    let checked = this.checkedMembers;
    if (checked[member.name]) {
      delete checked[member.name];
    } else {
      checked[member.name] = member;
    }

    this.updateTransactions();
  }

  togglePayer(member) {
    let checked = this.payers;
    if (checked[member.name]) {
      delete checked[member.name];
    } else {
      checked[member.name] = member;
    }

    this.updateTransactions();
  }


  createEqualTransactions() {
    let numberOfPeople = Object.keys(this.checkedMembers).length;
    let numberOfPayers = Object.keys(this.payers).length;
    let portion = this.roundMoney(this.amount / numberOfPayers / (numberOfPeople));
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
    if (!this.validateForm()) {
      return;
    }
    this.busy = true;
    let expense = {
      groupId: this.stateParams.groupId,
      description: this.description,
      amount: this.amount,
      transactions: this.transactions
    };
    this.ExpensesService.newExpense(expense).then(() => {
      this.state.go('app.group.expenses.main.feed');
    }).catch(err => {
      console.log('Server error, please try again or contact a server admin');
    }).finally(() => this.busy = false);
  }

  roundMoney(value) {
    return Number(Math.round(value + 'e+2') + 'e-2');
  }

  validateForm() {
    if (!this.amount || !this.description) {
      this.formWarning = 'Please enter an expense description and amount';
      return false;
    } else if (Object.keys(this.payers).length === 0) {
      this.formWarning = 'Please add a payer';
      return false;
    } else if (Object.keys(this.checkedMembers).length === 0) {
      this.formWarning = 'Please add an ower';
      return false;
    } else {
      return true;
    }
  }
}

ExpensesAddController.$inject = ['GroupService', 'ExpensesService', '$state', '$stateParams', 'UserService'];

const ExpensesAddComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: ExpensesAddController
};

export default ExpensesAddComponent;
