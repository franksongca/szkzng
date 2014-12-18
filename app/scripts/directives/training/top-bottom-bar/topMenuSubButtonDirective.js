'use strict';

angular.module('szkzApp.directives').directive('topMenuSubButton', ['$rootScope', 'BookmarkManager', '$timeout', 'SZKZ_CONSTANTS', function ($rootScope, BookmarkManager, $timeout, SZKZ_CONSTANTS) {
    return {
        restrict: 'E',
        templateUrl: 'views/training/top-bottom-bar/top-menu-sub-button.html',
        link: function (scope, element, attr) {
            element.click(function(evt) {
                if (!$rootScope.myScroll[SZKZ_CONSTANTS.HOME_ACTION_MENU_SCROLL_WRAPPER].moved) {
                    var actionName = element.find('div.top-menu-sub-button').attr('type'),
                        subType = element.find('div.top-menu-sub-button').attr('subtype'),
                        targetElement;
                        
                    evt.preventDefault();
                    
                    targetElement = angular.element(evt.target);
                    if (!targetElement.hasClass('top-menu-sub-button')) {
                        targetElement = targetElement.closest('.top-menu-sub-button');
                    }
                    
                    if (!targetElement.hasClass('current')) {
                        $rootScope.$broadcast("doActionEvent", {action: actionName, sub: subType});
                        element.find('.top-menu-sub-button').addClass('button-active');
                        $timeout(function () {
                            element.find('.top-menu-sub-button').removeClass('button-active');
                        },300);
                    }
                }
            });
        }
    };
}]);