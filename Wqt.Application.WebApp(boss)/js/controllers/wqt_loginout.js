'use strict';
//console.log = function () { };
/* Controllers */
// signin controller
app.controller('logoutFormController',
    ['$scope', '$wqtHttp', 'toaster', '$wqtLocals','UserInfo',
        function ($scope, $wqtHttp, toaster, $wqtLocals, UserInfo) {
            $scope.loginout = function () {
                $wqtHttp.loginOutPost();
                $wqtLocals.setObject('userInfo', {});
            };
          
        }]);
