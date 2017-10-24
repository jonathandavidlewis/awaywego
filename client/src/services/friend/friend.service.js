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
}
