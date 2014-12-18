'use strict';

angular.module('szkzApp.directives').directive('homeMenu', ['$rootScope', '$timeout', 'SZKZ_CONSTANTS', '$window', 
    function ($rootScope, $timeout, SZKZ_CONSTANTS, $window) {
    return {
        restrict: 'E',
        templateUrl: "views/home/menu.html",
        link: function (scope, element, attr) {
            var eventsBound = false,
                pressed = false, 
                distanceMoved = 0,
                originalPos,
                startPos,
                viewWidth,
                menuElement = element.find('.menu-container'),
                verticalMoved,
                currentMenu = 0;    // 0: left menu, 1: right menu

            scope.$on('$destroy', function() {
                angular.element($window).unbind('resize');
            });
            
            scope.$on('menuSlideRight', function () {
                currentMenu = 1;
            });
            
            angular.element($window).bind('resize', function () {
                bindEvents();
            });
            
            function bindEvents () {
                if (element.find('.menu-left').width() === element.find('.menu-right').width()) {
                    if (eventsBound) {
                        return;    
                    }

                    currentMenu = 0;
                    console.log('evebt bound!');
                    eventsBound = true;
                    viewWidth = element.find('.menu-left').width();

                    element.bind('touchstart', function (evt) {
                        press({x: evt.originalEvent.touches[0].pageX, y: evt.originalEvent.touches[0].pageY});
                    });

                    element.bind('touchend', function (evt) {
                        release();
                    });

                    element.bind('touchmove', function (evt) {
                        evt.preventDefault();
                        move({x: evt.originalEvent.touches[0].pageX, y: evt.originalEvent.touches[0].pageY});
                    });

                    element.on('mousedown', function (evt) {
                        press({x: evt.pageX, y: evt.pageY});
                    });

                    element.on('mouseup', function (evt) {
                        release();
                    });
                    
                    element.on('mouseleave', function (evt) {
                        release();
                    });

                    element.on('mousemove', function (evt) {
                        evt.preventDefault();
                        move({x: evt.pageX, y: evt.pageY});
                    });
                } else {
                    eventsBound = false;
                    element.unbind('touchstart');
                    element.unbind('touchend');
                    element.unbind('touchmove');
                    element.off('mousedown');
                    element.off('mousedup');
                    element.off('mousemove');
                    menuElement.css('left', 0);
                }
            }
            
            function press (position) {
                pressed = true;
                distanceMoved = 0;
                originalPos = menuElement.position().left;
                startPos = position;
            }
            
            function release () {
                if (!pressed) {
                    return;
                }

                pressed = false;
                
                if (currentMenu === 0) {
                    if (distanceMoved/viewWidth < -0.4) {
                        menuElement.css('left', '-100%');
                        currentMenu = 1;
                    } else {
                        menuElement.css('left', 0);
                    }
                } else {
                    if (distanceMoved/viewWidth > 0.4) {
                        menuElement.css('left', 0);
                        currentMenu = 0;
                    } else {
                        menuElement.css('left', '-100%');
                    }
                }
            }
            
            function move (position) {
                if (pressed) {
                    distanceMoved = position.x - startPos.x; // < 0: go left
                    verticalMoved = position.y - startPos.y;

                    if (distanceMoved !== 0 && Math.abs(verticalMoved/distanceMoved) < 0.7) {
                        menuElement.css('left', originalPos + distanceMoved);
                    }
                }
            }
            
            bindEvents();
        }
    };
}]);