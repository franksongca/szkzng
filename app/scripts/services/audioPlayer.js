'use strict';

angular.module('szkzApp.services').factory('AudioPlayer',['$rootScope', '$timeout',
    function ($rootScope, $timeout)
{
    var cuePoints = [],
        player,
        $player,
        sourceMP3,
        playWhenReady = true,
        audioTimer,
        playHeadPosition,
        cueIndex,
        firstTime = true,
        reachedEnd = false,
        enabled = false,
        initOffset = 0,
        scope = $rootScope.$new(),
        unbindEventStoped,
        unbindEventPlay,
        unbindEventPausee;

    scope.$on('play.pause.event', function (evt, option) {
        if (option.status === 1) {
            // play
            resume();
        } else {
            pause();
        }
    });

    function setupPlayer() {
        $player = angular.element('audio-player');

        player = document.getElementById('audio-player');
        sourceMP3 = document.getElementById('audio-src-mp3');

        // events *************************************
        player.oncanplaythrough = function () {
            if (firstTime && playWhenReady && enabled) {
                cueIndex = 0;
                playHeadPosition = 0;

                $timeout(function () {
                    $rootScope.$broadcast('spinner:hide');
                    player.play();
                }, 500);
            }
        };

        player.addEventListener('timeupdate', function () {
            //console.log('event timeupdate !!!!!!!!!!!! firstTime='+firstTime + ',enabled='+enabled + ',player.currentTime='+player.currentTime);
            if(firstTime && enabled && player.currentTime > 0){
                firstTime = false;
                console.log('READY TO PLAYING..................' + player.currentTime);
                initOffset = player.currentTime - 0.1;
                triggerCuePoint();

                $rootScope.$broadcast('audio:started');
                //$rootScope.$broadcast('play:status:changed', {status: 'pause'});
            }
        }, false);

        player.addEventListener('ended', function () {
            if (enabled) {
                firstTime = true;
                $rootScope.$broadcast('audio:ended');
            }
        }, false);

        /*
        $player.bind('ended', function () {
            if (enabled) {
                console.log("============"+debug);
                firstTime = true;
                $rootScope.$broadcast('audio:ended');
            }
        });*/

        $player.bind('pause', function() {
            if(enabled){
                $rootScope.$broadcast('play:status:changed', {status: 'play'});
            }
        });
        unbindEventStoped = scope.$on('audio:stoped', pause);
        unbindEventPlay = scope.$on('audio:action:play', resume);
        unbindEventPausee = scope.$on('audio:action:pause', pause);
    }

    function init(cuePointsArg, url, autoPlay) {
        setupPlayer();
        enable();

        reachedEnd = false;
        cuePoints = cuePointsArg;
        sourceMP3.src = url + '.mp3';
        playWhenReady = autoPlay;
        player.load();
    }

    function pause() {
        if(!enabled){
            return;
        }
        player.pause();
        $timeout.cancel(audioTimer);
    }

    function resume() {
        if(!enabled){
            return;
        }
        if(reachedEnd){
            reachedEnd = false;
            cueIndex = 0;
            playHeadPosition = 0;
        }
        player.currentTime = playHeadPosition;
        player.play();

        if (!firstTime) {
            triggerCuePoint();
        }
    }

    function remove() {
        if (unbindEventStoped) {
            unbindEventStoped();
        }
        if (unbindEventPlay) {
            unbindEventPlay();
        }
        if (unbindEventPausee) {
            unbindEventPausee();
        }

        if(audioTimer){
            $timeout.cancel(audioTimer);
        }
        enabled = false;
        if(!player){
            return;
        }
        player.pause();
        sourceMP3.src = '';
        cuePoints = [];
        firstTime = true;

        //$(player).unbind();
    }

    function enable() {
        enabled = true;
    }

    function disable() {
        enabled = false;
        remove();
    }

    function triggerCuePoint() {
        var interval,
            soundLen;

        if (cueIndex === cuePoints.length) {
            interval = 1000;
            soundLen = 1000;
        } else {
            interval = (cuePoints[cueIndex].cuePoint - (cueIndex === 0 ? 0 : cuePoints[cueIndex-1].cuePoint) - initOffset * 1000);
            if (cueIndex < cuePoints.length - 1) {
                soundLen = cuePoints[cueIndex + 1].cuePoint - cuePoints[cueIndex].cuePoint;
            } else {
                soundLen = 1000;
            }
        }
        //console.log('triggerCuePoint.........cueIndex=' + cueIndex + ': cuePoints.length=' + cuePoints.length + ': interval=' + interval);
        initOffset = 0;
        audioTimer = $timeout(function () {
            $rootScope.$broadcast('audio:cuepoint:reached',
                {
                    cuePoint: cueIndex,
                    realIndex: cueIndex < cuePoints.length ? cuePoints[cueIndex].realIndex : -1,
                    soundLen: soundLen
                }
            );
            playHeadPosition = player.currentTime;

            if(cueIndex < cuePoints.length - 1){
                //console.log('<'+cueIndex+'> player.currentTime=' + player.currentTime*1000 + ', cuePoints['+cueIndex+']=' + cuePoints[cueIndex].curPoint + '====' + (+cuePoints[cueIndex].curPoint-player.currentTime*1000));
                cueIndex++;
                triggerCuePoint();
            } else {
                reachedEnd = true;
            }
        }, interval);
    }

    return {
        init: init,
        enable: enable,
        disable: disable,
        remove: remove
    };
}]);


