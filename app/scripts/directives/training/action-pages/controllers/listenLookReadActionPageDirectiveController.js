// not used, but put it here as a sample of override a class

angular.module('szkzApp').controller('ListenLookReadActionPageDirectiveCtrl', ['$scope', '$controller', '$rootScope',
    'BookmarkManager', '$routeParams', '$timeout', '$window', '$document', 'UIService', 'SZKZ_CONSTANTS',
    'ArticleFactory', 'AudioPlayer', '$element', function($scope, $controller, $rootScope, BookmarkManager, $routeParams,
        $timeout, $window, $document, UIService, SZKZ_CONSTANTS, ArticleFactory, AudioPlayer, $element)
{
    $controller('ActionPageDirectiveCtrl', {$scope: $scope, $element: $element});

    var subAction;


    $scope.$on('$destroy', function () {
    });

    ArticleFactory.setupPlayer();

    if ($routeParams && $routeParams.sub) {
        subAction = $routeParams.sub;
    }

    switch ($scope.pageName) {
        case SZKZ_CONSTANTS.PAGE_NAMES.LISTEN_LOOK_READ_PAGE:
        case SZKZ_CONSTANTS.PAGE_NAMES.TRY_IT_PAGE:
        case SZKZ_CONSTANTS.PAGE_NAMES.TEST_PAGE:
        case SZKZ_CONSTANTS.PAGE_NAMES.PINYIN_PAGE:
        case SZKZ_CONSTANTS.PAGE_NAMES.GAMES_PAGE:
    }

    alert(subAction);





}]);


