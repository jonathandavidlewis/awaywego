import angular from 'angular';

// import services for this modules
//import moment from 'moment';
import EventService from '../../../../services/event/event.service';
import momentPicker from 'angular-moment-picker';
import moment from 'moment';


//import DatetimePickerComponent from '../../../common/datetime-picker/datetime-picker-config';

// imports for this component
import template from './promote-idea.html';
import './promote-idea.css';

class PromoteIdeaController {
  constructor(EventService, $stateParams, $state) {
    this.$inject = ['EventService', '$stateParams', '$state'];
    this.EventService = EventService;
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.moment = moment;
    this.$onInit = this.$onInit.bind(this);
    this.formWarning = '';
    this.birthday = '';
    this.formattedStartTime = '';
    this.formattedEndTime = '';
    this.onEndDateChange = this.onEndDateChange.bind(this);
  }

  $onInit() {
    this.event = this.EventService.getEvent(this.$stateParams.eventId);
    this.formattedStartTime = this.moment(this.event.startTime).format('MM/DD/YYYY hh:mm A');
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
      this.EventService.promoteEvent(promotedIdea).then(resp => {
        this.$state.go('app.plan.planner.ideas');
      }).catch(err => {
        console.log('Server error: ', err);
        this.formWarning = 'Error: please try again or contact a server admin';
      });
    }
  }

  //todo: add calendar logic

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

const PromoteIdeaComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: PromoteIdeaController
};

const PromoteIdeaModule = angular.module('app.plan.planner.promoteIdea', ['moment-picker'])
  .component('promoteIdea', PromoteIdeaComponent)
  .component('momentPicker', momentPicker)
  .service('EventService', EventService);

export default PromoteIdeaModule.name;
