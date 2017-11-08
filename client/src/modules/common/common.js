import angular from 'angular';
import mdPickers from 'md-pickers';
import 'md-pickers/dist/mdPickers.css';

// services *just* for this module

// components for the common modules
import HeaderComponent from './header/header';
import ConfirmComponent from './confirm/confirm';
import SpinnerBoxComponent from './spinner-box/spinner-box.js';

const CommonModule = angular.module('app.common', [mdPickers])
  .component('header', HeaderComponent)
  .component('confirm', ConfirmComponent)
  .component('spinnerBox', SpinnerBoxComponent);

export default CommonModule.name;
