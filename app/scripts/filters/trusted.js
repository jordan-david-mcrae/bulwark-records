'use strict';

/**
 * @ngdoc filter
 * @name bulwarkApp.filter:trusted
 * @function
 * @description
 * # trusted
 * Filter in the bulwarkApp.
 */
angular.module('bulwarkApp')
  .filter('trusted', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
  });
