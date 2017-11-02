import angular from 'angular';

// imports for this component
import template from './event-feed.html';
import './event-feed.css';

class EventFeedController {
  constructor() {
  }
}
EventFeedController.$inject = [];

const EventFeedComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: EventFeedController
};

export default EventFeedComponent;
