'use strict';

describe('Controller: LabelCtrl', function () {

  // load the controller's module
  beforeEach(module('bulwarkApp'));

  var LabelCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LabelCtrl = $controller('LabelCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {

  });
});
