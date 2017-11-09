import angular from 'angular';

// imports for this component
import template from './make-event.html';
import './make-event.css';

class MakeEventController {
  constructor($state, EventService, GroupService) {
    this.$state = $state;
    this.groupId = GroupService.currentGroup._id;
    this.EventService = EventService;
    this.title = '';
    this.desc = '';
    this.imageUrl = '';
    this.addressName = '';
    this.addressName = '';
    this.addressText = '';
    this.addressLink = '';
    this.startTime = new Date();
    this.endTime = null;
    this.milliseconds = '';
    this.endTimeChanged = false;
    this.endDateChanged = false;
    this.onStartDateChange = this.onStartDateChange.bind(this);
    // this.onStartTimeChange = this.onStartTimeChange.bind(this);
    // this.onEndDateTimeChange = this.onEndDateTimeChange.bind(this);
    this.formWarning = '';
  }

  // $onInit() {
  //   // this.onStartTimeChange();
  //   this.event = {};
  //   this.event.groupId = this.groupId;
  //   this.event.userId = this.UserService.user.id;
  //   this.event.imageUrl = '';
  //   this.event = this.EventService.getEvent(this.stateParams.eventId);
  // }

  onStartDateChange() {
    if (!this.endDateChanged) {
      this.milliseconds = this.startTime.getTime() + (60 * 60 * 1000);
      this.endTime = new Date(this.milliseconds);
    }
  }

  // onStartTimeChange() {
  //   if (!this.endTimeChanged) {
  //     this.milliseconds = this.startTime.getTime() + (60 * 60 * 1000);
  //     this.endTime = new Date(this.milliseconds);
  //   }
  // }

  onEndDateTimeChange() {
    this.endDateChanged = true;
    this.endTimeChanged = true;
  }

  submit() {
    if (this.validateForm()) {
      let newEvent = {
        title: this.title,
        description: this.desc,
        imageUrl: this.imageUrl,
        groupId: this.groupId,
        startTime: this.startTime,
        endTime: this.endTime,
        addressName: this.addressName,
        addressText: this.addressText,
        addressLink: this.addressLink,
      };
      this.EventService.submitScheduledEvent(newEvent).then(resp => {
        this.$state.go('app.group.home');
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
    } else if (!this.startTime) {
      this.formWarning = 'Start time is required to schedule an event';
      return false;
    }
    return true;
  }
}
MakeEventController.$inject = ['$state', 'EventService', 'GroupService'];

const MakeEventComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: MakeEventController
};

export default MakeEventComponent;
