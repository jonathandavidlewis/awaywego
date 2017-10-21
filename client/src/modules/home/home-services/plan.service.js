export default class PlanService {
  constructor($http) {
    this.$inject = ['$http'];

  }
  getPlan(endpoint, params, callback) {
    $http({
      method: 'GET',
      url: endpoint,
      params: params
    }).then(function successCallback(response) {
      callback(response.data);
    }, function errorCallback(response) {
      console.log(response);
    });
  };

  submitNewPlan(plan) {
    return $http({
      method: 'POST',
      url: '/api/plan',
      params: plan
    })
  };


}