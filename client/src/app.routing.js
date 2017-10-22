// named views can be referenced using:
// views: { 'main-app': { template: '<ui-view name="main-app"/>' } },
// or: views; { 'main-app': { component: 'home' } }

const routing = function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/app/home');

  const loginState = {
    name: 'login',
    url: '/login',
    component: 'login',
    resolve: {
      skip: skipIfAuthed,
    }
  };

  const signupState = {
    name: 'signup',
    url: '/signup',
    component: 'signup',
  };

  // all protected states are prefixed by /app
  // you must be logged in to get through here
  const appState = {
    name: 'app',
    url: '/app',
    component: 'app',
    resolve: {
      protect: redirectIfNotAuthed,
    }
  };

  const homeState = {
    name: 'app.home',
    url: '/home',
    component: 'home',
  };

  const makePlanState = {
    name: 'app.makePlan',
    url: '/new/plan',
    component: 'makePlan',
  };

  const planState = {
    name: 'app.plan',
    url: '/plan',
    component: 'plan',
    resolve: {
      protect: redirectIfNotAuthed
    }
  };

  const feedState = {
    name: 'app.plan.feed',
    url: '/feed/{plan}',
    component: 'feed',
    resolve: {
      protect: redirectIfNotAuthed
    }
  };

  const plannerState = {
    name: 'app.plan.planner',
    url: '/planner',
    component: 'planner',
    resolve: {
      protect: redirectIfNotAuthed
    }
  };

  const plannerItineraryState = {
    name: 'app.plan.planner.itinerary',
    url: '/itinerary',
    component: 'itinerary',
    resolve: {
      protect: redirectIfNotAuthed
    }
  };

  const plannerIdeasState = {
    name: 'app.plan.planner.ideas',
    url: '/ideas',
    component: 'ideas',
    resolve: {
      protect: redirectIfNotAuthed
    }
  };

  const plannerAvailabilityState = {
    name: 'app.plan.planner.availability',
    url: '/availability',
    component: 'availability',
    resolve: {
      protect: redirectIfNotAuthed
    }
  };

  $stateProvider.state(loginState);
  $stateProvider.state(signupState);
  $stateProvider.state(appState);
  $stateProvider.state(homeState);
  $stateProvider.state(makePlanState);
  $stateProvider.state(planState);
  $stateProvider.state(feedState);
  $stateProvider.state(plannerState);
  $stateProvider.state(plannerItineraryState);
  $stateProvider.state(plannerIdeasState);
  $stateProvider.state(plannerAvailabilityState);
};

routing.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
export default routing;

//TODO: look into avoiding the ugly flash, possibly removing the $timeout()
const redirectIfNotAuthed = function($q, $state, $timeout, UserService) {
  const result = $q.defer();
  if (UserService.isLoggedIn) {
    result.resolve(UserService.user);
  } else {
    $timeout(() => $state.go('login'));
    result.reject('Not authorized, please login!');
  }
  return result;
};
redirectIfNotAuthed.$inject = ['$q', '$state', '$timeout', 'UserService'];

const skipIfAuthed = function($q, $state, $timeout, UserService) {
  const result = $q.defer();
  if (UserService.isLoggedIn) {
    result.reject('Logged in, redirecting to home.');
    $timeout(() => $state.go('app.home'));
  } else {
    result.resolve();
  }
  return result;
};
redirectIfNotAuthed.$inject = ['$q', '$state', '$timeout', 'UserService'];
