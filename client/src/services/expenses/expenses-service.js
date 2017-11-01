export default class ExpensesService {
  constructor($http, UserService) {
    this.$inject = ['$http', 'UserService'];
    this.http = $http;
    this.UserService = UserService;
    this.expenses = [];
    this.transactions = {};


    this.calculateDebts = this.calculateDebts.bind(this);
    this.sortTransactions = this.sortTransactions.bind(this);
    this.getExpenses = this.getExpenses.bind(this);
    this.roundMoney = this.roundMoney.bind(this);
  }

  // ExpensesService data access methods
  returnExpenses() { return this.expenses; }

  returnTransactions() { return this.transactions; }

  calculateDebts() {
    let owed = 0;
    let debt = 0;
    console.log('Calculate debts', this.transactions);
    for (let id in this.transactions) {
      console.log('inside for loop of calc debts', id, this.transactions);
      this.transactions[id].forEach((transaction) => {
        console.log('transactionId, userid', transaction.to, this.UserService.user.id);
        if (transaction.to === this.UserService.user.id) {
          console.log('to fired');
          owed += transaction.amount;
        } else if (transaction.from === this.UserService.user.id) {
          console.log('from fired');
          debt += transaction.amount;
        }
      });

    }
    return {owed: owed, debt: debt, balance: this.roundMoney(owed - debt)};
  }

  sortTransactions(transactions) {
    this.transactions = {};
    transactions.forEach((transaction) => {
      if (!this.transactions[transaction.expenseId]) {
        this.transactions[transaction.expenseId] = [];
      }
      this.transactions[transaction.expenseId].push(transaction);
    });
  }

  newExpense(expense) {
    return this.http.post('/api/expenses', expense);
  }

  getExpenses(planId) {
    return this.http.get(`/api/expenses/${planId}`).then((res) => {
      this.expenses = res.data.expenses;
      console.log('get expenses', this.expenses);
      this.sortTransactions(res.data.transactions);
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
