export default class GroupService {
  constructor($http) {
    this.$inject = ['$http'];
    this.$http = $http;
    this.groups = [];
    this.currentGroup = null;
  }

  submitNewGroup(group) { return this.$http.post('/api/group', group); }

  loadGroupById(groupId) {
    if (this.groups.length) {
      this.currentGroup = this.groups.find(group => group._id === groupId);
      if (this.currentGroup) { return this.currentGroup; }
    } else {
      return this.getGroupById(groupId).then(group => this.currentGroup = group);
    }

  }

  getGroupById(groupId) {
    return this.$http.get(`/api/group/${groupId}`).then(resp => resp.data);
  }

  deleteGroupById(groupId) {
    return this.$http.delete(`/api/group/${groupId}`);
  }

  getAllGroups() {
    return this.$http.get('/api/group/').then((response => {
      this.groups = response.data;
      return response.data;
    }));
  }

  removeMemberFromCurrentGroup(userId) {
    return this.$http.put(`/api/group/${this.currentGroup._id}/members/remove/${userId}`)
      .then(resp => this.currentGroup = resp.data);
  }

  addMembersToCurrentGroup(members) {
    return this.$http.put(`/api/group/${this.currentGroup._id}/members/add`, {members})
      .then(resp => this.currentGroup = resp.data);
  }

}
