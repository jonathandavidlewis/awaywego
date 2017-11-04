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
      newUser: redirectToImport,
      friendsLoaded: ['FriendService', function(FriendService) {
        return FriendService.loadFriends();
      }],
      groupsLoaded: ['GroupService', function(GroupService) {
        return GroupService.getAllGroups();
      }]
    }
  };

  const homeState = {
    name: 'app.home',
    url: '/home',
    component: 'home',
  };

  const makeGroupState = {
    name: 'app.makeGroup',
    url: '/new/group',
    component: 'makeGroup',
  };

  const groupState = {
    name: 'app.group',
    url: '/group/{groupId}',
    component: 'group',
    resolve: {
      eventsLoaded: ['$stateParams', 'EventService', function($stateParams, EventService) {
        return EventService.loadEventsByGroupId($stateParams.groupId);
      }],
      groupLoaded: ['$stateParams', 'GroupService', function($stateParams, GroupService) {
        return GroupService.loadGroupById($stateParams.groupId);
      }]
    }
  };

  const groupHomeState = {
    name: 'app.group.home',
    url: '/home',
    component: 'groupHome'
  };

  const groupIdeasState = {
    name: 'app.group.ideas',
    url: '/ideas',
    component: 'ideas'
  };

  const groupIdeaState = {
    name: 'app.group.idea',
    url: '/idea/{ideaId}',
    component: 'idea',
    resolve: {
      ideaId: ['$stateParams', function($stateParams) {
        return $stateParams.ideaId;
      }]
    }
  };

  const groupMakeIdeaState = {
    name: 'app.group.makeIdea',
    url: '/idea/new',
    component: 'makeIdea'
  };

  const groupPromoteIdeaState = {
    name: 'app.group.promoteIdea',
    url: '/idea/{eventId}/promote',
    component: 'promoteIdea'
  };

  const peopleState = {
    name: 'app.group.people',
    abstract: true,
    component: 'people'
  };

  const peopleListState = {
    name: 'app.group.people.list',
    url: '/people',
    component: 'peopleList'
  };

  const peopleAddState = {
    name: 'app.group.people.add',
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

  const expensesState = {
    name: 'app.group.expenses',
    url: '/expenses',
    component: 'expenses'
  };

  const expensesMainState = {
    name: 'app.group.expenses.main',
    url: '/main',
    component: 'expensesMain'
  };

  const expensesMainFeedState = {
    name: 'app.group.expenses.main.feed',
    url: '/feed',
    component: 'expensesFeed'
  };

  const expensesTransactionState = {
    name: 'app.group.expenses.main.transactions',
    url: '/transactions',
    component: 'transactionPage'
  };

  const expenseState = {
    name: 'app.group.expenses.main.expense',
    url: '/expense/{expenseId}',
    component: 'transactionPage',
    resolve: {
      expenseId: ['$stateParams', function($stateParams) {
        return $stateParams.expenseId;
      }]
    }
  };

  const expensesAddState = {
    name: 'app.group.expenses.add',
    url: '/add',
    component: 'expensesAdd'
  };

  const chatState = {
    name: 'app.group.chat',
    url: '/chat',
    component: 'chat',
    resolve: {
      messagesLoaded: ['ChatService', 'GroupService', function(ChatService, GroupService) {
        return ChatService.loadChat(GroupService.currentGroup._id);
      }]
    }
  };

  const importContactsState = {
    name: 'app.import',
    url: '/import',
    component: 'importContacts'
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
  $stateProvider.state(importContactsState);

  // group states
  $stateProvider.state(makeGroupState);
  $stateProvider.state(groupState);
  $stateProvider.state(groupHomeState);
  $stateProvider.state(groupIdeasState);
  $stateProvider.state(groupIdeaState);
  $stateProvider.state(groupMakeIdeaState);
  $stateProvider.state(groupPromoteIdeaState);
  $stateProvider.state(chatState);

  // expenses states
  $stateProvider.state(expensesState);
  $stateProvider.state(expensesMainState);
  $stateProvider.state(expensesAddState);
  $stateProvider.state(expensesMainFeedState);
  $stateProvider.state(expensesTransactionState);
  $stateProvider.state(expenseState);
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

const redirectToImport = function($q, $state, $timeout, UserService) {
  const result = $q.defer();
  if (localStorage.getItem('new_user')) {
    localStorage.removeItem("new_user");
    $timeout(() => $state.go('app.import'));
    result.resolve('true');
  } else {
    result.resolve('true');
  }
  return result;
};
redirectToImport.$inject = ['$q', '$state', '$timeout'];

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
