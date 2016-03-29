'use strict';

describe('Controller: ProspectiveContactCtrl', function () {

  // load the controller's module
  beforeEach(module('bulwarkApp'));

  var ProspectiveContactCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProspectiveContactCtrl = $controller('ProspectiveContactCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {

  });
});
