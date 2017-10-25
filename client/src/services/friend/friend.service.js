export default class FriendService {
  constructor($http, UserService) {
    this.$inject = ['$http', 'UserService'];
    this.$http = $http;
    this.UserService = UserService;
    this.friendships = [];
    this.sentReqs = [];
    this.inboundReqs = [];
  }

  // FriendsService data access methods
  getFriendships() { return this.friendships; }
  getSentReqs() { return this.sentReqs; }
  getInboundReqs() { return this.inboundReqs; }

  loadFriends() {
    return this.loadFriendsAndSent().then(() => this.loadInboundReqs());
  }

  // Friends API support methods
  loadFriendsAndSent() {
    return this.$http.get('/api/friends').then(resp => {
      this.friendships = [];
      this.sentReqs = [];
      resp.data.forEach(friendship => {
        if (friendship.status === 'accepted') {
          this.friendships.push(friendship);
        } else if (friendship.status === 'pending') {
          if (friendship.to) {
            this.sentReqs.push(friendship);
          } else {
            friendship.to = {_id: null, name: friendship.toEmail };
            this.sentReqs.push(friendship);
          }
        }
      });
    });
  }

  loadInboundReqs() {
    return this.$http.get('/api/friends/pending').then(resp => {
      this.inboundReqs = resp.data;
    });
  }

  // TODO: identify and implement out appropriate error handling
  newFriendRequest(friendId) {
    return this.$http.post(`/api/friends/new/${friendId}`).then(() => this.loadFriends());
  }

  inviteFriend(email) {
    return this.$http.post('/api/friends/invite', {toEmail: email}).then(() => this.loadFriends());
  }

  acceptFriendRequest(frId) {
    return this.$http.put(`/api/friends/accept/${frId}`).then(() => this.loadFriends());
  }

  rejectFriendRequest(frId) {
    return this.$http.put(`/api/friends/reject/${frId}`).then(() => this.loadFriends());
  }

  cancelFriendRequest(frId) {
    return this.$http.put(`/api/friends/cancel/${frId}`).then(() => this.loadFriends());
  }

  findUserByEmail(email) {
    let friend = this.$http.get(`/api/friends/find/${encodeURI(email)}`);
    return friend.then(resp => resp.data).catch(err => {
      if (err.status === 404 && err.data === 'user_not_found') { return false; }
    });
  }

  findFriend(email) {
    email = email.toLowerCase();

    const alreadyFriends = this.friendships.find(fr => fr.to.email.toLowerCase() === email);
    if (alreadyFriends) { return {status: 'friends', fr: alreadyFriends }; }

    const sentFriendReq = this.sentReqs.find(fr => {
      return ( (fr.to.email && fr.to.email.toLowerCase() === email) ||
              (fr.toEmail && fr.toEmail.toLowerCase() === email) );
    });
    if (sentFriendReq) { return {status: 'sent', fr: sentFriendReq}; }

    const inboundReq = this.inboundReqs.find(fr => fr.from.email.toLowerCase() === email);
    if (inboundReq) { return {status: 'pending', fr: inboundReq}; }

    const isSelf = email === this.UserService.user.email.toLowerCase();
    if (isSelf) { return {status: 'self'}; }
    return false;
  }
}
