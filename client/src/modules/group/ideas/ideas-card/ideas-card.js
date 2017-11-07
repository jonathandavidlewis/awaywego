import angular from 'angular';

// imports for this component
import template from './ideas-card.html';
import './ideas-card.css';

class IdeasCardController {
  constructor(EventService, UserService, GroupService, ConfirmService) {
    this.EventService = EventService;
    this.userId = UserService.user.id;
    this.groupOwner = GroupService.currentGroup.userId;
    this.ConfirmService = ConfirmService;

    this.busy = false;

    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.menuShouldAppear = this.menuShouldAppear.bind(this);
  }

  handleDelete() {
    this.ConfirmService.openModal(
      `Are you sure you want to delete event:
       ${this.EventService.events[this.eventId].title}?`,
      'This action cannot be undone', 'Yes'
    ).then(() => {
      this.busy = true;
      this.EventService.deleteEvent(this.eventId)
        .finally(() => this.busy = false);
    }).catch(() => {});
  }

  menuShouldAppear() {
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

IdeasCardController.$inject = ['EventService', 'UserService', 'GroupService', 'ConfirmService'];

const IdeasCardComponent = {
  restrict: 'E',
  bindings: {
    eventId: '<'
  },
  template: template,
  controller: IdeasCardController
};


export default IdeasCardComponent;
