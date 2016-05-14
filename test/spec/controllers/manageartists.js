'use strict';

describe('Controller: ManageartistsCtrl', function () {

  // load the controller's module
  beforeEach(module('bulwarkApp'));

  var ManageartistsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManageartistsCtrl = $controller('ManageartistsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ManageartistsCtrl.awesomeThings.length).toBe(3);
  });
});
