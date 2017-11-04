export default class GroupService {
  constructor($http, UserService) {
    this.$inject = ['$http', 'UserService'];
    this.http = $http;
    this.UserService = UserService;
    this.groups = [];
    this.currentGroup = null;
  }

  submitNewGroup(group) {
    return this.http.post('/api/group', group).then(resp => {
      this.groups.push(resp.data);
    });
  }

  loadGroupById(groupId) {
    if (this.groups.length) {
      this.currentGroup = this.groups.find(group => group._id === groupId);
      if (this.currentGroup) { return this.currentGroup; }
    } else {
      return this.getGroupById(groupId).then(group => this.currentGroup = group);
    }
  }

  getGroupById(groupId) {
    return this.http.get(`/api/group/${groupId}`).then(resp => resp.data);
  }

  deleteGroupById(groupId) {
    return this.http.delete(`/api/group/${groupId}`).then(() => {
      const ind = this.groups.findIndex(g => g._id === groupId);
      if (ind > -1) { this.groups.splice(ind, 1); }
    });
  }

  getAllGroups() {
    return this.http.get('/api/group/').then((resp => {
      this.groups = resp.data;
      return resp.data;
    }));
  }

  removeMemberFromCurrentGroup(userId) {
    return this.http.put(`/api/group/${this.currentGroup._id}/members/remove/${userId}`)
      .then(resp => this.currentGroup = resp.data);
  }

  addMembersToCurrentGroup(members) {
    return this.http.put(`/api/group/${this.currentGroup._id}/members/add`, {members})
      .then(resp => this.currentGroup = resp.data);
  }

  leaveGroup(groupId) {
    return this.http.put(`/api/group/${groupId}/members/remove/${this.UserService.user.id}`)
      .then(() => {
        const ind = this.groups.findIndex(g => g._id === groupId);
        if (ind > -1) { this.groups.splice(ind, 1); }
      });
  }

}
