(function() {
    'use strict';
    angular
        .module('App.DeviceService')
        .service('DeviceService', function($log) {
            $log.debug("DEVICE SERVICE");

            var self = this;
            self.isBrowser = isBrowser;
            self.isAndroid = isAndroid;

            function isBrowser(){
                return device.platform === 'browser'; //cordova-plugin-device PLUGIN
            }

            function isAndroid(){
                return ionic.Platform.isAndroid();
            }

            return self;
        });


})();