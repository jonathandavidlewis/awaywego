import angular from 'angular';

// imports for this component
import template from './make-idea.html';
import './make-idea.css';

class MakeIdeaController {
  constructor($state, EventService, GroupService) {
    this.$state = $state;
    this.groupId = GroupService.currentGroup._id;
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
        imageUrl: this.imageUrl,
        groupId: this.groupId,
      };
      this.EventService.submitNewEvent(newIdea).then(resp => {
        this.$state.go('app.group.ideas');
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
MakeIdeaController.$inject = ['$state', 'EventService', 'GroupService'];

const MakeIdeaComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: MakeIdeaController
};

export default MakeIdeaComponent;
