angular.module('app')
    .directive('languge', ['uiLoad', '$document', '$templateCache', '$window', '$wqtHttp', 'UserInfo', 'ServiceApi', function (uiLoad, $document, $templateCache, $window, $wqtHttp, UserInfo, ServiceApi) {
        return {
            restrict: 'A',
            link: function (scope, el, attr) {


            }
        };
    }])



