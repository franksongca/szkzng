'use strict';

angular.module('szkzApp.directives').directive('listenLookReadActionPage', ['$rootScope', 'BookmarkManager', '$routeParams',
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

            switch ($scope.pageName) {
                case SZKZ_CONSTANTS.PAGE_NAMES.LISTEN_LOOK_READ_PAGE:
                case SZKZ_CONSTANTS.PAGE_NAMES.TRY_IT_PAGE:
                case SZKZ_CONSTANTS.PAGE_NAMES.TEST_PAGE:
                case SZKZ_CONSTANTS.PAGE_NAMES.PINYIN_PAGE:
                case SZKZ_CONSTANTS.PAGE_NAMES.GAMES_PAGE:
            }

            alert($scope.pageName + ":" + subAction);

        }
    };
}]);
