export default class ChatService {
  constructor($http) {
    this.$inject = ['$http'];
    this.$http = $http;
    this.messages = [];
  }

  submitMessage(planId, message) {
    return this.$http.post(`/api/messages/${planId}`, {text: message})
      .then(resp => resp.data)
      .catch(err => console.log('Chat server error: ', err));
  }

  loadMessages(planId) {
    return this.$http.get(`/api/messages/${planId}`)
      .then(resp => this.messages = resp.data.reverse());
  }

  loadNewMessages(planId) {
    const latest = this.messages[this.messages.length - 1].createdAt;
    return this.$http.get(`/api/messages/${planId}?after=${latest}`)
      .then(resp => this.messages = this.messages.concat(resp.data.reverse()))
      .catch(err => console.log('Chat server error: ', err));
  }

  loadOlderMessages(planId) {
    const oldest = this.messages[0].createdAt;
    return this.$http.get(`/api/messages/${planId}?before=${oldest}`)
      .then(resp => this.messages = resp.data.reverse().concat(this.messages))
      .catch(err => console.log('Chat server error: ', err));
  }
}
