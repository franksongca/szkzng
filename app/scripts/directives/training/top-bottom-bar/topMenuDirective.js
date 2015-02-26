'use strict';

angular.module('szkzApp.directives').directive('topMenu', ['$rootScope', '$document', 'BookmarkManager', '$timeout', 'SZKZ_CONSTANTS', function ($rootScope, $document, BookmarkManager, $timeout, SZKZ_CONSTANTS) {
    return {
        restrict: 'E',
        templateUrl: 'views/training/top-bottom-bar/top-menu.html',
        link: function (scope, element, attr) {
            var miniDist = 20,
                debug = angular.element('.debug'),
                debugSection1 = debug.find('.section-1')[0],
                debugSection2 = debug.find('.section-2')[0],
                debugSection3 = debug.find('.section-3')[1],
                touchCount = 0,
                touchStartPos = [],
                touchEndPos = [];
            
            function resetPos () {
                touchStartPos = [],
                touchEndPos = [];
            }
            
            function whichAction () {
                if (touchStartPos.length == 0) {
                    return -1;
                }

                var xMoved = Math.abs(touchStartPos[0].x - touchEndPos[0].x) + 
                        Math.abs(touchStartPos[1].x - touchEndPos[1].x),
                    yMoved = Math.abs(touchStartPos[0].y - touchEndPos[0].y) + 
                        Math.abs(touchStartPos[1].y - touchEndPos[1].y);

                if (yMoved < miniDist) {
                    return -1;
                }
                
                if (xMoved / yMoved > 0.7) {
                    return -1;
                }
                
                if ((+touchStartPos[0].y > +touchEndPos[0].y && +touchStartPos[1].y < +touchEndPos[1].y) ||
                    (+touchStartPos[0].y < +touchEndPos[0].y && +touchStartPos[1].y > +touchEndPos[1].y)) {
                    return 0;   // pinch or unpinch
                }
                
                return -1;  // no action
            }
            
            scope.$on('$destroy', function() {
                $document.off('touchstart');
                $document.off('touchmove');
            });
            
            $document.on('touchstart' , function (evt) {
                var touches = evt.originalEvent.touches || evt.originalEvent.changedTouches;
                
                if (touches.length < 2) {
                    return;
                }
                
                touchStartPos[0] = {x:touches[0].pageX, y:touches[0].pageY }; 
                touchStartPos[1] = {x:touches[1].pageX, y:touches[1].pageY }; 
            });
            
            $document.on('touchmove' , function (evt) {
                evt.preventDefault();
                
                var touches = evt.originalEvent.touches || evt.originalEvent.changedTouches,
                    action;
                
                if (touches.length < 2  || touchStartPos.length === 0) {
                    return;
                }
                
                touchEndPos[0] = {x:touches[0].pageX, y:touches[0].pageY }; 
                touchEndPos[1] = {x:touches[1].pageX, y:touches[1].pageY }; 
                
                action = whichAction();
                
                if (action === 0) {
                    debugSection1.innerHTML += 'toggle!'; 
                    resetPos ();
                    angular.element('.top-bar').slideToggle(function () {
                        $rootScope.fullScreen = angular.element('.top-bar').css('display') === 'none';
                    });
                    angular.element('.bottom-bar').slideToggle();
                    
                    $rootScope.$broadcast('toggleMenusEvent');
                }
            });
        }
    };
}]);