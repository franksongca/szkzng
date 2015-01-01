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
            
        $scope.forgotPass = function (evt) {
            $scope.$on('$destroy', function() {
                $scope.$$listeners['$destroy'] = [];
                UIService.launchForgotDialog();
            });

            $scope.closeThisDialog();
        }

    }
]);