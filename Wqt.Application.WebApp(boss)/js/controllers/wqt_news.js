console.log = function () { };
//新闻公告
app.controller('NewsListCtrl',
    ['$scope', '$ajaxPost', '$totalModel',
        function ($scope, $ajaxPost, $totalModel) {
            $ajaxPost.ajaxpost($totalModel,
                $scope,
                $totalModel.ServiceApi.News.newslist,
                {},
                function(data) {
                    for (var i = 0; i < data.result.rows.length; i++) {
                        var createDate = new Date(data.result.rows[i].createDate);
                        var newcreateDate = createDate.getFullYear() +
                            '-' +
                            (createDate.getMonth() + 1) +
                            '-' +
                            createDate.getDate();
                        data.result.rows[i].createDate = newcreateDate;
                        console.log(data.result.rows[i]);

                    }
                    $scope.newList = data.result.rows;
                },
                function() {

                });
            $scope.showDetails = function (Id) {
                $totalModel.$state.go('app.news.notice.newsDetail', { id: Id})
            }


        }]);
//新闻详情
app.controller('NewsDetailCtrl',
    ['$scope', '$stateParams', '$ajaxPost', '$totalModel',
        function ($scope, $stateParams, $ajaxPost, $totalModel) {
            $scope.id = $stateParams.id; 
            console.log($scope.id);
            $ajaxPost.ajaxpost($totalModel,
                $scope,
                $totalModel.ServiceApi.News.newsdetail,
                { nid: $scope.id },
                function(data) {
                    console.log(data);
                    var createDate = new Date(data.result.createDate);
                    var newcreateDate = createDate.getFullYear() +
                        '-' +
                        (createDate.getMonth() + 1) +
                        '-' +
                        createDate.getDate();
                    data.result.createDate = newcreateDate;
                    $scope.newDetails = data.result;
                    console.log($scope.newDetails);
                },
                function() {

                });

        }]);
//我要留言
app.controller('CreatemessageCtrl',
    ['$scope', '$ajaxPost', '$stateParams', '$totalModel',
        function ($scope, $ajaxPost, $stateParams, $totalModel) {
            $scope.btnSuccess = false;
            $scope.isVip = false;
            $scope.ValueChange = function () {
                if ($scope.Message.MessageType == 0) {
                    $scope.isVip = true;
                } else {
                    $scope.isVip = false;
                }
            }
            $scope.isUseful = true;
            $scope.select = {};
            $scope.checkRecieverCode = function (keyword) {
                console.log(keyword);
                if (keyword.length >= 4) {
                    $ajaxPost.ajaxpost($totalModel,
                        $scope,
                        $totalModel.ServiceApi.MarketManage.QueryUserCodeLike,
                        { UserCode: keyword },
                        function (data) {
                            if (data.result && data.result.length > 0) {
                                $scope.userList = data.result;
                            } else {
                                $scope.userList = [];
                            }
                        },
                        function () {

                        });
                }
            }

            //$scope.checkRecieverCode = function () {

            //    console.log($scope.Message.UserCode);
            //    $ajaxPost.ajaxpost($totalModel,
            //        $scope,
            //        $totalModel.ServiceApi.UserReg.checkUse,
            //        { usercode: $scope.Message.UserCode },
            //        function(data) {
            //            $scope.isUseful = true;
            //        },
            //        function() {
            //            $scope.isUseful = false;
            //        });

            //};
            $scope.message = function (isValid) {
                if (isValid) {
                    console.log($scope.Message);
                    $scope.btnSuccess = true;
                    $ajaxPost.ajaxpost($totalModel,
                        $scope,
                        $totalModel.ServiceApi.News.createmessage,
                        $scope.Message,
                        function(data) {
                            $scope.btnSuccess = false;
                            console.log(data);
                            $totalModel.toaster.pop("success", data.status.desc);
                            $scope.Message = {}
                        },
                        function() {

                        });

                } else {
                    $scope.btnSuccess = false;
                    $totalModel.toaster.pop("error", "请将留言信息填写完全");
                }
            }
            $scope.clean = function () {
                $scope.Message={}
            }
        }]);

//验证收件人是否存在
app.controller('ReceiveCtrl',
    [
        '$scope', '$ajaxPost', '$totalModel', function($scope, $ajaxPost, $totalModel) {
          


        }
    ]);
//我的留言
app.controller('MymessageCtrl',
    ['$scope', '$ajaxPost', '$totalModel',
        function ($scope, $ajaxPost, $totalModel) {
            //多语言处理
            $scope.queryObj = {
                rows: 10,
                page: 0,
                
            };
            var grid = {
                pager: {
                    totalItems: 0, currentPage: 0, maxSize: 5,
                    itemTexts: function (type, page, current) {
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "末页";
                            case "page":
                                return page;
                        }
                    },
                    pageChanged: function () {
                        //  alert(this.currentPage);
                        console.log($scope.currentPage);
                        $scope.queryObj.page = $scope.currentPage;
                        grid.reflash();
                    }
                },
                reflash: function () {
                    $ajaxPost.ajaxpost($totalModel,
                        $scope,
                        $totalModel.ServiceApi.News.getallmessagelist,
                        $scope.queryObj,
                        function(data) {
                            console.log(data);
                            $scope.Grid.pager.totalItems = data.result.records;
                            $scope.Grid.pager.currentPage = data.result.page;
                            //没有数据
                            if (data.result.records == 0) {
                                $scope.noData = true;
                            } else {
                                $scope.noData = false;
                            }
                            var language = localStorage.NG_TRANSLATE_LANG_KEY;
                            console.log(language);
                            //if (language == 'en') {
                            //    var IsRead = ['是', '否'];
                            //} else {
                            //    var IsRead = ['yes', 'no'];
                            //}
                            var IsRead = [$totalModel.T.T('PAGE.news.Mymessage.yes'), $totalModel.T.T('PAGE.news.Mymessage.no')];


                            var rows = data.result.rows;
                            for (var i = 0; i < rows.length; i++) {
                                if (rows[i].isRead) {
                                    rows[i]['isReadText'] = IsRead[0];
                                } else {
                                    rows[i]['isReadText'] = IsRead[1];

                                }
                                $scope.rows = rows;
                                console.log($scope.rows);
                            }
                        },
                        function() {

                        });

                }
            }
            $scope.Grid = grid;
            $scope.Grid.reflash();
            $scope.check = function (item) {
                var MessageId = item.id;
                $totalModel.$state.go('app.message.newsCheckMessage', { id: MessageId})
            }
           
        }]);
//查看我的留言
app.controller('CheckMessageCtrl',
    ['$scope', '$ajaxPost', '$totalModel', '$stateParams',
        function ($scope, $ajaxPost, $totalModel, $stateParams) {
            $scope.id = $stateParams.id;
            console.log($scope.id);
            var getMessageInfo = {
                refresh: function () {
                    $ajaxPost.ajaxpost($totalModel,
                        $scope,
                        $totalModel.ServiceApi.News.MessageInfo,
                        { MessageId: $scope.id },
                        function(data) {
                            console.log(data);
                            $scope.Message = data.result;

                        },
                        function() {

                        });
                }
            }
            getMessageInfo.refresh();
            $scope.reply = function () {
                
                if ($scope.message.ReplyContent && $scope.message.ReplyContent != "") {
                    $ajaxPost.ajaxpost($totalModel,
                        $scope,
                        $totalModel.ServiceApi.News.replymessage,
                        { MessageId: $scope.id, Content: $scope.message.ReplyContent },
                        function(data) {
                            $totalModel.toaster.pop("success", $totalModel.T.T('toaster.23'));
                            console.log(data);
                            $scope.message.ReplyContent = '';
                            getMessageInfo.refresh();


                        },
                        function() {

                        });

                } else {
                    $totalModel.toaster.pop("error", $totalModel.T.T('toaster.24'));
                }

            }
            $scope.close = function () {
                $totalModel.$state.go('app.message.index');
            }
        }]);
//未读留言
app.controller('UnReadmessageCtrl',
    ['$scope', '$ajaxPost','$totalModel',
        function ($scope, $ajaxPost, $totalModel) {
            //多语言处理
           
           
            var grid = {
                pager: {
                    totalItems: 0, currentPage: 0, maxSize: 5,
                    itemTexts: function (type, page, current) {
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "末页";
                            case "page":
                                return page;
                        }
                    },
                    pageChanged: function () {
                        //  alert(this.currentPage);
                        console.log($scope.currentPage);
                        $scope.queryObj.page = $scope.currentPage;
                        grid.reflash();
                    }
                },
                reflash: function () {
                    $ajaxPost.ajaxpost($totalModel,
                        $scope,
                        $totalModel.ServiceApi.News.GetUnreadMessageList,
                        {},
                        function(data) {
                            console.log(data);
                            $scope.Grid.pager.totalItems = data.result.records;
                            $scope.Grid.pager.currentPage = data.result.page;
                            //没有数据
                            if (data.result.records == 0) {
                                $scope.noData = true;
                            } else {
                                $scope.noData = false;
                            }
                            var language = localStorage.NG_TRANSLATE_LANG_KEY;
                            console.log(language);
                            if (language == 'en') {
                                var IsRead = ['是', '否'];
                            } else {
                                var IsRead = ['yes', 'no'];
                            }
                            var rows = data.result.rows;
                            for (var i = 0; i < rows.length; i++) {
                                if (rows[i].isRead) {
                                    rows[i]['isReadText'] = IsRead[0];
                                } else {
                                    rows[i]['isReadText'] = IsRead[1];

                                }
                                $scope.rows = rows;
                                console.log($scope.rows);
                            }

                        },
                        function() {

                        });

                }
            }
            $scope.Grid = grid;
            $scope.Grid.reflash();
            $scope.check = function (item) {
                var MessageId = item.id;
                $totalModel.$state.go('app.message.newsCheckUnreadMessage', { id: MessageId })
            }

        }]);
//查看未读留言
app.controller('CheckUnReadMessageCtrl',
    ['$scope', '$stateParams', '$ajaxPost', '$totalModel',
        function ($scope, $stateParams, $ajaxPost, $totalModel) {
            $scope.id = $stateParams.id;
            console.log($scope.id);
            var getMessageInfo = {
                refresh: function () {
                    $ajaxPost.ajaxpost($totalModel,
                        $scope,
                        $totalModel.ServiceApi.News.MessageInfo,
                        { MessageId: $scope.id },
                        function(data) {
                            console.log(data);
                            $scope.Message = data.result;

                        },
                        function() {

                        });
                }
            }
            getMessageInfo.refresh();
            $scope.reply = function () {

                if ($scope.message.ReplyContent && $scope.message.ReplyContent != "") {
                    $ajaxPost.ajaxpost($totalModel,
                        $scope,
                        $totalModel.ServiceApi.News.replymessage,
                        { MessageId: $scope.id, Content: $scope.message.ReplyContent },
                        function(data) {
                            $totalModel.toaster.pop("success", $totalModel.T.T('toaster.23'));
                            console.log(data);
                            getMessageInfo.refresh();
                            $scope.Message.ReplyContent = '';

                        },
                        function() {

                        });

                } else {
                    $totalModel.toaster.pop("error", $totalModel.T.T('toaster.24'));
                }

            }
            $scope.close = function () {
                $totalModel.$state.go('app.message.index');
            }
        }]);