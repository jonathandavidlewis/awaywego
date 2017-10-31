import angular from 'angular';

// imports for this component
import template from './new-comment.html';
import './new-comment.css';

class NewCommentController {
  constructor(EventService) {
    this.EventService = EventService;
    this.comment = '';
  }

  handleTyping(event) {
    if (event.key === 'Enter' && this.comment.length) {
      this.submit();
    }
  }

  submit() {
    this.EventService.postCommentForEvent(this.eventId, this.comment)
      .then(() => {
        this.comment = '';
      });
  }

}
NewCommentController.$inject = ['EventService'];

const NewCommentComponent = {
  restrict: 'E',
  bindings: {
    eventId: '<'
  },
  template: template,
  controller: NewCommentController
};

export default NewCommentComponent;
