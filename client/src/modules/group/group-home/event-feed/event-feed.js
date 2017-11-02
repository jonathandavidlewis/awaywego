import angular from 'angular';

// imports for this component
import template from './event-feed.html';
import './event-feed.css';

class EventFeedController {
  constructor(EventService, MomentService) {
    console.log('init event feed');
    this.EventService = EventService;
    this.moment = MomentService.moment;
    this.eventPastDuration = this.moment.duration(1, 'days');
    this.eventFutureDuration = this.moment.duration(1, 'weeks');

    this.filterFeed = this.filterFeed.bind(this);
  }

  filterFeed(event) {
    let min = this.moment().subtract(this.eventPastDuration);
    let max = this.moment().add(this.eventFutureDuration);
    return this.moment(event.startTime).isBetween(min, max, 'day', '[]');
  }
}
EventFeedController.$inject = ['EventService', 'MomentService'];

const EventFeedComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: EventFeedController
};

export default EventFeedComponent;
