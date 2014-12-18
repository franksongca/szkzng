'use strict';

angular.module('szkzApp').controller('ForgotDialogCtrl', ['$scope', '$rootScope', 'ngDialog', 
    function($scope, $rootScope, ngDialog) {
        $scope.send = function () {
            $scope.closeThisDialog();
            /// TODO: implement the feature
        }
        
        $scope.cancel = function () {
            $scope.closeThisDialog();
        }   
    }
]);