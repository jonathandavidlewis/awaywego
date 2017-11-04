import angular from 'angular';

// imports for this component
import template from './ideas-card.html';
import './ideas-card.css';

class IdeasCardController {
  constructor(EventService, UserService, GroupService) {
    this.EventService = EventService;
    this.userId = UserService.user.id;
    this.groupOwner = GroupService.currentGroup.userId;

    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handlePromoteClick = this.handlePromoteClick.bind(this);
    this.canEditOrDelete = this.canEditOrDelete.bind(this);
  }

  handleDeleteClick() {
    this.deleteEvent(this.eventId);
  }

  handlePromoteClick() {
    this.promoteEvent(this.eventId);
  }

  canEditOrDelete() {
    return this.EventService.events[this.eventId].userId === this.userId ||
           this.userId === this.groupOwner;
  }

  upVote() {
    this.EventService.upvoteEvent(this.eventId);
  }

  downVote() {
    this.EventService.downvoteEvent(this.eventId);
  }
}

IdeasCardController.$inject = ['EventService', 'UserService', 'GroupService'];

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
