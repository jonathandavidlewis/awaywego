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
    this.tryCombineDateTime = this.tryCombineDateTime.bind(this);
    this.title = '';
    this.desc = '';
    this.formWarning = '';
    this.startDate = '';
    this.startTime = '';
    this.endDate = '';
    this.endTime = '';
  }

  $onInit() {
    this.event = this.EventService.getEvent(this.$stateParams.eventId);
  }

  submit() {
    if (this.validateForm()) {
      debugger;
      let promotedIdea = {
        title: this.event.title,
        description: this.event.description,
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
    //this.tryCombineDateTime();
    var d = new Date();
    console.log(this.startDate);
    console.log(this.startTime.getTime());
    console.log(new Date(this.startDate.getTime() + this.startTime.getTime()));

    if (!this.event.title) {
      this.formWarning = 'Please enter a title\n';
    }
    if (!this.startDate) {
      this.formWarning += 'Please enter a start date\n';
      return false;
    }
    return false;
  }

  tryCombineDateTime() {
    if(this.startDate && this.startDate) {
      var dateParts = this.startDate.split('-');
      var timeParts = this.startTime.split(':');

      if(dateParts && timeParts) {
        dateParts[1] -= 1;
        this.fullDate = new Date(Date.UTC.apply(undefined, dateParts.concat(timeParts))).toISOString();
        console.log('Full DATE', this.fullDate);
      }
    }
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
