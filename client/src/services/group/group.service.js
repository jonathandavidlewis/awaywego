export default class PlanService {
  constructor($http) {
    this.$inject = ['$http'];
    this.$http = $http;
    this.plans = [];
    this.currentPlan = null;
  }

  submitNewPlan(plan) { return this.$http.post('/api/plan', plan); }

  loadPlanById(planId) {
    if (this.plans.length) {
      this.currentPlan = this.plans.find(plan => plan._id === planId);
      if (this.currentPlan) {
        return this.currentPlan;
      }
    } else {
      return this.getPlanById(planId).then(plan => this.currentPlan = plan);
    }

  }

  getPlanById(planId) {
    return this.$http.get(`/api/plan/${planId}`).then(resp => resp.data);
  }

  deletePlanById(planId) {
    return this.$http.delete(`/api/plan/${planId}`);
  }

  getAllPlans() {
    return this.$http.get('/api/plan/').then((response => {
      this.plans = response.data;
      return response.data;
    }));
  }

  removeMemberFromCurrentPlan(userId) {
    return this.$http.put(`/api/plan/${this.currentPlan._id}/members/remove/${userId}`)
      .then(resp => this.currentPlan = resp.data);
  }

  addMembersToCurrentPlan(members) {
    return this.$http.put(`/api/plan/${this.currentPlan._id}/members/add`, {members})
      .then(resp => this.currentPlan = resp.data);
  }

}
