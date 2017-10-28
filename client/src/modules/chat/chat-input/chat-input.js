import angular from 'angular';

// imports for this component
import template from './chat-input.html';
import './chat-input.css';

class ChatInputController {
  constructor() {
  }
}

const ChatInputComponent = {
  restrict: 'E',
  bindings: {
    'msg': '='
  },
  template: template,
  controller: ChatInputController
};

export default ChatInputComponent;
