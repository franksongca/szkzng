'use strict';

angular.module('szkzApp.directives').directive('ngSpinner', ['$rootScope', '$timeout', '_', '$window', 'Spinner',
    function ($rootScope, $timeout, _, $window, Spinner) {
    return {
        restrict: 'EAC',
        template: '',
        link: function (scope, element, attr) {
            var opts = {
              lines: 13, // The number of lines to draw
              length: 10, // The length of each line
              width: 4, // The line thickness
              radius: 10, // The radius of the inner circle
              corners: 1, // Corner roundness (0..1)
              rotate: 0, // The rotation offset
              direction: 1, // 1: clockwise, -1: counterclockwise
              color: '#000', // #rgb or #rrggbb or array of colors
              speed: 1, // Rounds per second
              trail: 60, // Afterglow percentage
              shadow: false, // Whether to render a shadow
              hwaccel: false, // Whether to use hardware acceleration
              className: 'spinner', // The CSS class to assign to the spinner
              zIndex: 2e9, // The z-index (defaults to 2000000000)
              top: '50%', // Top position relative to parent
              left: '50%' // Left position relative to parent
            },
            width = element.parent().width(),
            height = element.parent().height(),
            options,
            spinner;

            if (element[0].attributes.options) {
            	options = eval('(' + element[0].attributes.options.value + ')');

            	for (var key in options) {
            		opts[key] = options[key];
            	}
            }

            spinner = new Spinner(opts);

            element.append(spinner.spin().el);

            $timeout(function () {
	            element[0].style.width = width + 'px';
    	        element[0].style.height = height + 'px';
    	        element[0].style.position = 'absolute';
    	        element[0].style.background = 'rgba(255, 0, 0, 1)';
            });

            scope.removeSpinner = function () {
				spinner.stop();
				element[0].style.background = null;        	
            }
        }
    };
}]);