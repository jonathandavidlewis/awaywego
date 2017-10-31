import socket from 'socket.io-client';

export default class ChatService {
  constructor($http, UserService, $rootScope) {
    this.$inject = ['$http', 'UserService', '$rootScope'];
    this.http = $http;
    this.rootScope = $rootScope;
    this.UserService = UserService;
    this.messages = [];
    this.usersTyping = [];
    this.planId = '';
    this.socket = null;
  }

  setupChatSockets() {
    this.socket = socket('/chat');
    this.socket.on('id yourself', () => {
      this.socket.emit('id user', this.UserService.user);
    });
    this.socket.on('pick room', () => {
      this.socket.emit('enter plan-chat', this.planId);
    });
    this.socket.on('new message', () => this.loadNewMessages());
    this.socket.on('users typing', usersTyping => {
      this.usersTyping = usersTyping;
      this.rootScope.$apply();
    });
  }

  closeChatSocket() { this.socket.disconnect(); }

  startTyping() { this.socket.emit('started typing', this.planId); }

  stopTyping() { this.socket.emit('stopped typing', this.planId); }

  submitMessage(message) {
    return this.http.post(`/api/messages/${this.planId}`, {text: message})
      .then(resp => {
        this.socket.emit('new message', this.planId);
        return resp.data;
      }).catch(err => console.log('Chat server error: ', err));
  }

  loadChat(planId) {
    this.planId = planId;
    this.setupChatSockets();
    return this.http.get(`/api/messages/${this.planId}`)
      .then(resp => this.messages = resp.data.reverse());
  }

  loadNewMessages() {
    const latest = this.messages[this.messages.length - 1].createdAt;
    return this.http.get(`/api/messages/${this.planId}?after=${latest}`)
      .then(resp => {
        let newMsgs = resp.data.reverse();
        if (this.messages[this.messages.length - 1]._id !== newMsgs[newMsgs.length - 1]._id) {
          this.messages = this.messages.concat(newMsgs);
        }
      }).catch(err => console.log('Chat server error: ', err));
  }

  loadOlderMessages() {
    const oldest = this.messages[0].createdAt;
    return this.http.get(`/api/messages/${this.planId}?before=${oldest}`)
      .then(resp => {
        if (resp.data.length) {
          let newMsgs = resp.data.reverse();
          if (this.messages[0]._id !== newMsgs[0]._id) { // protect against repeats
            this.messages = newMsgs.concat(this.messages);
          }
        }
      }).catch(err => console.log('Chat server error: ', err));
  }
}
