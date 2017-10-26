import angular from 'angular';

// import child dependencies

// imports for this component
import template from './idea.html';
import './idea.css';

class IdeaController {
  constructor(EventService, $stateParams) {
    this.EventService = EventService;
    this.ideaId = $stateParams.ideaId;
    this.idea = EventService.getEvent(this.ideaId);
  }

  promoteEvent(ideaId) {
    this.EventService.promoteEvent(ideaId);
  }

  upvoteEvent(ideaId) {
    this.EventService.upvoteEvent(ideaId);
  }

  downvoteEvent(ideaId) {
    this.EventService.downvoteEvent(ideaId);
  }
}
IdeaController.$inject = ['EventService', '$stateParams'];

const IdeaComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: IdeaController
};

const IdeaModule = angular.module('app.plan.planner.idea', [])
  .component('idea', IdeaComponent);



export default IdeaModule.name;