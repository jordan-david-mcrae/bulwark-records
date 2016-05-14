'use strict';

describe('Directive: dragDetector', function () {

  // load the directive's module
  beforeEach(module('bulwarkApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<drag-detector></drag-detector>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dragDetector directive');
  }));
});
