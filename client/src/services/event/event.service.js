export default class EventService {
  constructor($http, $rootScope) {
    this.$inject = ['$http', '$rootScope'];
    this.http = $http;
    this.rootScope = $rootScope;
    this.events = {};
    this.ideas = [];
    this.feed = [];

    // HELPER METHODS to debug, remove when done!
    // window.evs = this;
    // window.triggerDigest = () => this.rootScope.$apply();
    // window.upvoteEvent = (userId) => {
    //   this.events['59f27698be6a1c024291e684'].upVotes.push(userId);
    //   window.triggerDigest();
    // };
  }

  //===========  EVENT LOGIC ===========\\

  loadEventsByPlanId(planId) {
    return this.http.get(`/api/event/inplan/${planId}`).then(resp => {
      this.ideas = [];
      this.feed = [];
      resp.data.forEach(event => {
        this.events[event._id] = event;
        if (event.status === 'idea') { this.ideas.push(event); }
      });
      for (const eventId in this.events) { this.getCommentsForEvent(eventId); }
    });
  }

  refreshEvent(eventId) {
    return this.http.get(`/api/event/${eventId}`).then(resp => {
      this.events[eventId] = resp.data;
    });
  }

  getEvent(eventId) { return this.events[eventId]; }

  submitNewEvent(event) { return this.http.post('/api/event', event); }

  updateEvent(eventId, updatedEvent) {
    if (typeof eventId === 'object' && updatedEvent === undefined) {
      updatedEvent = eventId;
      eventId = updatedEvent._id;
    }
    return this.http.put(`/api/event/${eventId}`, updatedEvent);
  }

  deleteEvent(eventId) { return this.http.delete(`/api/event/${eventId}`); }

  promoteEvent(event) { return this.http.put(`api/event/${event._id}/promote`, event); }

  demoteEvent(eventId) { return this.http.put(`api/event/${eventId}/demote`); }

  downvoteEvent(eventId) {
    return this.http.put(`api/event/${eventId}/downvote`).then(resp => {
      this.events[eventId] = resp.data;
    });
  }

  upvoteEvent(eventId) {
    return this.http.put(`api/event/${eventId}/upvote`).then(resp => {
      this.events[eventId] = resp.data;
    });
  }

  //=========== COMMENT LOGIC ===========\\

  getCommentsForEvent(eventId) {
    return this.http.get(`/api/comments/${eventId}`).then(resp => {
      this.events[eventId].comments = resp.data.reverse();
    });
  }

  postCommentForEvent(eventId, comment) {
    return this.http.post(`/api/comments/${eventId}`, comment).then(resp => {
      this.events[eventId].comments.push(resp.data);
    });
  }

  updateCommentForEvent(eventId, commentId, newText) {
    return this.http.put(`/api/comments/${eventId}/${commentId}`, {text: newText})
      .then(resp => {
        const newComment = resp.data;
        const oldComment = this.events[eventId].comments.find(c => c._id === commentId);
        oldComment.text = newComment.text;
        oldComment.updatedAt = newComment.updatedAt;
      });
  }

  removeCommentForEvent(eventId, commentId) {
    return this.http.delete(`/api/comments/${eventId}/${commentId}`).then(resp => {
      const toRemove = this.events[eventId].comments.findIndex(c => c._id === commentId);
      this.events[eventId].comments.splice(toRemove, 1);
    });
  }
}
