import angular from 'angular';

// imports for this component
import template from './signup.html';
import './login.css';

// temp constants for testing
const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcklkIjoiMTIzNDUiLCJuYW1lIjoiSmFyZWQifQ.OH3YX4wMOovE0qOryCJ9_1vZ7a0cMIz-0lk1AwWk8GU';

class SignupController {
  constructor(UserService, $state) {
    this.UserService = UserService;
    this.$state = $state;
    this.name = '';
    this.email = '';
    this.password = '';
    this.confPassword = '';
    this.formWarning = '';
  }

  login() {
    if (this.validateForm()) {
      this.UserService.login(testToken);
      this.$state.go('app.home');
    }
  }

  // TODO: update this for signup
  validateForm() {
    if (!this.email || !this.password) {
      this.formWarning = 'Please enter your ' +
        (!this.email && !this.password ? 'email and password' :
          !this.email ? 'password' : 'email');
      return false;
    } else {
      return true;
    }
  }
}
SignupController.$inject = ['UserService', '$state'];

const SignupComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: SignupController
};

const SignupModule = angular.module('app.signup', [])
  .component('signup', SignupComponent);

export default SignupModule.name;
