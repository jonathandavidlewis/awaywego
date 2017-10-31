import angular from 'angular';

// imports for this module
import NewCommentComponent from './new-comment/new-comment';
import CommentCardComponent from './comment-card/comment-card';
import EventService from '../../services/event/event.service';

// imports for this component
import template from './comments.html';
import './comments.css';

class CommentsController {
  constructor(UserService, EventService) {
    this.user = UserService.user;
    this.EventService = EventService;
    this.isOpen = false;

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() { this.isOpen = !this.isOpen; }

}
CommentsController.$inject = ['UserService', 'EventService'];

const CommentsComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: CommentsController
};

const CommentsModule = angular.module('app.comments', [])
  .service('EventService', EventService)
  .component('comments', CommentsComponent)
  .component('newComment', NewCommentComponent)
  .component('commentCard', CommentCardComponent);

export default CommentsModule.name;
