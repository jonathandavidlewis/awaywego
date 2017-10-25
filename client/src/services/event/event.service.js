export default class EventService {
  constructor($http) {
    this.$inject = ['$http'];
    this.$http = $http;
    this.events = [];
  }

  loadEventsByPlanId(planId) {
    return this.$http.get(`/api/event/${planId}`).then(response => {
      return this.events = response.data;
    });
  }

  getEvent(eventId) { return this.events.find(event => event._id === eventId); }

  submitNewEvent(event) { return this.$http.post('/api/event', event); }

  updateEvent(eventId, updatedEvent) {
    if (typeof eventId === 'object' && updatedEvent === undefined) {
      updatedEvent = eventId;
      eventId = updatedEvent._id;
    }
    return this.$http.put(`/api/event/${eventId}`, updatedEvent);
  }

  deleteEvent(eventId) { return this.$http.delete(`/api/event/${eventId}`); }

  promoteEvent(eventId) { return this.$http.put(`api/event/${eventId}/promote`); }

  demoteEvent(eventId) { return this.$http.put(`api/event/${eventId}/demote`); }

  downvoteEvent(eventId) { return this.$http.put(`api/event/${eventId}/downvote`); }

  upvoteEvent(eventId) { return this.$http.put(`api/event/${eventId}/upvote`); }

}
