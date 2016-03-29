'use strict';

describe('Service: screensize', function () {

  // load the service's module
  beforeEach(module('bulwarkApp'));

  // instantiate service
  var screensize;
  beforeEach(inject(function (_screensize_) {
    screensize = _screensize_;
  }));

  it('should do something', function () {
    expect(!!screensize).toBe(true);
  });

});
