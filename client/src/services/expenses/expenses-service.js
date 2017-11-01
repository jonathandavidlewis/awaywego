export default class ExpensesService {
  constructor($http, UserService) {
    this.$inject = ['$http', 'UserService'];
    this.http = $http;
    this.UserService = UserService;
    this.expenses = [];

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
    return this.http.post('/api/expenses', expense);
  }

  getExpenses(planId) {
    return this.http.get(`/api/expenses/${planId}`).then((res) => {
      this.expenses = res.data;
      console.log('get expenses', this.expenses);
    });
  }

  addTransaction(expenseId, transaction) {
    return this.http.put(`/api/expenses/${expenseId}/add`, transaction).then(() => this.getExpenses());
  }

  removeTransaction(transactionId) {
    console.log('remove service', transactionId);
    return this.http.delete(`/api/expenses/transaction/${transactionId}/remove`);
  }

  settleTransaction(transactionId) {
    return this.http.put(`/api/expenses/transaction/${transactionId}/settle`);
  }

  removeExpense(expenseId) {
    console.log('remove expense service', expenseId);
    return this.http.delete(`/api/expenses/${expenseId}/remove`);
  }

  roundMoney(value) {
    return Number(Math.round(value + 'e+2') + 'e-2').toFixed(2);
  }



}
