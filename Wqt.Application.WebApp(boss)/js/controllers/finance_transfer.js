console.log = function () { };
app.controller('finance_transferSet',
	['$scope', '$rootScope','$state', '$wqtHttp', 'UserInfo', '$window', 'ServiceApi', '$interval','toaster', '$timeout','T',
		function ($scope, $rootScope, $state, $wqtHttp, UserInfo, $window, ServiceApi, $interval, toaster, $timeout,T) {
			//获取本地信息
			var UserInfoData = UserInfo.get();

			//货币类型
			$scope.CurrencyType = UserInfoData.commonData.huoBiLeiXingTransfer;
		    console.log($scope.CurrencyType);
            //多语言处理
            for (var i = 0; i < $scope.CurrencyType.length; i++) {
                $scope.CurrencyType[i].text = T.T('PAGE.finance.transfer.CurrencyType.' + $scope.CurrencyType[i].value);
            }
				//货币类型
            $scope.SelectChang = function (HBSelectVal) {
				console.log(HBSelectVal);
                $wqtHttp.post(
                    {
                        url: ServiceApi.Finace.TransferAmount, //'http://api.wqt.com/wqt/api/finanical/querywalletamount'
                        data: { currencyId: HBSelectVal },
                        success: function (data) {
                            $scope.UserMoney = data.result.amount;
                        },
                        error: function () {
                            $scope.logining = false;
                        }
                    });
            }
				
			

			$scope.reflash = function () {
				$scope.GetGrid();
			}
			$scope.query = function () {
				queryObj.queryJson = { keyword: $scope.keyword };
				$scope.GetGrid();
			}

			//提交
			$scope.Submit = function (isValid) {

				if (isValid) {
				    var SubmitData = {
				        toUserCode: $scope.HYUserVal,
				        CurrencyId: $scope.HBSelectVal,
				        Amount: $scope.PayMoney,
				        L2Pass: $scope.L2Pass
				    }
				    //提交按钮效果
				    $scope.btnSuccess = true;
				    $wqtHttp.post(
				        {
				            url: ServiceApi.Finace.TransferSet, //'http://api.wqt.com/wqt/api/finanical/createtransferout'
				            data: SubmitData,
				            success: function (data) {
				                if (data.status.code == 0) {
				                    toaster.pop("success", "转账成功", data.status.desc);	
									$scope.btnSuccess = false;
				                    $scope.steps.step1 = false;
				                    $scope.steps.step2 = true;
									$rootScope.transferGetGrid();
								} else {
									//toaster.pop("warning", "转账失败", data.status.desc);
				                    $scope.btnSuccess = false;
				                }
				            },
							error: function () {
				                //toaster.pop("error", "系统错误", data.status.desc);
				                $scope.btnSuccess = false;
				            }
				        });
			    }
			}
		}]);


app.controller('finance_transferList',
	['$scope', '$rootScope', '$state', '$wqtHttp', 'UserInfo', '$window', 'ServiceApi', '$interval', 'toaster', '$timeout',
		function ($scope, $rootScope, $state, $wqtHttp, UserInfo, $window, ServiceApi, $interval, toaster, $timeout) {

			//转账记录
			$scope.queryObj = {
				rows: 10,
				page: 1,
				queryJson: {}
			};
			$scope.GetGrid = function () {
				$wqtHttp.post(
					{
						url: ServiceApi.Finace.TransferList, //'http://api.wqt.com/wqt/api/finanical/transferlist'
						data: $scope.queryObj,
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
		    $rootScope.transferGetGrid = $scope.GetGrid;
		}]);