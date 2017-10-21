import angular from 'angular';
// components used by this module

// imports for this component
import template from './feed.html';
import './feed.css';

class FeedController {
  constructor(PlanService) {
    this.plan = {
      title: 'Weekend Getaway',
      description: 'Lets go out to the desert this weekensd and have a ton of fun. We will be meeting up over by the cactus.',
      imageUrl: 'http://imaging.nikon.com/lineup/dslr/d600/img/sample01/img_01.png'
    };
  }
}

FeedController.$inject = [];

const FeedComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: FeedController
};

const FeedModule = angular.module('app.plan.feed', [])
  .component('feed', FeedComponent);

export default FeedModule.name;
