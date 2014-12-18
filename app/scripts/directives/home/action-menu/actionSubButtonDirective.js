'use strict';

angular.module('szkzApp.directives').directive('actionSubButton', ['$rootScope', 'BookmarkManager', '$timeout', 
    'SZKZ_CONSTANTS', function ($rootScope, BookmarkManager, $timeout, SZKZ_CONSTANTS) 
{
    return {
        restrict: 'E',
        templateUrl: 'views/home/action-menu/action-sub-button.html',
        link: function (scope, element, attr) {
            element.click(function (evt) {
                if (!$rootScope.myScroll[SZKZ_CONSTANTS.HOME_ACTION_MENU_SCROLL_WRAPPER].moved) {
                    var actionName = element.find('div.action-sub-button').attr('type'),
                        sub = element.find('div.action-sub-button').attr('subType'),
                        targetElement = angular.element(evt.target);
                    
                    evt.preventDefault();
                    
                    if (!targetElement.hasClass('action-sub-button')) {
                        targetElement = targetElement.closest('.action-sub-button');
                    }
                    
                    if (angular.element('.right-menu-container').length > 0 || 
                        (!targetElement.hasClass('current') && angular.element('.dropdown-menu-container').length > 0)) {
                        targetElement.addClass('button-active');
                        $timeout(function () {
                            $rootScope.$broadcast('dropdown.menu.clicked');
                            $rootScope.$broadcast('doActionEvent', {action: actionName, sub: sub});
                            targetElement.removeClass('button-active');
                        }, SZKZ_CONSTANTS.TIME_CONSTANTS.DELAY_DURATION);
                    }
                }
            });
            
            /*
            element.on("mousedown", function () {
                element.find('.action-sub-button').addClass('button-active');
            });
            
            element.on("mouseup", function () {
                element.find('.action-sub-button').removeClass('button-active');
            });*/
        }
    };
}]);