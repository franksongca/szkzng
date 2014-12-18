'use strict';

angular.module('szkzApp.services').factory('ArticleListFactory', ['$rootScope', '$http', '_', function($rootScope, $http, _){
    var articleList;
    
    function loadArticleList () {
        return $http.get('data/content-list.json')
            .then(function (response) {
                if(angular.isObject(response.data)){
                    articleList = response.data;
                    return true;
                } else {
                    return false;
                }
            }, function () {
                return false;
            });
    }
    
    return {
        init: function () {
            return loadArticleList();
        },
        
        getArticles: function () {
            return articleList.articles;
        },
        
        getAppName: function () {
            return articleList.appName;
        },
        
        getArticleCount: function () {
            return articleList.articles.length;
        },
        
        getArticleInfo: function (type, code) {
            var articleGroup = _.find(articleList.articles, function (articleGroup) {
                    return articleGroup.type === type;
                }),
                article = _.find(articleGroup.articles, function (article) {
                    return article.code === (type + '-' + code.toUpperCase());
                });
            
            return article;
        },
        
        getArticleTypeLabel: function (type) {
            var articleGroup = _.find(articleList.articles, function (articleGroup) {
                    return articleGroup.type === type;
                }); 
            
            return articleGroup.label;
        },
        
        isContentLoaded: function () {
            return angular.isDefined(articleList);
        }
    };
}]);
