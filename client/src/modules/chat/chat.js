import angular from 'angular';
import _ from 'lodash';

// components for this module
import ChatMessageComponent from './chat-message/chat-message';
import ChatInputComponent from './chat-input/chat-input';
import ChatService from './chat.service';
import RepeatCompleteDirective from './repeat-complete.directive';
import ChatTypingFilter from './chat-typing.filter';

// imports for this component
import template from './chat.html';
import './chat.css';

class ChatController {
  constructor(ChatService, PlanService, UserService, $element, $timeout, $interval) {
    // services
    this.ChatService = ChatService;
    this.PlanService = PlanService;
    this.planId = PlanService.currentPlan._id;
    this.UserService = UserService;
    this.timeout = $timeout;

    this.messagesContainer = $element.find('.chat-messages-container');
    this.msgsEl = this.messagesContainer[0];
    this.isScrolledToBottom = true;

    this.msg = '';
    this.isTyping = false;

    this.submit = this.submit.bind(this);
    this.messagesContainer.on('scroll', _.throttle(this.watchScroll.bind(this), 200));
    this.renderedMessages = this.renderedMessages.bind(this);
    this.handleTyping = this.handleTyping.bind(this);

    this.debStopTyping = _.debounce(this.stopTyping.bind(this), 1500);
  }


  //==== chat room comms ====\\
  submit() { this.ChatService.submitMessage(this.msg).then(() => this.msg = ''); }
  $onDestroy() { this.ChatService.closeChatSocket(this.planId); }

  handleTyping(event) {
    if (event.key === 'Enter') {
      this.submit();
      this.stopTyping();
    } else {
      if (this.isTyping) {
        this.debStopTyping();
      } else {
        this.isTyping = true;
        this.startTyping();
      }
    }
  }

  startTyping() {
    this.ChatService.startTyping();
  }

  stopTyping() {
    this.ChatService.stopTyping();
    this.isTyping = false;
  }

  //===== messages container scroll management =====\\
  watchScroll() {
    this.isScrolledToBottom = (this.msgsEl.scrollTop + this.msgsEl.offsetHeight) === this.msgsEl.scrollHeight;
    if (this.msgsEl.scrollTop === 0) { // stick to earliest message on history upload
      const currentFirstMessage = this.msgsEl.children[0];
      this.ChatService.loadOlderMessages().then(() => {
        this.timeout(()=>currentFirstMessage.scrollIntoView());
      });
    }
  }

  renderedMessages() {
    if (this.isScrolledToBottom) { this.scrollToBottom(); }
  }

  scrollToBottom() {
    this.msgsEl.children[this.msgsEl.children.length - 1].scrollIntoView();
  }

}
ChatController.$inject = ['ChatService', 'PlanService', 'UserService', '$element', '$timeout'];

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
  .component('chatInput', ChatInputComponent)
  .directive('repeatComplete', RepeatCompleteDirective)
  .filter('chatTyping', ChatTypingFilter);

export default ChatModule.name;
