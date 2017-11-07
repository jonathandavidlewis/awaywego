export default class ExpensesService {
  constructor($http, UserService, $stateParams) {
    this.$inject = ['$http', 'UserService', '$stateParams'];
    this.http = $http;
    this.stateParams = $stateParams;
    this.UserService = UserService;
    this.expenses = [];
    this.summary = {};
    this.transactions = [];
    this.consolidatedTransactions = '';
    this.filterBy = 'All';

    // Bindings
    this.calculateDebts = this.calculateDebts.bind(this);
    this.getExpenses = this.getExpenses.bind(this);
    this.roundMoney = this.roundMoney.bind(this);
    this.filterTransactions = this.filterTransactions.bind(this);
    this.removeExpense = this.removeExpense.bind(this);
    this.removeTransaction = this.removeTransaction.bind(this);
    this.settleTransaction = this.settleTransaction.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.consolidateDebts = this.consolidateDebts.bind(this);
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
      if (!owes[transaction.from] && owes[transaction.from] !== 0) {
        owes[transaction.from] = transaction.amount;
      } else {
        owes[transaction.from] += transaction.amount;
      }
      // Fill isOwed
      if (!isOwed[transaction.to] && owes[transaction.to] !== 0) {
        isOwed[transaction.to] = transaction.amount;
      } else {
        isOwed[transaction.to] += transaction.amount;
      }
    });

    // Iterate through owes Array, find corresponding key if possible in isOwed Array and cancel out transactions with same ID
    for (let id in owes) {
      if (isOwed[id] || isOwed[id] === 0) {
        // Check if one is bigger
        if (owes[id] > isOwed[id]) {
          owes[id] -= isOwed[id];
          delete isOwed[id];
        } else if (owes[id] < isOwed[id]) {
          isOwed[id] -= owes[id];
          delete owes[id];
        } else if (owes[id] === isOwed[id]) {
          delete owes[id];
          delete isOwed[id];
        }
      }
    }

    // TODO: May be useful to filter and pre make equal transactions first to simplify transactions

    // Iterate through both arrays and create transactions, simplifying and deleting as needed
    for (let fromId in owes) {
      while (owes[fromId]) {
        for (let toId in isOwed) {
          let transaction = {from: fromId, to: toId};
          if (owes[fromId] < isOwed[toId]) {
            transaction.amount = owes[fromId];
            isOwed[toId] -= transaction.amount;
            delete owes[fromId];
          } else if (owes[fromId] > isOwed[toId]) {
            transaction.amount = isOwed[toId];
            owes[fromId] -= transaction.amount;
            delete isOwed[toId];
          } else if (owes[fromId] === isOwed[toId]) {
            transaction.amount = isOwed[toId];
            delete owes[fromId];
            delete isOwed[toId];
          }
          consolidatedTransactions.push(transaction);
        }
      }
    }
    this.consolidatedTransactions = consolidatedTransactions;
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
