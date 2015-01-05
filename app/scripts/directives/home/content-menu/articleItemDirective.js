'use strict';

angular.module('szkzApp.directives').directive('articleItem', ['$rootScope', 'BookmarkManager', '$timeout', 
    'SZKZ_CONSTANTS', function ($rootScope, BookmarkManager, $timeout, SZKZ_CONSTANTS) 
{
    return {
        restrict: 'E',
        templateUrl: "views/home/content-menu/article-item.html",
        link: function (scope, element, attr) {
            $timeout(function(){
                var articleCode = element.find('li').attr('article-code');
                if (articleCode === BookmarkManager.getSelectedArticleTypeCode()) {
                    element.find('li').removeClass('inactive').addClass('active');
                }
            },0);       
            
            element.click(function(evt) {
                if (!$rootScope.myScroll[SZKZ_CONSTANTS.HOME_CONTENT_MENU_SCROLL_WRAPPER].moved) {
                    var articleCode = element.find('li').attr('article-code'),
                        target = evt.target,
                        selectedArticleTitle = document.getElementsByClassName('selected-article')[0];

                    evt.preventDefault();

                    if (target.tagName !== 'LI') {
                        target = target.parentNode;
                    }
                    
                    TweenMax.fromTo(target, SZKZ_CONSTANTS.TIME_CONSTANTS.BUTTON_ANI_DURATION, {scaleY: 1}, {scaleY: -1, onComplete: function () {
                        TweenMax.fromTo(target, SZKZ_CONSTANTS.TIME_CONSTANTS.BUTTON_ANI_DURATION, {scaleY: -1}, {scaleY: 1, onComplete: function (){
                            BookmarkManager.setSelectedArticleTypeCode(articleCode);
                             $rootScope.$broadcast("articleItemSelectedEvent", articleCode);

                        }});
                    }});
                    
                    
                    TweenMax.fromTo(selectedArticleTitle, SZKZ_CONSTANTS.TIME_CONSTANTS.ARTICLE_ANI_DURATION, {x: 480, opacity: 0}, 
                        {x:0, opacity: 1, ease:Bounce.easeOut, onComplete: function () {

                        if (angular.element('.menu-left').width() === angular.element('.menu-right').width()) {
                            angular.element('.menu-container').animate({
                                left: '-100%'
                            }, SZKZ_CONSTANTS.TIME_CONSTANTS.MENU_ANI_DURATION, function () {
                                $rootScope.$broadcast('menuSlideRight');
                            });
                        }
                    }});
                }
            });
            
            scope.$on("articleItemSelectedEvent", function (evt, articleCode) {
                var thisArticleCode = element.find('li').attr('article-code');
                if (articleCode === thisArticleCode) {
                    element.find('li').removeClass('inactive').addClass('active');
                } else {
                    element.find('li').removeClass('active').addClass('inactive');
                }
            });
        }
    };
}]);