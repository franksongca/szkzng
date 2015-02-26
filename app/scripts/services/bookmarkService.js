'use strict';

angular.module('szkzApp.services').factory('BookmarkManager', ['$rootScope', 'localStorageService', function($rootScope, localStorageService){
    var defaultBookmark = 'kj-SZJ';
    
    localStorageService.prefix = 'szkz';
    
    return {
        getSelectedArticleTypeCode: function () {
            var bookmark = localStorageService.get('bookmark') || defaultBookmark;
            return  bookmark;
        },

        getSelectedArticlePage: function () {
            var bookmark = localStorageService.get('bookmark') || defaultBookmark,
                page = localStorageService.get('page-' + bookmark) || 1;

            //alert('getSelectedArticlePage ['+'page-' + bookmark+'] = ' + page);    
            return  page;
        },
        
        setSelectedArticleTypeCode: function (bookmark) {
            localStorageService.set('bookmark', bookmark);      // current article
            $rootScope.$broadcast('articleChanged', {bookmark: bookmark});
        },

        setSelectedArticlePage: function (page) {
            var bookmark = this.getSelectedArticleTypeCode();
            localStorageService.set('page-' + bookmark, page);

            //alert('[' +'page-' + bookmark+']setSelectedArticlePage('+page+')');
        },

        getSelectedArticleType: function () {
            var bookmark = this.getSelectedArticleTypeCode();
            return bookmark.split('-')[0];
        },
        
        getSelectedArticleCode: function () {
            var bookmark = this.getSelectedArticleTypeCode();
            return bookmark.split('-')[1];
        },

        getArticleTypeByCode: function (code) {
            return code.split('-')[0];
        }
    };
}]);
