import angular from 'angular';

// imports for this component
import template from './make-event.html';
import './make-event.css';

class MakeEventController {
  constructor($state, EventService, GroupService, MomentService) {
    this.EventService = EventService;
    this.state = $state;
    this.moment = MomentService.moment;
    this.groupId = GroupService.currentGroup._id;
    this.title = '';
    this.desc = '';
    this.imageUrl = '';
    this.addressName = '';
    this.addressText = '';
    this.addressLink = '';
    this.startTime = this.moment().startOf('hour').add(1, 'hour').toDate();
    this.endTime = null;
    this.showEndDrawer = false;
    this.openEndDrawer = this.openEndDrawer.bind(this);
    this.formWarning = '';
  }

  openEndDrawer() {
    this.showEndDrawer = true;
    if (!this.endTime) {
      this.endTime = this.moment(this.startTime).add(1, 'hour').toDate();
    }
  }

  clearEndTime() {
    this.showEndDrawer = false;
    this.endTime = null;
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
      }).catch(err => {});
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
MakeEventController.$inject = ['$state', 'EventService', 'GroupService', 'MomentService'];

const MakeEventComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: MakeEventController
};

export default MakeEventComponent;
