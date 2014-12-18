'use strict';

angular.module('szkzApp.services').factory('ActionButtonsFactory', ['$rootScope', '$http', function($rootScope, $http){
    var actionButtons;
    
    function loadActionButtons () {
        return $http.get('data/action-buttons.json')
        .then(function (response) {
            if(angular.isObject(response.data)){
                actionButtons = response.data;
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
            return loadActionButtons();
        },
        
        getActionButtons: function () {
            return actionButtons;
        },
        
        getActionsCount: function () {
            return actionButtons.length;
        },
        
        isActionButtonsLoaded: function () {
            return angular.isDefined(actionButtons);
        }
    };
}]);
