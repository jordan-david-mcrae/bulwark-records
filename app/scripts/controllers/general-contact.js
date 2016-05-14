'use strict';

/**
 * @ngdoc function
 * @name bulwarkApp.controller:GeneralContactCtrl
 * @description
 * # GeneralContactCtrl
 * Controller of the bulwarkApp
 */
angular.module('bulwarkApp')
  .controller('GeneralContactCtrl', function(contactService, infoService, $scope) {
    var vm = this;
    vm.query = {
      name: '',
      phone: '',
      email: '',
      about: '',
      messageType: 'General Inquiry'
    };

    vm.info = {
      html: ''
    };

    vm.inProgress = false;
    vm.hasError = false;
    vm.message = '';
    vm.updateTextLoading = false;
    vm.updateMessage = '';
    vm.editOn = false;
    vm.hasUpdateError = false;
    vm.infoCopy = '';

    vm.init = function () {
      vm.updateTextLoading = true;
      infoService.getAllInfo()
        .then(function success(response){
          vm.info.html = response.data.info[0].contactGeneral;
          vm.updateTextLoading = false;
        }, function err () {
          // Fallback
          vm.info.html = '<h1>General Inquiries</h1><h3>Have any comments or questions for us? Fill out and send us the form below and we will get back to you as soon as we can.</h3>';
          vm.updateTextLoading = false;
        });
    };

    vm.edit = function () {
      vm.updateMessage = '';
      vm.infoCopy = angular.copy(vm.info);
      vm.editOn = true;
    };

    vm.save = function () {
      vm.updateTextLoading = true;
      vm.updateMessage = '';
      vm.hasUpdateError = false;

      infoService.updateGeneral(vm.info)
        .then(function success (response) {
          vm.info.html = response.data.info[0].contactGeneral;
          vm.updateMessage = response.data.detail;
          vm.updateTextLoading = false;
          vm.editOn = false;
        }, function err (response) {
          vm.hasError = true;
          vm.updateMessage = response.data.detail;
          vm.updateTextLoading = false;
        });
    };

    vm.cancel = function () {
      vm.info = vm.infoCopy;
      vm.editOn = false;
      vm.updateTextLoading = false;
      vm.updateMessage = '';
      vm.hasUpdateError = false;
    };

    vm.submit = function() {
      vm.message = '';
      vm.inProgress = true;
      vm.hasError = false;

      contactService.sendEmail(vm.query)
        .then(function success(response) {
          vm.message = response.data.message;
          vm.inProgress = false;
          vm.resetQuery();
          $scope.generalContactForm.$setPristine();
          $scope.generalContactForm.$setUntouched();
          $scope.generalContactForm.$submitted = false;
        }, function err(response) {
          vm.message = response.data.message;
          vm.hasError = true;
          vm.inProgress = false;
        });
    };

    vm.resetQuery = function () {
      vm.query.name = '';
      vm.query.phone = '';
      vm.query.email = '';
      vm.query.about = '';
    };

    vm.init();
  });
