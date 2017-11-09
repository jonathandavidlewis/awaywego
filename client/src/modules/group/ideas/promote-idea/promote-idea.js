import angular from 'angular';

// import services for this modules

// imports for this component
import AddressSearchComponent from '../../../address-search/address-search';
import template from './promote-idea.html';
import './promote-idea.css';

class PromoteIdeaController {
  constructor(EventService, $state, MomentService) {
    this.EventService = EventService;
    this.state = $state;
    this.moment = MomentService.moment;
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
      if (this.addressLink === '') {
        this.addressLink = `https://www.google.com/maps/search/?api=1&query=${encodeURI(this.addressText)}`;
      }
      let promotedIdea = this.EventService.events[this.eventId];
      promotedIdea.startTime = this.startTime;
      promotedIdea.endTime = this.endTime;
      promotedIdea.addressName = this.addressName;
      promotedIdea.addressText = this.addressText;
      promotedIdea.addressLink = this.addressLink;
      this.EventService.promoteEvent(promotedIdea).then(resp => {
        this.state.go('app.group.home');
      }).catch(() => {});
    }
  }

  validateForm() {
    if (!this.startTime) {
      this.formWarning = 'Please enter a start time';
      return false;
    }
    return true;
  }
}

PromoteIdeaController.$inject = ['EventService', '$state', 'MomentService'];

const PromoteIdeaComponent = {
  restrict: 'E',
  bindings: {
    eventId: '<',
    closeSchedule: '<'
  },
  template: template,
  controller: PromoteIdeaController
};

const PromoteIdeaModule = angular.module('app.plan.planner.promoteIdea', [])
  .component('promoteIdea', PromoteIdeaComponent)
  .component('addressSearch', AddressSearchComponent);

export default PromoteIdeaModule.name;
