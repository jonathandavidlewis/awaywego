import angular from 'angular';
// components used by this module

// imports for this component
import template from './feed.html';
import './feed.css';

class FeedController {
  constructor() {
  }
}

FeedController.$inject = [];

const FeedComponent = {
  restrict: 'E',
  bindings: {
    plan: '<'
  },
  template: template,
  controller: FeedController
};

const FeedModule = angular.module('app.plan.feed', [])
  .component('feed', FeedComponent);

export default FeedModule.name;
