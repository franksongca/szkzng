'use strict';

angular.module('szkzApp').controller('SigninDialogCtrl', ['$scope', 'UIService', 'ngDialog', '$timeout', 'SZKZ_CONSTANTS',
    function($scope, UIService, ngDialog, $timeout, SZKZ_CONSTANTS) {
        $scope.signin = function () {
            $scope.closeThisDialog();
            // TODO: implement the feature
        }
        
        $scope.cancel = function () {
            $scope.closeThisDialog();
        }
            
        //$scope.$on('$destroy', function() {
        //});

        $scope.forgotPass = function () {
            $scope.closeThisDialog();
            $timeout(function () {
                UIService.launchForgotDialog();
            }, SZKZ_CONSTANTS.TIME_CONSTANTS.DELAY_DURATION);
        }
    }
]);