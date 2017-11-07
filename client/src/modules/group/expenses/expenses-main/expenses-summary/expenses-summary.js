import angular from 'angular';

// imports for this component
import template from './expenses-summary.html';
import './expenses-summary.css';

class ExpensesSummaryController {
  constructor(ExpensesService, UserService) {
    this.ExpensesService = ExpensesService;
    this.UserService = UserService;
    this.owe = 'owes';

    this.isCurrentUser = this.isCurrentUser.bind(this);
  }

  isCurrentUser(user, from) {
    if (user._id === this.UserService.user.id) {
      if (from) {
        this.owe = 'owe';
      }
      return 'You';
    } else {
      return user.name;
    }
  }

}

ExpensesSummaryController.$inject = ['ExpensesService', 'UserService'];

const ExpensesSummaryComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: ExpensesSummaryController
};


export default ExpensesSummaryComponent;
