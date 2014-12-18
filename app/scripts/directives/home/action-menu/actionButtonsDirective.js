'use strict';

angular.module('szkzApp.directives').directive('actionButtons', ['$rootScope', 'BookmarkManager', '$timeout', function ($rootScope, BookmarkManager, $timeout) {
    return {
        restrict: 'E',
        templateUrl: 'views/home/action-menu/action-buttons.html',
        link: function (scope, element, attr) {
            scope.$on('dropDownButtonClickEvent', function (evt, actionName) {
                var thisActionName = element.find('div.action-button').attr('type'),
                    arrowButton = element.find('div.arrow-button i'),
                    hasChildren = element.find('div.arrow-button').hasClass('show'),
                    listUl = element.find('ul');
                
                if (thisActionName === actionName) {
                    if (listUl.hasClass('show')) {
                        listUl.removeClass('show').addClass('hide');
                        arrowButton.removeClass('fa-sort-up').addClass('fa-sort-down');
                    } else {
                        listUl.removeClass('hide').addClass('show');
                        arrowButton.removeClass('fa-sort-down').addClass('fa-sort-up');
                    }
                } else {
                    if (hasChildren) {
                        listUl.removeClass('show').addClass('hide');
                        arrowButton.removeClass('fa-sort-up').addClass('fa-sort-down');
                    }
                }
                $rootScope.$broadcast('actionMenuRefreshEvent');
            });
            
        }
    };
}]);