import socket from 'socket.io-client';

export default class EventService {
  constructor($http, $rootScope, UserService, MomentService) {
    this.$inject = ['$http', '$rootScope', 'UserService', 'MomentService'];
    this.user = UserService.user;
    this.moment = MomentService.moment;
    this.http = $http;
    this.rootScope = $rootScope;
    this.events = {};
    this.comments = {};
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

  setupEventSocket(groupId) {
    if (this.eventSocket) { this.eventSocket.disconnect(); }
    this.eventSocket = socket('/events');
    this.eventSocket.on('id yourself', () => {
      this.eventSocket.emit('id user', this.user);
    });
    this.eventSocket.on('pick room', () => {
      this.eventSocket.emit('enter group-events', groupId);
    });

    this.eventSocket.on('new event', event => this.handleNewEvent(event, true));
    this.eventSocket.on('update event', event => this.handleUpdateEvent(event, true));
    this.eventSocket.on('scheduled event', event => this.handleUpdateEvent(event, true));
    this.eventSocket.on('unscheduled event', event => this.handleUpdateEvent(event, true));
    this.eventSocket.on('removed event', event => this.handleRemoveEvent(event, true));
    this.eventSocket.on('new comment', comment => this.handleNewComment(comment, true));
    this.eventSocket.on('updated comment', comment => this.handleUpdateComment(comment, true));
    this.eventSocket.on('removed comment', ({eventId, commentId}) => this.handleRemoveComment(eventId, commentId, true));
  }

  handleNewEvent(event, digest) {
    if (this.events[event._id]) { // we already have it, need to update instead!
      this.handleUpdateEvent(event, true);
    } else {
      this.events[event._id] = event;
      if (event.status === 'idea') {
        this.ideas.push(event);
      } else if (event.status === 'event') {
        this.feed.push(event);
      }
      if (digest) { this.rootScope.$apply(); }
    }
  }

  handleUpdateEvent(event, digest) {
    if (!this.events[event._id]) {
      this.handleNewEvent(event, true);
    } else {
      this.events[event._id] = event;
      const ideaIndex = this.ideas.findIndex(ev => ev._id === event._id);
      const feedIndex = this.feed.findIndex(ev => ev._id === event._id);
      if (event.status === 'idea') {
        if (ideaIndex > -1) {
          this.ideas[ideaIndex] = event;
        } else {
          this.ideas.push(event);
        } // remove from feed if now an unscheduled idea
        if (feedIndex > -1) { this.feed.splice(feedIndex, 1); }
      } else if (event.status === 'event') {
        if (feedIndex > -1) {
          this.feed[feedIndex] = event;
        } else {
          this.feed.push(event);
        } // remove from ideas if now a scheduled event
        if (ideaIndex > -1) { this.ideas.splice(ideaIndex, 1); }
      }
      if (digest) { this.rootScope.$apply(); }
    }
  }

  handleRemoveEvent(event, digest) {
    if (this.events[event._id]) {
      const ideaIndex = this.ideas.findIndex(ev => ev._id === event._id);
      if (ideaIndex > -1) { this.ideas.splice(ideaIndex, 1); }
      const feedIndex = this.feed.findIndex(ev => ev._id === event._id);
      if (feedIndex > -1) { this.feed.splice(feedIndex, 1); }
      delete this.events[event._id];
      delete this.comments[event._id];
      if (digest) { this.rootScope.$apply(); }
    }
  }

  handleNewComment(comment, digest) {
    if (!this.comments[comment.eventId]) {
      this.comments[comment.eventId] = [comment];
    } else {
      this.comments[comment.eventId].push(comment);
    }
    if (digest) { this.rootScope.$apply(); }
  }

  handleUpdateComment(comment, digest) {
    const updates = comment;
    let toUpdate = this.comments[comment.eventId].find(c => c._id === commentId);
    toUpdate.text = updates.text;
    toUpdate.updatedAt = updates.updatedAt;
    if (digest) { this.rootScope.$apply(); }
  }

  handleRemoveComment(eventId, commentId, digest) {
    const commentIndex = this.comments[eventId].findIndex(c => c._id === commentId);
    if (commentIndex > -1) {
      this.comments[eventId].splice(commentIndex, 1);
    }
    if (digest) { this.rootScope.$apply(); }
  }



  //===========  EVENT LOGIC ===========\\

  loadEventsByGroupId(groupId) {
    this.setupEventSocket(groupId);
    return this.http.get(`/api/event/group/${groupId}`).then(resp => {
      this.events = {};
      this.ideas = [];
      this.feed = [];
      resp.data.forEach(event => {
        this.events[event._id] = event;
        if (event.status === 'idea') { this.ideas.push(event); }
        if (event.status === 'event') { this.feed.push(event); }
      });
      for (const eventId in this.events) { this.getCommentsForEvent(eventId); }
    });
  }

  refreshEvent(eventId) {
    return this.http.get(`/api/event/${eventId}`).then(resp => {
      this.handleUpdateEvent(resp.data, false);
    });
  }

  getEvent(eventId) { return this.events[eventId]; }

  submitNewEvent(event) {
    return this.http.post('/api/event', event).then(resp => {
      this.handleNewEvent(resp.data, false);
      this.eventSocket.emit('new event in group',
        {group: resp.data.groupId, event: resp.data});
    });
  }

  submitScheduledEvent(event) {
    return this.http.post('/api/event/new', event).then(resp => {
      this.handleNewEvent(resp.data, false);
      this.eventSocket.emit('scheduled event in group',
        {group: resp.data.groupId, event: resp.data});
    });
  }

  updateEvent(eventId, updatedEvent) {
    if (typeof eventId === 'object' && updatedEvent === undefined) {
      updatedEvent = eventId;
      eventId = updatedEvent._id;
    }
    return this.http.put(`/api/event/${eventId}`, updatedEvent)
      .then(resp => {
        this.handleUpdateEvent(resp.data, false);
        this.eventSocket.emit('updated event in group',
          {group: resp.data.groupId, event: resp.data});
      });
  }

  deleteEvent(eventId) {
    return this.http.delete(`/api/event/${eventId}`).then(resp => {
      this.handleRemoveEvent(resp.data, false);
      this.eventSocket.emit('removed event in group',
        {group: resp.data.groupId, event: resp.data});
    });
  }

  promoteEvent(event) {
    return this.http.put(`api/event/${event._id}/promote`, event)
      .then(resp => {
        this.handleUpdateEvent(resp.data, false);
        this.eventSocket.emit('scheduled event in group',
          {group: resp.data.groupId, event: resp.data});
      });
  }

  demoteEvent(eventId) {
    return this.http.put(`api/event/${eventId}/demote`)
      .then(resp => {
        this.handleUpdateEvent(resp.data, false);
        this.eventSocket.emit('unscheduled event in group',
          {group: resp.data.groupId, event: resp.data});
      });
  }

  downvoteEvent(eventId) {
    return this.http.put(`api/event/${eventId}/downvote`).then(resp => {
      this.handleUpdateEvent(resp.data, false);
      this.eventSocket.emit('updated event in group',
        {group: resp.data.groupId, event: resp.data});
    });
  }

  upvoteEvent(eventId) {
    return this.http.put(`api/event/${eventId}/upvote`).then(resp => {
      this.handleUpdateEvent(resp.data, false);
      this.eventSocket.emit('updated event in group',
        {group: resp.data.groupId, event: resp.data});
    });
  }

  //=========== COMMENT LOGIC ===========\\

  getCommentsForEvent(eventId) {
    return this.http.get(`/api/comments/event/${eventId}`).then(resp => {
      if (resp.data.length) {
        this.comments[eventId] = resp.data.reverse();
      }
    });
  }

  postCommentForEvent(eventId, comment) {
    return this.http.post(`/api/comments/event/${eventId}`, {text: comment}).then(resp => {
      if (!this.comments[eventId]) {
        this.comments[eventId] = [resp.data.newComment];
      } else {
        this.comments[eventId].push(resp.data.newComment);
      }
      this.eventSocket.emit('new comment in group',
        {group: this.events[eventId].groupId, comment});
    });
  }

  updateCommentForEvent(eventId, commentId, newText) {
    return this.http.put(`/api/comments/${commentId}`, {text: newText})
      .then(resp => {
        this.handleUpdateComment(resp.data, false);
        this.eventSocket.emit('updated comment in group',
          {group: this.events[eventId].groupId, comment});
      });
  }

  removeCommentForEvent(eventId, commentId) {
    return this.http.delete(`/api/comments/${commentId}`).then(resp => {
      this.handleRemoveComment(eventId, commentId, false);
      this.eventSocket.emit('removed comment in group',
        {group: this.events[eventId].groupId, eventId, commentId});
    });
  }
}
