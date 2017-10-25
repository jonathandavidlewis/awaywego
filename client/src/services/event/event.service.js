// let TEST_DATA = [
//   {
//     planId: 'hg5687h5834657h6',
//     title: 'John\'s best BBQ',
//     startTime: '2016-05-18T16:00:00Z',
//     endTime: '2016-05-18T16:00:00Z',
//     description: 'We will have a ton of fun at this park...',
//     imageUrl: 'https://d36tnp772eyphs.cloudfront.net/blogs/1/2014/08/Smith-Rock-940x595.jpg',
//     status: 'itinerary'
//   },
//   {
//     planId: 'hg5687h5834657h6',
//     title: 'John\'s second best BBQ',
//     startTime: '2016-05-18T16:00:00Z',
//     description: 'We will have a ton of fun at this park...',
//     imageUrl: 'https://d36tnp772eyphs.cloudfront.net/blogs/1/2014/08/Smith-Rock-940x595.jpg',
//     status: 'itinerary'
//   },
//   {
//     planId: 'hg5687h5834657h6',
//     title: 'John\'s third best BBQ',
//     startTime: '2016-05-18T16:00:00Z',
//     endTime: '2016-05-18T16:00:00Z',
//     description: 'We will have a ton of fun at this park...',
//     imageUrl: 'https://d36tnp772eyphs.cloudfront.net/blogs/1/2014/08/Smith-Rock-940x595.jpg',
//     status: 'idea'
//   },
//   {
//     planId: 'hg5687h5834657h6',
//     title: 'John\'s fourth best BBQ',
//     startTime: '2016-05-18T16:00:00Z',
//     endTime: '2016-05-18T16:00:00Z',
//     description: 'We will have a ton of fun at this park...',
//     imageUrl: 'https://d36tnp772eyphs.cloudfront.net/blogs/1/2014/08/Smith-Rock-940x595.jpg',
//     status: 'idea',
//   }
// ];


export default class EventService {
  constructor($http) {
    this.$inject = ['$http'];
    this.$http = $http;
  }

  loadEventsByPlanId(planId) { return this.$http.get(`/api/event/${planId}`).then(response => this.events = response.data); }

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
