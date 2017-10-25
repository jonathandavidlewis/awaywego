import angular from 'angular';

// imports for this component
import EventService from '../../../../../services/event/event.service';
import template from './ideas-card.html';
import './ideas-card.css';

class IdeasCardController {
  constructor(EventService) {
    this.planId = 'sample';
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handlePromoteClick = this.handlePromoteClick.bind(this);
    this.EventService = EventService;
    this.totalVotes = 0;

    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
  }

  handleDeleteClick() {
    this.deleteEvent(this.event._id);
  }

  handlePromoteClick() {
    this.promoteEvent(this.event._id);
  }

  $onInit() {
    console.log('this.event on init', this.event);
    this.event = this.event;
    this.totalVotes = this.event.upVotes.length - this.event.downVotes.length;
  }

  sumVotes() {
    return this.event.upVotes.length - this.event.downVotes.length;
  }

  upVote() {

    console.log('Before upvote through event service', this.event);
    this.EventService.upvoteEvent(this.event._id).then((event) => {
      console.log('after upvote event service', event);
      this.event.upVotes = event.data.upVotes;
      this.event.downVotes = event.data.downVotes;
      console.log('upvote current event', this.event);
      this.totalVotes = this.sumVotes();
    })
      .catch(err => console.log(err));
  }

  downVote() {
    console.log(this.event);
    this.EventService.downvoteEvent(this.event._id).then((event) => {
      console.log('after upvote event service', event);
      this.event.upVotes = event.data.upVotes;
      this.event.downVotes = event.data.downVotes;
      console.log('downvote current event', this.event);
      this.totalVotes = this.sumVotes();
    });
  }
}
IdeasCardController.$inject = ['EventService'];

const IdeasCardComponent = {
  restrict: 'E',
  bindings: {
    event: '<',
    deleteEvent: '<',
    promoteEvent: '<'
  },
  template: template,
  controller: IdeasCardController
};


export default IdeasCardComponent;
