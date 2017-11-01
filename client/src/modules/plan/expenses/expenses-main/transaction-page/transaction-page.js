import angular from 'angular';

// imports for this component
import template from './transaction-page.html';
import './transaction-page.css';

class TransactionPageController {
  constructor(ExpensesService, UserService, $filter, $stateParams) {
    this.ExpensesService = ExpensesService;
    this.filter = $filter;
    this.stateParams = $stateParams;
    this.UserService = UserService;
    this.userId = this.UserService.user.id;

    this.filterByState = this.filterByState.bind(this);
    this.filterByOwed = this.filterByOwed.bind(this);
    this.filterByOwedTo = this.filterByOwedTo.bind(this);
  }

  $onInit() {
    this.filteredTransactions = this.filter('filter')(this.transactions, (transaction) => {
      if (this.stateParams.filterState) {
        return this.filterByState(transaction);
      }
    });
  }

  filterByState(transaction) {
    if (this.stateParams.filterState === 'balance') {
      return true;
    } else if (this.stateParams.filterState === 'owed') {
      return this.filterByOwed(transaction);
    } else if (this.stateParams.filterState === 'owedTo') {
      return this.filterByOwedTo(transaction);
    }
  }

  filterByOwed(transaction) {
    if (transaction.to._id === this.userId) {
      return true;
    } else {
      return false;
    }
  }

  filterByOwedTo(transaction) {
    if (transaction.from._id === this.userId) {
      return true;
    } else {
      return false;
    }
  }




}

TransactionPageController.$inject = ['ExpensesService', 'UserService', '$filter', '$stateParams'];

const TransactionPageComponent = {
  restrict: 'E',
  bindings: {
    transactions: '<',
  },
  template: template,
  controller: TransactionPageController
};


export default TransactionPageComponent;
