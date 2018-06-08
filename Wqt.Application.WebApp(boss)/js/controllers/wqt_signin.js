'use strict';

/* Controllers */
// signin controller
app.controller('SigninFormController',
    ['$scope', '$http', '$state', '$wqtHttp', 'UserInfo', 'ServiceApi', 'CommonData','$wqtLocals',
        function ($scope, $http, $state, $wqtHttp, UserInfo, ServiceApi, CommonData, $wqtLocals) {
            $scope.user = { usercode: 'CN55671', password: '123456' };
            $scope.logining = false;
            $scope.authError = null;
            var userInfo = UserInfo.get();
            //清除左侧
            $wqtLocals.setObject('userInfo', {});
            //alert(1);
            $scope.login = function (isValid) {
                if (isValid) {
                    $scope.authError = null;
                    $scope.logining = true;
                    // Try to login
                
                    $wqtHttp.loginpost(
                        {
                            url: ServiceApi.MemberCenter.Login,
                            data: $scope.user,
                            success: function (data) {
                                console.log(data)
                                $scope.logining = false;
                                if (data.status.code != 0) {
                                    //alert(data.status.desc)
                                    $scope.logining = false;
                                    $scope.authError = data.status.desc;
                                    $http.get(ServiceApi.MemberCenter.VerifyCode, {})
                                        .then(function (response) {
                                            $scope.user.sessionid = response.data.sessionid;
                                            $scope.VerifyCode = "data:image/png;base64," + response.data.img64;
                                        }, function (x) {

                                        });
                                }
                                else {
                                    UserInfo.set(data.result, data.token, true, false,false);
                                    var userInfo = UserInfo.get();
                                    $scope.isNews = userInfo.isNews;
                                    if (userInfo.isLogin) {
                                        $state.go("app.dashboard-v1");
                                    }
                                }
                            },
                            error: function () {
                                $scope.logining = false;
                            }
                        });
                }
            };
            $scope.verifyCode = function () {
                $http.get(ServiceApi.MemberCenter.VerifyCode, {})
                    .then(function (response) {
                        $scope.user.sessionid = response.data.sessionid;
                        $scope.VerifyCode = "data:image/png;base64,"+response.data.img64;
                    }, function (x) {
                        
                    });
            }
        }])
    ;
app.controller('FindPsdByEmail',
    ['$scope', '$http', '$state', '$wqtHttp', 'UserInfo', 'ServiceApi', 'CommonData',
        function ($scope, $http, $state, $wqtHttp, UserInfo, ServiceApi, CommonData) {

            var userInfo = UserInfo.get();
            console.log(UserInfo.get());
            //邮箱找回密码
            $scope.findByEmail = function (isCollapsed) {
               // alert(1);
                $scope.isCollapsed = isCollapsed;
                $wqtHttp.post({
                    url: ServiceApi.MemberCenter.findpassbymail,
                    data: { UserCode: $scope.user.usercode },
                    success: function (data) {
                        if (data.status.code != 0) {
                            $scope.authError = data.status.desc;
                        } else {
							$scope.isCollapsed = !isCollapsed;
                        }
                    }
                })
            }
            //返回登录
            $scope.back = function () {
                $state.go('access.signin')
            }
        }])
app.controller('FindPsdByMiBao',
    ['$scope', '$http', '$state', '$wqtHttp', 'UserInfo', 'ServiceApi', 'CommonData',
        function ($scope, $http, $state, $wqtHttp, UserInfo, ServiceApi, CommonData) {


            var userInfo = UserInfo.get();
            console.log(UserInfo.get());
            $scope.getQus = function () {
                  $wqtHttp.post({
                url: ServiceApi.MemberCenter.querysecretsecuritytext,
                data: { UserCode: $scope.user.usercode },
                success: function (data) {
                    if (data.status.code != 0) {

                    } else {
                        console.log(data);
                        $scope.question = data.result.text;
                    }
                }
            });
            }
          
            $scope.FindSecret = function (isCollapsed) {
                $wqtHttp.post({
                    url: ServiceApi.MemberCenter.findpassbysecretsecurity,
                    data: { UserCode: $scope.user.usercode, SecretSecurityMatchText: $scope.user.SecretSecurityMatchText },
                    success: function (data) {
                        if (data.status.code != 0) {
                            $scope.authError = data.status.desc;
                        } else {
                            $scope.isCollapsed = !isCollapsed;
                            $scope.findPsd = data.result;
                            console.log(data);
                        }
                    }
                })
            }
             //返回登录
            $scope.back = function () {
                $state.go('access.signin')
            }
        }])