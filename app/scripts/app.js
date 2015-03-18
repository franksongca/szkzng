'use strict';

// Declare app level module which depends on views, and components
angular.module('szkzApp', [
    'ngRoute',
    'LocalStorageModule',
    'szkzApp.services',
    'szkzApp.directives',
    'szkzApp.filters',
    'ng-iscroll',
    'ngTouch',
    'ngDialog',
    'ngCordova'
])
.constant('_', window._)
.constant('Spinner', window.Spinner)
.constant('TweenMax', window.TweenMax)
.constant('SZKZ_CONSTANTS', {
    'HOME_CONTENT_MENU_SCROLL_WRAPPER': 'iScrollContentMenuWrapper',
    'HOME_ACTION_MENU_SCROLL_WRAPPER': 'iScrollActionMenuWrapper',
    'DROPDOWN_ACTION_MENU_SCROLL_WRAPPER': 'iScrollDropdownActionMenuWrapper',
    'PAGE_CONTENT_SCROLL_WRAPPER': 'iScrollPageContentWrapper',

    'SIGNIN_DIALOG_CLASS': 'signin-dialog-class',

    'BUTTON_TAPPED_COLOR': 'red',

    'TIME_CONSTANTS': {
        'DELAY_DURATION': 300,
        'PAGE_OUT_DURATION': 1.1,
        'PAGE_IN_DURATION': 1.2,
        'BUTTON_ANI_DURATION': 0.3,
        'ARTICLE_ANI_DURATION': 1.3,
        'MENU_ANI_DURATION': 500,
        'iSCROLL_DELAY_I': 500,
        'iSCROLL_DELAY_II': 400
    },

    'PAGE_NAMES': {
        'HOME_PAGE': 'home',
        'LISTEN_PAGE': 'listenCarefully',
        'LISTEN_LOOK_READ_PAGE': 'listenLookRead',
        'TRY_IT_PAGE': 'tryIt',
        'TEST_PAGE': 'test',
        'PINYIN_PAGE': 'pinyin',
        'GAMES_PAGE': 'games'
    },

    'LISTEN_LOOK_READ_NAMES': {
        'SUB_FOLLOW_ME': 'followMe',
        'SUB_LOOK_READ': 'lookAndRead',
        'SUB_LISTEN_READ': 'listenAndRead',
        'SUB_LOOK_READ_RANDOM': 'lookAndReadRandom',
        'SUB_LISTEN_READ_RANDOM': 'listenAndReadRandom'
    },
    'TRY_IT_NAMES': {
        'TRY_IT': 'tryIt',
        'TRY_IT_RANDOM': 'tryItRandom'
    }
})
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home/home.html',
            controller: 'HomeCtrl'
        })
        .when('/listenCarefully', {
            templateUrl: '../views/training/action-pages/listen-page.html',
            controller: 'ListenCtrl'
        })
        .when('/listenLookRead/:sub', {
            templateUrl: '../views/training/action-pages/listen-look-read-page.html',
            controller: 'ListenLookReadCtrl'
        })
        .when('/tryIt/:sub', {
            templateUrl: '../views/training/action-pages/try-it-page.html',
            controller: 'TryItCtrl'
        })
        .when('/test', {
            templateUrl: '../views/training/action-pages/listen-page.html',
            controller: 'TestCtrl'
        })
        .when('/pinyin', {
            templateUrl: '../views/training/action-pages/listen-page.html',
            controller: 'PinyinCtrl'
        })
        .when('/games/:sub', {
            templateUrl: '../views/training/action-pages/listen-page.html',
            controller: 'GamesCtrl'
        })
        .otherwise({redirectTo: '/home'});
}]);

angular.module('szkzApp.services', []);
angular.module('szkzApp.directives', []);
angular.module('szkzApp.filters', []);

