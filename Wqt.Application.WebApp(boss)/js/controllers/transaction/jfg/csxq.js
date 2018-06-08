app.controller('csxqCtrl',
    ['$scope', '$ajaxPost','$totalModel', 'UserInfo', 'ngDialog',
        function ($scope, $ajaxPost, $totalModel,  ngDialog) {

            var UserInfo = $totalModel.UserInfo.get();
            $scope.queryObj = {
                rows: 10,
                page: 1,
                queryData: {
                    startTime: ''
                }
            };
            $scope.totalItems = 0;
            $scope.currentPage = 0;
            $scope.GetGrid = function () {
                $ajaxPost.ajaxpost($totalModel,
                    $scope,
                    $totalModel.ServiceApi.Transaction.GuadanSellRecord,
                    $scope.queryObj,
                    function(data) {
                        console.log(data);
                        $scope.totalItems = data.result.records;
                        $scope.currentPage = data.result.page;
                        $scope.rows = data.result.rows;
                        //没有数据
                        if (data.result.records == 0) {
                            $scope.noData = true;
                        } else {
                            $scope.noData = false;
                        }
                        $scope.btnSuccess = false;
                    },
                    function() {
                        $scope.logining = false;
                    });
            }
            //rows:每页大小  page:当前页, queryJson: {ke}
            $scope.GetGrid();
            $scope.maxSize = 5;
            $scope.pageChanged = function () {
                $scope.queryObj.page = $scope.currentPage;
                $scope.GetGrid();
            };

            $scope.sellRecord = function (Id) {

                $totalModel.$state.go('app.transaction_jfgcsjl', { id: Id });
            }
            //查询
		}]);