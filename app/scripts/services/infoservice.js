'use strict';

/**
 * @ngdoc service
 * @name bulwarkApp.infoService
 * @description
 * # infoService
 * Factory in the bulwarkApp.
 */
angular.module('bulwarkApp')
  .factory('infoService', function ($http, $q, ENV) {
    // Public API here
    return {
      getAllInfo: function () {
        var deferred = $q.defer();

        $http.get(ENV.DEV + '/info')
          .then(function success (response) {
            console.log('Successfully retrieved all info: ', response);
            deferred.resolve(response);
          }, function err (response) {
            console.log('Error while retrieving all info: ', response);
            deferred.reject(response);
          });
          return deferred.promise;
      },
      updateLabelInfo: function (info) {
        var deferred = $q.defer();

        $http.post(ENV.DEV + '/info/update-label', info)
          .then(function success (response) {
            deferred.resolve(response);
            console.log('Success: ', response);
          }, function err (response) {
            console.log('Error: ', response);
            deferred.reject(response);
          });
          return deferred.promise;
      },
      updateProspective: function (info) {
        var deferred = $q.defer();

        $http.post(ENV.DEV + '/info/update-prospective', info)
          .then(function success (response) {
            deferred.resolve(response);
            console.log('Success: ', response);
          }, function err (response) {
            console.log('Error: ', response);
            deferred.reject(response);
          });
          return deferred.promise;
      },
      updateGeneral: function (info) {
        var deferred = $q.defer();

        $http.post(ENV.DEV + '/info/update-general', info)
          .then(function success (response) {
            deferred.resolve(response);
            console.log('Success: ', response);
          }, function err (response) {
            console.log('Error: ', response);
            deferred.reject(response);
          });
          return deferred.promise;
      }
    };
  });
