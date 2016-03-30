'use strict';

/**
 * @ngdoc function
 * @name bulwarkApp.controller:ImageManagerCtrl
 * @description
 * # ImageManagerCtrl
 * Controller of the bulwarkApp
 */
angular.module('bulwarkApp')
  .controller('ImageManagerCtrl', function(FileUploader) {
    var vm = this;
    vm.uploader = new FileUploader({
      url: 'http://159.203.25.157:5002/upload-image/'
    });
  });
