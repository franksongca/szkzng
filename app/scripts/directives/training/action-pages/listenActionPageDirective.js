'use strict';

angular.module('szkzApp.directives').directive('listenActionPage', ['$rootScope', 'BookmarkManager', '$routeParams',
    '$timeout', '$window', '$document', 'UIService', 'SZKZ_CONSTANTS', 'ArticleFactory', 'AudioPlayer',
    function ($rootScope, BookmarkManager, $routeParams, $timeout, $window, $document, UIService, SZKZ_CONSTANTS, ArticleFactory, AudioPlayer)
{
    return {
        restrict: 'E',
        templateUrl: 'views/training/action-pages/listen-action-template.html',

		controller: function($scope, $element){











            $scope.clickedOnChar = function (index) {
            	alert('?'+index);
            }


    	},

        link: function ($scope, element, attr) {
			var viewHeight,
                contentHeight,
				contentElement,
				charHeight,
				charWidth,
				mostTop,
				contentLeft,
                currentIndex,
                subAction;

        	//$rootScope.totalPages = ArticleFactory.getTotalPages();

        	$scope.totalLines = ArticleFactory.getPageTotalLines($rootScope.currentPage - 1);
        	$scope.charactersPerRow = ArticleFactory.getCharactersPerLine();
        	$scope.characters = ArticleFactory.getPageCharacters($rootScope.currentPage - 1);
        	$scope.charWidth = 100 / $scope.charactersPerRow;

        	$scope.pinYinHeight = 50;
        	$scope.showPinYin = true;

            //$scope.characters[0].active = true;

        	function updateFontSize() {
	        	$timeout(function () {
	        		var hzContainerWidth = angular.element('.hz-inner-container').width();

	        		$scope.hanZiFontSize = hzContainerWidth * 0.9 + 'px';
	        		$scope.hzContainerHeight = (hzContainerWidth + 4) + 'px';
	        	}, 200);
        	}

            $scope.$on('$destroy', function () {
                if (currentIndex !== -1) {
                    deactivateChar(currentIndex);

                    if ($scope.pageName === SZKZ_CONSTANTS.PAGE_NAMES.LISTEN_PAGE) {
                        AudioPlayer.remove();
                    }
                }
            });

            if ($scope.pageName === SZKZ_CONSTANTS.PAGE_NAMES.LISTEN_PAGE) {
                $scope.$on('audio:cuepoint:reached', function (evt, option) {
                    var realIndex = option.realIndex,
                        cuePoint = option.cuePoint,
                        soundLen = option.soundLen;
                    //currentCuePoint = cuePoints[cuePoint].cuePoint;

                    activateChar(realIndex);
                    adjustPositionTo(realIndex + 1);
                    $timeout(function () {
                        deactivateChar(realIndex);
                    }, soundLen);
                    console.log("option.realIndex=" + cuePoint + "<" + realIndex + "," + soundLen + ">");
                });
            } else {
                ArticleFactory.setupPlayer();

                if ($routeParams && $routeParams.sub) {
                    subAction = $routeParams.sub;
                }

                switch ($scope.pageName) {
                    case SZKZ_CONSTANTS.PAGE_NAMES.LISTEN_LOOK_READ_PAGE:
                    case SZKZ_CONSTANTS.PAGE_NAMES.TRY_IT_PAGE:
                    case SZKZ_CONSTANTS.PAGE_NAMES.TEST_PAGE:
                    case SZKZ_CONSTANTS.PAGE_NAMES.PINYIN_PAGE:
                    case SZKZ_CONSTANTS.PAGE_NAMES.GAMES_PAGE:
                }

                var sub = $routeParams.sub;
                alert(sub);
            }

        	$scope.$watch(function () {
        		return $rootScope.currentPage
        	}, function () {
        		$timeout(function () {
                    $scope.characters = ArticleFactory.getPageCharacters($rootScope.currentPage - 1);

                    updateFontSize();

                    if ($scope.pageName === SZKZ_CONSTANTS.PAGE_NAMES.LISTEN_PAGE) {
                        ArticleFactory.playAudio($rootScope.currentPage - 1);
                    }
        		});
        	});

        	$scope.$watch(function () {
        		contentElement = contentElement || element.find('.action-content-container > ul');
        		return contentElement.height();
        	}, function () {
        		$timeout(function () {
                    console.log('element height changed!!!!!!!!!!!!!!'); updateFontSize();
                    calculateSize();
                    restoreToTop(0);
                    UIService.refreshPageContent();
        		});
        	});

        	function calculateSize() {
        		viewHeight = angular.element('.view-container').height() - ($rootScope.fullScreen ? 0 : angular.element('.top-bar').height() + angular.element('.bottom-bar').height()) - 10; // margin-top + margin-bottom = 10
                contentHeight = contentElement.height(),
				charHeight = element.find('.action-content-container ul li').height() + 5;
				charWidth = element.find('.action-content-container ul li').width();
				//pinyinHeight = charHeight - charWidth - 5;
				mostTop = viewHeight - contentHeight;
				contentLeft = (angular.element('.view-container').width() - contentElement.width())/2;
        	}

            angular.element($window).on('resize', function () {
                updateFontSize();
                calculateSize();
                restoreToTop(0);
            });

            function adjustPosition() {
                if (contentElement.position().top > 0) {
                    restoreToTop(0);
                } else if (contentElement.position().top < mostTop) {
                    restoreToTop(mostTop);
                }
            }

            function adjustPositionTo(n) {
                var line = Math.floor((n - 1) / $scope.charactersPerRow) + 1,
                    lineTop = (1 - line) * charHeight;
                if (lineTop > mostTop) {
                    restoreToTop(lineTop);
                } else {
                    if (contentElement.position().top > mostTop) {
                        restoreToTop(mostTop);
                    }
                }
            }

            function restoreToTop(n) {
                if ($rootScope.myScroll[SZKZ_CONSTANTS.PAGE_CONTENT_SCROLL_WRAPPER] &&
                    $rootScope.myScroll[SZKZ_CONSTANTS.PAGE_CONTENT_SCROLL_WRAPPER].scrollTo) {
                    $rootScope.myScroll[SZKZ_CONSTANTS.PAGE_CONTENT_SCROLL_WRAPPER].scrollTo(0, n, 1000, IScroll.utils.ease.elastic);
                }
            }

            function activateChar(index) {
                currentIndex = index;
                getCharByIndex(index).active = true;
            }

            function deactivateChar(index) {
                currentIndex = -1;
                getCharByIndex(index).active = false;
            }

            function getCharByIndex(index) {
                return $scope.characters[index];
            }
        }
    };
}]);
