'use strict';

angular.module('szkzApp.filters').filter('subTitleFilter', ['AppConfiguration', function (AppConfiguration) {
    return function (item) {
        var lang = AppConfiguration.getLanguage();
        
        if (item){
            //console.log(JSON.stringify(item));
            if (lang === 'zh') {
                return item.py;
            } else {
                return item[lang];
            }
        } else {
            return '';
        }
    };
}]);