import angular from 'angular';

// imports for this component
import template from './expenses-add-people.html';
import './expenses-add-people.css';

class ExpensesAddPeopleController {
  constructor(PlanService) {
    this.PlanService = PlanService;
    this.members = PlanService.currentPlan.members;
  }


}

ExpensesAddPeopleController.$inject = ['PlanService'];

const ExpensesAddPeopleComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: ExpensesAddPeopleController,
  require: {
    expensesAddCtrl: '^expensesAdd'
  }
};

export default ExpensesAddPeopleComponent;
