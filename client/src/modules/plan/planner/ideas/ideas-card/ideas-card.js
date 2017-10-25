import angular from 'angular';

// imports for this component
import EventService from '../../../../../services/event/event.service';
import template from './ideas-card.html';
import './ideas-card.css';

class IdeasCardController {
  constructor(EventService) {
    this.EventService = EventService;
    this.totalVotes = 0;
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handlePromoteClick = this.handlePromoteClick.bind(this);
  }

  handleDeleteClick() {
    this.deleteEvent(this.event._id);
  }

  handlePromoteClick() {
    this.promoteEvent(this.event._id);
  }

  $onInit() {
    this.totalVotes = this.sumVotes();
  }

  sumVotes() {
    return this.event.upVotes.length - this.event.downVotes.length;
  }

  upVote() {
    this.EventService.upvoteEvent(this.event._id).then((event) => {
      this.event.upVotes = event.data.upVotes;
      this.event.downVotes = event.data.downVotes;
      this.totalVotes = this.sumVotes();
    });
  }

  downVote() {
    this.EventService.downvoteEvent(this.event._id).then((event) => {
      this.event.upVotes = event.data.upVotes;
      this.event.downVotes = event.data.downVotes;
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
