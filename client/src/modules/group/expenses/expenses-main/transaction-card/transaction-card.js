import angular from 'angular';

// imports for this component
import template from './transaction-card.html';
import './transaction-card.css';

class TransactionCardController {
  constructor() {
  }
}

TransactionCardController.$inject = [];

const TransactionCardComponent = {
  restrict: 'E',
  bindings: {
    transaction: '<',
    settleTransaction: '<',
    removeTransaction: '<',
    user: '<'
  },
  template: template,
  controller: TransactionCardController
};


export default TransactionCardComponent;
