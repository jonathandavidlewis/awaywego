import HomeModule from './home';

describe('HomeModule', function() {
  let element, scope;

  beforeEach(angular.mock.module('app.home'));

  beforeEach(angular.mock.inject(($rootScope, $compile, $httpBackend) => {

    $httpBackend.whenGET("/api/plan/").respond([]);

    scope = $rootScope.$new();
    element = angular.element('<home></home>');
    element = $compile(element)(scope);
    $rootScope.$digest();
  }));

  it('should render into a home-container div', () => {
    expect(element.find('div.home-container').length).to.exist;
  });


  it('should have a controller', () => {
    expect(element.isolateScope().$ctrl).to.exist;
  });

  // this is not a meaningful test - it's serving as an example for now
  it('should update its name if the name is updated', () => {
    element.isolateScope().$ctrl.name = '';
    element.isolateScope().$apply();
    expect(element.find('h1').text()).to.equal('');
  });
});

describe('HomeController', function() {
  let HomeController;

  beforeEach(angular.mock.module('app.home'));
  beforeEach(angular.mock.inject(($componentController) => {
    HomeController = $componentController('home', null, {});
  }));

  it ('should exist', () => {
    expect(HomeController).to.exist;
  });

});
