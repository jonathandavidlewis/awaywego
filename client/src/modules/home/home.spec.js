import angular from 'angular';
import 'angular-mocks/angular-mocks';

import HomeModule from './home';

describe('HomeModule', function() {
  let element, scope;

  beforeEach(angular.mock.module('app.home'));

  beforeEach(angular.mock.inject(($rootScope, $compile) => {
    scope = $rootScope.$new();
    element = angular.element('<home></home>');
    element = $compile(element)(scope);
  }));

  it('should render into a home-container div', () => {
    expect(element.find('div.home-container').length).to.equal(1);
  });
});
