'use strict';

angular.module('szkzApp.directives').directive('listenActionPage', ['$rootScope', 'BookmarkManager', '$timeout', 
    'SZKZ_CONSTANTS', function ($rootScope, BookmarkManager, $timeout, SZKZ_CONSTANTS) {
    return {
        restrict: 'E',
        templateUrl: 'views/training/action-pages/listen-action-template.html',
        link: function (scope, element, attr) {
            /** TODO: Implement the business logic for the page
             **************************************************/
        }
    };
}]);