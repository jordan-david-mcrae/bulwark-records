'use strict';

/**
 * @ngdoc service
 * @name bulwarkApp.blogService
 * @description
 * # blogService
 * Factory in the bulwarkApp.
 */
angular.module('bulwarkApp')
  .factory('blogService', function($http, $q, user, $location, $timeout) {
    // Service logic
    // ...

    var blogs = '';

    // Public API here
    return {
      blogList: function() {
        return blogs;
      },
      getBlogs: function() {
        var deferred = $q.defer();

        $timeout(function() {
          $http.get('http://localhost:5002/blogs/')
            .then(function success(response) {
              blogs = response.data;
              console.log('RESPONSE: ', response);
              deferred.resolve(response.data);
            }, function error(err) {
              deferred.reject(err);
            });
        }, 2000)

        return deferred.promise;
      },
      sendBlog: function(blog) {
        var jsonBlog = {
          entry: blog,
          date: new Date()
        }

        if (user.isAuthenticated()) {
          var deferred = $q.defer();
          $timeout(function() {
            $http.post('http://localhost:5002/new-html-entry/', jsonBlog)
              .then(function success(response) {
                deferred.resolve(response);
              }, function error(err) {
                deferred.reject(err);
              });
          }, 2000);
          return deferred.promise;
        } else {
          $location.path('/main/');
        }
      },
      deleteBlog: function(blog) {
        if (user.isAuthenticated()) {
          var deferred = $q.defer();

          $http.post('http://localhost:5002/delete-blog/', blog)
            .then(function success(response) {
              deferred.resolve(response);
              blogs = response.data;
            }, function error(err) {
              deferred.reject(err);
            });

          return deferred.promise;
        } else {
          $location.path('/main/');
        }
      }
    };
  });
