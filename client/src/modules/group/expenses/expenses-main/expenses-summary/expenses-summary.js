import angular from 'angular';

// imports for this component
import template from './expenses-summary.html';
import './expenses-summary.css';

class ExpensesSummaryController {
  constructor(ExpensesService, UserService, $stateParams, ConfirmService) {
    this.ExpensesService = ExpensesService;
    this.UserService = UserService;
    this.userId = this.UserService.user.id;
    this.stateParams = $stateParams;
    this.ConfirmService = ConfirmService;

    this.settle = this.settle.bind(this);
    this.handleSettle = this.handleSettle.bind(this);
    this.menuShouldAppear = this.menuShouldAppear.bind(this);
  }

  settle(transaction) {
    let expense = {
      groupId: this.stateParams.groupId,
      description: `${transaction.from.name} paid ${transaction.to.name}`,
      amount: transaction.amount,
      transactions: [{from: transaction.to, to: transaction.from, amount: transaction.amount}]
    };

    console.log('settle', expense);
    return this.ExpensesService.newExpense(expense).then(() => {
      console.log('Settled');
    }).catch(err => {
      console.log('There was an error processing your request, please contact the server admin', err);
    });
  }

  handleSettle(transaction) {
    this.ConfirmService.openModal(
      `Confirm that ${transaction.from.name} paid you
      $${this.ExpensesService.roundMoney(transaction.amount)}`,
      'This action cannot be undone', 'Yes'
    ).then(() => {
      this.busy = true;
      this.settle(transaction)
        .finally(() => this.busy = false);
    }).catch(() => {});
  }

  menuShouldAppear(transaction) {
    return transaction.to._id === this.userId;
  }
}

ExpensesSummaryController.$inject = ['ExpensesService', 'UserService', '$stateParams', 'ConfirmService'];

const ExpensesSummaryComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: ExpensesSummaryController
};


export default ExpensesSummaryComponent;
