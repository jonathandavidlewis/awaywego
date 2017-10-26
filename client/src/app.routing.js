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
    abstract: true,
    resolve: {
      protect: redirectIfNotAuthed,
      friendsLoaded: ['FriendService', function(FriendService) {
        return FriendService.loadFriends();
      }]
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
    url: '/plan/{planId}',
    component: 'plan',
    resolve: {
      events: ['$stateParams', 'EventService', function($stateParams, EventService) {
        return EventService.loadEventsByPlanId($stateParams.planId);
      }],
      loadPlan: ['$stateParams', 'PlanService', function($stateParams, PlanService) {
        return PlanService.loadPlanById($stateParams.planId);
      }]
    }
  };

  const feedState = {
    name: 'app.plan.feed',
    url: '/feed',
    component: 'feed'
  };

  const plannerState = {
    name: 'app.plan.planner',
    url: '/planner',
    component: 'planner'
  };

  const plannerItineraryState = {
    name: 'app.plan.planner.itinerary',
    url: '/itinerary',
    component: 'itinerary'
  };

  const plannerIdeasState = {
    name: 'app.plan.planner.ideas',
    url: '/ideas',
    component: 'ideas'
  };

  const plannerMakeIdeaState = {
    name: 'app.plan.planner.makeIdea',
    url: '/new/idea',
    component: 'makeIdea'
  };

  const plannerIdeaState = {
    name: 'app.plan.planner.idea',
    // TODO: Change to /idea/{ideaId} once event-router is done
    url: '/idea',
    component: 'idea'
  };

  const plannerAvailabilityState = {
    name: 'app.plan.planner.availability',
    url: '/availability',
    component: 'availability'
  };

  const peopleState = {
    name: 'app.plan.people',
    abstract: true,
    component: 'people'
  };

  const peopleListState = {
    name: 'app.plan.people.list',
    url: '/people',
    component: 'peopleList'
  };

  const peopleAddState = {
    name: 'app.plan.people.add',
    url: '/people/add',
    component: 'peopleAdd'
  };

  const friendsState = {
    name: 'app.friends',
    url: '/friends',
    abstract: true,
    component: 'friends',
    resolve: {
      friendsLoaded: loadFriends
    }
  };

  const friendsListState = {
    name: 'app.friends.list',
    url: '/list',
    component: 'friendsList'
  };

  // auth states
  $stateProvider.state(loginState);
  $stateProvider.state(signupState);

  // main app wrapper states
  $stateProvider.state(appState);
  $stateProvider.state(homeState);

  // friends states
  $stateProvider.state(friendsState);
  $stateProvider.state(friendsListState);

  // plan states
  $stateProvider.state(makePlanState);
  $stateProvider.state(planState);
  $stateProvider.state(feedState);
  $stateProvider.state(plannerState);
  $stateProvider.state(plannerItineraryState);
  $stateProvider.state(plannerIdeasState);
  $stateProvider.state(plannerMakeIdeaState);
  $stateProvider.state(plannerIdeaState);
  $stateProvider.state(plannerAvailabilityState);

  // people states
  $stateProvider.state(peopleState);
  $stateProvider.state(peopleListState);
  $stateProvider.state(peopleAddState);
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

const loadFriends = function(FriendService) {
  return FriendService.loadFriends();
};
loadFriends.$inject = ['FriendService'];
