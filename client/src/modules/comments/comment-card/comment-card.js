import angular from 'angular';

// imports for this component
import template from './comment-card.html';
import './comment-card.css';

class CommentCardController {
  constructor(UserService, MomentService, EventService, GroupService, ConfirmService) {
    this.user = UserService.user;
    this.moment = MomentService.moment;
    this.EventService = EventService;
    this.groupOwner = GroupService.currentGroup.userId;
    this.ConfirmService = ConfirmService;

    this.busy = false;

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.menuShouldAppear = this.menuShouldAppear.bind(this);
  }

  handleDeleteClick() {
    this.ConfirmService.openModal(
      'Are you sure you want to delete this comment?',
      'This action cannot be undone', 'Yes'
    ).then(() => {
      this.busy = true;
      this.EventService.removeCommentForEvent(this.eventId, this.comment._id)
        .finally(() => this.busy = false);
    }).catch(() => {});
  }

  menuShouldAppear() {
    return this.EventService.events[this.eventId].userId === this.user.id ||
           this.userId === this.groupOwner;
  }

}
CommentCardController.$inject = [
  'UserService', 'MomentService', 'EventService',
  'GroupService', 'ConfirmService'
];

const CommentCardComponent = {
  restrict: 'E',
  bindings: {
    'comment': '<',
    'eventId': '<'
  },
  template: template,
  controller: CommentCardController
};

export default CommentCardComponent;
