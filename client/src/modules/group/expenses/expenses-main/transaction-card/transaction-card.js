import angular from 'angular';

// imports for this component
import template from './transaction-card.html';
import './transaction-card.css';

class TransactionCardController {
  constructor(UserService) {
    this.user = UserService.user.id;
  }
}

TransactionCardController.$inject = ['UserService'];

const TransactionCardComponent = {
  restrict: 'E',
  bindings: {
    transaction: '<',
    settleTransaction: '<',
    removeTransaction: '<'
  },
  template: template,
  controller: TransactionCardController
};


export default TransactionCardComponent;
