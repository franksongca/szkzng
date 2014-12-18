'use strict';

angular.module('szkzApp.services').factory('AppConfiguration', ['localStorageService', function(localStorageService){
    var keys = {
            KEY_AUTO_SIGNIN: 'autoSignin',
            KEY_LANGUAGE: 'lang',
            KEY_NAME: 'userName'
        },
        config = {
            loginStatus: false,
            userName: '',
            autoSignin: false
        };
    
    localStorageService.prefix = 'szkz';//.setPrefix('szkz');
    
    return {
        getSigninStatus: function () {
            return config.loginStatus;
        },
        
        setSigninStatus: function (status) {
            config.loginStatus = status;
        },
        
        getUserName: function () {
            var userName;
            
            if(!config.autoSignin){
                return  config.userName;
            } else {
                userName = localStorageService.get(keys.KEY_NAME);
                return  userName === null ? '' : userName;            
            }
        },
        
        setUserName: function (name) {
            if(!config.autoSignin){
                config.userName = name;
            } else {
                localStorageService.set(keys.KEY_NAME, name);
            }
        },
        
        getAutoSignin: function () {
            var autosignin = localStorageService.get(keys.KEY_AUTO_SIGNIN);
            return  autosignin === null ? false : autosignin;
        },
        
        setAutoSignin: function (autoSignin) {
            localStorageService.set(keys.KEY_AUTO_SIGNIN, autoSignin);
        },
        
        getLanguage: function () {
            var lang = localStorageService.get(keys.KEY_LANGUAGE);
            return  lang === null ? 'zh' : lang;
        },
        
        setLanguage: function (lang) {
            localStorageService.set(keys.KEY_LANGUAGE, lang);
        }
    };
}]);
