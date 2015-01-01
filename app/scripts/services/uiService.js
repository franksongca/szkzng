'use strict';

angular.module('szkzApp.services').factory('UIService', ['$rootScope', 'ngDialog', 'TweenMax', 'SZKZ_CONSTANTS', '$timeout', 
function($rootScope, ngDialog, TweenMax, SZKZ_CONSTANTS, $timeout) {
    var mainViewContainer = document.getElementsByClassName('view-container')[0];

    function launchAdminDialog(target, tagName, feature) {
        var targetElement = angular.element(target),
            linkOverClass = 'link-rollover';
        
        if (tagName !== 'DIV') {
            targetElement = angular.element(target).closest('div');
        }
        
        targetElement.addClass(linkOverClass);
        $timeout(function () {
            switch (feature) {
                case 'settings':
                    ngDialog.open({
                        template: 'views/dialogs/settings-panel.html',
                        //controller: 'SigninDialogCtrl',
                        appendTo: '#dialog-div-II'
                    });
                    break;
                
                case 'about':
                    ngDialog.open({
                        template: 'views/dialogs/about-panel.html',
                        controller: 'AboutPanelDialogCtrl',
                        appendTo: '#dialog-div-III'
                    });
                    break;    
                    
                case 'help': 
                    ngDialog.open({
                        template: 'views/dialogs/help-panel.html',
                        controller: 'HelpPanelDialogCtrl',
                        appendTo: '#dialog-div-IV'
                    });
                    break;    
            }
            targetElement.removeClass(linkOverClass);
        }, SZKZ_CONSTANTS.TIME_CONSTANTS.DELAY_DURATION);
    }

    function launchSigninDialog () {
        ngDialog.open({
            template: 'views/dialogs/signin.html',
            controller: 'SigninDialogCtrl',
            appendTo: '#dialog-div-I'
        });
    }

    function launchForgotDialog () {
        ngDialog.open({
            template: 'views/dialogs/forgot.html',
            controller: 'ForgotDialogCtrl',
            appendTo: '#dialog-div-I'
        });
    }

    function animatePageIn () {
        TweenMax.to(mainViewContainer, SZKZ_CONSTANTS.TIME_CONSTANTS.PAGE_IN_DURATION, {scaleY: 1, scaleX: 1, opacity: 1});
    }

    function animatePageOut (callback) {
        TweenMax.to(mainViewContainer, SZKZ_CONSTANTS.TIME_CONSTANTS.PAGE_OUT_DURATION, {scaleY: 0, scaleX: 0, onComplete: callback});
    }

    function refreshIScroll (scrollWrapper) {
        setTimeout(function() {
            if ($rootScope.myScroll[scrollWrapper]) {
                $rootScope.myScroll[scrollWrapper].refresh();
            }
        }, 0);
    }

    function refreshActionMenu () {
        refreshIScroll(SZKZ_CONSTANTS.HOME_ACTION_MENU_SCROLL_WRAPPER);   
        refreshIScroll(SZKZ_CONSTANTS.DROPDOWN_ACTION_MENU_SCROLL_WRAPPER);   
    }

    function refreshContentMenu () {
        refreshIScroll(SZKZ_CONSTANTS.HOME_CONTENT_MENU_SCROLL_WRAPPER);
    }

    $rootScope.$on('actionMenuRefreshEvent', refreshActionMenu);

    return {
        setupViewContainer: function (viewContainer) {
            mainViewContainer = viewContainer;
        },

        launchAdminDialog: function (target, tagName, feature) {
            return launchAdminDialog(target, tagName, feature);
        },

        launchSigninDialog: launchSigninDialog,
        launchForgotDialog: launchForgotDialog,
        animatePageIn: animatePageIn,
        animatePageOut: function (callback) {
            animatePageOut(callback);
        },
        refreshActionMenu: refreshActionMenu,
        refreshContentMenu: refreshContentMenu,
        refreshIScroll: function (scrollWrapper) {
            refreshIScroll(scrollWrapper);
        }
    };
}]);
