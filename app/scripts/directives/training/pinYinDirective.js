'use strict';

angular.module('szkzApp.directives').directive('pinYin', ['$timeout', 'PyiYinFactory', function ($timeout, PyiYinFactory) {
    return {
        restrict: 'E',
        templateUrl: 'views/training/pin-yin.html',
        link: function (scope, element, attr) {
        	var options = {
        			pinyin: attr.pinYin,
        			tone: attr.shengDiao,

        			//size: 16, //20,
        			//marginTop: 13, //9,
        			shengMuColor: "blue",
        			yunMuColor: "#990000"
				};

        	scope.letters = PyiYinFactory.buildPinYin(options);

        	function adjustPinYinPosition() {
	        	$timeout(function () {
	        		scope.pyLeft = (element.parent().parent().width() - element.find('ul').width())/2 + 'px';
	        	});
	        }

        	scope.$watch(function () {
        		return element.find('ul').width() + element.parent().parent().width();// element.parent().parent().width();
        	}, function () {
        		adjustPinYinPosition();
        	});
        }
    };
}]);
