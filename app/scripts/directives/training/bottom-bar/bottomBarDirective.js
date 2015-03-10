'use strict';

angular.module('szkzApp.directives').directive('bottomBar', ['$rootScope', '$location', 'BookmarkManager', '$timeout', 'SZKZ_CONSTANTS',
    '$document', 'ArticleFactory', function ($rootScope, $location, BookmarkManager, $timeout, SZKZ_CONSTANTS, $document, ArticleFactory)
{
    return {
        restrict: 'E',
        templateUrl: 'views/training/bottom-bar/bottom-bar.html',
        priority: 1000,

        link: function (scope, element, attr) {
            var STATUS = ['pausing', 'playing'],
                status = 1;

            // TODO: use current article's bookmark
            $rootScope.totalPage = ArticleFactory.getTotalPages();
            //$rootScope.currentPage = BookmarkManager.getSelectedArticlePage();

            scope.status = STATUS[status];

            function manageControlButtons () {
                if ($rootScope.currentPage < $rootScope.totalPage) {
                    element.find('ul li:nth-of-type(4) i').removeAttr('disable');
                } else {
                    element.find('ul li:nth-of-type(4) i').attr('disable', '');
                }

                if ($rootScope.currentPage > 1) {
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

            scope.$on('audio:ended', function () {
                status = 0;
                $timeout(function () {
                    scope.status = STATUS[status];
                });
            });

            scope.$on('audio:started', function () {
                status = 1;
                $timeout(function () {
                    scope.status = STATUS[status];
                });
            });

            scope.goFirst = function (evt) {
                if ($rootScope.currentPage == 1) {
                    return;
                }

                var originalColor = evt.target.style.color;
                evt.target.style.color = SZKZ_CONSTANTS.BUTTON_TAPPED_COLOR;

                $timeout(function () {
                    evt.target.style.color = originalColor;

                    $rootScope.currentPage = 1;
                    updatePageIndex();
                    manageControlButtons();

                }, SZKZ_CONSTANTS.TIME_CONSTANTS.DELAY_DURATION);
            };

            scope.goBack = function (evt) {
                if ($rootScope.currentPage == 1) {
                    return;
                }

                $rootScope.currentPage--;
                updatePageIndex();

                var originalColor = evt.target.style.color;
                evt.target.style.color = SZKZ_CONSTANTS.BUTTON_TAPPED_COLOR;

                $timeout(function () {
                    evt.target.style.color = originalColor;
                    manageControlButtons();
                }, SZKZ_CONSTANTS.TIME_CONSTANTS.DELAY_DURATION);
            };

            scope.goNext = function (evt) {
                if ($rootScope.currentPage === $rootScope.totalPage) {
                    return;
                }
                var originalColor = evt.target.style.color;
                evt.target.style.color = SZKZ_CONSTANTS.BUTTON_TAPPED_COLOR;

                $timeout(function () {
                    evt.target.style.color = originalColor;
                    if ($rootScope.currentPage < $rootScope.totalPage) {
                        $rootScope.currentPage++;
                        updatePageIndex();
                    }

                    manageControlButtons();
                }, SZKZ_CONSTANTS.TIME_CONSTANTS.DELAY_DURATION);
            };

            scope.playPause = function (evt) {
                var element = evt.target,
                    originalColor = element.style.color;
                element.style.color = SZKZ_CONSTANTS.BUTTON_TAPPED_COLOR;

                $timeout(function () {
                    element.style.color = originalColor;
                    status = 1 - status;
                    scope.status = STATUS[status];
                    $rootScope.$broadcast('play.pause.event', {status: status});    // status = 1, playing
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

            function updatePageIndex() {
                BookmarkManager.setSelectedArticlePage($rootScope.currentPage);
            };
        }
    };
}]);
