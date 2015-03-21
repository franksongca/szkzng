'use strict';

angular.module('szkzApp.directives').directive('listenLookReadActionPage',
    [
        '$rootScope',
        'BookmarkManager',
        '$routeParams',
        '$timeout',
        '$window',
        '$document',
        'UIService',
        'SZKZ_CONSTANTS',
        'ArticleFactory',
        'AudioPlayer',
        function ($rootScope, BookmarkManager, $routeParams, $timeout, $window, $document, UIService,
                  SZKZ_CONSTANTS, ArticleFactory, AudioPlayer)
{
    return {
        restrict: 'E',
        templateUrl: 'views/training/action-pages/training-action-template.html',

        controller: 'ActionPageDirectiveCtrl',

        link: function ($scope, element, attr) {
            $scope.cuePoint = 0;

            //$scope.subAction,
            //$scope.audioTimer,
            //$scope.phase;

            $scope.$on('$destroy', function () {
            });

            ArticleFactory.setupPlayer();

            if ($routeParams && $routeParams.sub) {
                $scope.subAction = $routeParams.sub;
            }


            switch ($scope.pageName) {
                case SZKZ_CONSTANTS.LISTEN_LOOK_READ_NAMES.SUB_FOLLOW_ME:
                case SZKZ_CONSTANTS.LISTEN_LOOK_READ_NAMES.SUB_LOOK_READ:
                case SZKZ_CONSTANTS.LISTEN_LOOK_READ_NAMES.SUB_LISTEN_READ:
                case SZKZ_CONSTANTS.LISTEN_LOOK_READ_NAMES.SUB_LOOK_READ_RANDOM:
                case SZKZ_CONSTANTS.LISTEN_LOOK_READ_NAMES.SUB_LISTEN_READ_RANDOM:
            }

            alert($scope.pageName + ":" + subAction);
        }
    };
}]);
