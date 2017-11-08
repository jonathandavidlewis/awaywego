import angular from 'angular';

// imports for this component
import template from './transaction-card.html';
import './transaction-card.css';

class TransactionCardController {
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
      `Are you sure you want to delete transaction:
      From: ${this.transaction.from.name} To: ${this.transaction.to.name}
      Amount: ${this.transaction.amount}`,
      'This action cannot be undone', 'Yes'
    ).then(() => {
      this.busy = true;
      this.ExpensesService.removeTransaction(this.transaction._id)
        .finally(() => this.busy = false);
    }).catch(() => {});
  }

  menuShouldAppear() {
    return this.ExpensesService.findExpenseById(this.transaction.expenseId)._id === this.userId ||
           this.groupOwner === this.userId;
  }
}

TransactionCardController.$inject = ['ExpensesService', 'UserService', 'GroupService', 'ConfirmService'];

const TransactionCardComponent = {
  restrict: 'E',
  bindings: {
    transaction: '<',
    settleTransaction: '<'
  },
  template: template,
  controller: TransactionCardController
};


export default TransactionCardComponent;
