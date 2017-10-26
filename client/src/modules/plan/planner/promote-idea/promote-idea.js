import angular from 'angular';

// import services for this modules
import EventService from '../../../../services/event/event.service';

// imports for this component
import template from './promote-idea.html';
import './promote-idea.css';

class PromoteIdeaController {
  constructor(EventService, $stateParams, $state) {
    this.$inject = ['EventService', '$stateParams', '$state'];
    this.EventService = EventService;
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.$onInit = this.$onInit.bind(this);
    this.formWarning = '';
  }

  $onInit() {
    this.event = this.EventService.getEvent(this.$stateParams.eventId);
  }

  submit() {
    if (this.validateForm()) {
      let promotedIdea = this.event;
      this.EventService.promoteEvent(promotedIdea).then(resp => {
        this.$state.go('app.plan.planner.ideas');
      }).catch(err => {
        console.log('Server error: ', err);
        this.formWarning = 'Error: please try again or contact a server admin';
      });
    }
  }

  validateForm() {
    if (!this.event.title) {
      this.formWarning = 'Please enter a title';
    }
    if (!this.event.startTime) {
      this.formWarning = 'Please enter a start time';
      return false;
    }
    if (!this.event.startTime) {
      this.formWarning = 'Please enter an end time';
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
