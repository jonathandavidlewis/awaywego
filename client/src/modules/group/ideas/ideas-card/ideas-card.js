import angular from 'angular';

// imports for this component
import template from './ideas-card.html';
import './ideas-card.css';

class IdeasCardController {
  constructor(EventService, UserService, GroupService, ConfirmService, $timeout) {
    this.EventService = EventService;
    this.userId = UserService.user.id;
    this.groupOwner = GroupService.currentGroup.userId;
    this.ConfirmService = ConfirmService;
    this.timeout = $timeout;

    this.showSchedule = false;
    this.busy = false;

    this.openSchedule = this.openSchedule.bind(this);
    this.closeSchedule = this.closeSchedule.bind(this);
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.menuShouldAppear = this.menuShouldAppear.bind(this);
  }

  openSchedule() {
    return this.timeout(() => {
      this.showSchedule = true;
    }, 100);
  }
  closeSchedule() {
    return this.timeout(() => {
      this.showSchedule = false;
    }, 100);
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

  scheduleShouldAppear() {
    return this.userId === this.groupOwner;
  }

  upVote() {
    this.EventService.upvoteEvent(this.eventId);
  }

  downVote() {
    this.EventService.downvoteEvent(this.eventId);
  }
}

IdeasCardController.$inject = ['EventService', 'UserService', 'GroupService', 'ConfirmService', '$timeout'];

const IdeasCardComponent = {
  restrict: 'E',
  bindings: {
    eventId: '<'
  },
  template: template,
  controller: IdeasCardController
};


export default IdeasCardComponent;
