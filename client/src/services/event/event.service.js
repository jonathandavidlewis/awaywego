export default class EventService {
  constructor($http) {
    this.$inject = ['$http'];
    this.http = $http;
    this.events = {};
  }


  //===========  EVENT LOGIC ===========\\

  loadEventsByPlanId(planId) {
    return this.http.get(`/api/event/inplan/${planId}`).then(resp => {
      resp.data.forEach(event => this.events[event._id] = event);
      // don't wait on loading comments to consider events loaded
      for (const eventId in this.events) { this.getCommentsForEvent(eventId); }
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

  downvoteEvent(eventId) { return this.http.put(`api/event/${eventId}/downvote`); }

  upvoteEvent(eventId) { return this.http.put(`api/event/${eventId}/upvote`); }

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
      this.events[eventId].splice(toRemove, 1);
    });
  }
}
