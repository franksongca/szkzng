// listen controller
'use strict';

angular.module('szkzApp').controller('GamesCtrl', ['$scope', 'UIService', '$routeParams', '$location', '$timeout', 'ArticleListFactory', 'PageControlData',
    'SZKZ_CONSTANTS', 'UIService', function($scope, UIService, $routeParams, $location, $timeout, ArticleListFactory, PageControlData, SZKZ_CONSTANTS)
{
    if (!ArticleListFactory.isContentLoaded()) {
        $location.path('/' + SZKZ_CONSTANTS.PAGE_NAMES.HOME_PAFE);
        return;
    }
    $scope.pageName = SZKZ_CONSTANTS.PAGE_NAMES.GAMES_PAGE;

    var pageControlData = PageControlData.getPageControlData(SZKZ_CONSTANTS.PAGE_NAMES.GAMES_PAGE, $routeParams.sub);

    $timeout(function () {
        angular.extend($scope, pageControlData);
    });

    $scope.$on('$viewContentLoaded', function(){
        UIService.animatePageIn();
    });
}]);

