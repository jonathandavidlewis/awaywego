export default class FriendService {
  constructor($http) {
    this.$inject = ['$http'];
    this.friends = [];
    this.friendRequests = [];
    this.pendingFriends = [];
  }

  loadFriends() {
    return this.$http.get('/api/friends').then(friends => {
      friends.forEach(friend => {
        if (friend.status === 'accepted') {
          this.friends.push(friend);
        } else if (friend.status === 'pending') {
          this.friendRequests.push(friend);
        }
      });
    });
  }

  loadPendingFriends() {
    return this.$http.get('/api/friends/pending').then(pendingFriends => {
      this.pendingFriends = pendingFriends;
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
