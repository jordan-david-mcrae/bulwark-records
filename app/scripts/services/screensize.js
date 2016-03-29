'use strict';

/**
 * @ngdoc service
 * @name bulwarkApp.screensize
 * @description
 * # screensize
 * Factory in the bulwarkApp.
 */
angular.module('bulwarkApp')
  .factory('screensize', function() {
    // Service logic
    // ...
    var detection = '';

    if ($(window).width() < 1024) {
      detection = 'mobile';
    } else {
      detection = 'desktop';
    }

    // Public API here
    return detection;

  });
