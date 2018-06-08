console.log = function () { };
app.controller('finance_report',
    ['$scope', '$http', '$state', '$wqtHttp', 'UserInfo', 'ServiceApi', '$wqtLocals', '$window', '$timeout', '$state','toaster',
		function ($scope, $http, $state, $wqtHttp, UserInfo, ServiceApi, $wqtLocals, $window, $timeout, $state, toaster) {



            //奖金类型选择
			var UserInfo = UserInfo.get();
			$scope.prizeType = UserInfo.commonData.prizeType;
            //$scope.KeyWord = {};
			//获取奖金类型值
			
            $scope.queryObj = {
				rows: 10,
				page: 1,
                queryData: { usercode: '', startTime: '', endTime: '' }
			};
			$scope.GetGrid = function () {
				$wqtHttp.post(
					{
                        url: ServiceApi.Finace.Report, //http://api.wqt.com/wqt/api/finanical/prizesummary,
                        data: $scope.queryObj,
                        success: function (data) {
                            if (data.status.code != 0) {
                                $scope.btnSuccess = false;
                                toaster.pop("error", "系统错误", data.status.desc);
							} else {
								$scope.totalItems = data.result.records;
                                $scope.currentPage = data.result.page;
								$scope.rows = data.result.rows;
								$scope.Sumfield_1 = 0;
								$scope.Sumfield_2 = 0;
								$scope.Sumfield_3 = 0;
								$scope.Sumfield_4 = 0;
								$scope.Sumfield_5 = 0;
								$scope.Sumfield_6 = 0;
								angular.forEach($scope.rows, function (item, index, array) {
									$scope.Sumfield_1 += parseFloat(item.field_1);
									$scope.Sumfield_2 += parseFloat(item.field_2);
									$scope.Sumfield_3 += parseFloat(item.field_3);
									$scope.Sumfield_4 += parseFloat(item.field_4);
									$scope.Sumfield_5 += parseFloat(item.field_5);
									$scope.Sumfield_6 += parseFloat(item.field_6);
								});

								$scope.btnSuccess = false;
								
                                //没有数据
								$scope.tablelistdatashow();
                            }
							
						},
						error: function () {
							$scope.logining = false;
						}
					});
			}

			
			$scope.GetGrid();
			

			//查询
		}]);