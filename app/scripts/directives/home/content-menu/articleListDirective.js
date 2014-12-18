'use strict';

angular.module('szkzApp.directives').directive('articleList', ['$rootScope', 'BookmarkManager', '$timeout', function ($rootScope, BookmarkManager, $timeout) {
    return {
        restrict: 'E',
        templateUrl: "views/home/content-menu/article-list.html",
        link: function (scope, element, attr) {
            scope.$on("articleListItemSelectedEvent", function (evt, type) {
                var thisType = element.find('ul').attr('type');
                
                if (type === thisType) {
                    element.find('ul').toggle();
                }
                
                
            });
            
            scope.$on("articleItemSelectedEvent", function (evt, articleCode) {
                var thisType = element.find('.menu-title').attr('type'),
                    type = BookmarkManager.getArticleTypeByCode(articleCode);
                
                if (type === thisType) {
                    element.find('.menu-item-check').show();
                } else {
                    element.find('.menu-item-check').hide();
                }
            });
        }
    };
}]);