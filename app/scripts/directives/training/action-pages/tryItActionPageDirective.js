'use strict';

angular.module('szkzApp.directives').directive('tryItActionPage', ['$rootScope', 'BookmarkManager', '$routeParams',
    '$timeout', '$window', '$document', 'UIService', 'SZKZ_CONSTANTS', 'ArticleFactory', 'AudioPlayer',
    function ($rootScope, BookmarkManager, $routeParams, $timeout, $window, $document, UIService, SZKZ_CONSTANTS, ArticleFactory, AudioPlayer)
{
    return {
        restrict: 'E',
        templateUrl: 'views/training/action-pages/training-action-template.html',

        controller: 'ActionPageDirectiveCtrl',

        link: function ($scope, element, attr) {
            var subAction;


            $scope.$on('$destroy', function () {
            });

            ArticleFactory.setupPlayer();

            if ($routeParams && $routeParams.sub) {
                subAction = $routeParams.sub;
            }

            switch (subAction) {
                case SZKZ_CONSTANTS.TRY_IT_NAMES.TRY_IT:
                case SZKZ_CONSTANTS.TRY_IT_NAMES.TRY_IT_RANDOM:
            }

            alert($scope.pageName + ":" + subAction);

        }
    };
}]);
