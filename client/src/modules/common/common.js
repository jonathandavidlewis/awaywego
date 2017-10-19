import angular from 'angular';

// services for this module
import UserService from '../../services/user/user.service';

// components for the common modules
import { HeaderComponent } from './header/header';

const CommonModule = angular.module('app.common', [])
  .component('header', HeaderComponent)
  .service('UserService', UserService);

export default CommonModule.name;
