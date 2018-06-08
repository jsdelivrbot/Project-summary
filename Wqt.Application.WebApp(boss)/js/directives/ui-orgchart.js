//console.log = function () { };
app
    //安置网络图
    .directive('uiOrgchart', ['uiLoad', '$document', '$window', '$wqtHttp', 'UserInfo', 'ServiceApi', 'toaster','T', function (uiLoad, $document, $window, $wqtHttp, UserInfo, ServiceApi, toaster, T) {
        return {
            restrict: 'AC',
            //scope: {
            //    source: '=',
            //    container: '=',
            //    stack: '=',
            //    depth: '=',
            //    interactive: '=',
            //    showLevels: '=',
            //    clicked: '=' // We use '=' here rather than '&' for this callback function
            //},
            link: function (scope, el, attr) {
                uiLoad.load(['vendor/jquery/orgchart/jquery.orgchart.js', 'vendor/jquery/orgchart/jquery.orgchart.css'])
                    .then(function () {

                        console.log('$wqtHttp', $wqtHttp);
                        var userInfo = UserInfo.get();
                        //多语言处理
                        //function getOptions() {
                        //    //alert(1);
                        //    var language = localStorage.NG_TRANSLATE_LANG_KEY;
                        //    var options;
                        //    console.log(language);
                        //    if (language == 'en') {
                        //        options = {
                        //            userCode: '用户编号：',
                        //            jDPosition: '安置位置：',
                        //            jiHuoDate: '激活日期：',
                        //            level: '级别：'
                        //        }
                        //    } else {
                        //        options = {
                        //            userCode: 'User number: ',
                        //            jDPosition: 'Recommended location:',
                        //            jiHuoDate: 'Activation date:',
                        //            level: 'level:'
                        //        }
                        //    }
                        //    return options;
                        //}
                        //var options = getOptions();
                        //console.log(options);
                        //请求数据
                        $wqtHttp.post({
                            url: ServiceApi.MarketManage.AZnet,
                            data: { userCode: userInfo.usercode },
                            success: function (data) {
                                if (data.status.code != 0) {
                                    toaster.pop("error",  data.status.desc);
                                } else {
                                    console.log(data);
                                    var child = data.result;
                                    console.log(child.levelId)
                                    var datascource = {
                                        'name': child.nickName,
                                        'content': '<div><img src="../../img/level' + child.levelId + '.png"></div><div class="mydata" data-userCode="' + child.userCode + '">' + T.T('PAGE.wlgl.azwlt.userCode') + child.userCode + '</div>',
                                        'children': getNext(child.children),
                                    };

                                    function getNext(child) {
                                        // console.log(child);
                                        var children = [];
                                        if (child && child.length != 0) {
                                            for (var i = 0; i < child.length; i++) {
                                                var val = child[i];

                                                if (val.nickName) {
                                                    children[i] = {
                                                        'name': val.nickName,
                                                        'content': '<img src="../../img/level' +
                                                            val.levelId +
                                                            '.png"><div class="mydata" data-userCode="' +
                                                            val.userCode +
                                                            '">' +
                                                            T.T('PAGE.wlgl.azwlt.userCode') +
                                                            val.userCode +
                                                            '</div>',
                                                        'children': getNext(val.children),

                                                    };
                                                } else {
                                                    children[i] = {
                                                        'name': T.T('PAGE.wlgl.azwlt.reg'),
                                                        'content':
                                                        '<a href="/index.html#/app/scgl/register/index" style="color:red;padding-top:10px;">' + T.T('PAGE.wlgl.azwlt.click') + '</a>'
                                                    };
                                                }
                                                //console.log(child.children[i])

                                            }
                                        } else {
                                           
                                            children[0] = {
                                                'name': T.T('PAGE.wlgl.azwlt.reg'),
                                                'content':
                                                '<a class="toReg" href="/index.html#/app/scgl/register/index" style="color:red;padding-top:10px;">' + T.T('PAGE.wlgl.azwlt.click')+'</a>'
                                            };
                                            children[1] = {
                                                'name': T.T('PAGE.wlgl.azwlt.reg'),
                                                'content':
                                                '<a class="toReg" href="/index.html#/app/scgl/register/index" style="color:red;padding-top:10px;">' + T.T('PAGE.wlgl.azwlt.click')+'</a>'
                                            };
                                        }
                                        return children;

                                    }
                                    console.log('datascource', datascource);
                                    $(el[0]).orgchart({
                                        'data': datascource,
                                        'depth': 3,
                                        'nodeTitle': 'name',
                                        'nodeContent': 'content',
                                        'createNode': function ($node, data) {
                                            console.log($node);
                                            
                                            var createNode = $(".divNodeDetail").clone(true)[0];
                                            var secondMenuIcon = $('<i>', {
                                                'class': 'fa fa-th-large second-menu-icon',
                                                click: function () {
                                                    console.log($(this).parent().find('.toReg').length);
                                                    $(this).siblings('.divNodeDetail').toggle();
                                                    var $o = $(this).siblings('.divNodeDetail')
                                                    
                                                        var usercode = $(this).parent().find('.mydata')[0].dataset.usercode;
                                                        console.log(usercode);
                                                    getNodeDetai(usercode,
                                                        function(response) {
                                                            console.log('detailData', response);
                                                            var data = response.result;
                                                            var obj = {
                                                                LeftPerformance: data.leftPerformance,
                                                                RightPerformance: data.rightPerformance,
                                                                LeftUserCount: data.leftUserCount,
                                                                RightUserCount: data.rightUserCount,
                                                                ToDayLeftPerformance: data.toDayLeftPerformance,
                                                                ToDayRightPerformance: data.toDayRightPerformance,
                                                                TotalLeftPerformance: data.totalLeftPerformance,
                                                                TotalRightPerformance: data.totalRightPerformance,
                                                                TotalUserCount: data.totalUserCount,
                                                            };
                                                            //console.log(obj);
                                                            for (var p in obj) {
                                                                var id = p;
                                                                //console.log(id);
                                                                var value = obj[p];
                                                                $o.find('#' + p).text(value);
                                                            }
                                                        });

                                                }
                                            });  
                                            if ($node.find('.toReg').length == 0) {
                                                $($node).append(secondMenuIcon).append(createNode);
                                            }
                                            
                                        }

                                    });
                                    //节点点击事件
                                    function getNodeDetai(usercode, callback) {
                                        var postData = {
                                            url: ServiceApi.MarketManage.Azwltgetdeital  ,
                                            data: { userCode: usercode },
                                            success: callback
                                        };
                                        $wqtHttp.post(postData);
                                    }


                                }
                            }
                        });
                    });
            }
        };
    }])
    //推荐网络图
    .directive('uOrgchart', ['uiLoad', '$document', '$window', '$wqtHttp', 'UserInfo', 'ServiceApi', 'toaster','T', function (uiLoad, $document, $window, $wqtHttp, UserInfo, ServiceApi, toaster,T) {
        return {
            restrict: 'AC',
            template: '<div id="Orgchart"></div>',
            link: function (scope, el, attr) {
                uiLoad.load(['vendor/jquery/orgchart/jquery.orgchart.js', 'vendor/jquery/orgchart/jquery.orgchart.css'])
                    .then(function () {
                        console.log('$wqtHttp', $wqtHttp);
                        var userInfo = UserInfo.get();
                        //多语言处理
                        //function getOptions() {
                        //    //alert(1);
                        //    var language = localStorage.NG_TRANSLATE_LANG_KEY;
                        //    var options;
                        //    console.log(language);
                        //    if (language == 'en') {
                        //        options = {
                        //            userCode: '用户编号：',
                        //            position: '安置位置：',
                        //            jiHuoDate: '激活日期：',
                        //            level: '级别：'
                        //        }
                        //    } else {
                        //        options = {
                        //            userCode: 'User number: ',
                        //            jDPosition: 'Recommended location:',
                        //            jiHuoDate: 'Activation date:',
                        //            level: 'level:'
                        //        }
                        //    }
                        //    return options;
                        //}
                        //var options = getOptions();
                        //console.log(options);
                        //请求数据
                        $wqtHttp.post({
                            url: ServiceApi.MarketManage.Tjwlt,
                            data: { userCode: userInfo.usercode },
                            success: function (data) {
                                if (data.status.code != 0) {
                                    //console.log(data);
                                    toaster.pop("error", "系统错误", data.status.desc);
                                } else {
                                    console.log(data);
                                    var child = data.result;
                                    var datascource = {
                                        'name': child.nickName,
                                        'content': '<div><img src="../../img/level' + child.levelId + '.png"></div><div class="mydata" data-userCode="' + child.userCode + '">' + T.T('PAGE.wlgl.tjwlt.userCode') + child.userCode + '</div>',
                                        'children': getNext(child.children),
                                    };

                                    function getNext(child) {
                                        // console.log(child);
                                        var children = [];
                                        if (child && child.length != 0) {
                                            for (var i = 0; i < child.length; i++) {
                                                var val = child[i];
                                                //console.log(child.children[i])
                                                if (val.nickName) {
                                                    children[i] = {
                                                        'name': val.nickName,
                                                        'content': '<img src="../../img/level' +
                                                            val.levelId +
                                                            '.png"><div class="mydata" data-userCode="' +
                                                            val.userCode +
                                                            '">' +
                                                        T.T('PAGE.wlgl.tjwlt.userCode') +
                                                            val.userCode +
                                                            '</div>',
                                                        'children': getNext(val.children),

                                                    };
                                                } 

                                            }
                                        } 

                                        return children;
                                    }

                                    console.log('datascource', datascource);
                                    console.log($(el[0]))
                                    $(el[0]).orgchart({
                                        'data': datascource,
                                        'depth': 3,
                                        'nodeTitle': 'name',
                                        'nodeContent': 'content'
                                    });

                    
                                }
                            }
                        });
                    });
            }
        };
    }]);