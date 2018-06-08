console.log = function () { };
app.controller('finance_ledger',
	['$scope', '$http', '$state', '$wqtHttp', 'UserInfo', 'ServiceApi', '$wqtLocals','$interval','T',
		function ($scope, $http, $state, $wqtHttp, UserInfo, ServiceApi, $wqtLocals, $interval,T) {
            $scope.noData = false;
			//获取用户信息
            var UserInfo = UserInfo.get();
		    console.log(UserInfo);
			$scope.FinaicalList = UserInfo.commonData.sysAllFinaicalList;
            $scope.CurrentList = UserInfo.commonData.sysAllCurrentList;
		    console.log($scope.FinaicalList);
            //多语言处理
            //for (var i = 0; i < $scope.FinaicalList.length; i++) {
            //    $scope.FinaicalList[i].text = T.T('PAGE.finance.ledger.sysAllFinaicalList.' +
            //        $scope.FinaicalList[i].value);
            //}
            for (var i = 0; i < $scope.CurrentList.length; i++) {
                $scope.CurrentList[0].text = T.T('PAGE.finance.ledger.sysAllCurrentList.1');
                $scope.CurrentList[1].text = T.T('PAGE.finance.ledger.sysAllCurrentList.2');
                $scope.CurrentList[2].text = T.T('PAGE.finance.ledger.sysAllCurrentList.3');
                $scope.CurrentList[3].text = T.T('PAGE.finance.ledger.sysAllCurrentList.4');
                $scope.CurrentList[4].text = T.T('PAGE.finance.ledger.sysAllCurrentList.5');
                $scope.CurrentList[5].text = T.T('PAGE.finance.ledger.sysAllCurrentList.6');
               
		    }
			$scope.queryObj = {
				rows: 10,
				page: 1,
				queryData: {}
			};
			$scope.GetGrid = function () {
				$wqtHttp.post(
					{
						url: ServiceApi.Finace.Ledger, //'http://api.wqt.com/wqt/api/finanical/financiallist'
						data: $scope.queryObj,
						success: function (data) {
							$scope.totalItems = data.result.records;
							$scope.currentPage = data.result.page;
							$scope.rows = data.result.rows;
                            $scope.btnSuccess = false;
							//没有数据
							$scope.tablelistdatashow();
						},
						error: function () {
							
						}
                    });
               
			}
			//rows:每页大小  page:当前页, queryJson: {ke}
			$scope.GetGrid();
			
			//查询
			$scope.query = function () {
					
				//查询提交数据
				if ($scope.FinaicaSetType) {
					$scope.queryObj.queryData.financialId = $scope.FinaicaSetType;
				};
				if ($scope.CurrencyType) {
					$scope.queryObj.queryData.currencyId = $scope.CurrencyType;
				};
				if ($scope.Description) {
					$scope.queryObj.queryData.description = $scope.Description;
				};

				$scope.btnSuccess = true;
				$scope.GetGrid();
			}
		}]);