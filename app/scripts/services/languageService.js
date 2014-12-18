'use strict';

angular.module('szkzApp.services').factory('LanguageFactory', ['$rootScope', '$http', function($rootScope, $http) {
    var phraseList;
    
    function loadPhraseList () {
        return $http.get('data/language.json')
        .then(function (response) {
            if (angular.isObject(response.data)) {
                phraseList = response.data;
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
            return loadPhraseList();
        },
        
        getPhraseZH: function (key) {
            return phraseList[key].zh;
        },
        
        getPhraseLang: function (key, lang) {
            return phraseList[key][lang];
        },
        
        getSubPhrase: function (key, lang) {
            if (lang === 'zh') {
                return phraseList[key].py;
            } else {
                return phraseList[key][lang];
            }
        },
        
        isLanguageLoaded: function () {
            return angular.isDefined(phraseList);
        }
    };
}]);
