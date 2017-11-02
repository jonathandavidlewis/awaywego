import angular from 'angular';

// imports for this component
import template from './event-feed-card.html';
import './event-feed-card.css';

class EventFeedCardController {
  constructor() {

  }
}
EventFeedCardController.$inject = [];

const EventFeedCardComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: EventFeedCardController
};

export default EventFeedCardComponent;
