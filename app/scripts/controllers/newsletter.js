'use strict';

/**
 * @ngdoc function
 * @name bulwarkApp.controller:NewsletterCtrl
 * @description
 * # NewsletterCtrl
 * Controller of the bulwarkApp
 */
angular.module('bulwarkApp')
  .controller('NewsletterCtrl', function ($uibModalInstance, $scope, $http, $log) {

  	$scope.contactInfo = {
  		email: '',
  		country: '',
  		postal: '',
  		artistContact: false
  	};

  	$scope.signupMessage = '';
  	$scope.hasError = false;
  	$scope.success = false;

  	$scope.close = function () {
  		$uibModalInstance.dismiss('cancel');
  	};

  	$scope.submit = function () {
  		$scope.hasError = false;
  		$http.post('http://10.26.32.176:5002/newsletter/', $scope.contactInfo)
  		.then(function success(response) {
  			$log.debug('Success: ', response.data.detail);
  			$scope.signupMessage = response.data.detail;
  			$scope.success = true;
  		}, function err(response) {
  			$log.debug('Error: ', response.data.detail);
  			$scope.signupMessage = response.data.detail;
  			$scope.hasError = true;
  		});
  	};
  });
