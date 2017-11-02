import socket from 'socket.io-client';

export default class ChatService {
  constructor($http, UserService, $rootScope) {
    this.$inject = ['$http', 'UserService', '$rootScope'];
    this.http = $http;
    this.rootScope = $rootScope;
    this.UserService = UserService;
    this.messages = [];
    this.usersTyping = [];
    this.groupId = '';
    this.socket = null;
  }

  setupChatSockets() {
    this.socket = socket('/chat');
    this.socket.on('id yourself', () => {
      this.socket.emit('id user', this.UserService.user);
    });
    this.socket.on('pick room', () => {
      this.socket.emit('enter group-chat', this.groupId);
    });
    this.socket.on('new message', () => this.loadNewMessages());
    this.socket.on('users typing', usersTyping => {
      this.usersTyping = usersTyping;
      this.rootScope.$apply();
    });
  }

  closeChatSocket() { this.socket.disconnect(); }

  startTyping() { this.socket.emit('started typing', this.groupId); }

  stopTyping() { this.socket.emit('stopped typing', this.groupId); }

  submitMessage(message) {
    return this.http.post(`/api/messages/group/${this.groupId}`, {text: message})
      .then(resp => {
        this.socket.emit('new message', this.groupId);
        return resp.data;
      }).catch(err => console.log('Chat server error: ', err));
  }

  loadChat(groupId) {
    this.groupId = groupId;
    this.setupChatSockets();
    return this.http.get(`/api/messages/group/${this.groupId}`)
      .then(resp => this.messages = resp.data.reverse());
  }

  getMessages() {
    return this.http.get(`/api/messages/group/${this.groupId}`)
      .then(resp => this.messages = resp.data.reverse());
  }

  loadNewMessages() {
    if (!this.messages.length) { return this.getMessages(); }
    const latest = this.messages[this.messages.length - 1].createdAt;
    return this.http.get(`/api/messages/group/${this.groupId}?after=${latest}`)
      .then(resp => {
        let newMsgs = resp.data.reverse();
        if (this.messages[this.messages.length - 1]._id !== newMsgs[newMsgs.length - 1]._id) {
          this.messages = this.messages.concat(newMsgs);
        }
      }).catch(err => console.log('Chat server error: ', err));
  }

  loadOlderMessages() {
    const oldest = this.messages[0].createdAt;
    return this.http.get(`/api/messages/group/${this.groupId}?before=${oldest}`)
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
