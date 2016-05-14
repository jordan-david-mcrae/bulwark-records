'use strict';

/**
 * @ngdoc function
 * @name bulwarkApp.controller:ProspectiveContactCtrl
 * @description
 * # ProspectiveContactCtrl
 * Controller of the bulwarkApp
 */
angular.module('bulwarkApp')
  .controller('ProspectiveContactCtrl', function(contactService, infoService, Upload, $timeout, $rootScope) {
    var vm = this;

    vm.info = {
      html: ''
    };
    vm.query = {
      name: '',
      phone: '',
      email: '',
      about: '',
      messageType: 'Prospective Inquiry'
    };

    vm.inProgress = false;
    vm.hasError = false;
    vm.message = '';
    vm.files = '';
    vm.fileNames = [];
    vm.uploadComplete = true;
    vm.updateTextLoading = false;
    vm.updateMessage = '';
    vm.editOn = false;
    vm.hasUpdateError = false;
    vm.infoCopy = '';

    vm.init = function () {
      vm.updateTextLoading = true;
      infoService.getAllInfo()
        .then(function success(response){
          vm.info.html = response.data.info[0].contactProspective;
          vm.updateTextLoading = false;
        }, function err () {
          // Fallback
          vm.info.html = '<h1>Prospective Artists</h1><h3>Show us your work</h3><p>We\'d love to hear your music. Feel free to fill out and send us the form below, and we’ll take a listen when we can. If possible, please don’t send large files or download links to us. Links to your music/ live performances are always preferred over attached files.</p>';
          vm.updateTextLoading = false;
        });
    };

    vm.edit = function () {
      vm.infoCopy = angular.copy(vm.info);
      vm.updateMessage = '';
      vm.editOn = true;
    };

    vm.save = function () {
      vm.updateTextLoading = true;
      vm.updateMessage = '';
      vm.hasUpdateError = false;

      infoService.updateProspective(vm.info)
        .then(function success (response) {
          vm.info.html = response.data.info[0].contactProspective;
          vm.updateMessage = response.data.detail;
          vm.updateTextLoading = false;
          vm.editOn = false;
        }, function err (response) {
          vm.hasUpdateError = true;
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

    vm.submit = function(form) {
      vm.message = '';
      vm.inProgress = true;
      vm.hasError = false;
      vm.uploadMessage = '';

      vm.uploadFiles(form);
    };

    // vm.uploadFiles = function (files) {
    //   vm.uploadComplete = false;
    //   if (files && files.length) {
    //     for (var i = 0; i < files.length; i++) {
    //       Upload.upload({
    //         url: 'http://0.0.0.0:5002/upload-file/',
    //         data: {file: files[i]}
    //       })
    //       .then(function success(response) {
    //         console.log('SUCCESSFUL UPLOAD: ', response);
    //         vm.uploadComplete = true;
    //         vm.uploadMessage = 'Files have been successfully uploaded.';
    //       }, function err(response) {
    //         console.log('ERROR UPLOADING: ', response);
    //         vm.uploadComplete = true;
    //         vm.uploadMessage = 'There was an error uploading your files. Please try again.';
    //       });

    //       // Upload.upload({..., data: {file: files[i]}, ...})...;
    //     }
    //     // or send them all together for HTML5 browsers:
    //     // Upload.upload({..., data: {file: files}, ...})...;
    //   }
    // };

    vm.uploadFiles = function (form) {
      var files = vm.files;
      vm.uploadComplete = false;
      if (files.length === 0) {
        vm.sendEmail();
      }
      if (files && files.length > 0) {
        vm.uploadMessage = 'Uploading files...';
        var uploadError = false;
        for (var i = 0; i < files.length; i++) {
          console.log('Uploading image: ', i);
          var counter = 0;
          Upload.upload({
            url: 'http://10.26.32.176:5002/email/upload-file/',
            data: {file: files[i]}
          })
          .then(function success() {
            counter ++;
            if (counter === files.length && !uploadError) {
              vm.uploadComplete = true;
              vm.uploadMessage = 'Files have been successfully uploaded, sending message...';
              vm.sendEmail(form);
            }
          }, function err() {
              uploadError = true;
              vm.uploadComplete = true;
              vm.uploadMessage = 'There was an error uploading your files. Please try again.';
          });
        }
      }
    };

    vm.sendEmail = function (form) {
      contactService.sendEmail(vm.query)
        .then(function success(response) {
          vm.message = response.data.message;
          vm.inProgress = false;
          vm.files = '';
          vm.fileNames = '';
          vm.resetQuery();
          vm.uploadMessage = '';
        }, function err(response) {
          vm.message = response.data.message;
          vm.hasError = true;
          vm.inProgress = false;
          vm.uploadMessage = '';
        });
    };

    vm.filesSelected = function () {
      vm.fileNames = [];
      for (var i=0; i<vm.files.length; i++) {
        vm.fileNames.push(vm.files[i].name);
      }
    };

    vm.removeFile = function (name) {
      for (var i=0; i<vm.files.length; i++) {
        if (vm.files[i].name === name) {
          vm.files.splice(i, 1);
          for (var k=0; k<vm.fileNames.length; k++) {
            if (vm.fileNames[k] === name) {
              vm.fileNames.splice(k, 1);
            }
          }
        }
      }
    };

    vm.resetQuery = function () {
      vm.query.name = '';
      vm.query.phone = '';
      vm.query.email = '';
      vm.query.about = '';
      vm.files = '';
    };

    $rootScope.$on('dropFiles', function(event, files) {
      vm.files = files;
      vm.filesSelected();
    });

    vm.init();
  });
