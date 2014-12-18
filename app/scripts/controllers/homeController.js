'use strict';

// home controller
angular.module('szkzApp').controller('HomeCtrl', ['$rootScope', '$scope', 'TweenMax', '_', '$location', 'ArticleListFactory', 'AppConfiguration', 
    'ngDialog', '$document','BookmarkManager', 'LanguageFactory', 'SZKZ_CONSTANTS', '$timeout', 'ActionButtonsFactory', 'UIService',
    function ($rootScope, $scope, TweenMax, _, $location, ArticleListFactory, AppConfiguration, ngDialog, $document, BookmarkManager, 
        LanguageFactory, SZKZ_CONSTANTS, $timeout, ActionButtonsFactory, UIService)
{
    var lang = $scope.lang = AppConfiguration.getLanguage();

    if (lang === null) {
        lang = $scope.lang = 'en';
        AppConfiguration.setLanguage('en');
    }

    // hard code, set default language to en
    lang = $scope.lang = 'en';
    AppConfiguration.setLanguage('en');


    console.log('lang =' + lang + '-' + $scope.lang);

    $scope.actionMenuData = [];

    if (!$rootScope.$$listeners.doActionEvent) {
        $rootScope.$on('articleChanged', function (evt, bookmark) {
            updateCurrentArticleInfo(bookmark);
        });

        $rootScope.$on('$routeChangeStart', function(evt, next, current) { 
           console.log('next = ' + next + ', ' + current);
        });

        $rootScope.$on('doActionEvent', function (evt, option) {
            UIService.animatePageOut(function () {
                $timeout(function () { 
                    if (option.sub) {
                        $location.path('/' + option.action + '/' + option.sub);
                    } else {
                        $location.path('/' + option.action);
                    }
                }, 0);
            });    
        });
    }
        
    function updateArticleList () {
        updateCurrentArticleInfo(BookmarkManager.getSelectedArticleTypeCode());

        $scope.articles = ArticleListFactory.getArticles();
    }
        
    function setupLangPhrases () {
        $scope.signStr = LanguageFactory.getPhraseLang('signIn', lang);

        $scope.actineMenuInfo = {
            titleHz: LanguageFactory.getPhraseLang('trainingMethod', 'zh'),
            subTitle: lang === 'zh' ? 
                LanguageFactory.getPhraseLang('trainingMethod', 'py') : 
                LanguageFactory.getPhraseLang('trainingMethod', lang)
        };

    }  

    function updateCurrentArticleInfo (bookmark) {
        $timeout(function () {
            var type = BookmarkManager.getSelectedArticleType(bookmark);

            $scope.articleInfo = ArticleListFactory.getArticleInfo(
                type,
                BookmarkManager.getSelectedArticleCode(bookmark)
            );
            $scope.articleInfo.typeLabel = ArticleListFactory.getArticleTypeLabel(type).hz; 
        }, 0);
    }
        
    function updateActionButtons() {
        var actionButtons = ActionButtonsFactory.getActionButtons(),
            firstSubButtons = false;

        actionButtons = removeLabels(actionButtons);

        _.each(actionButtons, function (actionButton) {
            if (actionButton.buttons) {
                actionButton.arrowButton = 'show';
                if (firstSubButtons) {
                    actionButton.upDownIcon = 'fa-sort-down';
                    actionButton.childShow = 'hide';
                } else {
                    firstSubButtons = true;
                    actionButton.upDownIcon = 'fa-sort-up';
                    actionButton.childShow = 'show';
                }
                actionButton.buttons = removeLabels(actionButton.buttons);
            } else {
                actionButton.arrowButton = 'hide';
                actionButton.childShow = 'hide';
            }
        });

        $timeout(function () {
            $scope.actionButtons = actionButtons;
        });
    }            

    if (!ArticleListFactory.isContentLoaded()) {
        ArticleListFactory.init().then(
            function (response) {
                if (response) {
                    updateArticleList();
                } else {
                    console.log('failed load article list.');
                }
            }
        );
    } else {
        updateArticleList();
    }

    if (!LanguageFactory.isLanguageLoaded()) {
        LanguageFactory.init().then(
            function (response) {
                if (response) {
                    setupLangPhrases();
                } else {
                    console.log('failed load language.');
                }
            }
        );
    } else {
        setupLangPhrases();
    }
        
    if (!ActionButtonsFactory.isActionButtonsLoaded()) {
        ActionButtonsFactory.init().then(
            function (response) {
                if (response) {
                    updateActionButtons();
                } else {
                    console.log('failed load actions buttons.');
                }
            }
        );
    } else {
        updateActionButtons();
    }


    function removeLabels (actionButtons) {
        return _.filter(actionButtons, function(actionButton){
            return actionButton.type !== 'label' && actionButton.name !== 'cancel';
        });
    }
    
    $scope.$on('$viewContentLoaded', UIService.animatePageIn);
    $scope.$on('articleListItemSelectedEvent', UIService.refreshContentMenu);

    $scope.signin = function () {
        UIService.launchSigninDialog();
    };

    $scope.launchSettings = function (evt) {
        UIService.launchAdminDialog(evt.target, evt.tagName, 'settings');
    };
        
    $scope.launchAbout = function (evt) {
        UIService.launchAdminDialog(evt.target, evt.tagName, 'about');
    };
        
    $scope.launchHelp = function (evt) {
        UIService.launchAdminDialog(evt.target, evt.tagName, 'help');
    };
}]);

