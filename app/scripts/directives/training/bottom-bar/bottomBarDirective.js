'use strict';

angular.module('szkzApp.directives').directive('bottomBar', ['$rootScope', '$location', 'BookmarkManager', '$timeout', 'SZKZ_CONSTANTS', 
    '$document', function ($rootScope, $location, BookmarkManager, $timeout, SZKZ_CONSTANTS, $document) 
{
    return {
        restrict: 'E',
        templateUrl: 'views/training/bottom-bar/bottom-bar.html',
        link: function (scope, element, attr) {
            var STATUS = ['pausing', 'playing'],
                status = 1;

            // TODO: use current article's bookmark
            scope.currentPage = 2;
            scope.totalPage = 10;
            scope.status = STATUS[status];
            
            function manageControlButtons () {
                if (scope.currentPage < scope.totalPage) {
                    element.find('ul li:nth-of-type(4) i').removeAttr('disable');
                } else {
                    element.find('ul li:nth-of-type(4) i').attr('disable', '');
                }
                
                if (scope.currentPage > 1) {
                    element.find('ul li:first-child i').removeAttr('disable');
                    element.find('ul li:nth-of-type(2) i').removeAttr('disable');
                } else {
                    element.find('ul li:first-child i').attr('disable', '');
                    element.find('ul li:nth-of-type(2) i').attr('disable', '');
                }
            };
            
            scope.toggleControlPanel = function (evt) {
                var originalColor = evt.target.style.color;
                evt.target.style.color = SZKZ_CONSTANTS.BUTTON_TAPPED_COLOR;
                
                $timeout(function(){
                    evt.target.style.color = originalColor;

                    element.find('.bottom-more-button').slideToggle();
                    element.find('.control-panel').slideToggle();  
                }, SZKZ_CONSTANTS.TIME_CONSTANTS.DELAY_DURATION);
            };
                
            scope.close = function (evt) {
                var originalColor;
                if (evt) {
                    originalColor = evt.target.style.color;
                    evt.target.style.color = SZKZ_CONSTANTS.BUTTON_TAPPED_COLOR;
                }

                $timeout(function () {
                    if (evt) {
                        evt.target.style.color = originalColor;
                    }
                    
                    element.find('.bottom-more-button').slideToggle(function () {
                        element.find('.bottom-more-button').removeAttr('style');
                    });
                    element.find('.control-panel').slideToggle(function () {
                        element.find('.control-panel').removeAttr('style');
                    });  
                }, SZKZ_CONSTANTS.TIME_CONSTANTS.DELAY_DURATION);
            };
            
            scope.$on('toggleMenusEvent', function () {
                if (angular.element('.control-panel').is(':visible')) {
                    scope.close();
                }
            });
            
            scope.goFirst = function (evt) {
                if (scope.currentPage == 1) {
                    return;    
                }
                
                var originalColor = evt.target.style.color;
                evt.target.style.color = SZKZ_CONSTANTS.BUTTON_TAPPED_COLOR;
                
                $timeout(function () {
                    evt.target.style.color = originalColor;

                    scope.currentPage = 1;
                    manageControlButtons();
                    
                }, SZKZ_CONSTANTS.TIME_CONSTANTS.DELAY_DURATION);
            };
            
            scope.goBack = function (evt) {
                if (scope.currentPage == 1) {
                    return;    
                }
                
                scope.currentPage--;
                
                var originalColor = evt.target.style.color;
                evt.target.style.color = SZKZ_CONSTANTS.BUTTON_TAPPED_COLOR;

                $timeout(function () {
                    evt.target.style.color = originalColor;
                    manageControlButtons();
                }, SZKZ_CONSTANTS.TIME_CONSTANTS.DELAY_DURATION);
            };
            
            scope.goNext = function (evt) {
                if (scope.currentPage === scope.totalPage) {
                    return;
                }
                
                var originalColor = evt.target.style.color;
                evt.target.style.color = SZKZ_CONSTANTS.BUTTON_TAPPED_COLOR;
                
                $timeout(function () {
                    evt.target.style.color = originalColor;
                    if (scope.currentPage < scope.totalPage) {
                        scope.currentPage++;
                    }

                    manageControlButtons();
                }, SZKZ_CONSTANTS.TIME_CONSTANTS.DELAY_DURATION);
            };

            scope.playPause = function (evt) {
                var originalColor = evt.target.style.color;
                evt.target.style.color = SZKZ_CONSTANTS.BUTTON_TAPPED_COLOR;
                
                $timeout(function () {
                    evt.target.style.color = originalColor;
                    status = 1 - status;
                    scope.status = STATUS[status];
                }, SZKZ_CONSTANTS.TIME_CONSTANTS.DELAY_DURATION);
            };
            
            scope.home = function (evt) {
                evt.preventDefault();
                evt.stopPropagation();
                evt.stopImmediatePropagation();
                evt.target.style.color = SZKZ_CONSTANTS.BUTTON_TAPPED_COLOR;
                
                $timeout(function () {
                    $rootScope.$apply(function () {
                        evt.target.style.color = SZKZ_CONSTANTS.BUTTON_TAPPED_COLOR;
                        $rootScope.$broadcast('doActionEvent', {action: SZKZ_CONSTANTS.PAGE_NAMES.HOME_PAGE});
                    });             
                }, SZKZ_CONSTANTS.TIME_CONSTANTS.DELAY_DURATION);
            };
        }
    };
}]);