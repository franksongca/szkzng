// listen controller
'use strict';

angular.module('szkzApp').controller('TryItCtrl', ['$scope', '$rootScope', 'UIService', '$routeParams', '$location', '$timeout', 'ArticleListFactory', 'PageControlData', 
     'SZKZ_CONSTANTS', function($scope, $rootScope, UIService, $routeParams, $location, $timeout, ArticleListFactory, PageControlData, SZKZ_CONSTANTS) 
{
    if (!ArticleListFactory.isContentLoaded()) {
        $location.path('/' + SZKZ_CONSTANTS.PAGE_NAMES.HOME_PAFE);
        return;
    }
        
    var pageControlData = PageControlData.getPageControlData(SZKZ_CONSTANTS.PAGE_NAMES.TRY_IT_PAGE, $routeParams.sub);

    $timeout(function () {
        angular.extend($scope, pageControlData);
    });
        
    $scope.$on('$viewContentLoaded', function() {
        UIService.animatePageIn();
    });
}]);

