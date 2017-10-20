import HomeModule from './home';

describe('HomeModule', function() {
  let element, scope;

  beforeEach(angular.mock.module('app.home'));

  beforeEach(angular.mock.inject(($rootScope, $compile) => {
    scope = $rootScope.$new();
    element = angular.element('<home></home>');
    element = $compile(element)(scope);
    $rootScope.$digest();
  }));

  it('should render into a home-container div', () => {
    expect(element.find('div.home-container').length).to.equal(1);
  });

  it('should render a welcome message', () => {
    var name = 'Welcome to the home screen.';
    expect(element.find('h1').text()).to.equal(name);
  });

  it('should have a controller with a name property', () => {
    expect(element.isolateScope().$ctrl.name).to.exist;
  });

  // this is not a meaningful test - it's serving as an example for now
  it('should update its name if the name is updated', () => {
    element.isolateScope().$ctrl.name = 'Hello world';
    element.isolateScope().$apply();
    expect(element.find('h1').text()).to.equal('Hello world');
  });
});

describe('HomeController', function() {
  let HomeController;

  beforeEach(angular.mock.module('app.home'));
  beforeEach(angular.mock.inject(($componentController) => {
    HomeController = $componentController('home', null, {});
  }));

  it ('should be a component called home with a name property', () => {
    expect(HomeController.name).to.equal('Welcome to the home screen.');
  });

});
