import angular from 'angular';

// imports for this component
import template from './comment-card.html';
import './comment-card.css';

class CommentCardController {
  constructor(UserService, MomentService, EventService, GroupService) {
    this.user = UserService.user;
    this.moment = MomentService.moment;
    this.EventService = EventService;
    this.groupOwner = GroupService.currentGroup.userId;
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.canEditOrDelete = this.canEditOrDelete.bind(this);
  }

  handleDeleteClick() {
    this.EventService.removeCommentForEvent(this.eventId, this.comment._id);
  }

  canEditOrDelete() {
    return this.EventService.events[this.eventId].userId === this.user.id ||
           this.userId === this.groupOwner;
  }

}
CommentCardController.$inject = ['UserService', 'MomentService', 'EventService', 'GroupService'];

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
