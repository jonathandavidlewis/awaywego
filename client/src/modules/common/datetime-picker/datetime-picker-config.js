import angular from 'angular';

angular
  .module('myApp', ['moment-picker'])
  .config(['momentPickerProvider', function (momentPickerProvider) {
    momentPickerProvider.options({
      locale: 'en',
      format: 'L LTS',
      minView: 'decade',
      maxView: 'minute',
      startView: 'year',
      autoclose: true,
      today: true,
      keyboard: false,

      /* Extra: Views properties */
      leftArrow: '&larr;',
      rightArrow: '&rarr;',
      yearsFormat: 'YYYY',
      monthsFormat: 'MMM',
      daysFormat: 'D',
      hoursFormat: 'HH:[00]',
      minutesFormat: moment.localeData().longDateFormat('LT').replace(/[aA]/, ''),
      secondsFormat: 'ss',
      minutesStep: 5,
      secondsStep: 1
    });
  }]);