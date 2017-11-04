export default class ExpensesService {
  constructor($http, UserService, $stateParams) {
    this.$inject = ['$http', 'UserService', '$stateParams'];
    this.http = $http;
    this.stateParams = $stateParams;
    this.UserService = UserService;
    this.expenses = [];
    this.summary = {};
    this.transactions = [];


    this.calculateDebts = this.calculateDebts.bind(this);
    this.getExpenses = this.getExpenses.bind(this);
    this.roundMoney = this.roundMoney.bind(this);
    this.filterUserTransactions = this.filterUserTransactions.bind(this);
  }

  // ExpensesService data access methods
  returnExpenses() { return this.expenses; }


  filterUserTransactions() {
    let result = [];
    this.expenses.forEach((expense) => {
      expense.transactions.forEach((transaction) => {
        if (transaction.to._id === this.UserService.user.id || transaction.from._id === this.UserService.user.id) {
          transaction.description = expense.description;
          result.push(transaction);
        }
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


  newExpense(expense) {
    return this.http.post('/api/expenses', expense).then(() => {
      this.getExpenses();
    });
  }

  getExpenses() {
    return this.http.get(`/api/expenses/${this.stateParams.groupId}`).then((res) => {
      console.log('GET EXPENSES', res.data);
      this.expenses = res.data;
      this.summary = this.calculateDebts();
      this.transactions = this.filterUserTransactions();
    });
  }

  addTransaction(expenseId, transaction) {
    return this.http.post(`/api/expenses/${expenseId}/add`, transaction).then(() => this.getExpenses());
  }

  removeTransaction(transactionId) {
    console.log('remove service', transactionId);
    return this.http.delete(`/api/expenses/transaction/${transactionId}/remove`).then(() => this.getExpenses());
  }

  settleTransaction(transactionId) {
    return this.http.put(`/api/expenses/transaction/${transactionId}/settle`).then(() => this.getExpenses());
  }

  removeExpense(expenseId) {
    console.log('remove expense service', expenseId);
    return this.http.delete(`/api/expenses/${expenseId}/remove`).then(() => this.getExpenses());
  }

  roundMoney(value) {
    return Number(Math.round(value + 'e+2') + 'e-2').toFixed(2);
  }



}
