'use strict';

describe('Controller: GeneralContactCtrl', function () {

  // load the controller's module
  beforeEach(module('bulwarkApp'));

  var GeneralContactCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GeneralContactCtrl = $controller('GeneralContactCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {

  });
});
