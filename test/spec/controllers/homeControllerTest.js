'use strict';

describe('Controller: HomeCtrl', function () {

  // load the controller's module
  beforeEach(module('szkzApp'));

  beforeEach(module('szkzApp', function($provide) {
    // Output messages
    $provide.value('$log', console);
  })); 

  var HomeCtrl,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    console.log('scope.lang=' + scope.lang);
    HomeCtrl = $controller('HomeCtrl', {
      $scope: scope
    });
  }));


  // lang test
  it('the language is set to en:', function () {
    expect(scope.lang).toEqual('en');
  });
});