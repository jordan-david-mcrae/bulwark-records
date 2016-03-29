'use strict';

describe('Controller: BulwarkCtrl', function () {

  // load the controller's module
  beforeEach(module('bulwarkApp'));

  var BulwarkCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BulwarkCtrl = $controller('BulwarkCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {

  });
});
