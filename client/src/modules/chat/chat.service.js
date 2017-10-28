/* TEST DATA */
const TEST_PIC = 'https://scontent-lht6-1.xx.fbcdn.net/v/t1.0-1/p60x60/14102574_4212030509528_4345377398150371828_n.jpg?oh=b30f6799517df26913171d389d0968d4&oe=5A770C38';
const USER1 = {name: 'Jared', profilePic: TEST_PIC, _id: '59eab261b5bfd445187eee13'};
const USER2 = {name: 'Bob', profilePic: TEST_PIC, _id: '59eab261b5bfd4451asdfee13'};
const TEST_PLAN = '59f249a062674182aa701853';

const TEST_MSGS = [
  {planId: TEST_PLAN, user: USER1, text: 'Hello Bob!', createdAt: '2017-10-27T23:17:06.416Z'},
  {planId: TEST_PLAN, user: USER2, text: 'Hello Jared!', createdAt: '2017-10-27T23:18:07.416Z'},
  {planId: TEST_PLAN, user: USER2, text: 'Hows life?', createdAt: '2017-10-27T23:19:08.416Z'},
  {planId: TEST_PLAN, user: USER1, text: 'Not bad, really enjoying learning AngularJS all over again, its so amazing, how many different lines of code to write something silly simple in React... lol... how about you?', createdAt: '2017-10-28T00:14:09.416Z'},
];

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
