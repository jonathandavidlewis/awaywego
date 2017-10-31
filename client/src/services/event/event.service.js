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
    window.evs = this;
    window.triggerDigest = () => this.rootScope.$apply();
    window.upvoteEvent = (userId) => {
      this.events['59f27698be6a1c024291e684'].upVotes.push(userId);
      window.triggerDigest();
    };
  }

  //===========  SOCKET LOGIC ===========\\

  setupEventSocket(planId) {
    if (this.eventSocket) { this.eventSocket.disconnect(); }
    this.eventSocket = socket('/events');
    this.eventSocket.on('id yourself', () => {
      this.eventSocket.emit('id user', this.user);
    });
    this.eventSocket.on('pick room', () => {
      this.eventSocket.emit('enter plan-events', planId);
    });

    this.eventSocket.on('new event', event => this.handleNewEvent(event, true));
    this.eventSocket.on('update event', event => this.handleUpdateEvent(event, true));
    this.eventSocket.on('scheduled event', event => this.handleUpdateEvent(event, true));
    this.eventSocket.on('unscheduled event', event => this.handleUpdateEvent(event, true));
    this.eventSocket.on('removed event', event => this.handleRemoveEvent(event, true));
  }

  handleNewEvent(event, digest) {
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
    if (digest) { this.rootScope.$apply(); }
  }

  handleUpdateEvent(event, digest) {
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
    if (digest) { this.rootScope.$apply(); }
  }

  handleRemoveEvent(event, digest) {
    if (this.events[event._id]) {
      const ideaIndex = this.ideas.findIndex(ev => ev._id === event._id);
      if (ideaIndex > -1) { this.ideas.splice(ideaIndex, 1); }
      const feedIndex = this.feed.findIndex(ev => ev._id === event._id);
      if (feedIndex > -1) { this.feed.splice(feedIndex, 1); }
      delete this.events[event._id];
      if (digest) { this.rootScope.$apply(); }
    }
  }

  //===========  EVENT LOGIC ===========\\

  loadEventsByPlanId(planId) {
    this.setupEventSocket(planId);
    return this.http.get(`/api/event/inplan/${planId}`).then(resp => {
      this.events = {};
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
      this.handleNewEvent(resp.data, false);
      this.eventSocket.emit('new event in plan',
        {plan: resp.data.planId, event: resp.data});
    });
  }

  updateEvent(eventId, updatedEvent) {
    if (typeof eventId === 'object' && updatedEvent === undefined) {
      updatedEvent = eventId;
      eventId = updatedEvent._id;
    }
    return this.http.put(`/api/event/${eventId}`, updatedEvent)
      .then(resp => {
        this.eventSocket.emit('updated event in plan',
          {plan: resp.data.planId, event: resp.data});
      });
  }

  deleteEvent(eventId) {
    return this.http.delete(`/api/event/${eventId}`).then(resp => {
      this.eventSocket.emit('removed event in plan',
        {plan: resp.data.planId, event: resp.data});
    });
  }

  promoteEvent(event) {
    return this.http.put(`api/event/${event._id}/promote`, event)
      .then(resp => {
        this.eventSocket.emit('scheduled event in plan',
          {plan: resp.data.planId, event: resp.data});
      });
  }

  demoteEvent(eventId) {
    return this.http.put(`api/event/${eventId}/demote`)
      .then(resp => {
        this.eventSocket.emit('unscheduled event in plan',
          {plan: resp.data.planId, event: resp.data});
      });
  }

  downvoteEvent(eventId) {
    return this.http.put(`api/event/${eventId}/downvote`).then(resp => {
      this.events[eventId] = resp.data;
      this.eventSocket.emit('updated event in plan',
        {plan: resp.data.planId, event: resp.data});
    });
  }

  upvoteEvent(eventId) {
    return this.http.put(`api/event/${eventId}/upvote`).then(resp => {
      this.events[eventId] = resp.data;
      this.eventSocket.emit('updated event in plan',
        {plan: resp.data.planId, event: resp.data});
    });
  }

  //=========== COMMENT LOGIC ===========\\

  getCommentsForEvent(eventId) {
    return this.http.get(`/api/comments/${eventId}`).then(resp => {
      this.events[eventId].comments = resp.data.reverse();
    });
  }

  postCommentForEvent(eventId, comment) {
    return this.http.post(`/api/comments/${eventId}`, {text: comment}).then(resp => {
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
