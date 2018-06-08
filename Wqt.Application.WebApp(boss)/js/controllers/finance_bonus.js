//console.log = function () { };
app.controller('finance_dynamicBonus',
	['$scope', '$http', '$state', '$wqtHttp', 'UserInfo', 'ServiceApi', '$wqtLocals','$window','$timeout','$state','toaster',
        function ($scope, $http, $state, $wqtHttp, UserInfo, ServiceApi, $wqtLocals, $window, $timeout, $state, toaster) {

            $scope.noData = false;
			//奖金类型选择
			var UserInfo = UserInfo.get();
			$scope.prizeType = UserInfo.commonData.prizeType;


            $scope.queryObj = {
                rows: 10,
                page: 1,
                queryData: { field: '', startTime: '', endTime: '' }
            };
            $scope.GetGrid = function () {
                $wqtHttp.post(
                {
						url: ServiceApi.Finace.Bonus, //http://api.wqt.com/wqt/api/finanical/prizelist,
                    data: $scope.queryObj,
                    success: function (data) {
                        if (data.status.code != 0) {
                            $scope.btnSuccess = false;
                            toaster.pop("error", "系统错误", data.status.desc);
                        } else {
                            $scope.totalItems = data.result.records;
                            $scope.currentPage = data.result.page;
							$scope.rows = data.result.rows;
							//合计
							$scope.SumprizeTotal = 0;
							$scope.SumjYJF = 0;
							$scope.SumbOSJJ = 0;
							$scope.SumsCJF = 0;
							
							angular.forEach($scope.rows, function (item, index, array) {
								$scope.SumprizeTotal += parseFloat(item.prizeTotal);
								console.log($scope.SumprizeTotal);
								$scope.SumjYJF += parseFloat(item.jYJF);
								$scope.SumbOSJJ += parseFloat(item.bOSJJ);
								$scope.SumsCJF += parseFloat(item.sCJF);
							});
							$scope.btnSuccess = false;
							//没有数据
							$scope.tablelistdatashow();
                        }
                        
                    },
                    error: function () {
                        $scope.btnSuccess = false;
                    }
                });
			}
			
            //rows:每页大小  page:当前页, queryJson: {ke}
            $scope.GetGrid();
            $scope.maxSize = 5;
            //查询
        }]);
app.controller('finance_staticBonus',
    ['$scope', '$http', '$state', '$wqtHttp', 'UserInfo', 'ServiceApi', '$wqtLocals', '$window', '$timeout', '$state', 'toaster',
        function ($scope, $http, $state, $wqtHttp, UserInfo, ServiceApi, $wqtLocals, $window, $timeout, $state, toaster) {

            $scope.noData = false;
            //奖金类型选择
            var UserInfo = UserInfo.get();
            $scope.prizeType = UserInfo.commonData.prizeType;
            //获取奖金类型值
            $scope.SelectChange = function (argument) {
				$scope.prizeTypequrey = "Field_" + argument;
            }
            $scope.queryObj = {
                rows: 10,
                page: 1,
                queryData: { field: '', startTime: '', endTime: '' }
            };
            $scope.GetGrid = function () {
                $wqtHttp.post(
                    {
						url: ServiceApi.Finace.BonusJT, //http://api.wqt.com/wqt/api/finanical/prizelist,
                        data: $scope.queryObj,
                        success: function (data) {
                            console.log(data);
                            $scope.totalItems = data.result.records;
                            $scope.currentPage = data.result.page;
							$scope.rows = data.result.rows;
							//合计
							$scope.SumprizeTotal = 0;
							$scope.SumjYJF = 0;
							$scope.SumdZJF = 0;
							$scope.SumsCJF = 0;
							$scope.SumfWF = 0;
							$scope.Sumfield_6 = 0;
							angular.forEach($scope.rows, function (item, index, array) {

								$scope.SumprizeTotal += parseFloat(item.prizeTotal);
								$scope.SumjYJF += parseFloat(item.jYJF);
								$scope.SumdZJF += parseFloat(item.dZJF);
								$scope.SumsCJF += parseFloat(item.sCJF);
								$scope.SumfWF += parseFloat(item.fWF);
							});

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
            $scope.maxSize = 5;
       
        }]);