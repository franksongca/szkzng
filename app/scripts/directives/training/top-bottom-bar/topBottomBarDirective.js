'use strict';

angular.module('szkzApp.directives').directive('topBottomBar', ['$rootScope', '$location', '$window', '$document', 'BookmarkManager', '$timeout', 
    'SZKZ_CONSTANTS', 'TweenMax', function ($rootScope, $location, $window, $document, BookmarkManager, $timeout, SZKZ_CONSTANTS, TweenMax) 
{
    return {
        restrict: 'E',
        templateUrl: 'views/training/top-bottom-bar/top-bottom-bar.html',
        link: function (scope, element, attr) {
            var maskLayer = element.find('.dropdown-mask'); 
            
            angular.element($window).bind('resize', function () {
                closeDropmenu();
                $rootScope.$broadcast('screen.size.changed');
            });
            
            scope.$on('dropdown.menu.clicked', closeDropmenu); 

            scope.$on('toggleMenusEvent', closeDropmenu);
            
            function closeDropmenu () {
                if (maskLayer.is(':visible')) {
                    maskLayer.hide();
                    element.find('#iScrollDropdownActionMenuWrapper').slideUp();
                }
            }          
                      
            scope.$on('$destroy', function () {
                angular.element($window).unbind('resize');
            });
            
            maskLayer.on('click', function () {
                slideToggle();
            });
            
            element.find('.logo').click(function (evt) {
                evt.preventDefault();
                var logo = document.getElementsByClassName('logo')[0];
                TweenMax.to(logo, SZKZ_CONSTANTS.TIME_CONSTANTS.BUTTON_ANI_DURATION, {scale: 0.9, opacity: 0.7, onComplete: function () {
                    $rootScope.$broadcast("doActionEvent", {action: SZKZ_CONSTANTS.PAGE_NAMES.HOME_PAGE});
                }});
            });

            element.find('.more-button').click(function (evt) {
                var originalColor = evt.target.style.color;
                
                TweenMax.to(evt.target, SZKZ_CONSTANTS.TIME_CONSTANTS.BUTTON_ANI_DURATION, {color: SZKZ_CONSTANTS.BUTTON_TAPPED_COLOR, onComplete: function () {
                    if (!angular.element('.dropdown-menu-container').is(':visible')) {
                        $rootScope.$broadcast('toggleMenusEvent');
                    }
                    
                    element.find('#iScrollDropdownActionMenuWrapper').slideToggle(function () {
                        if ($('#iScrollDropdownActionMenuWrapper').is(':visible')) {
                            maskLayer.show();
                            $rootScope.$broadcast("actionMenuRefreshEvent");

                        } else {
                            maskLayer.hide();
                        }
                    });
                    
                    TweenMax.to(evt.target, SZKZ_CONSTANTS.TIME_CONSTANTS.BUTTON_ANI_DURATION, {color:''});
                }});
            });
            
            function slideToggle () {
                element.find('#iScrollDropdownActionMenuWrapper').slideToggle(function () {
                    if ($('#iScrollDropdownActionMenuWrapper').is(':visible')) {
                        maskLayer.show();
                    } else {
                        maskLayer.hide();
                    }
                });
            }
        }
    };
}]);