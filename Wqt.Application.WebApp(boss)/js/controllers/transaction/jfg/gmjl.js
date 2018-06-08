app.controller('gmjlCtrl',
    ['$scope', '$ajaxPost','$totalModel', '$stateParams',
        function ($scope, $ajaxPost, $totalModel, $stateParams) {
            $scope.tradeId = $stateParams.id;
            $scope.hasRecords = true;
            console.log($scope.tradeId);
            $scope.queryObj = {
				rows: 10,
                page: 1,
                queryData: {
                    tradeId: $scope.tradeId
                }
			};
			$scope.totalItems = 0;
			$scope.currentPage = 0;
            $scope.GetGrid = function () {
                $ajaxPost.ajaxpost($totalModel,
                    $scope,
                    $totalModel.ServiceApi.Transaction.TradeBuyList,
                    $scope.queryObj,
                    function(data) {
                        console.log(data);
                        //没有数据
                        if (data.result.records == 0) {
                            $scope.noData = true;
                        } else {
                            $scope.noData = false;
                        }
                        $scope.rows = data.result.rows;
                    });

            }
			//rows:每页大小  page:当前页, queryJson: {ke}
			$scope.GetGrid();
			$scope.maxSize = 5;
			$scope.pageChanged = function () {
                $scope.queryObj.page = $scope.currentPage;
				$scope.GetGrid();
			};
			
		}]);