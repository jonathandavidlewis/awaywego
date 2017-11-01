import angular from 'angular';

// imports for this component
import template from './ideas-card.html';
import './ideas-card.css';

class IdeasCardController {
  constructor(EventService, UserService) {
    this.EventService = EventService;
    this.userId = UserService.user.id;

    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handlePromoteClick = this.handlePromoteClick.bind(this);
  }

  handleDeleteClick() {
    this.deleteEvent(this.eventId);
  }

  handlePromoteClick() {
    this.promoteEvent(this.eventId);
  }

  upVote() {
    this.EventService.upvoteEvent(this.eventId);
  }

  downVote() {
    this.EventService.downvoteEvent(this.eventId);
  }
}

IdeasCardController.$inject = ['EventService', 'UserService'];

const IdeasCardComponent = {
  restrict: 'E',
  bindings: {
    eventId: '<',
    deleteEvent: '<',
    promoteEvent: '<'
  },
  template: template,
  controller: IdeasCardController
};


export default IdeasCardComponent;
