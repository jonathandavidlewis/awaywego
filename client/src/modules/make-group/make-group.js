import angular from 'angular';

// import services for this modules
import GroupService from '../../services/group/group.service';

// imports for this component
import template from './make-group.html';
import './make-group.css';

class MakeGroupController {
  constructor($state, GroupService) {
    this.$inject = ['$state', 'GroupService'];
    this.$state = $state;
    this.GroupService = GroupService;
    this.title = '';
    this.desc = '';
    this.imageUrl = '';
    this.formWarning = '';
    this.busy = false;
  }

  submit() {
    if (this.validateForm()) {
      let newGroup = {
        title: this.title,
        description: this.desc,
        imageUrl: this.imageUrl
      };
      this.busy = true;
      this.GroupService.submitNewGroup(newGroup).then(resp => {
        this.$state.go('app.home');
      }).catch(() => {
        this.formWarning = 'Server error, please try again or contact server admin';
      }).finally(() => { this.busy = false; });
    }
  }

  validateForm() {
    if (!this.title) {
      this.formWarning = 'Please enter at least a title';
      return false;
    }
    return true;
  }
}

const MakeGroupComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: MakeGroupController
};

const MakeGroupModule = angular.module('app.makeGroup', [])
  .component('makeGroup', MakeGroupComponent)
  .service('GroupService', GroupService);

export default MakeGroupModule.name;
