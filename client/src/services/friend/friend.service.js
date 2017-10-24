export default class FriendService {
  constructor($http) {
    this.$inject = ['$http'];
    this.$http = $http;
    this.friendships = [];
    this.friendshipRequests = [];
    this.pendingFriendships = [];
  }

  // FriendsService data access methods
  getFriendships() { return this.friendships; }
  getPendingFriendRequests() { return this.pendingFriendships; }
  getSentRequests() { return this.friendshipRequests; }

  loadFriends() {
    return this.loadFriendsAndSents().then(() => this.loadPendingRequests());
  }

  // Friends API support methods
  loadFriendsAndSents() {
    return this.$http.get('/api/friends').then(resp => {
      this.friendships = [];
      this.friendshipRequests = [];
      resp.data.forEach(friendship => {
        if (friendship.status === 'accepted') {
          this.friendships.push(friendship);
        } else if (friendship.status === 'pending') {
          this.friendshipRequests.push(friendship);
        }
      });
    });
  }

  loadPendingRequests() {
    return this.$http.get('/api/friends/pending').then(resp => {
      this.pendingFriendships = resp.data;
    });
  }

  // TODO: identify and implement out appropriate error handling
  newFriendRequest(friendId) {
    return this.$http.post(`/api/friends/new/${friendId}`);
  }

  inviteFriend(email) {
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
