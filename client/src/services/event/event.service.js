import socket from 'socket.io-client';

export default class EventService {
  constructor($http, $rootScope, UserService) {
    this.$inject = ['$http', '$rootScope', 'UserService'];
    this.user = UserService.user;
    this.http = $http;
    this.rootScope = $rootScope;
    this.events = {};
    this.ideas = [];
    this.feed = [];
    this.eventSocket = null;

    // HELPER METHODS to debug, remove when done!
    // window.evs = this;
    // window.triggerDigest = () => this.rootScope.$apply();
    // window.upvoteEvent = (userId) => {
    //   this.events['59f27698be6a1c024291e684'].upVotes.push(userId);
    //   window.triggerDigest();
    // };
  }

  //===========  SOCKET LOGIC ===========\\

  setupEventSocket(planId) {
    if (this.eventSocket) { this.eventSocket.disconnect(); }
    this.eventSocket = socket('/events');
    this.eventSocket.on('id yourself', () => {
      this.eventSocket.emit('id user', user);
    });
    this.eventSocket.on('pick room', () => {
      this.eventSocket.emit('enter plan-events', planId);
    });

    this.eventSocket.on('new event', event => this.handleNewEvent(event));
    this.eventSocket.on('update event', event => this.handleUpdateEvent(event));
    this.eventSocket.on('scheduled event', event => this.handleUpdateEvent(event));
    this.eventSocket.on('unscheduled event', event => this.handleUpdateEvent(event));
  }

  handleNewEvent(event) {
    if (this.events[event._id]) { // we already have it, need to update instead!
      this.handleUpdateEvent(event);
    } else {
      this.events[event._id] = event;
      if (event.status === 'idea') {
        this.ideas.push(event);
      } else if (event.status === 'feed') {
        this.feed.push(event);
      }
    }
    this.rootScope.$apply();
  }

  handleUpdateEvent(event) {
    if (!this.events[event._id]) {
      this.handleNewEvent(event);
    } else {
      this.events[event._id] = event;
      const ideaIndex = this.ideas.findIndex(ev => ev._id === event._id);
      const feedIndex = this.feed.findIndex(ev => ev._id === event._id);
      if (event.status === 'idea') {
        if (ideaIndex > -1) {
          this.ideas[ideaIndex] = event;
        } else {
          this.ideas.push(event);
        }
        if (feedIndex > -1) { this.feed.splice(feedIndex, 1); }
      } else if (event.status === 'feed') {
        if (feedIndex > -1) {
          this.feed[feedIndex] = event;
        } else {
          this.feed.push(event);
        }
        if (ideaIndex > -1) { this.ideas.splice(ideaIndex, 1); }
      }
    }
    this.rootScope.$apply();
  }

  //===========  EVENT LOGIC ===========\\

  loadEventsByPlanId(planId) {
    this.setupEventSocket(planId);
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

  submitNewEvent(event) {
    return this.http.post('/api/event', event).then(resp => {
      this.eventSocket.emit('new event in plan',
        {plan: event.planId, event: event});
    });
  }

  updateEvent(eventId, updatedEvent) {
    if (typeof eventId === 'object' && updatedEvent === undefined) {
      updatedEvent = eventId;
      eventId = updatedEvent._id;
    }
    return this.http.put(`/api/event/${eventId}`, updatedEvent)
      .then(updatedEvent => {
        this.eventSocket.emit('updated event in plan',
          {plan: updatedEvent.planId, event: updatedEvent});
      });
  }

  deleteEvent(eventId) { return this.http.delete(`/api/event/${eventId}`); }

  promoteEvent(event) {
    return this.http.put(`api/event/${event._id}/promote`, event)
      .then(updatedEvent => {
        this.eventSocket.emit('updated event in plan',
          {plan: updatedEvent.planId, event: updatedEvent});
      });
  }

  demoteEvent(eventId) {
    return this.http.put(`api/event/${eventId}/demote`)
      .then(updatedEvent => {
        this.eventSocket.emit('updated event in plan',
          {plan: updatedEvent.planId, event: updatedEvent});
      });
  }

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
