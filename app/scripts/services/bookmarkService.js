'use strict';

angular.module('szkzApp.services').factory('BookmarkManager', ['$rootScope', 'localStorageService', function($rootScope, localStorageService){
    var defaultBookmark = 'kj-SZJ';
    
    localStorageService.prefix = 'szkz';
    
    return {
        getSelectedArticleTypeCode: function () {
            var bookmark = localStorageService.get('bookmark');
            return  bookmark === null ? defaultBookmark : bookmark;
        },
        
        setSelectedArticleTypeCode: function (bookmark) {
            localStorageService.set('bookmark', bookmark);
            $rootScope.$broadcast('articleChanged', {bookmark: bookmark});
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
