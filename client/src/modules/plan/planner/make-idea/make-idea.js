import angular from 'angular';

// import services for this modules
import EventService from '../../../../services/event/event.service';
import ImageSearchService from '../../../../services/images/image.search.service';

// imports for this component
import template from './make-idea.html';
import './make-idea.css';

class MakeIdeaController {
  constructor($state, EventService, $stateParams, ImageSearchService) {
    this.$inject = ['$state', 'EventService', '$stateParams', 'ImageSearchService'];
    this.$state = $state;
    this.EventService = EventService;
    this.$stateParams = $stateParams;
    this.ImageSearchService = ImageSearchService;
    this.title = '';
    this.desc = '';
    this.imageUrl = '';
    this.formWarning = '';
    this.images = [];
  }

  submit() {
    if (this.validateForm()) {
      let newIdea = {
        title: this.title,
        description: this.desc,
        imageUrl: this.imageUrl,
        planId: this.$stateParams.planId
      };
      this.EventService.submitNewEvent(newIdea).then(resp => {
        this.$state.go('app.plan.planner.ideas');
      }).catch(err => {
        console.log('Server error: ', err);
        this.formWarning = 'Error: please try again or contact a server admin';
      });
    }
  }

  validateForm() {
    if (!this.title) {
      this.formWarning = 'Please enter a title';
      return false;
    }
    return true;
  }

  imageSearch(query) {
    this.ImageSearchService.imageSearch(query).then(resp => {
      this.images = resp;
    });
  }

  imageClick(e) {
    this.imageUrl = e.target.currentSrc;
    $('.make-idea-images img').removeClass('highlight');
    $(e.target).addClass('highlight');
  }
}

const MakeIdeaComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: MakeIdeaController
};

const MakeIdeaModule = angular.module('app.plan.planner.makeIdea', [])
  .component('makeIdea', MakeIdeaComponent)
  .service('EventService', EventService)
  .service('ImageSearchService', ImageSearchService);

export default MakeIdeaModule.name;
