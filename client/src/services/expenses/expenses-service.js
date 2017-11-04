export default class ExpensesService {
  constructor($http, UserService, $stateParams) {
    this.$inject = ['$http', 'UserService', '$stateParams'];
    this.http = $http;
    this.stateParams = $stateParams;
    this.UserService = UserService;
    this.expenses = [];
    this.summary = {};
    this.transactions = [];
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
