import socket from 'socket.io-client';

export default class ChatService {
  constructor($http) {
    this.$inject = ['$http'];
    this.$http = $http;
    this.messages = [];
    this.planId = '';
    this.chatSocket = null;
  }

  setupChatSockets() {
    console.log('Setting up client sockets');
    this.socket = socket('/');
    this.socket.emit('enter plan-chat', this.planId);
  }

  submitMessage(message) {
    return this.$http.post(`/api/messages/${this.planId}`, {text: message})
      .then(resp => resp.data)
      .catch(err => console.log('Chat server error: ', err));
  }

  loadChat(planId) {
    this.planId = planId;
    this.setupChatSockets(planId);
    return this.$http.get(`/api/messages/${this.planId}`)
      .then(resp => this.messages = resp.data.reverse());
  }

  loadNewMessages() {
    const latest = this.messages[this.messages.length - 1].createdAt;
    return this.$http.get(`/api/messages/${this.planId}?after=${latest}`)
      .then(resp => this.messages = this.messages.concat(resp.data.reverse()))
      .catch(err => console.log('Chat server error: ', err));
  }

  loadOlderMessages() {
    const oldest = this.messages[0].createdAt;
    return this.$http.get(`/api/messages/${this.planId}?before=${oldest}`)
      .then(resp => this.messages = resp.data.reverse().concat(this.messages))
      .catch(err => console.log('Chat server error: ', err));
  }
}
