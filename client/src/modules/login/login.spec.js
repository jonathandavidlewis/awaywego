import LoginModule from './login';
import UserService from '../../services/user/user.service.js';
import sinon from 'sinon';

describe('LoginModule', function() {
  let element, scope, loginSpy, goSpy, loginCtrl;

  // mocking the services for login component
  beforeEach(angular.mock.module(function($provide) {
    let $state = {
      go: (path) => {},
    };
    goSpy = sinon.spy($state, 'go');

    let UserService = {
      login: (token) => null,
    };
    loginSpy = sinon.spy(UserService, 'login');
    $provide.value('$state', $state);
    $provide.value('UserService', UserService);
  }));

  // loading the module itself
  beforeEach(angular.mock.module('app.login'));
  // rendering the login component
  beforeEach(angular.mock.inject(($rootScope, $compile, UserService, $state) => {
    scope = $rootScope.$new();
    element = angular.element('<login></login>');
    element = $compile(element)(scope);
    $rootScope.$digest();
    loginCtrl = element.isolateScope().$ctrl;
  }));

  it('should render into a login container div', () => {
    expect(element.find('div.login-container').length).to.equal(1);
  });

  it('should have a UserService and $state injected', () => {
    expect(loginCtrl.$state).to.exist;
    expect(loginCtrl.UserService).to.exist;
  });

  it('should trigger UserService.login() when login is clicked', () => {
    element.find('#login').click();
    expect(loginSpy).to.have.been.called;
  });

  it('should trigger redirect to app.home when login is clicked', () => {
    element.find('#login').click();
    expect(goSpy).to.have.been.calledWith('app.home');
  });
});
