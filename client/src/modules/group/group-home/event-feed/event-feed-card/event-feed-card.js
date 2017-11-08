import angular from 'angular';

// imports for this component
import template from './event-feed-card.html';
import './event-feed-card.css';

class EventFeedCardController {
  constructor(MomentService, EventService, UserService, GroupService, ConfirmService) {
    this.moment = MomentService.moment;
    this.EventService = EventService;
    this.UserService = UserService;
    this.GroupService = GroupService;
    this.ConfirmService = ConfirmService;

    this.busy = false;

    this.menuShouldAppear = this.menuShouldAppear.bind(this);
  }

  menuShouldAppear() { // only group owner can unschedule
    return this.UserService.user.id === this.GroupService.currentGroup.userId;
  }

  handleUnscheduleEvent() {
    this.ConfirmService.openModal(
      'Are you sure you want to unschedule this event?', '',
      'Yes', 'No'
    ).then(() => {
      this.busy = true;
      this.EventService.demoteEvent(this.event._id)
        .finally(() => this.busy = false);
    }).catch(() => {});
  }
}
EventFeedCardController.$inject = [
  'MomentService', 'EventService', 'UserService',
  'GroupService', 'ConfirmService'
];

const EventFeedCardComponent = {
  restrict: 'E',
  bindings: {
    event: '<'
  },
  template: template,
  controller: EventFeedCardController
};

export default EventFeedCardComponent;
