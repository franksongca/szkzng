// not used, but put it here as a sample of override a class

angular.module('szkzApp').controller('ListenActionPageDirectiveCtrl',
    [
        '$scope',
        '$controller',
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
        '$element',
        function($scope, $controller, $rootScope, BookmarkManager, $routeParams,
            $timeout, $window, $document, UIService, SZKZ_CONSTANTS, ArticleFactory, AudioPlayer, $element)
{
    $controller('ActionPageDirectiveCtrl', {$scope: $scope, $element: $element});

    $scope.$on('$destroy', function () {
        if ($scope.currentIndex !== -1) {
            $scope.deactivateChar($scope.currentIndex);
            $scope.removeAudioPlayer();
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





}]);


