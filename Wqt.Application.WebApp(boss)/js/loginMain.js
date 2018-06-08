'use strict';

/* Controllers */
angular.module('login')
    .controller('LoginCtrl',
    ['$scope', '$http', '$state', '$wqtHttp', 'UserInfo', 'ServiceApi', 'CommonData', '$wqtLocals',
        function ($scope, $http, $state, $wqtHttp, UserInfo, ServiceApi, CommonData, $wqtLocals) {
            $scope.user = {};
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
                                console.log(data);
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
                                    //console.log('user', data);
                                    UserInfo.set(data.result, data.token, true, false, false);
                                    var userInfo = UserInfo.get();
                                    $scope.isNews = userInfo.isNews;
                                    console.log($scope.isNews);
                                    console.log(userInfo);
                                    console.log('login.userinfo', userInfo);
                                    var indexUrl = window.location.host;
                                    if (userInfo.isLogin) {
                                        window.location.href ='/index.html#/app/dashboard-v1';
                                       
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
                        $scope.VerifyCode = "data:image/png;base64," + response.data.img64;
                    }, function (x) {

                    });
            }
            $scope.back = function () {
                $state.go('login');
            }
        }])
    .controller('FindPsdByEmail',
    ['$scope', '$http', '$state', '$wqtHttp', 'UserInfo', 'ServiceApi', 'CommonData',
        function ($scope, $http, $state, $wqtHttp, UserInfo, ServiceApi, CommonData) {


            var userInfo = UserInfo.get();
            console.log(UserInfo.get());
            //邮箱找回密码
            $scope.isCollapsed = true;
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
                            $scope.isCollapsed = !isCollapsed
                        }
                    }
                })
            }
            //返回登录
            $scope.back = function () {
                $state.go('login')
            }

        }])
    .controller('FindPsdByMiBao',
    ['$scope', '$http', '$state', '$wqtHttp', 'UserInfo', 'ServiceApi', 'CommonData',
        function ($scope, $http, $state, $wqtHttp, UserInfo, ServiceApi, CommonData) {


            var userInfo = UserInfo.get();
            $scope.isNull = false;
            console.log(UserInfo.get());
            $scope.isCollapsed = true;
            $scope.getQus = function () {
                if ($scope.user.usercode && $scope.user.usercode!="") {
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
                } else {
                    $scope.isNull = true;
                }
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
                        }
                    }
                })
            }
            //返回登录
            $scope.back = function () {
                $state.go('login')
            }
        }])