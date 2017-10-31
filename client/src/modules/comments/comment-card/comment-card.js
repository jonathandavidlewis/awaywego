import angular from 'angular';

// imports for this component
import template from './comment-card.html';
import './comment-card.css';

class CommentCardController {
  constructor(MomentService) {
    this.moment = MomentService.moment;
  }
}
CommentCardController.$inject = ['MomentService'];

const CommentCardComponent = {
  restrict: 'E',
  bindings: {
    'comment': '<'
  },
  template: template,
  controller: CommentCardController
};

export default CommentCardComponent;
