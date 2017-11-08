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


    this.handleDelete = this.handleDelete.bind(this);
    this.menuShouldAppear = this.menuShouldAppear.bind(this);
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
