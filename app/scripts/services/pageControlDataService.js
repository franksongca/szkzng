'use strict';

angular.module('szkzApp.services').factory('PageControlData', ['$rootScope', '_', '$location', 'ArticleListFactory', 
    'AppConfiguration', 'BookmarkManager', 'LanguageFactory', 'SZKZ_CONSTANTS', '$timeout', 'ActionButtonsFactory', function(
        $rootScope, _, $location, ArticleListFactory, AppConfiguration, BookmarkManager, 
        LanguageFactory, SZKZ_CONSTANTS, $timeout, ActionButtonsFactory) {
    
    function getArticleInfo () {
        var bookmark = BookmarkManager.getSelectedArticleTypeCode(),
            type = BookmarkManager.getSelectedArticleType(bookmark),
            articleInfo = ArticleListFactory.getArticleInfo(
                type,
                BookmarkManager.getSelectedArticleCode(bookmark)
            );
            
        articleInfo.typeLabel = ArticleListFactory.getArticleTypeLabel(type).hz;
                                                               
        return articleInfo;
    }
                                                               
    function getActionButtons (pageName, sub) {
        var buttons = ActionButtonsFactory.getActionButtons(),
            currentButtonInfo = '',
            buttonsTop,
            firstSubButtons = false;
            
        buttonsTop = _.clone(buttons, true);

        _.each(buttonsTop, function (button) {
            button.current = '';
            if (button.name === pageName) {
                button.current = 'current';
                currentButtonInfo = button.title;
            }

            if (button.buttons) {
                button.arrowButton = 'with-arrow-button';
                button.hasSubMenu = 'true';
                
                _.each(button.buttons, function (btn) {
                    if (btn.name === sub) {
                        btn.current = 'current';
                    } else {
                        btn.current = '';
                    }
                });
                
            } else {
                button.hasSubMenu = 'false';
                button.arrowButton = '';
            }

            button.childShow = 'hide';
        });

        _.each(buttons, function (actionButton) {
            actionButton.current = '';
            if (actionButton.name === pageName) {
                actionButton.current = 'current';
            }
            
            if (actionButton.buttons) {
                actionButton.hasSubMenu = 'true';
                actionButton.arrowButton = 'show';
                if (firstSubButtons) {
                    actionButton.upDownIcon = 'fa-sort-down';
                    actionButton.childShow = 'hide';
                } else {
                    firstSubButtons = true;
                    actionButton.upDownIcon = 'fa-sort-up';
                    actionButton.childShow = 'show';
                }
                
                _.each(actionButton.buttons, function (btn) {
                    if (btn.name === sub) {
                        btn.current = 'current';
                    } else {
                        btn.current = '';
                    }
                });
                
                
            } else {
                actionButton.hasSubMenu = 'false';
                actionButton.arrowButton = 'hide';
                actionButton.childShow = 'hide';
            }
        });

        return {
            totalButtons: buttons.length,
            actionTitle: currentButtonInfo,
            actionButtonsTop: buttonsTop.reverse(),
            actionButtons: buttons
        };
    }
            
    return {
        getPageControlData: function (pageName, sub) {
            var data = getActionButtons(pageName, sub);
    
            $rootScope.countButtons = 0;
            
            _.extend(data, { 
                lang: AppConfiguration.getLanguage(),
                articleInfo: getArticleInfo()
            });
            
            return data;
        }
    };
  }]);
