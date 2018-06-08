app.controller("gmxqCtrl",
    ['$scope', '$ajaxPost','$totalModel', 'ngDialog',
        function ($scope, $ajaxPost, $totalModel,  ngDialog) {
            var userInfo = $totalModel.UserInfo.get();
           
            $scope.queryObj = {
                rows: 10,
                page: 1,
                queryData: {
                    startTime: "", Status: ""
                }
            };
            $scope.totalItems = 0;
            $scope.currentPage = 0;
            $scope.GetGrid = function () {
                $ajaxPost.ajaxpost($totalModel,
                    $scope,
                    $totalModel.ServiceApi.Transaction.GuadanBuyRecord,
                    $scope.queryObj,
                    function(data) {
                        console.log(data);
                        $scope.totalItems = data.result.records;
                        $scope.currentPage = data.result.page;
                        $scope.rows = data.result.rows;
                        $scope.btnSuccess = false;
                        // 根据状态置灰按钮 初始化dom元素，ng-init
                        $scope.ngRepeatFinished = function() {

                            for (var i = 0; i < data.result.rows.length; i++) {
                                //console.log(data.result.rows[i].status);
                                console.log($('.endButton')[i]);
                                if (data.result.rows[i].status === 3) {

                                    $($('.endButton')[i]).addClass("disabled");
                                    $($('.endButton')[i]).text("已终止");
                                }
                            }
                        }
                        //没有数据
                        if (data.result.records === 0) {
                            $scope.noData = true;
                        } else {
                            $scope.noData = false;
                        }
                    });

            }
            //rows:每页大小  page:当前页, queryJson: {ke}
            $scope.GetGrid();
            $scope.maxSize = 5;
            $scope.pageChanged = function () {
                $scope.queryObj.page = $scope.currentPage;
                $scope.GetGrid();
            };

            //查询
            //已终止
            $scope.end = function () {
                $scope.queryObj.queryData.Status = 3;
                $scope.GetGrid();
            }
            //等待中
            $scope.waitcomplete = function () {
                $scope.queryObj.queryData.Status = 1;
                $scope.GetGrid();
            }
            //已完成
            $scope.conmpleted = function () {
                $scope.queryObj.queryData.Status = 2;
                $scope.GetGrid();
            }
            //终止购买
            $scope.sumbit = function (endData,index) {
                ngDialog.open({
                    template: 'transaction_jfg_jydt.html',
                    className: 'ngdialog-theme-plain',
                    controller: function ($scope) {
                        $scope.index = index;
                       
                        $scope.tradeId = endData.id;
                        console.log($scope.tradeId);
                        $scope.Confirm = function () {
                            console.log($scope.index);
                            var index = $scope.index;
                            $ajaxPost.ajaxpost($totalModel,
                                $scope,
                                $totalModel.ServiceApi.Transaction.CancelTrade,
                                { tradeId: $scope.tradeId },
                                function(data) {
                                    console.log(data);
                                    $scope.closeThisDialog();
                                    toaster.pop('success', '操作成功', '');

                                    //console.log($('.endButton')[index]); 置灰按钮
                                    $($('.endButton')[index]).addClass('disabled');
                                    $($('.endButton')[index]).text('已终止');
                                },
                                function() {
                                    $totalModel.toaster.pop("error", "系统错误", data.status.desc);
                                });

                        }
                        $scope.Cancel = function () {
                            $scope.closeThisDialog(); //关闭弹窗
                            
                        }
                    }

                });
            }
            //购买记录
            $scope.buyRecord = function (Id) {
                
                $totalModel.$state.go('app.transaction_jfggmjl', { id: Id });
            }
        }]);