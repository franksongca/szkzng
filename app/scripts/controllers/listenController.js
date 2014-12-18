// listen controller
'use strict';

angular.module('szkzApp').controller('ListenCtrl', ['$scope', 'UIService', '$location', '$timeout', 'ArticleListFactory', 
    'PageControlData', 'SZKZ_CONSTANTS', function($scope, UIService, $location, $timeout, ArticleListFactory, PageControlData, SZKZ_CONSTANTS) 
{
    if (!ArticleListFactory.isContentLoaded()) {
        $location.path('/' + SZKZ_CONSTANTS.PAGE_NAMES.HOME_PAFE);
        return;
    }

    var pageControlData = PageControlData.getPageControlData(SZKZ_CONSTANTS.PAGE_NAMES.LISTEN_PAGE);

    $timeout(function () {
        angular.extend($scope, pageControlData);
    });
        
    
    $scope.$on('$viewContentLoaded', function(){
        UIService.animatePageIn();
    });
}]);

