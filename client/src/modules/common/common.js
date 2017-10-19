import angular from 'angular';

// components for the common modules
import { HeaderComponent } from './header/header';

const CommonModule = angular.module('app.common', [])
  .component('header', HeaderComponent);

export default CommonModule.name;
