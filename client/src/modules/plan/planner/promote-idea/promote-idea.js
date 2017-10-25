import angular from 'angular';

// import services for this modules
import EventService from '../../../../services/event/event.service';

// imports for this component
import template from './promote-idea.html';
import './promote-idea.css';

class PromoteIdeaController {
  constructor(EventService, $stateParams) {
    this.$inject = ['EventService', '$stateParams'];
    this.EventService = EventService;
    this.$stateParams = $stateParams;
    this.$onInit = this.$onInit.bind(this);
    this.title = '';
    this.desc = '';
    this.formWarning = '';
  }

  $onInit() {
    this.event = this.EventService.getEvent(this.$stateParams.eventId);
  }

  submit() {
    if (this.validateForm()) {
      let promotedIdea = {
        title: this.title,
        description: this.desc,
        planId: this.$stateParams.planId
      };
      this.EventService.promoteEvent(promotedIdea).then(resp => {
        this.$state.go('app.plan.planner.ideas');
      }).catch(err => {
        console.log('Server error: ', err);
        this.formWarning = 'Error: please try again or contact a server admin';
      });
    }
  }

  validateForm() {
    if (!this.title) {
      this.formWarning = 'Please enter a title';
      return false;
    }
    return true;
  }
}

const PromoteIdeaComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: PromoteIdeaController
};

const PromoteIdeaModule = angular.module('app.plan.planner.promoteIdea', [])
  .component('promoteIdea', PromoteIdeaComponent)
  .service('EventService', EventService);

export default PromoteIdeaModule.name;
