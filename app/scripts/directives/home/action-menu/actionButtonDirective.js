'use strict';

angular.module('szkzApp.directives').directive('actionButton', ['$rootScope', '$location', 'BookmarkManager', '$timeout', 
    'SZKZ_CONSTANTS', function ($rootScope, $location, BookmarkManager, $timeout, SZKZ_CONSTANTS) 
{
    return {
        restrict: 'E',
        templateUrl: 'views/home/action-menu/action-button.html',
        link: function (scope, element, attr) {
            element.click(function(evt) {
                evt.preventDefault();
                if (!$rootScope.myScroll[SZKZ_CONSTANTS.HOME_ACTION_MENU_SCROLL_WRAPPER].moved) {
                    var actionName = element.find('div.action-button').attr('type'),
                        hasChildren = element.find('div.arrow-button').hasClass('show'),
                        targetElement = angular.element(evt.target);
                    
                    if (hasChildren) {
                        $rootScope.$broadcast("dropDownButtonClickEvent", actionName);
                    } else {
                        if (!targetElement.hasClass('action-button')) {
                            targetElement = targetElement.closest('.action-button');
                        }
                        
                    if (angular.element('.right-menu-container').length > 0 || 
                        (!targetElement.hasClass('current') && angular.element('.dropdown-menu-container').length > 0)) {
                            targetElement.addClass('button-active');
                            $timeout(function () {
                                targetElement.removeClass('button-active');
                                $rootScope.$broadcast('dropdown.menu.clicked');
                                $rootScope.$broadcast('doActionEvent', {action: actionName});
                            }, SZKZ_CONSTANTS.TIME_CONSTANTS.DELAY_DURATION);
                        }
                    }
                }
            });
            
            /*
            element.on("mousedown", function () {
                element.find('.action-button').addClass('button-active');
            });
            
            element.on("mouseup", function () {
                element.find('.action-button').removeClass('button-active');
            });*/
        }
    };
}]);