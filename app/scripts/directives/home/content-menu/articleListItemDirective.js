'use strict';

angular.module('szkzApp.directives').directive('articleListItem', ['$rootScope', 'BookmarkManager', '$timeout', 'SZKZ_CONSTANTS', function ($rootScope, BookmarkManager, $timeout, SZKZ_CONSTANTS) {
    return {
        restrict: 'E',
        templateUrl: "views/home/content-menu/article-list-item.html",
        link: function (scope, element, attr) {
            $timeout(function(){
                var type = element.find('.menu-title').attr('type');
                if (type === BookmarkManager.getSelectedArticleType()) {
                    element.find('.menu-item-check').show();
                }
            },0);
            
            element.click(function(evt) {
                if (!$rootScope.myScroll[SZKZ_CONSTANTS.HOME_CONTENT_MENU_SCROLL_WRAPPER].moved) {
                    var elementClicked = element.find('.menu-title'),
                        type = elementClicked.attr('type');
                    
                    $rootScope.$broadcast("articleListItemSelectedEvent", type);
                    
                    if (elementClicked.hasClass('menu-expended')) {
                        elementClicked.removeClass('menu-expended').addClass('menu-folded');
                    } else {
                        elementClicked.removeClass('menu-folded').addClass('menu-expended');
                    }
                    
                    
                    
                }
            });
        }
    };
}]);