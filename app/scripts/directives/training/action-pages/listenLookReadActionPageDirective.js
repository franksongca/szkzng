'use strict';

angular.module('szkzApp.directives').directive('listenLookReadActionPage', ['$rootScope', 'BookmarkManager', '$routeParams',
    '$timeout', '$window', '$document', 'UIService', 'SZKZ_CONSTANTS', 'ArticleFactory', 'AudioPlayer',
    function ($rootScope, BookmarkManager, $routeParams, $timeout, $window, $document, UIService, SZKZ_CONSTANTS, ArticleFactory, AudioPlayer)
{
    return {
        restrict: 'E',
        templateUrl: 'views/training/action-pages/training-action-template.html',

        controller: 'ActionPageDirectiveCtrl',

        link: function ($scope, element, attr) {
            $scope.cuePoint = 0;

            //$scope.subAction,
            //$scope.audioTimer,
            //$scope.phase;

            $scope.$on('$destroy', function () {
            });

            ArticleFactory.setupPlayer();

            if ($routeParams && $routeParams.sub) {
                $scope.subAction = $routeParams.sub;
            }
















            switch ($scope.pageName) {
                case SZKZ_CONSTANTS.LISTEN_LOOK_READ_NAMES.SUB_FOLLOW_ME:
                case SZKZ_CONSTANTS.LISTEN_LOOK_READ_NAMES.SUB_LOOK_READ:
                case SZKZ_CONSTANTS.LISTEN_LOOK_READ_NAMES.SUB_LISTEN_READ:
                case SZKZ_CONSTANTS.LISTEN_LOOK_READ_NAMES.SUB_LOOK_READ_RANDOM:
                case SZKZ_CONSTANTS.LISTEN_LOOK_READ_NAMES.SUB_LISTEN_READ_RANDOM:
            }

            alert($scope.pageName + ":" + subAction);


            function funcGenZheDu (interval) {
                var that = this,
                    newInterval = 1000;

                $scope.audioTimer = $timeout(function () {
                    switch($scope.phase){
                        case 0:
                            $scope.adjustPositionTo($scope.cueIndex < $scope.totalCharacters ? that.cue_points[that.cueIndex].realIndex : -1);
                            $scope.activateChar({cueLowlight: that.cueIndex, cueHighlight: that.cueIndex + 1});

                            if(that.cueIndex < that.totalCharacters){
                                that.readHanZi(that.cue_points[that.cueIndex].pinyin);
                            } else {
                                clearTimeout(that.audioTimer);
                                that.reachedEnd = true;
                                MessageEvent.trigger("play:status:changed", {status: 'play'});
                                return;
                            }
                            newInterval = 1500;
                            break;
                        case 1:
                        case 2:
                        case 3:
                            newInterval = 500;
                            that.playTita();
                            break;
                        case 4:
                            //that.highlight({cuePoint: that.cueIndex, realIndex: that.cueIndex < that.totalCharacters ? that.cue_points[that.cueIndex].realIndex : -1});
                            //if(that.cueIndex < that.totalCharacters){
                            //	that.playAppearing();
                            //}
                            newInterval = 200;
                            that.cueIndex++;
                            break;
                    }

                    that.phase++;
                    if(that.phase === 5){
                        that.phase = 0;
                    }
                    that.triggerCuePoint(newInterval);
                }, interval);
            }

            function funcKanZiTingYin (interval){
                var that = this,
                    newInterval = 1000;

                this.audioTimer = setTimeout(function(){
                    switch(that.phase){
                        case 0:
                            that.adjustPosition(that.cueIndex < that.totalCharacters ? that.cue_points[that.cueIndex].realIndex : -1);
                            that.highlight({cueLowlight: that.cueIndex, cueHighlight: that.cueIndex + 1});
                            if(that.cueIndex < that.totalCharacters){
                                that.playAppearing();
                            } else {
                                clearTimeout(that.audioTimer);
                                that.reachedEnd = true;
                                MessageEvent.trigger("play:status:changed", {status: 'play'});
                                return;
                            }
                            newInterval = 1000;
                            break;
                        case 1:
                        case 2:
                        case 3:
                            newInterval = 800;
                            that.playTita();
                            break;
                        case 4:
                            if(that.cueIndex < that.totalCharacters){
                                that.readHanZi(that.cue_points[that.cueIndex].pinyin);
                            }
                            newInterval = 2000;
                            that.cueIndex++;
                            break;
                    }

                    that.phase++;
                    if(that.phase === 5){
                        that.phase = 0;
                    }
                    that.triggerCuePoint(newInterval);
                }, interval);
            }

            function funcTingYinBianZi (interval){
                var that = this,
                    newInterval = 1000;

                this.audioTimer = setTimeout(function(){
                    switch(that.phase){
                        case 0:
                            that.adjustPosition(that.cueIndex < that.totalCharacters ? that.cue_points[that.cueIndex].realIndex : -1);
                            if(that.cueIndex < that.totalCharacters){
                                that.removeHighlight();
                                that.readHanZi(that.cue_points[that.cueIndex].pinyin);
                            } else {
                                clearTimeout(that.audioTimer);
                                that.reachedEnd = true;
                                MessageEvent.trigger("play:status:changed", {status: 'play'});
                                return;
                            }
                            newInterval = 1000;
                            break;
                        case 1:
                        case 2:
                        case 3:
                            newInterval = 500;
                            that.playTita();
                            break;
                        case 4:
                            that.highlight({cueLowlight: that.cueIndex, cueHighlight: that.cueIndex + 1});
                            if(that.cueIndex < that.totalCharacters){
                                that.playAppearing();
                            }
                            newInterval = 2000;
                            that.cueIndex++;
                            break;
                    }

                    that.phase++;
                    if(that.phase === 5){
                        that.phase = 0;
                    }
                    that.triggerCuePoint(newInterval);
                }, interval);
            }

            function funcKanZiTingYinSuiJi (interval){
                var that = this,
                    newInterval = 1000;

                this.audioTimer = setTimeout(function(){
                    switch(that.phase){
                        case 0:
                            that.adjustPosition(that.cue_points[that.newCueIndex-1].realIndex);
                            that.highlight({cueLowlight: that.cueIndex, cueHighlight: that.newCueIndex});
                            that.playAppearing();
                            newInterval = 1000;
                            break;
                        case 1:
                        case 2:
                        case 3:
                            newInterval = 800;
                            that.playTita();
                            break;
                        case 4:
                            that.readHanZi(that.cue_points[that.newCueIndex-1].pinyin);
                            newInterval = 2000;
                            that.cueIndex = that.newCueIndex;
                            that.getRandomIndex();
                            break;
                    }

                    that.phase++;
                    if(that.phase === 5){
                        that.phase = 0;
                    }
                    that.triggerCuePoint(newInterval);
                }, interval);

            }

            function funcTingYinBianZiSuiJi function(interval){
                var that = this,
                    newInterval = 1000;

                this.audioTimer = setTimeout(function(){
                    switch(that.phase){
                        case 0:
                            that.adjustPosition(that.cue_points[that.newCueIndex-1].realIndex);
                            that.removeHighlight();
                            that.readHanZi(that.cue_points[that.newCueIndex-1].pinyin);
                            newInterval = 1500;
                            break;
                        case 1:
                        case 2:
                        case 3:
                            newInterval = 600;
                            that.playTita();
                            break;
                        case 4:
                            that.highlight({cueLowlight: that.cueIndex, cueHighlight: that.newCueIndex});
                            that.playAppearing();
                            newInterval = 2500;
                            that.cueIndex = that.newCueIndex;
                            that.getRandomIndex();
                            break;
                    }

                    that.phase++;
                    if(that.phase === 5){
                        that.phase = 0;
                    }
                    that.triggerCuePoint(newInterval);
                }, interval);
            }

            function getRandomIndex (){
                while(this.cueIndex === this.newCueIndex || this.newCueIndex === -1){
                    this.newCueIndex = Math.floor((Math.random()*this.totalCharacters) + 1);
                }
            }

            function pause () {
                clearTimeout(this.audioTimer);
            }

            function resume () {
                if(this.reachedEnd){
                    this.reachedEnd = false;
                    this.cueIndex = 0;
                }
                this.phase = 0;
                this.triggerCuePoint();
            }

            function remove () {
                if(this.audioTimer){
                    clearTimeout(this.audioTimer);
                }
                this.cue_points = [];
                this.reachedEnd = false;
                this.cueIndex = 0;
                this.phase = 0;
            }

            function playTita (){
                //this.playSound( "audio/TITA.mp3" );
            }

            function playAppearing () {
                this.playSound( "audio/Appear.mp3" );
            }

            function readHanZi (pinyin) {
                this.playSound( "audio/Zi/mp3/" + pinyin + ".mp3" );
            }

            function playSound (url) {
                this.sourceMP3.src = url;
                this.player.load();
            }






















        }
    };
}]);
