export default class FriendService {
  constructor($http) {
    this.$inject = ['$http'];
    this.friendships = [];
    this.friendshipRequests = [];
    this.pendingFriendships = [];
  }

  // FriendsService data access methods
  getFriendships() { return this.friendships; }
  getPendingFriendRequests() { return this.pendingFriendships; }
  getSentRequests() { return this.friendshipRequests; }

  // Friends API support methods
  refreshFriends() {
    return this.$http.get('/api/friends').then(friends => {
      this.friendships = [];
      this.pendingFriendships = [];
      friends.forEach(friendship => {
        if (friendship.status === 'accepted') {
          this.friends.push(friendship);
        } else if (friendship.status === 'pending') {
          this.friendshipRequests.push(friendship);
        }
      });
    });
  }

  loadPendingFriends() {
    return this.$http.get('/api/friends/pending').then(pendingFriendships => {
      this.pendingFriendships = pendingFriendships;
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
}
