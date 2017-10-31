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
      for (const eventId in this.events) {
        this.http.get(`/api/comments/${eventId}`).then(resp => {
          this.events[eventId].comments = resp.data;
        });
      }
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



}
