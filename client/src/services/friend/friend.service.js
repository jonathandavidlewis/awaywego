export default class FriendService {
  constructor($http) {
    this.$inject = ['$http'];
    this.friends = [];
    this.friendRequests = [];
  }

  loadFriends() {
    return this.$http.get('/api/friends').then(friends => {
      friends.forEach(friend => {
        if (friend.status === 'Accepted') {
          this.friends.push(friend);
        } else if (friend.status === 'Pending') {
          this.friendRequests.push(friend);
        }
      });
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
