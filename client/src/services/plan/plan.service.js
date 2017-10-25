export default class PlanService {
  constructor($http) {
    this.$inject = ['$http'];
    this.$http = $http;
    this.plans = [];
    this.currentPlan = null;
  }

  submitNewPlan(plan) { return this.$http.post('/api/plan', plan); }

  loadPlanById(planId) { this.currentPlan = this.plans.find(plan => plan._id === planId); }

  getPlanById(planId) { return this.plans.find(plan => plan._id === planId); }

  deletePlanById(planId) {
    return this.$http.delete(`/api/plan/${planId}`);
  }

  getAllPlans() {
    return this.$http.get('/api/plan/').then((response => {
      console.log(response);
      this.plans = response.data;
      return response.data;
    }));
  }

  removeMemberFromCurrentPlan() {}
  addMembersToCurrentPlan() {}

}
