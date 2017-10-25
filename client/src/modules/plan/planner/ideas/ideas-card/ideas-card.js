import angular from 'angular';

// imports for this component
import template from './ideas-card.html';
import './ideas-card.css';

class IdeasCardController {
  constructor($scope) {
    this.planId = 'sample';
    this.$scope = $scope;
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handlePromoteClick = this.handlePromoteClick.bind(this);
  }

  handleDeleteClick() {
    this.deleteEvent(this.idea._id);
  }

  handlePromoteClick() {
    debugger;
    this.promoteEvent(this.idea._id);
  }
}
IdeasCardController.$inject = ['$scope'];

const IdeasCardComponent = {
  restrict: 'E',
  bindings: {
<<<<<<< aa4c33d80d730dd1bf24c5bbbd36e7843992e90a
    event: '<'
=======
    idea: '<',
<<<<<<< 36556f0283a859a6762eeac1c8b87410a0b54268
    deleteEvent: '<'
>>>>>>> Adds live events to idea page
=======
    deleteEvent: '<',
    promoteEvent: '<'
>>>>>>> Add descriptions to event cards
  },
  template: template,
  controller: IdeasCardController
};


export default IdeasCardComponent;
