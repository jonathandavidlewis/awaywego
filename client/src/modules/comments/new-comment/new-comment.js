import angular from 'angular';

// imports for this component
import template from './new-comment.html';
import './new-comment.css';

class NewCommentController {
  constructor() {
  }
}

const NewCommentComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: NewCommentController
};

export default NewCommentComponent;
