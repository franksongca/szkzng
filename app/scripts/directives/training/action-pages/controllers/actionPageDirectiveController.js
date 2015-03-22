angular.module('szkzApp').controller('ActionPageDirectiveCtrl',
    [
        '$scope',
        '$rootScope',
        'BookmarkManager',
        '$routeParams',
        '$timeout',
        '$window',
        '$document',
        'UIService',
        'SZKZ_CONSTANTS',
        'ArticleFactory',
        'AudioPlayer',
        '$element',
        function($scope, $rootScope, BookmarkManager, $routeParams,$timeout, $window, $document,
                 UIService, SZKZ_CONSTANTS, ArticleFactory, AudioPlayer, $element)
{
    var viewHeight,
        contentHeight,
        contentElement,
        charHeight,
        charWidth,
        mostTop,
        contentLeft,
        //currentIndex,
        subAction,
        element = $element;

    //$rootScope.totalPages = ArticleFactory.getTotalPages();

    $scope.totalLines = ArticleFactory.getPageTotalLines($rootScope.currentPage - 1);
    $scope.charactersPerRow = ArticleFactory.getCharactersPerLine();
    $scope.characters = ArticleFactory.getPageCharacters($rootScope.currentPage - 1);
    $scope.totalCharacters = $scope.characters.length;
    $scope.charWidthRate = 100 / $scope.charactersPerRow;

    $scope.showPinYin = true;

    //$scope.characters[0].active = true;

    function updateFontSize() {
        $timeout(function () {
            var hzContainerWidth = angular.element('.hz-inner-container').width();

            if (hzContainerWidth <= 50 ) {
                $scope.pinyinSize = 'xs';
            } else if (hzContainerWidth > 50 && hzContainerWidth <= 60) {
                $scope.pinyinSize = 'sm';
            } else if (hzContainerWidth > 60 && hzContainerWidth <= 100) {
                $scope.pinyinSize = 'md';
            } else if (hzContainerWidth > 100 && hzContainerWidth <= 120) {
                $scope.pinyinSize = 'lg';
            } else {
                $scope.pinyinSize = 'xl';
            }

            switch ($scope.pinyinSize) {
                case 'xs':
                    $scope.pinYinHeight = 35;
                    break;
                case 'sm':
                    $scope.pinYinHeight = 39;
                    break;
                case 'md':
                    $scope.pinYinHeight = 50;
                    break;
                case 'lg':
                    $scope.pinYinHeight = 60;
                    break;
                case 'xl':
                    $scope.pinYinHeight = 70;
                    break;
            }
            console.info('hzContainerWidth='+hzContainerWidth);
            $scope.hanZiFontSize = hzContainerWidth * 0.9 + 'px';
            $scope.hzContainerHeight = (hzContainerWidth + 4) + 'px';
        }, 200);
    }

    $scope.$watch(function () {
        return $rootScope.currentPage
    }, function () {
        $timeout(function () {
            $scope.characters = ArticleFactory.getPageCharacters($rootScope.currentPage - 1);

            updateFontSize();

            if ($scope.pageName === SZKZ_CONSTANTS.PAGE_NAMES.LISTEN_PAGE) {
                AudioPlayer.playArticleAudio($rootScope.currentPage - 1);
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
        $scope.charWidth = element.find('.action-content-container ul li').width();
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

    $scope.adjustPositionTo = function (n) {
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

    $scope.activateChar = function (index) {
        $scope.currentIndex = index;
        getCharByIndex(index).active = true;
    }

    $scope.deactivateChar = function (index) {
        $scope.currentIndex = -1;
        getCharByIndex(index).active = false;
    }

    $scope.removeAudioPlayer = function () {
        AudioPlayer.remove();
    }

    function getCharByIndex(index) {
        return $scope.characters[index];
    }







    $scope.clickedOnChar = function (index) {
        alert('?'+index);
    }


}]);


