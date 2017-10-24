import angular from 'angular';

// import child dependencies

// imports for this component
import template from './idea.html';
import './idea.css';

class IdeaController {
  constructor(EventService, $stateParams) {
    this.event = {
      planId: 'hg5687h5834657h6',
      title: 'John\'s best BBQ',
      startTime: '2016-05-18T16:00:00Z',
      endTime: '2016-05-18T16:00:00Z',
      description: 'We will have a ton of fun at this park...',
      imageUrl: 'https://d36tnp772eyphs.cloudfront.net/blogs/1/2014/08/Smith-Rock-940x595.jpg'
    };
    this.ideaId = $stateParams.ideaId;
    this.idea = EventService.getEvent(this.ideaId);
    this.EventService = EventService;
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