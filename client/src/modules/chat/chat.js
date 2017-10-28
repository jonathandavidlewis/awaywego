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
    this.planId = PlanService.currentPlan._id;
    this.UserService = UserService;

    this.msg = '';

    this.submit = this.submit.bind(this);
  }

  submit() {
    this.ChatService.submitMessage(this.planId, this.msg).then(rdata => {
      console.log('Submitted message: ', this.msg, ' received: ', rdata);
      this.msg = '';
    });
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
