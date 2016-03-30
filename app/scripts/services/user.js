'use strict';

/**
 * @ngdoc service
 * @name bulwarkApp.user
 * @description
 * # user
 * Factory in the bulwarkApp.
 */
angular.module('bulwarkApp')
  .factory('user', function($http, $q, $log) {

    var userId = '';
    // Public API here
    return {
      isAuthenticated: function() {
        if (userId !== '') {
          return true;
        } else {
          return false;
        }
      },
      login: function(user) {
        var deferred = $q.defer();
        $http.post('http://159.203.25.157:5002/login/', user)
          .then(function success(response) {
            deferred.resolve(response.data);
            userId = response.data.success.userID;
          }, function error(err) {
            deferred.reject(err);
          });
        return deferred.promise;
      },
      logout: function() {
        var deferred = $q.defer();
        $http.post('http://159.203.25.157:5002/logout/', '')
          .then(function success(response) {
            userId = '';
            deferred.resolve(response.data);
          }, function error(err) {
            deferred.reject(err);
          });
        return deferred.promise;
      }
    };
  });
