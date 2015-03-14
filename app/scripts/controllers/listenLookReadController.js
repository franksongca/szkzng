// listen controller
'use strict';

angular.module('szkzApp').controller('ListenLookReadCtrl', ['$scope', 'UIService', '$routeParams', '$location', '$timeout', 'ArticleListFactory',
    'PageControlData', 'SZKZ_CONSTANTS', function($scope, UIService, $routeParams, $location, $timeout, ArticleListFactory, PageControlData, SZKZ_CONSTANTS)
{
    if (!ArticleListFactory.isContentLoaded()) {
        $location.path('/' + SZKZ_CONSTANTS.PAGE_NAMES.HOME_PAGE);
        return;
    }
    $scope.pageName = SZKZ_CONSTANTS.PAGE_NAMES.LISTEN_LOOK_READ_PAGE;

    var pageControlData = PageControlData.getPageControlData(SZKZ_CONSTANTS.PAGE_NAMES.LISTEN_LOOK_READ_PAGE, $routeParams.sub);

    $timeout(function () {
        angular.extend($scope, pageControlData);
    });

    $scope.$on('$viewContentLoaded', function(){
        UIService.animatePageIn();
    });
}]);

