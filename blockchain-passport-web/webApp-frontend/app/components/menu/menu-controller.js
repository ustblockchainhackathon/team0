'use strict';

angular.module('App.Controllers')

.controller('menuController',
	function ($log, $state) {
		$log.debug('registerController loading');
		var self = this;
		self.page = 'menu';


	});
