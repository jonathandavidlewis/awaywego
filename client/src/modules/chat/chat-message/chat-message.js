import angular from 'angular';
import moment from 'moment';

// imports for this components
import template from './chat-message.html';
import './chat-message.css';

class ChatMessageController {
  constructor() {
  }
}

const ChatMessageComponent = {
  restrict: 'E',
  bindings: {
    'message': '<'
  },
  template: template,
  controller: ChatMessageController
};

export default ChatMessageComponent;
