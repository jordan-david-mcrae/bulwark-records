'use strict';

/**
 * @ngdoc function
 * @name bulwarkApp.controller:LabelCtrl
 * @description
 * # LabelCtrl
 * Controller of the bulwarkApp
 */
angular.module('bulwarkApp')
  .controller('LabelCtrl', function (infoService) {
  	var vm = this;

  	vm.info = {
  		html: ''
  	};
  	vm.loading = false;
  	vm.editOn = false;
  	vm.hasError = false;
  	vm.message = '';
    vm.infoCopy = '';

    vm.init = function () {
    	vm.loading = true;
    	infoService.getAllInfo()
    		.then(function success(response){
    			vm.info.html = response.data.info[0].aboutLabel;
    			// vm.info.html = '<h1>About Bulwark Records</h1><h3>More than just a label</h3><p>Bulwark Records was launched in 2016 in London, Ontario Canada by Mike McRae. With a strong desire to support local and Canadian music and an urge to innovate, Bulwark was created to provide a fresh perspective on the idea of what a record label is. As its name implies, Bulwark Records exists to protect and empower its artists. It was started by an artist and was made for artists, meaning one thing: we are fans of our artist’s music. Having this strong understanding of the passion behind original music, Bulwark can operate with the artist as top priority. We are confident to say that Bulwark is more than just a label that is put on our records. It is a support network that will work hard to develop, promote and inspire artist’s and their work.</p>';
    			vm.loading = false;
    		}, function err () {
    			// Fallback
    			vm.info.html = '<h1>About Bulwark Records</h1><h3>More than just a label</h3><p>Bulwark Records was launched in 2016 in London, Ontario Canada by Mike McRae. With a strong desire to support local and Canadian music and an urge to innovate, Bulwark was created to provide a fresh perspective on the idea of what a record label is. As its name implies, Bulwark Records exists to protect and empower its artists. It was started by an artist and was made for artists, meaning one thing: we are fans of our artist’s music. Having this strong understanding of the passion behind original music, Bulwark can operate with the artist as top priority. We are confident to say that Bulwark is more than just a label that is put on our records. It is a support network that will work hard to develop, promote and inspire artist’s and their work.</p>';
    			vm.loading = false;
    		});
    };

    vm.edit = function () {
      vm.message = '';
    	vm.editOn = true;
      vm.infoCopy = angular.copy(vm.info);
    };

    vm.save = function () {
    	vm.loading = true;
    	infoService.updateLabelInfo(vm.info)
    		.then(function success (response) {
    			vm.labelInfo = response.data.info[0].aboutLabel;
    			vm.message = response.data.detail;
    			vm.loading = false;
    			vm.editOn = false;
    		}, function err (response) {
    			vm.hasError = true;
    			vm.message = response.data.detail;
    			vm.loading = false;
    		});
    };

    vm.cancel = function () {
      vm.info = vm.infoCopy;
      vm.editOn = false;
      vm.loading = false;
      vm.message = '';
    };

    vm.init();
  });
