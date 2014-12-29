'use strict';

angular.module('szkzApp.directives').directive('topMenuButtons', ['$rootScope', '$q', '$interval', 'BookmarkManager', 
    '$timeout', 'SZKZ_CONSTANTS', function ($rootScope, $q, $interval, BookmarkManager, $timeout, SZKZ_CONSTANTS) 
{
    return {
        restrict: 'E',
        templateUrl: 'views/training/top-bottom-bar/top-menu-buttons.html',
        link: function (scope, element, attr) {
            var subMenuContainer = element.parent().parent().find('.sub-menus-zone'),
                mask = element.parent().parent().find('.drop-down-menu-mask'),
                totalButtons,
                topButtons,
                observeTopButtons;

            scope.$on('screen.size.changed', resetTopMenuDropButtonsAndSubMenus);
            
            mask.click(resetTopMenuDropButtonsAndSubMenus);
            
            angular.element('.sub-menus-zone').hide();

            $timeout(function () {
                // move the sub menu to the grand parent's container
                var subMenuTag = element.find('li ul').detach();
                
                subMenuContainer.append(subMenuTag);
                
                if (!totalButtons) {
                    totalButtons = Number(subMenuContainer.attr('count'));
                }
                
                $rootScope.countButtons++;
                if ($rootScope.countButtons == totalButtons) {
                    getTopMenuButtons().then(function (buttons) {
                        topButtons = buttons;
                        setupSubMenu();
                        angular.element('.sub-menus-zone').show();
                    });
                }
            }, 0);    
            
            function getTopMenuButtons () {
                var deferred = $q.defer(),
                    topbuttons = element.parent().find('.top-menu-button');
                
                if (topbuttons.length === 0) {
                    observeTopButtons = $interval(function () {
                        topbuttons = element.parent().find('.top-menu-button');

                        if (topbuttons.length != 0) {
                            $interval.cancel(observeTopButtons);
                            deferred.resolve(topbuttons);
                        }
                    }, SZKZ_CONSTANTS.TIME_CONSTANTS.MENU_ANI_DURATION, 0);
                } else {
                    deferred.resolve(topbuttons);
                }
            
                return deferred.promise;
            }
            
            function getSumWidth (index) {
                var sumW = 0, i;
                for (i = 0; i < index; i++) {
                    sumW += topButtons.parent().find('.top-menu-button[index=' + i + ']').outerWidth(true);
                }
                
                return sumW;
            }
            
            function setupSubMenu () {
                var buttonWithSub,
                    i,
                    button,
                    rightOffset,
                    index,
                    menu;
                if (!topButtons || !topButtons.parent) return;
                
                buttonWithSub = topButtons.parent().find('[sub=true]');

                buttonWithSub.off('click');
                buttonWithSub.on('click', function (evt) {
                    evt.preventDefault();
                    evt.stopPropagation();

                    var index = toggleSubMenu(evt.target);
                });

                for (i = 0; i < buttonWithSub.length; i++) {
                    button = buttonWithSub[i];
                    index = Number(button.attributes['index'].value);

                    rightOffset = getSumWidth(index);

                    menu = subMenuContainer.find('ul[index=' + index + ']')[0]; 

                    menu.style.right = rightOffset+'px';
                    if (angular.element(menu).is(':visible')) {
                        angular.element(menu).slideUp();
                    }
                }
            }
            
            function toggleSubMenu(target) {
                var button = target,
                    index = button.attributes.index,
                    menu,
                    visible;
                
                while (index === undefined) {
                    button = button.parentElement;
                    index = button.attributes.index;
                }
                
                resetTopMenuDropButtonsAndSubMenus(Number(index.value));
                
                index = Number(index.value);
                
                menu = subMenuContainer.find('ul[index=' + index + ']');
                
                visible = menu.hasClass('show');
                
                if (visible) {
                    menu.slideUp();
                    mask.hide();
                } else {
                    menu.slideDown();
                    mask.show();
                    angular.element(button).addClass('selected');
                }
            }
            
            function getApproateParent(target, attribute) {
                var item = target,
                    attrVal = item.attributes[attribute];
                
                while (attrVal === undefined) {
                    item = item.parentElement;
                    attrVal = item.attributes[attribute];
                }
                
                return item;
            }
            
            
            function resetTopMenuDropButtonsAndSubMenus (index) {
                angular.element('.top-menu-button').removeClass('selected');

                if (angular.isNumber(index)) {
                    subMenuContainer.find('ul[index!=' + index + ']').slideUp();       
                } else {
                    subMenuContainer.find('ul').slideUp();   
                }
                mask.hide();
                setupSubMenu ();
            }
        }
    };
}]);