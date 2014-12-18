'use strict';

angular.module('szkzApp').controller('AboutPanelDialogCtrl', ['$scope', '$rootScope', 'ngDialog', '$cordovaDevice', 
    function($scope, $rootScope, ngDialog, $cordovaDevice) {
        try {
            $scope.deviceInfo = { 
                device: $cordovaDevice.getDevice(),
                cordova: $cordovaDevice.getCordova(),
                model: $cordovaDevice.getModel(),
                platform: $cordovaDevice.getPlatform(),
                uuid: $cordovaDevice.getUUID(),
                version: $cordovaDevice.getVersion()
            };
        } catch (e){
            $scope.deviceInfo = { 
                device: 'Browser',
                cordova: '4.1.2',
                model: 'N/A',
                platform: window.navigator.platform,
                uuid: 'N/A',
                version: window.navigator.appVersion
            };
        }
        
        $scope.appInfo = {
            name: '【启蒙中文】-- Hanzi-Pinyin ABC',
            author: 'Frank Song',
            version: '1.0.0',
            updated: 'Oct 30, 2014'
        }
        
        $scope.librariesInfo = {
            angularVer: angular.version.full,
            jQueryVer: '2.1.1',
            bootstrapVer: '3.3.1',
            lodashVer: '2.4.1',
            iScrollVer: '5.1.3',
            fontAwesomeVer: '4.2.0'
        }
    }
]);