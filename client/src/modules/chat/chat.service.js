import socket from 'socket.io-client';

export default class ChatService {
  constructor($http, UserService) {
    this.$inject = ['$http', 'UserService'];
    this.$http = $http;
    this.UserService = UserService;
    this.messages = [];
    this.planId = '';
    this.chatSocket = null;
  }

  setupChatSockets() {
    this.socket = socket('/chat');
    this.socket.emit('id user', this.UserService.user);
    this.socket.emit('enter plan-chat', this.planId);
    this.socket.on('new message', () => {
      console.log('received new message event from socket');
      this.loadNewMessages();
    });
  }

  leaveChatRoom(planId) {
    this.socket.emit('leave plan-chat', planId);
  }

  submitMessage(message) {
    return this.$http.post(`/api/messages/${this.planId}`, {text: message})
      .then(resp => {
        this.socket.emit('new message', this.planId);
        return resp.data;
      }).catch(err => console.log('Chat server error: ', err));
  }

  loadChat(planId) {
    this.planId = planId;
    this.setupChatSockets();
    return this.$http.get(`/api/messages/${this.planId}`)
      .then(resp => this.messages = resp.data.reverse());
  }

  loadNewMessages() {
    const latest = this.messages[this.messages.length - 1].createdAt;
    return this.$http.get(`/api/messages/${this.planId}?after=${latest}`)
      .then(resp => {
        let newMsgs = resp.data.reverse();
        if (this.messages[this.messages.length - 1]._id !== newMsgs[newMsgs.length - 1]._id) {
          this.messages = this.messages.concat(newMsgs);
        }
      })
      .catch(err => console.log('Chat server error: ', err));
  }

  loadOlderMessages() {
    const oldest = this.messages[0].createdAt;
    return this.$http.get(`/api/messages/${this.planId}?before=${oldest}`)
      .then(resp => {
        let newMsgs = resp.data.reverse();
        if (this.messages[0]._id !== newMsgs[0]._id) { // protect against repeats
          this.messages = newMsgs.concat(this.messages);
        }
      })
      .catch(err => console.log('Chat server error: ', err));
  }

  startTyping() {
    this.socket.emit('started typing', this.planId, this.UserService.user.name);
  }

  stopTyping() {
    this.socket.emit('stopped typing', this.planId, this.UserService.user.name);
  }

}
