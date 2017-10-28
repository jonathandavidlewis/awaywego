import angular from 'angular';

// components for this module
import ChatMessageComponent from './chat-message/chat-message';
import ChatInputComponent from './chat-input/chat-input';
import ChatService from './chat.service';


// imports for this component
import template from './chat.html';
import './chat.css';

class ChatController {
  constructor(ChatService, PlanService, UserService) {
    this.ChatService = ChatService;
    this.PlanService = PlanService;
    this.UserService = UserService;

    this.msg = '';
  }
}

const ChatComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: ChatController
};

const ChatModule = angular.module('app.chat', [])
  .service('ChatService', ChatService)
  .component('chat', ChatComponent)
  .component('chatMessage', ChatMessageComponent)
  .component('chatInput', ChatInputComponent);

export default ChatModule.name;
