'use strict';

/**
 * @ngdoc service
 * @name bulwarkApp.contactService
 * @description
 * # contactService
 * Factory in the bulwarkApp.
 */
angular.module('bulwarkApp')
  .factory('contactService', function ($http, $q, ENV) {
    // Service logic
    // ...

    // Public API here
    return {
      sendEmail: function (mailInfo) {
        var deferred = $q.defer();        
          $http.post(ENV.DEV + '/email/contact', mailInfo)
            .then(function success(response) {
              deferred.resolve(response);
            }, function err(error) {
              deferred.reject(error);
            });
          return deferred.promise;
      }
    };
  });
