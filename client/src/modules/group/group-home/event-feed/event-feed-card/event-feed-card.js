import angular from 'angular';

// imports for this component
import template from './event-feed-card.html';
import './event-feed-card.css';

class EventFeedCardController {
  constructor(MomentService) {
    this.moment = MomentService.moment;
  }
}
EventFeedCardController.$inject = ['MomentService'];

const EventFeedCardComponent = {
  restrict: 'E',
  bindings: {
    event: '<'
  },
  template: template,
  controller: EventFeedCardController
};

export default EventFeedCardComponent;
