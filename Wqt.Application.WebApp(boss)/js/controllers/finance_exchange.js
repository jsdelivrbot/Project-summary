//console.log = function () { };
app.controller('finance_exchangeSet',
	['$scope', '$ajaxPost', '$totalModel', '$rootScope', '$state', '$wqtHttp', 'UserInfo', '$window', 'ServiceApi', '$interval', 'toaster', '$timeout',
		function ($scope, $ajaxPost, $totalModel,$rootScope, $state, $wqtHttp, UserInfo, $window, ServiceApi, $interval, toaster, $timeout) {
		    var userInfo = $totalModel.UserInfo.get();
		    //$scope.UserMoney = 0;
		    $scope.BLText = "1:1";
		    

			//兑换比例
			$scope.HBLXchange = function (argument) {
			    //获取余额
			    $ajaxPost.ajaxpost($totalModel,
			        $scope,
			        $totalModel.ServiceApi.Finace.WithdrawAmount,
					{ currencyId: argument },
			        function (data) {
			            $scope.UserMoney = data.result.amount;
			        });
				if (argument == '4') {
				    $scope.BLText = "1:1";
				} else if (argument == '1') {
				    $scope.BLText = "7:1";
				} 
			}

		    //提交
			$scope.Submit = function (isValid) {
				console.log(isValid);
				var PayMoneySelect = function() {
					if ($scope.PayMoney > $scope.UserMoney) {
				        toaster.pop("warning", "金额不足");
				        return;
				    };
				}
				if (isValid) {
			    
				PayMoneySelect();

				var SubmitData = {
				    FromCurrencyId: $scope.outCurrency,
					ToCurrencyId: $scope.intoCurrency,
					Amount: $scope.PayMoney,
				    BLText: $scope.BLText
				}
				//提交按钮效果
				$scope.btnSuccess = true;
				$wqtHttp.post(
					{
						url: ServiceApi.Finace.ExchangeSet, //'http://api.wqt.com/wqt/api/finanical/'
						data: SubmitData,
						success: function (data) {
							if (data.status.code != 0) {
								//toaster.pop("warning", "兑换失败", data.status.desc);
								$scope.btnSuccess = false;
							} else {
								toaster.pop("success", "兑换成功", data.status.desc);
								$scope.btnSuccess = false;
								$scope.steps.step1 = false;
								$scope.steps.step2 = true;
								$rootScope.exchangeGetGrid();
							}
						},
						error: function () {
							toaster.pop("error", "系统错误", data.status.desc);
							$scope.btnSuccess = false;
						}
					});
			    }
			}
		}]);


app.controller('finance_exchangeList',
	['$scope', '$rootScope','$state', '$wqtHttp', 'UserInfo', '$window', 'ServiceApi', '$interval', 'toaster', '$timeout',
		function ($scope, $rootScope, $state, $wqtHttp, UserInfo, $window, ServiceApi, $interval, toaster, $timeout) {

			//转账记录
			var queryObj = {
				rows: 10,
				page: 1,
				queryJson: null
			};
			$scope.totalItems = 0;
			$scope.currentPage = 0;
			$scope.GetGrid = function () {
				$wqtHttp.post(
					{
						url: ServiceApi.Finace.ExchangeList, //'http://api.wqt.com/wqt/api/finanical/exchangeList'
						data: queryObj,
						success: function (data) {
							$scope.totalItems = data.result.records;
							$scope.currentPage = data.result.page;
							$scope.rows = data.result.rows;
							//没有数据
							$scope.tablelistdatashow();
						},
						error: function () {
							$scope.logining = false;
						}
					});
			}
			//rows:每页大小  page:当前页, queryJson: {ke}
			$scope.GetGrid();
		    $rootScope.exchangeGetGrid = $scope.GetGrid;
			$scope.pageChanged = function () {
				queryObj.page = $scope.currentPage;
				$scope.GetGrid();
			};
		}]);