'use strict';

angular.module('szkzApp.directives').directive('topMenuButton', ['$rootScope', '$location', 'BookmarkManager', '$timeout', 'SZKZ_CONSTANTS', function ($rootScope, $location, BookmarkManager, $timeout, SZKZ_CONSTANTS) {
    return {
        restrict: 'E',
        templateUrl: 'views/training/top-bottom-bar/top-menu-button.html',
        link: function (scope, element, attr) {
            element.click(function (evt) {
                if (this.firstChild.attributes.sub.value === 'false'){
                    evt.preventDefault();
                    evt.stopPropagation();
                    var actionName = this.firstChild.attributes.type.value,
                        targetElement = angular.element(evt.target);
                    if (!targetElement.hasClass('top-menu-button')) {
                        targetElement = targetElement.closest('.top-menu-button');
                    }
                    
                    if (!targetElement.hasClass('current')) {
                        $rootScope.$broadcast("doActionEvent", {action: actionName});
                    }
                }
            });
        }
    };
}]);