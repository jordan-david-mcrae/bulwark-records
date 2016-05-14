'use strict';

describe('Service: landingService', function () {

  // load the service's module
  beforeEach(module('bulwarkApp'));

  // instantiate service
  var landingService;
  beforeEach(inject(function (_landingService_) {
    landingService = _landingService_;
  }));

  it('should do something', function () {
    expect(!!landingService).toBe(true);
  });

});
