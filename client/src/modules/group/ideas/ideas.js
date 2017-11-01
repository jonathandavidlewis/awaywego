import angular from 'angular';
import _ from 'lodash';

// import child modules
import PromoteIdeaModule from './promote-idea/promote-idea';

// importing child components
import IdeasCardComponent from './ideas-card/ideas-card.js';
import NewIdeaButtonComponent from './new-idea-button/new-idea-button';
import MakeIdeaComponent from './make-idea/make-idea';

// imports for this component
import template from './ideas.html';
import './ideas.css';

class IdeasController {
  constructor(EventService, GroupService) {
    this.EventService = EventService;
    this.groupId = GroupService.currentGroup._id;

    this.deleteEvent = this.deleteEvent.bind(this);
    this.promoteEvent = this.promoteEvent.bind(this);
  }

  deleteEvent(eventId) {
    this.EventService.deleteEvent(eventId).then(() => {
      this.EventService.loadEventsByGroupId(this.groupId);
    });
  }

  promoteEvent(eventId) {
    this.EventService.promoteEvent(eventId).then(() => {
      this.EventService.loadEventsByGroupId(this.groupId);
    });
  }
}
IdeasController.$inject = ['EventService', 'GroupService'];

const IdeasComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: IdeasController
};

const IdeasModule = angular.module('app.group.ideas', [
  PromoteIdeaModule
])
  .component('ideas', IdeasComponent)
  .component('ideasCard', IdeasCardComponent)
  .component('newIdeaButton', NewIdeaButtonComponent)
  .component('makeIdea', MakeIdeaComponent);

export default IdeasModule.name;
