console.log = function () { };
app.controller('finance_withdraw',
	['$scope', '$rootScope', '$wqtHttp', 'UserInfo', '$wqtLocals', '$interval', 'ServiceApi','$window','toaster',
		function ($scope, $rootScope, $wqtHttp, UserInfo, $wqtLocals, $interval, ServiceApi, $window, toaster) {
			
			//提现记录
			$scope.queryObj = {
				rows: 10,
				page: 1,
				queryJson: {}
			};
			
			$scope.GetGrid = function () {
				$wqtHttp.post(
					{
						url: ServiceApi.Finace.WithdrawList, //'http://api.wqt.com/wqt/api/finanical/createcashlist'
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
		    $rootScope.withdrawGetGrid = $scope.GetGrid;
			$scope.reflash = function () {
				$scope.GetGrid();
			}
			
		}]);

app.controller('TXJEcontroller',
	['$scope', '$rootScope', '$wqtHttp', 'UserInfo', '$wqtLocals', '$interval', 'ServiceApi', 'toaster', '$state', '$timeout', '$window', '$http','$modal','ngDialog',
		function ($scope, $rootScope, $wqtHttp, UserInfo, $wqtLocals, $interval, ServiceApi, toaster, $state, $timeout, $window, $http, $modal, ngDialog) {
			//提现管理
			//获取
			var UserInfo = UserInfo.get();
			
			//银行账户
			$scope.TXBankList = function () {
				$wqtHttp.post(
					{
						url: ServiceApi.Finace.WithdrawBankList,
						success: function (data) {
							$scope.BankAccountList = data.result.bankList;
							if ($scope.BankAccountList.length == 0) {
								$scope.BankAccountList = ['请添加银行卡'];
							};
						},
						error: function () {
							$scope.logining = false;
						}
					});
			}
			$scope.TXBankList();


			//提现类型
			$scope.HBSelectIndex = UserInfo.commonData.cahsCurrentList;
			//账户余额
			$scope.SelectChang = function () {

				$scope.TXHBtype = $scope.HBSelectIndex[0].currencyId;
				$wqtHttp.post(
					{
						url: ServiceApi.Finace.WithdrawAmount, //'http://api.wqt.com/wqt/api/finanical/querywalletamount'
						//data: +argument1,
						data: {
							currencyId: $scope.TXHBtype,//+argument1
						},
						success: function (data) {
							if (data.status.code == 0) {
								$scope.UserMoney = data.result.amount;
							} else {
								toaster.pop('warning', '余额获取失败');
							}
						},
						error: function () {
							toaster.pop('warning', '系统错误');
						}
					});
			};
			//汇率
			$scope.Parities = $scope.HBSelectIndex[0].bLTextForOut;
			//到账类型
			$scope.RealCurrency = $scope.HBSelectIndex[0].realCurrentName;
			
			//手续费
			$scope.ServeMoney = UserInfo.commonData.cashServiceFeeBL;
			
			//换算金额
			$scope.BuyMoneyEvent = function () {
				var ParitiesCalc = $scope.Parities.split(':');
				
				ParitiesCalc = ParitiesCalc[1] / ParitiesCalc[0];
				var CalcMoney = $scope.BuyMoney * ParitiesCalc;
				$scope.CalcMoney = CalcMoney;
				//到账金额
				$scope.TrueRealMoney = +$scope.CalcMoney - +$scope.CalcMoney * +$scope.ServeMoney/100;
				
			}
			var HBSelectVerify = function () {
		        if (!$scope.BuyMoney || $scope.BuyMoney < 500 || $scope.BuyMoney > $scope.UserMoney) {
		            toaster.pop("warning", "请选择提现金额并且金额不小于500,数值不大于余额");
		            return;
		        }
		    }
		    //提交
			$scope.Submit = function (isValid) {
				console.log(isValid);
				if (isValid) {
					HBSelectVerify();
				var SubmitData = {
					BankAccountId: $scope.BankSelectVal,
					CurrencyId: $scope.TXHBtype,
					Amount: $scope.BuyMoney,
					RealCurrentId: 1
				};
				//提交按钮效果
				$scope.btnSuccess = true;
				$wqtHttp.post(
					{
						url: ServiceApi.Finace.WithdrawSubmit, //'http://api.wqt.com/wqt/api/finanical/createcash'
						data: SubmitData,
						success: function (data) {
							if (data.status.code == 0) {

								$scope.BankSelectVal = null;
								$scope.HBSelectVal = null;
								$scope.BuyMoney = null;
								$scope.btnSuccess = false;
								$scope.steps.step1 = false;
								$scope.steps.step2 = true;
								$rootScope.withdrawGetGrid();
								toaster.pop("success", "提现成功", data.status.desc);
							} else {
								toaster.pop("warning", "提现失败", data.status.desc);
								$scope.btnSuccess = false;
								return;
							}
						},
						error: function () {
							toaster.pop("error", "系统错误", data.status.desc);
							$scope.btnSuccess = false;
							return;
						}
					});
				}
			}

			//延时刷新页面
			function Delayedrefresh() {
				$timeout(function () {
					$state.reload();
				}, 3000);
			};

			//刷新
			$scope.refresh = function () {
				$state.reload();
			};
			//延时提交
			function DelayedSubmit() {
				$timeout(function () {
					$scope.btnSuccess = false;
				}, 3000)
			}

			$scope.open = function () {
				var TXBankList = $scope.TXBankList;
				ngDialog.open({
					template: 'TXAddBankList.html',
					width: 640,
					className: 'ngdialog-theme-plain',
					controller: function ($scope) {
						$scope.Confirm = function (isValid) {
						    console.log(isValid);
							if (isValid) {
						    $wqtHttp.post({
								url: ServiceApi.Finace.WithdrawBank, //'http://api.wqt.com/wqt/api/finanical/createnewuserbank'
								data: {
									BankAccountName: $scope.BankAccountName,
									BankAccountCode: $scope.BankAccountCode,
									BankUserName: $scope.BankUserName
								},
								success: function (data) {
									$scope.closeThisDialog();
									if (data.status.code == 0) {
										toaster.pop("success", "创建成功", data.status.desc);
										TXBankList();
										
									} else {
										toaster.pop("error", "创建失败", data.status.desc);
										$scope.btnSuccess = false;
									}
								},
								error: function () {
									toaster.pop('error', '添加银行接口连接出错', '');
									$scope.btnSuccess = false;
								}
							})
						    }
						}
					}

				});







				//var modalInstance = $modal.open({
				//	templateUrl: 'myModalContent.html',
				//	controller: 'TXJEcontroller',
				//	size: { maxWidth: '500px' },
				//	resolve: {
				//		items: function () {  //打开之前执行的函数
				//			return $scope.items;
				//		}
				//	}
				//});
				//modalInstance.result.then(function (argument) { //点击确认执行的函数
				//	$wqtHttp.post(
				//		{
				//			url: ServiceApi.Finace.WithdrawBank, //'http://api.wqt.com/wqt/api/finanical/createnewuserbank'
				//			data: {
				//				BankAccountName: $scope.BankAccountName,
				//				BankAccountCode: $scope.BankAccountCode,
				//				BankUserName: $scope.BankUserName
				//			},
				//			success: function (data) {
				//				if (data.status.code == 0) {
				//					toaster.pop("success", "创建成功", data.status.desc);
				//					$scope.TXBankList();
				//				} else {
				//					toaster.pop("warning", "创建失败", data.status.desc);
				//				}
				//			},
				//			error: function () {
								
				//			}
				//		});

				//}, function () {  //点击取消执行的函数
					
				//});
			};

		}]);

