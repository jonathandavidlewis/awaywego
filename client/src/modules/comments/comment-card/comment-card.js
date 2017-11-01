import angular from 'angular';

// imports for this component
import template from './comment-card.html';
import './comment-card.css';

class CommentCardController {
  constructor(UserService, MomentService, EventService) {
    this.user = UserService.user;
    this.moment = MomentService.moment;
    this.EventService = EventService;
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleDeleteClick() {
    this.EventService.removeCommentForEvent(this.eventId, this.comment._id);
  }

}
CommentCardController.$inject = ['UserService', 'MomentService', 'EventService'];

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
