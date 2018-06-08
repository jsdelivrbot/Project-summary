'use strict';

/* Controllers */
// signin controller
app.controller('SignupFormController',
    ['$scope', '$http', '$state', '$wqtHttp', 'UserInfo', 'ServiceApi',
        function ($scope, $http, $state, $wqtHttp, UserInfo, ServiceApi) {

            $scope.user = {};
            $scope.logining = false;
            $scope.authError = null;
            $scope.login = function (isValid) {
                if (isValid) {
                    //alert(isValid)
                    $scope.authError = null;
                    $scope.reging = true;
                    console.log(ServiceApi)
                    // Try to login
                    $wqtHttp.post(
                        {
                            url: ServiceApi.login,
                            data: $scope.user,
                            success: function (data) {
                                // console.log(data);
                                $scope.reging = false;
                                //alert(data.status.code);
                                if (data.status.code != 0) {
                                    alert('调用失败!!');
                                    // $learunTopAlert.show({ text: data.status.desc });
                                }
                                else {
                                    //  UserInfo.set(data.result, data.token, true);
                                    //$scope.data.password = "";
                                    $state.go("app.dashboard-v1");
                                    //alert('调用成功!!');
                                }
                            },
                            error: function () {
                                $scope.reging = false;
                            }
                        });
                }


            };

        }])
    ;