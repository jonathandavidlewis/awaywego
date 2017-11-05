import angular from 'angular';

// services *just* for this module

// components for the common modules
import { HeaderComponent } from './header/header';
import ConfirmComponent from './confirm/confirm';

const CommonModule = angular.module('app.common', [])
  .component('header', HeaderComponent)
  .component('confirm', ConfirmComponent);

export default CommonModule.name;
