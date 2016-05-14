'use strict';

/**
 * @ngdoc service
 * @name bulwarkApp.landingService
 * @description
 * # landingService
 * Factory in the bulwarkApp.
 */
angular.module('bulwarkApp')
  .factory('landingService', function ($http, $q, ENV) {
    // Public API here
    return {
      getLandingInfo: function () {
        var deferred = $q.defer();
        $http.get(ENV.DEV + '/landing/')
          .then(function success (response) {
            deferred.resolve(response);
            console.log('Success: ', response);
          }, function err (response) {
            deferred.reject(response);
            console.log('Error: ', response);

          });
        return deferred.promise;
      },
      updateLandingInfo: function (info) {
        var deferred = $q.defer();
        $http.post(ENV.DEV + '/landing/update', info)
          .then(function success (response) {
            deferred.resolve(response);
            console.log('Success: ', response);
          }, function err (response) {
            deferred.reject(response);
            console.log('Error: ', response);

          });
        return deferred.promise;
      }
    };
  });
