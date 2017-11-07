import angular from 'angular';

// imports for this component
import template from './login.html';
import './login.css';

// temp constants for testing
const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcklkIjoiMTIzNDUiLCJuYW1lIjoiSmFyZWQifQ.OH3YX4wMOovE0qOryCJ9_1vZ7a0cMIz-0lk1AwWk8GU';

class LoginController {
  constructor(UserService, $state) {
    this.UserService = UserService;
    this.$state = $state;
    this.email = '';
    this.password = '';
    this.formWarning = '';
    this.busy = false;
  }

  login() {
    this.busy = true;
    if (this.validateForm()) {
      this.UserService.login(this.email, this.password).then(loggedIn => {
        if (loggedIn) {
          return this.$state.go('app.home');
        } else { // this error should never happen!
          console.log('Login error, please try again or contact server admin');
        }
      }).catch(err => {
        if (err.data.messages === 'Incorrect password') {
          this.formWarning = 'Incorrect password, please try again';
        } else if (err.data.messages === 'User not found') {
          this.formWarning = 'User not found, please try again';
        }
      }).finally(() => this.busy = false);
    } else { // not busy right away if validate fails
      this.busy = false;
    }
  }

  validateForm() {
    if (!this.email || !this.password) {
      this.formWarning = 'Please provide your ' +
        (!this.email && !this.password ? 'email and password' :
          !this.email ? 'email' : 'password');
      return false;
    } else {
      return true;
    }
  }
}
LoginController.$inject = ['UserService', '$state'];

const LoginComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: LoginController
};

const LoginModule = angular.module('app.login', [])
  .component('login', LoginComponent);

export default LoginModule.name;
