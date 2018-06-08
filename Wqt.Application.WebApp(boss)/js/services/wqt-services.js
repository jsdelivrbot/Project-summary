//console.log = function () { };
angular.module('starter.services', [])
    //模块整合
    .factory('$totalModel', [
        '$state',
        '$rootScope',
        '$base64',
        '$wqtHttp',
        '$http',
        'toaster',
        'ServiceApi',
        'UserInfo',
        '$location',
        '$timeout',
        '$interval',
        'T',
        function ($state, $rootScope, $base64, $wqtHttp, $http, toaster, ServiceApi, UserInfo, $location, $timeout, $interval,T) {
            return {
                '$state': $state,
                '$rootScope': $rootScope,
                '$base64': $base64,
                '$wqtHttp': $wqtHttp,
                '$http': $http,
                'toaster': toaster,
                'ServiceApi': ServiceApi,
                'UserInfo': UserInfo,
                '$location': $location,
                '$timeout': $timeout,
                '$interval': $interval,
                'T': T
            }

        }])


    //post 请求
    .factory('$wqtHttp', [

        '$state',
        '$rootScope',
        '$base64',
        '$http',
        'toaster',
        'ServiceApi',
        'UserInfo',
        '$location',

        function ($state, $rootScope, $base64, $http, toaster, ServiceApi, UserInfo, $location) {
            var platform = 'WebApp';
            var loginurl = window.location.host;
            return {
                post: httpPost,
                loginpost: httpLoginPost,
                loginOutPost: loginOutPost
            };

            function loginOutPost() {
                var userInfo = UserInfo.get();

                $http.post(
                    ServiceApi.MemberCenter.LoginOut,
                    $base64.encode(JSON.stringify({
                            token: userInfo.token,
                            userid: userInfo.userid,
                            platform: platform
                        })
                    )).success(function(data) {
                    if (data.status.code != "0") {
                        if (data.status.code == "1") {
                            //$state.go("access.signin");
                            window.location.href = '/Login.html#/';
                            return false;
                        }
                    }
                    UserInfo.set(data.result, data.token);
                    UserInfo.clear();
                    //$location.path("/access/signin");
                    //var url = location.host;

                    window.location.href = '/Login.html#/';
                });
            }

            function httpPost(opts) {
                var scope = $rootScope.$new(true);

                $.extend(scope, {
                    data: {},
                    error: function () { }
                }, opts || {});


                var userInfo = UserInfo.get();
                //console.log(userInfo);
                var postdata = JSON.stringify({
                    "data": scope.data,
                    token: userInfo.token,
                    userid: userInfo.userid,
                    platform: platform,
                });
                console.log('postdata', postdata)
                $http.post(scope.url,
                    $base64.encode(postdata)
                ).success(function(data) {
                        console.log('successData',data);
                        if (data.status.code != "0") {
                            toaster.pop("error", data.status.desc);
                        if (data.status.code == "1") {
                            //alert('未登录！')
                            // window.location.href =  '/Login.html#/';
                            window.location.href = '/Login.html#/';
                            return false;
                        }
                    }
                    scope.success(data);
                })
                    .error(function () { scope.error(); })
                    .finally(function () { scope.finally(); });
            }
            function httpLoginPost(opts) {
                var scope = $rootScope.$new(true);

                $.extend(scope, {
                    data: {},
                    error: function () { }
                }, opts || {});


                var userInfo = UserInfo.get();
                console.log(userInfo);
                console.log('http', $http);
                var platform = 'WebApp';
                $http.post(scope.url,
                    $base64.encode(JSON.stringify({
                        "data": scope.data,
                        token: userInfo.token,
                        userid: userInfo.userid,
                        platform: platform,
                    })
                    ))
                    .success(
                    function (data) {
                        if (data.status.code != "0") {
                            //alert( data.status.desc );
                            //return false;
                            toaster.pop("error", data.status.desc);
                        }
                        scope.success(data);
                    }
                    )
                    .error(function () { scope.error(); })
                    .finally(function () { scope.finally(); });
            }

        }])
    //本地存储数据
    .factory('$wqtLocals', ['$window', function ($window) {
        return {
            //存储单个属性
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            //读取单个属性
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            //存储对象，以JSON格式存储
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            //读取对象
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        }
    }])
    //post 请求封装
    .factory('$ajaxPost', [
        '$totalModel',
        function ($totalModel) {
            return {
                ajaxpost: ajaxPost
            };
            function getPostData(url, data, callback, errorCallback) {
                var postData = {
                    url: url,
                    data: data,
                    success: callback,
                    error: errorCallback
                }
                return postData;
            }
            function ajaxPost(
                $totalModel,
                $scope,
                url,
                postData,
                sucessCallback,
				errorCallback )
			{
                console.log($totalModel.$wqtHttp);
                $totalModel.$wqtHttp.post(getPostData(url,
                    postData,
                    function (response) {
                        if (response.status.code === 0 || response.status.code === '0') {
                            console.log('response', response);
                            
                            $scope.btnSuccess = false;
                            $scope.BtnSuccess = false;
                            $scope.isUsefulTd = false;
                        }
                        if (response.status.code === 0 || response.status.code === '0') {
                            console.log('response', response);
                            $scope.btnSuccess = false;
                            sucessCallback(response);
                        }
                    },
                    function () {
                        if (errorCallback) {
                            errorCallback();
                        }
                    }
                ));

            }
        }])
    //多语言
    .factory('T', ['$translate', function ($translate) {
        var T = {
            T: function (key) {
               // console.log(key)
                if (key) {
                    return $translate.instant(key);
                }
                return key;
            }
        }
        return T;
    }])
