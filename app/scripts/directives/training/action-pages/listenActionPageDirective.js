'use strict';

angular.module('szkzApp.directives').directive('listenActionPage', ['$rootScope', 'BookmarkManager', '$timeout', '$window', '$document', 'UIService',
    'SZKZ_CONSTANTS', 'ArticleFactory', function ($rootScope, BookmarkManager, $timeout, $window, $document, UIService, SZKZ_CONSTANTS, ArticleFactory) {
    return {
        restrict: 'E',
        templateUrl: 'views/training/action-pages/listen-action-template.html',

		controller: function($scope, $element){
            $scope.test = function () {
            	alert('?');
            }
    	},

        link: function ($scope, element, attr) {
			var pressed = false, 
                distanceMoved = 0,
                distanceMovedPre = 0,
                direction,
                originalPos,
                startPos,
                viewHeight,
                contentHeight,
				contentElement,
				charHeight,
				charWidth,
				pinyinHeight,
				mostTop,
				timeStart,
				totalMoved,
				enterMoving = false,
				contentLeft,
				clickedPosition;

        	//$rootScope.totalPages = ArticleFactory.getTotalPages();

        	$scope.totalLines = ArticleFactory.getPageTotalLines($rootScope.currentPage - 1);
        	$scope.charactersPerRow = ArticleFactory.getCharactersPerLine();
        	$scope.characters = ArticleFactory.getPageCharacters($rootScope.currentPage - 1);
        	$scope.charWidth = 100 / $scope.charactersPerRow;

        	function updateFontSize() {
	        	$timeout(function () {
	        		var hzContainerWidth = angular.element('.hz-inner-container').width();

	        		$scope.hanZiFontSize = hzContainerWidth * 0.9 + 'px';
	        		$scope.hzContainerHeight = (hzContainerWidth + 10) + 'px';
	        		
	        		//calculateSize();
	        		//UIService.refreshActionPage();
	        	}, 200);
        	}

        	$scope.$watch(function () { 
        		return $rootScope.currentPage
        	}, function () {
        		$timeout(function () {
	        		$scope.characters = ArticleFactory.getPageCharacters($rootScope.currentPage - 1);
        		});
        	});

        	$scope.$watch(function () {
        		contentElement = contentElement || element.find('.action-content-container ul'); 
        		return contentElement.height();
        	}, function () {
        		$timeout(function () {
        			contentElement.css('top', contentElement.height() + 'px');
        			restoreToTop();
					calculateSize();
        		});
        	});

        	function calculateSize() {
        		viewHeight = angular.element('.view-container').height() - ($rootScope.fullScreen ? 0 : angular.element('.top-bar').height() + angular.element('.bottom-bar').height()) - 10; // margin-top + margin-bottom = 10
                contentHeight = contentElement.height(),
				charHeight = element.find('.action-content-container ul li').height() + 5;
				charWidth = element.find('.action-content-container ul li').width();
				pinyinHeight = charHeight - charWidth - 5;
				mostTop = viewHeight - contentHeight;
				contentLeft = (angular.element('.view-container').width() - contentElement.width())/2;
        	}


            function bindEvents() {
            	var docElem = angular.element($document);

                docElem.bind('touchstart', function (evt) {
                    press({x: evt.originalEvent.touches[0].pageX, y: evt.originalEvent.touches[0].pageY});
                });

                docElem.bind('touchend', function (evt) {
                    release(evt);
                });

                docElem.bind('touchmove', function (evt) {
                    evt.preventDefault();
                    move({x: evt.originalEvent.touches[0].pageX, y: evt.originalEvent.touches[0].pageY});
                });

                docElem.on('mousedown', function (evt) {
                    press({x: evt.pageX, y: evt.pageY});
                });

                docElem.on('mouseup', function (evt) {
                    release(evt);
                });
                
                docElem.on('mouseleave', function (evt) {
                    release(evt);
                });

                docElem.on('mousemove', function (evt) {
                    evt.preventDefault();
                    move({x: evt.pageX, y: evt.pageY});
                });

	        	angular.element($window).on('resize', function () {
	        		updateFontSize();
	        		calculateSize();
	        	});
            }

            $timeout(function () { 
        		contentElement = contentElement || element.find('.action-content-container ul'); 
				bindEvents();
        		updateFontSize();
            });

            $scope.$on('$destroy', function() {
            	var docElem = angular.element($document);

                angular.element($window).unbind('resize');
                docElem.unbind('touchstart');
                docElem.unbind('touchend');
                docElem.unbind('touchmove');
                docElem.off('mousedown');
                docElem.off('mousedup');
                docElem.off('mousemove');
            });

            function press(position) {
	            //clicked = true;

	            clickedPosition = position;

				if(mostTop < 0) {
	                pressed = true;
	                distanceMoved = 0;
	                originalPos = contentElement.position().top;
	                startPos = position;

	                totalMoved = 0;
	                timeStart = Date.now();

	                enterMoving = false;
	            }
            }
            
            function release(evt) {
            	var timeUsed,
            		speed,
            		moreDistance,
            		futherMove,
            		currentTop = contentElement.position().top,
            		charIndex;

            	if (clickedPosition && !enterMoving) {
	           		charIndex = getClickedChar(clickedPosition);
	           		clickedPosition = null;
	           		pressed = false;
	           		clickedOnChar(charIndex);
	           		return;
                }

                if (!pressed) {
	           		clickedPosition = null;
                    return;
                } 

                totalMoved = Math.abs(currentTop - originalPos);

                pressed = false;
                timeUsed = Date.now() - timeStart;
                speed = totalMoved / timeUsed;

            	moreDistance = totalMoved * (1 - timeUsed/1000);

            	futherMove = direction < 0 ? currentTop - moreDistance : currentTop + moreDistance;

            	//console.info('futherMove='+futherMove + ":" + (1 - timeUsed/1000) + ":" + timeUsed/1000);
            	UIService.animateVerticalScrollTo(contentElement, futherMove, 0, function () {
            		adjustPosition();
            	});
            }
            
            function move(position) {
            	var realMoved;

            	if (clickedPosition) {
	            	enterMoving = true;	
	            }

                if (pressed) {
                	distanceMovedPre = distanceMoved;
                    distanceMoved = position.y - startPos.y;
                    direction = distanceMoved - distanceMovedPre;
                    
                    realMoved = originalPos + distanceMoved;

    	            contentElement.css('top', realMoved + 'px');
                }
            }

            function getClickedChar(position) {
            	var top = $rootScope.fullScreen ? 0 : angular.element('.top-bar').height(),
            		line = Math.floor((position.y - contentElement.position().top - top) / charHeight),
            		col = Math.floor((position.x - contentLeft)/charWidth),
            		charIndex = -1;

        		if (col >= 0 && col < $scope.charactersPerRow) {
        			charIndex = line * $scope.charactersPerRow + col;
        		}

				return charIndex + 1;
            }

            function adjustPosition() {
        		if (contentElement.position().top > 0) {
        			restoreToTop();
        		} else if (contentElement.position().top < mostTop) {
        			UIService.animateVerticalScrollTo(contentElement, mostTop, 0.5);
        		}
            }

            function adjustPositionTo(n) {
            	var line = Math.floor((n - 1) / $scope.charactersPerRow) + 1,
            		lineTop = (1 - line) * charHeight;

        		if (lineTop > mostTop) {
        			UIService.animateVerticalScrollTo(contentElement, lineTop, 0.5);
        		} else {
					UIService.animateVerticalScrollTo(contentElement, mostTop, 0.5);
        		}
            }

            function restoreToTop() {
            	UIService.animateVerticalScrollTo(contentElement, 0, 0.5);
            }

            function clickedOnChar(index) {


            }

        }
    };
}]);