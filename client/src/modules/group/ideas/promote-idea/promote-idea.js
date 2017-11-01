import angular from 'angular';

// import services for this modules
import momentPicker from 'angular-moment-picker';

// imports for this component
import AddressSearchComponent from '../../../address-search/address-search';
import template from './promote-idea.html';
import './promote-idea.css';

class PromoteIdeaController {
  constructor(EventService, $stateParams, $state, MomentService) {
    this.EventService = EventService;
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.moment = MomentService.moment;
    this.$onInit = this.$onInit.bind(this);
    this.formWarning = '';
    this.formattedStartTime = '';
    this.formattedEndTime = '';
    this.addressText = '';
    this.addressLink = '';
    this.onEndDateChange = this.onEndDateChange.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
  }

  $onInit() {
    this.event = this.EventService.getEvent(this.$stateParams.eventId);
    if (!this.event.startTime) { this.event.startTime = this.moment(); }
    this.formattedStartTime = this.moment(this.event.startTime).format('MM/DD/YYYY hh:mm A');
    if (!this.event.endTime) { this.event.endTime = this.moment(); }
    this.formattedEndTime = this.moment(this.event.endTime).format('MM/DD/YYYY hh:mm A');
  }

  onStartDateChange(newValue) {
    this.formattedStartTime = newValue.format('MM/DD/YYYY hh:mm A');
  }

  onEndDateChange(newValue) {
    this.formattedEndTime = newValue.format('MM/DD/YYYY hh:mm A');
  }

  submit() {
    if (this.validateForm()) {
      let promotedIdea = this.event;
      promotedIdea.startTime = new Date(promotedIdea.startTime);
      promotedIdea.endTime = new Date(promotedIdea.endTime);
      promotedIdea.addressText = this.addressText;
      promotedIdea.addressLink = this.addressLink;
      this.EventService.promoteEvent(promotedIdea).then(resp => {
        this.$state.go('app.group.ideas');
      }).catch(err => {
        console.log('Server error: ', err);
        this.formWarning = 'Error: please try again or contact a server admin';
      });
    }
  }

  //todo: add calendar limit for end time after start time.

  validateForm() {
    if (!this.event.title) {
      this.formWarning = 'Please enter a title';
    }
    if (!this.event.startTime) {
      this.formWarning = 'Please enter a start time';
      return false;
    }
    if (!this.event.endTime) {
      this.formWarning = 'Please enter an end time';
      return false;
    }
    return true;
  }
}

PromoteIdeaController.$inject = ['EventService', '$stateParams', '$state', 'MomentService'];

const PromoteIdeaComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: PromoteIdeaController
};

const PromoteIdeaModule = angular.module('app.plan.planner.promoteIdea', ['moment-picker'])
  .component('promoteIdea', PromoteIdeaComponent)
  .component('addressSearch', AddressSearchComponent);

export default PromoteIdeaModule.name;
