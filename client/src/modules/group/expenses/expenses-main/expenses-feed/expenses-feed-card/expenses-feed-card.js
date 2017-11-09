import angular from 'angular';

// imports for this component
import template from './expenses-feed-card.html';
import './expenses-feed-card.css';

class ExpensesFeedCardController {
  constructor(ExpensesService, UserService, GroupService, ConfirmService) {
    this.ExpensesService = ExpensesService;
    this.userId = UserService.user.id;
    this.groupOwner = GroupService.currentGroup.userId;
    this.ConfirmService = ConfirmService;
    this.details = false;


    this.handleDelete = this.handleDelete.bind(this);
    this.menuShouldAppear = this.menuShouldAppear.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
  }
  handleDelete() {
    this.ConfirmService.openModal(
      `Are you sure you want to delete expense:
      ${this.expense.description}?`,
      'This action cannot be undone', 'Yes'
    ).then(() => {
      this.busy = true;
      this.ExpensesService.removeExpense(this.expense._id)
        .finally(() => this.busy = false);
    }).catch(() => {});
  }

  menuShouldAppear() {
    return this.expense.userId === this.userId ||
           this.groupOwner === this.userId;
  }

  toggleDetails() {
    this.details = !this.details;
  }

  populatePaidBy() {
    let paid = {};
    this.expense.transactions.forEach((transaction) => {
      if (!paid[transaction.to.name]) {
        paid[transaction.to.name] = true;
      }
    });
    return Object.keys(paid).join(', ').toString();
  }

  populateSplitAmong() {
    let among = {};
    this.expense.transactions.forEach((transaction) => {
      if (!among[transaction.from.name]) {
        among[transaction.from.name] = true;
      }
    });
    return Object.keys(among).join(', ').toString();
  }

}
ExpensesFeedCardController.$inject = ['ExpensesService', 'UserService', 'GroupService', 'ConfirmService'];

const ExpensesFeedCardComponent = {
  restrict: 'E',
  bindings: {
    expense: '<'
  },
  template: template,
  controller: ExpensesFeedCardController
};


export default ExpensesFeedCardComponent;
