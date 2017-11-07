export default class ExpensesService {
  constructor($http, UserService, $stateParams) {
    this.$inject = ['$http', 'UserService', '$stateParams'];
    this.http = $http;
    this.stateParams = $stateParams;
    this.UserService = UserService;

    // Expenses Overview
    this.expenses = [];

    // Summary Bar
    this.summary = {};

    // Transaction Page
    this.transactions = [];
    this.filterBy = 'All';

    // Expenses Summary
    this.consolidatedDebts = '';
    this.consolidatedSummary = '';

    // Bindings
    this.calculateDebts = this.calculateDebts.bind(this);
    this.getExpenses = this.getExpenses.bind(this);
    this.roundMoney = this.roundMoney.bind(this);
    this.filterTransactions = this.filterTransactions.bind(this);
    this.removeExpense = this.removeExpense.bind(this);
    this.removeTransaction = this.removeTransaction.bind(this);
    this.settleTransaction = this.settleTransaction.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.filterByOwed = this.filterByOwed.bind(this);
    this.filterByOwedTo = this.filterByOwedTo.bind(this);
    this.filterByExpenseId = this.filterByExpenseId.bind(this);
    this.consolidateDebts = this.consolidateDebts.bind(this);
    this.consolidateSummary = this.consolidateSummary.bind(this);
  }

  // Data Manipulation Methods

  filterTransactions() {
    let result = [];
    this.expenses.forEach((expense) => {
      expense.transactions.forEach((transaction) => {
        transaction.description = expense.description;
        result.push(transaction);
      });
    });
    return result;
  }


  calculateDebts() {
    let owed = 0;
    let debt = 0;
    this.expenses.forEach((expense) => {
      expense.transactions.forEach((transaction) => {
        if (transaction.status === 'open') {
          if (transaction.to._id === this.UserService.user.id) {
            owed += transaction.amount;
          } else if (transaction.from._id === this.UserService.user.id) {
            debt += transaction.amount;
          }
        }
      });
    });
    return {owed: this.roundMoney(owed), debt: this.roundMoney(debt), balance: this.roundMoney(owed - debt)};
  }


  consolidateDebts() {
    let owes = {};
    let isOwed = {};
    let consolidatedTransactions = [];

    // Iterate through all transactions and sum up what all people owe and are owed

    // Fill owes
    this.transactions.forEach((transaction) => {
      if (!owes[transaction.from._id]) {
        owes[transaction.from._id] = {from: transaction.from, amount: transaction.amount};
      } else {
        owes[transaction.from._id].amount += transaction.amount;
      }
      // Fill isOwed
      if (!isOwed[transaction.to._id]) {
        isOwed[transaction.to._id] = {to: transaction.to, amount: transaction.amount};
      } else {
        isOwed[transaction.to._id].amount += transaction.amount;
      }
    });

    // Iterate through owes Array, find corresponding key if possible in isOwed Array and cancel out transactions with same ID
    for (let id in owes) {
      if (isOwed[id] || isOwed[id] === 0) {
        // Check if one is bigger
        if (owes[id].amount > isOwed[id].amount) {
          owes[id].amount -= isOwed[id].amount;
          delete isOwed[id];
        } else if (owes[id].amount < isOwed[id].amount) {
          isOwed[id].amount -= owes[id].amount;
          delete owes[id];
        } else if (owes[id].amount === isOwed[id].amount) {
          delete owes[id];
          delete isOwed[id];
        }
      }
    }

    // TODO: May be useful to filter and pre make equal transactions first to simplify transactions

    // Iterate through both arrays and create transactions, simplifying and deleting as needed
    for (let fromId in owes) {
      for (let toId in isOwed) {
        if (!owes[fromId]) {
          break;
        }

        let transaction = {from: owes[fromId].from, to: isOwed[toId].to};
        if (owes[fromId].amount < isOwed[toId].amount) {
          transaction.amount = owes[fromId].amount;
          isOwed[toId].amount -= transaction.amount;
          delete owes[fromId];
        } else if (owes[fromId].amount > isOwed[toId].amount) {
          transaction.amount = isOwed[toId].amount;
          owes[fromId].amount -= transaction.amount;
          delete isOwed[toId];
        } else if (owes[fromId].amount === isOwed[toId].amount) {
          transaction.amount = isOwed[toId].amount;
          delete owes[fromId];
          delete isOwed[toId];
        }
        consolidatedTransactions.push(transaction);
      }
    }
    return consolidatedTransactions;
  }

  consolidateSummary() {
    let owe = 0;
    let receive = 0;
    this.consolidatedDebts.forEach((transaction) => {
      if (transaction.from._id === this.UserService.user.id) {
        owe += transaction.amount;
      }
      if (transaction.to._id === this.UserService.user.id) {
        receive += transaction.amount;
      }
    });
    return {owe: owe, receive: receive};
  }


  // Angular filtering Methods

  changeFilter(type) {
    this.filterBy = type;
  }

  filterByOwed(transaction) {
    if (transaction.to._id === this.UserService.user.id) {
      return true;
    } else {
      return false;
    }
  }

  filterByOwedTo(transaction) {
    if (transaction.from._id === this.UserService.user.id) {
      return true;
    } else {
      return false;
    }
  }

  filterByExpenseId(transaction) {
    if (transaction.expenseId === this.stateParams.expenseId) {
      return true;
    } else {
      return false;
    }
  }

  // API Methods

  newExpense(expense) {
    return this.http.post('/api/expenses', expense).then(() => {
      this.getExpenses();
    });
  }

  getExpenses() {
    return this.http.get(`/api/expenses/${this.stateParams.groupId}`).then((res) => {
      this.expenses = res.data;
      this.summary = this.calculateDebts();
      this.transactions = this.filterTransactions();
      this.consolidatedDebts = this.consolidateDebts();
      this.consolidatedSummary = this.consolidateSummary();
    });
  }

  addTransaction(expenseId, transaction) {
    return this.http.post(`/api/expenses/${expenseId}/add`, transaction).then(() => this.getExpenses());
  }

  removeTransaction(transactionId) {
    return this.http.delete(`/api/expenses/transaction/${transactionId}/remove`).then(() => this.getExpenses());
  }

  settleTransaction(transactionId) {
    return this.http.put(`/api/expenses/transaction/${transactionId}/settle`).then(() => this.getExpenses());
  }

  removeExpense(expenseId) {
    return this.http.delete(`/api/expenses/${expenseId}/remove`).then(() => this.getExpenses());
  }

  roundMoney(value) {
    return Number(Math.round(value + 'e+2') + 'e-2').toFixed(2);
  }



}
