// listen controller
'use strict';

angular.module('szkzApp').controller('TestCtrl', ['$scope', 'UIService', '$routeParams', '$location', '$timeout', 'ArticleListFactory', 'PageControlData',
     'SZKZ_CONSTANTS', function($scope, UIService, $routeParams, $location, $timeout, ArticleListFactory, PageControlData, SZKZ_CONSTANTS)
{
    if (!ArticleListFactory.isContentLoaded()) {
        $location.path('/' + SZKZ_CONSTANTS.PAGE_NAMES.HOME_PAFE);
        return;
    }
    $scope.pageName = SZKZ_CONSTANTS.PAGE_NAMES.TEST_PAGE;

    var pageControlData = PageControlData.getPageControlData(SZKZ_CONSTANTS.PAGE_NAMES.TEST_PAGE);

    $timeout(function () {
        angular.extend($scope, pageControlData);
    });

    $scope.$on('$viewContentLoaded', function(){
        UIService.animatePageIn();
    });
}]);

