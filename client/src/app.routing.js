const routing = function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  const homeState = {
    name: 'home',
    url: '/home',
    views: {
      'main-app': { component: 'home' }
    }
  };

  $stateProvider.state(homeState);
};

routing.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

export default routing;
