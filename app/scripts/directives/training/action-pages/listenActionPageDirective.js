'use strict';

angular.module('szkzApp.directives').directive('listenActionPage',
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
            $scope.$on('$destroy', function () {
                if ($scope.currentIndex && $scope.currentIndex !== -1) {
                    $scope.deactivateChar($scope.currentIndex);

                    //if ($scope.pageName === SZKZ_CONSTANTS.PAGE_NAMES.LISTEN_PAGE) {
                    $scope.removeAudioPlayer();
                    //}
                }
            });

            $scope.$on('audio:cuepoint:reached', function (evt, option) {
                var realIndex = option.realIndex,
                    cuePoint = option.cuePoint,
                    soundLen = option.soundLen;
                //currentCuePoint = cuePoints[cuePoint].cuePoint;

                $scope.activateChar(realIndex);
                $scope.adjustPositionTo(realIndex + 1);
                $timeout(function () {
                    $scope.deactivateChar(realIndex);
                }, soundLen);
                //console.log("option.realIndex=" + cuePoint + "<" + realIndex + "," + soundLen + ">");
            });
        }
    };
}]);
