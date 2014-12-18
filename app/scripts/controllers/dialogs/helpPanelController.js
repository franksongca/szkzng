'use strict';

angular.module('szkzApp').controller('HelpPanelDialogCtrl', ['$scope', '$rootScope', 'ngDialog', '$cordovaDevice', 
    function($scope, $rootScope, ngDialog, $cordovaDevice) {
        $scope.librariesInfo = {
            cordova: '4.1.2',
            angularVer: angular.version.full,
            jQueryVer: '2.1.1',
            bootstrapVer: '3.3.1',
            lodashVer: '2.4.1',
            iScrollVer: '5.1.3',
            fontAwesomeVer: '4.2.0'
        }
    }
]);