export default class PlanService {
  constructor($http) {
    this.$inject = ['$http'];
    this.$http = $http;
  }

  submitNewPlan(plan) { return this.$http.post('/api/plan', plan); }
  
}
