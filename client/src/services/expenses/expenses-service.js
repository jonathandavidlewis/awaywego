export default class ExpensesService {
  constructor($http, UserService) {
    this.$inject = ['$http', 'UserService'];
    this.http = $http;
    this.UserService = UserService;
    this.expenses = [];
    this.transactions = {};


    this.calculateDebts = this.calculateDebts.bind(this);
    // this.sortTransactions = this.sortTransactions.bind(this);
    this.getExpenses = this.getExpenses.bind(this);
    this.roundMoney = this.roundMoney.bind(this);
    this.filterUserTransactions = this.filterUserTransactions.bind(this);
  }

  // ExpensesService data access methods
  returnExpenses() { return this.expenses; }

  returnTransactions(expenseId) { return this.transactions[expenseId]; }

  filterUserTransactions() {
    let result = [];
    console.log('inside filter', this.transactions);
    for (let id in this.transactions) {
      this.transactions[id].forEach((transaction) => {
        if (transaction.to === this.UserService.user.id || transaction.from === this.UserService.user.id) {
          result.push(transaction);
        }
      });
    }
    return result;
  }

  calculateDebts() {
    let owed = 0;
    let debt = 0;
    this.expenses.forEach((expense) => {
      expense.transactions.forEach((transaction) => {
        console.log('transaction id', transaction);
        if (transaction.to._id.toString() === this.UserService.user.id.toString()) {
          owed += transaction.amount;
        } else if (transaction.from._id.toString() === this.UserService.user.id.toString()) {
          debt += transaction.amount;
        }
      });
    });


    return {owed: this.roundMoney(owed), debt: this.roundMoney(debt), balance: this.roundMoney(owed - debt)};
  }

  // sortTransactions(transactions) {
  //   this.transactions = {};
  //   transactions.forEach((transaction) => {
  //     if (!this.transactions[transaction.expenseId]) {
  //       this.transactions[transaction.expenseId] = [];
  //     }
  //     this.transactions[transaction.expenseId].push(transaction);
  //   });
  // }

  newExpense(expense) {
    return this.http.post('/api/expenses', expense);
  }

  getExpenses(planId) {
    return this.http.get(`/api/expenses/${planId}`).then((res) => {
      this.expenses = res.data;
      console.log('get expenses', this.expenses);
      // this.sortTransactions(res.data.transactions);
    });
  }

  addTransaction(expenseId) {
    return this.http.put(`/api/expenses/add/${expenseId}`).then(() => this.getExpenses());
  }

  removeTransaction(transactionId) {
    return this.http.delete(`/api/expenses/remove/${transactionId}`);
  }

  roundMoney(value) {
    return Number(Math.round(value + 'e+2') + 'e-2').toFixed(2);
  }



}
