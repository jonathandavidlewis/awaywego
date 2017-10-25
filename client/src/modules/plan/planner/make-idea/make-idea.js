import angular from 'angular';

// import services for this modules
import EventService from '../../../../services/event/event.service';

// imports for this component
import template from './make-idea.html';
import './make-idea.css';

class MakeIdeaController {
  constructor($state, EventService) {
    this.$inject = ['$state', 'EventService'];
    this.$state = $state;
    this.EventService = EventService;
    this.title = '';
    this.desc = '';
    this.imageUrl = '';
    this.formWarning = '';
  }

  submit() {
    if (this.validateForm()) {
      let newIdea = {
        title: this.title,
        description: this.desc,
        imageUrl: this.imageUrl
      };
      this.EventService.submitNewIdea(newIdea).then(resp => {
        this.$state.go('app.plan.feed');
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
}

const MakeIdeaComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: MakeIdeaController
};

const MakeIdeaModule = angular.module('app.plan.planner.ideas.new', [])
  .component('makeIdea', MakeIdeaComponent)
  .service('EventService', EventService);

export default MakeIdeaModule.name;
