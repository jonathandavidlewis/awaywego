export default class FriendService {
  constructor($http) {
    this.$inject = ['$http'];
    this.$http = $http;
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
    return this.$http.post(`/api/friends/new/${friendId}`);
  }

  inviteFriend(email) {
    console.log('inviting user: ', email);
    return this.$http.post('/api/friends/invite', {toEmail: email});
  }

  acceptFriendRequest(frId) {
    return this.$http.put(`/api/friends/accept/${frId}`);
  }

  rejectFriendRequest(frId) {
    return this.$http.put(`/api/friends/reject/${frId}`);
  }

  cancelFriendRequest(frId) {
    return this.$http.put(`/api/friends/cancel/${frId}`);
  }

  findFriendByEmail(email) {
    let friend = this.$http.get(`/api/friends/find/${encodeURI(email)}`);
    return friend.then(resp => resp.data).catch(err => {
      if (err.status === 404 && err.data === 'user_not_found') { return false; }
    });
  }

}
