'use strict';

/* Controllers */

//console.log = function () { };
angular.module('app')
    .controller('AppCtrl',
        [
            '$scope', '$translate', '$localStorage', '$window', 'UserInfo', '$wqtHttp', '$wqtLocals', '$interval',
            'ServiceApi', '$state', '$timeout', 'T',
            function($scope,
                $translate,
                $localStorage,
                $window,
                UserInfo,
                $wqtHttp,
                $wqtLocals,
                $interval,
                ServiceApi,
                $state,
                $timeout,
                T) {
                $scope.loginout = function() {
                    $wqtHttp.loginOutPost();
                    $wqtLocals.setObject('userInfo', {});

                };

                //var contents = {
                //    "user": {
                //        "name": "Bossi",
                //        "email": "bossi@g.com"
                //    }
                //};
                

                //$wqtHttp.post(
                //    {
                //        url: 'http://api.fanyi.baidu.com/api/trans/vip/translate', //'http://api.wqt.com/wqt/api/GetUnreadMessageList'
                //        data: {
                //            from: "zh",                                              //language choose  
                //            to: "en",
                //            client_id: '12345678',                  //baidu api key  
                //            q: contents 
                //        },
                //        success: function (json, status) {
                //            console.log(json, status);
                //        },
                //        error: function () {
                           
                //        }
                //    });

                //alert(3);
                /*前台权限模块功能S*/
                $scope.isNav = {};


                $scope.$watch('isNav',
                    function (newVal, oldVal) {
                        //debugger;
                       
                        var moduleData = UserInfo.get().moduleData;
                       // console.log(111, moduleData);
                        for (var i = 0; i < moduleData.length; i++) {
                            moduleData[i].name = T.T('PAGE.nav.' + moduleData[i].id);
                        }
                        //debugger;
                        console.log('moduleData', moduleData);
                        if (!moduleData) return;
                        $scope.moduleDataChild = [];
                        var reg3 = /\d.(\d).(\d)/;
                        var reg2 = /\d.(\d)/;
                        for (var i = 0; i < moduleData.length; i++) {
                            var item = moduleData[i];
                            var level3 = reg3.exec(item.id);
                            var level2 = reg2.exec(item.id);
                            if (level3 && level3.length == 3) { //三级
                                $scope.moduleDataChild.forEach(function(v, k) {
                                    if (v.id == /\d/.exec(item.id)[0]) {
                                        v.children.forEach(function(vv, kk) {
                                            if (vv.id == item.parentId) {
                                                vv.children.push({
                                                    id: item.id,
                                                    url: item.url,
                                                    name: item.name,
                                                });
                                            }
                                        });
                                    }
                                });
                            } else if (level2 && level2.length == 2) { // 二级
                                $scope.moduleDataChild.forEach(function(v, k) {
                                    if (v.id == item.parentId) {
                                        v.children.push({
                                            id: item.id,
                                            url: item.url,
                                            name: item.name,
                                            children: []
                                        });
                                    }
                                });
                            } else { //一级
                                $scope.moduleDataChild.push({
                                    id: item.id,
                                    url: item.url,
                                    name: item.name,
                                    icon: item.icon,
                                    children: []
                                });
                            }
                        }
                    },
                    true);
                /*前台权限模块功能E*/

                if (!UserInfo.get().isLogin) {
                    window.location.href = '/Login.html#/';
                } else {
                    $scope.curUser = UserInfo.get();
                    $scope.curUser.name = UserInfo.get().nickname;
                    //未读信息
                    var queryObj = {
                        rows: 10,
                        page: 1,
                        queryJson: null
                    };
                    $wqtHttp.post(
                        {
                            url: ServiceApi.Header.UnreadMessage, //'http://api.wqt.com/wqt/api/GetUnreadMessageList'
                            data: queryObj,
                            success: function(data) {
                                $scope.MessageNumber = data.result.rows;
                                $scope.UnreadNumber = data.result.rows.length;
                            },
                            error: function() {
                                $scope.logining = false;
                            }
                        });


                    app.factory('authInterceptor',
                        function($rootScope, $q, $window) {
                            return {
                                request: function(config) {

                                    console.log("request");
                                    // config.headers = config.headers || {};
                                    // if ($window.sessionStorage.token) {
                                    //   config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                                    // }
                                    return config;
                                },
                                response: function(response) {
                                    // if (response.status === 401) {
                                    //   // handle the case where the user is not authenticated
                                    // }
                                    console.log("response");
                                    return response || $q.when(response);
                                }
                            };
                        });

                    app.config(function($httpProvider) {
                        $httpProvider.interceptors.push('authInterceptor');
                    });


                }

                // add 'ie' classes to html
                var isIE = !!navigator.userAgent.match(/MSIE/i);
                isIE && angular.element($window.document.body).addClass('ie');
                isSmartDevice($window) && angular.element($window.document.body).addClass('smart');
                $scope.$watch('app.settings',
                    function() {
                        if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
                            // aside dock and fixed must set the header fixed.
                            $scope.app.settings.headerFixed = true;
                        }
                        // save to local storage
                        $localStorage.settings = $scope.app.settings;
                        console.log($localStorage.settings);
                    },
                    true);

                // config
                $scope.app = {
                    name: '会员管理系统',
                    version: '',
                    // for chart colors
                    color: {
                        primary: '#9280fe',
                        info: '#4bccf4',
                        success: '#27c24c',
                        warning: '#eacd41',
                        danger: '#f05050',
                        light: '#e8eff0',
                        dark: '#3a3f51',
                        black: '#1c2b36'
                    },
                    settings: {
                        themeID: 1,
                        navbarHeaderColor: 'bg-black',
                        navbarCollapseColor: 'bg-white-only',
                        asideColor: 'bg-black',
                        headerFixed: true,
                        asideFixed: false,
                        asideFolded: true,
                        asideDock: false,
                        container: false
                    }
                }
                //console.log('curUser', $scope.curUser);
                // save settings to local storage
                if (angular.isDefined($localStorage.settings)) {
                    $scope.app.settings = $localStorage.settings;
                } else {
                    $localStorage.settings = $scope.app.settings;
                }

                // angular translate
                $scope.lang = { isopen: false };
                $scope.langs = { en: '简体中文', de_DE: 'English', it_IT: '中文繁體', korea: '한국어', Japanese: '日本語'};
                $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";

                $scope.setLang = function(langKey, $event) {
                    // set the current lang
                    
                    $scope.selectLang = $scope.langs[langKey];
                   // alert($scope.selectLang);
                    // You can change the language during runtime
                    
                    $translate.use(langKey);
                    $scope.lang.isopen = !$scope.lang.isopen;
                    $state.reload();
                    $timeout(function() {
                        window.location.reload();
                    }, 800);
                    //
                    //location.reload(); //完全刷新

                };

                function isSmartDevice($window) {
                    // Adapted from http://www.detectmobilebrowsers.com
                    var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
                    // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                    return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
                }

            }
        ]);
