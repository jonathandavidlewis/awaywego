import angular from 'angular';

// imports for this component
import template from './new-idea-button.html';
import './new-idea-button.css';

class NewIdeaButtonController {
  constructor() {
  }
}

const NewIdeaButtonComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: NewIdeaButtonController
};


export default NewIdeaButtonComponent;