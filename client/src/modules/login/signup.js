import angular from 'angular';

// imports for this component
import template from './signup.html';
import './login.css';

class SignupController {
  constructor(UserService, $state) {
    this.UserService = UserService;
    this.$state = $state;
    this.name = '';
    this.email = '';
    this.password = '';
    this.confPassword = '';
    this.formWarning = '';
    this.busy = false;
  }

  amBusy() { this.busy = true; }

  notBusy() { this.busy = false; }

  signup() {
    this.amBusy();
    if (this.validateForm()) {
      let newUser = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      this.UserService.signup(newUser).then(loggedIn => {
        if (loggedIn) {
          this.$state.go('app.home');
        } else {
          console.log('Login error, please try again or contact server admin');
        }
      }).catch(err => {
        if (err.status === 422) {
          this.formWarning = 'Email already registered, check again or try signing in';
        } else {
          console.log('Error: ', err);
        }
        this.notBusy();
      });
    } else { // not busy right away if validate fails
      this.notBusy();
    }
  }

  validateForm() {
    if (!this.email) { // TODO: update this email-specific validation
      this.formWarning = 'Please provide an email address';
      return false;
    } else if (!this.password) {
      this.formWarning = 'Please provide a password';
      return false;
    } else if (this.password !== this.confPassword) {
      this.formWarning = 'Passwords do not match';
      return false;
    } else if (!this.name) {
      this.formWarning = 'Please provide a name';
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
