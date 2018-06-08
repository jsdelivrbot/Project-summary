app.controller('transaction_jyjf_csjl_money',
	['$scope', '$http', '$state', '$wqtHttp', 'UserInfo', 'ServiceApi', '$wqtLocals', '$window', '$timeout', '$state', 'ngDialog', 'toaster','$interval',
		function ($scope, $http, $state, $wqtHttp, UserInfo, ServiceApi, $wqtLocals, $window, $timeout, $state, ngDialog, toaster, $interval) {

			var queryObj = {
				rows: 10,
				page: 0,
				queryData: null
			};
			$scope.totalItems = 0;
			$scope.currentPage = 0;
			$scope.GetGrid = function () {
				$wqtHttp.post(
					{
						url: ServiceApi.Transaction.jfjy_csjl_money, //http://api.wqt.com/wqt/api/help/SellDetailList,
						data: queryObj,
                        success: function (data) {
                            //没有数据
                            if (data.result.records == 0) {
                                $scope.noData = true;
                            } else {
                                $scope.noData = false;
                            }
							$scope.totalItems = data.result.records;
							$scope.currentPage = data.result.page;
							$scope.rows = data.result.rows;
							$scope.btnSuccess = false;
						},
						error: function () {

						}
					});
			}
			
			//rows:每页大小  page:当前页, queryJson: {ke}
			$scope.GetGrid();
			$scope.maxSize = 5;
			$scope.pageChanged = function () {
				queryObj.page = $scope.currentPage;
				$scope.GetGrid();
			};

			//查询
			$scope.query = function () {

				$scope.btnSuccess = true;
				var StarTime = new Date($scope.MinDate);
				var EndTime = new Date($scope.MaxDate);
				if ($scope.MinDate) {
					$scope.MinDate = StarTime.getFullYear() + '-' + (StarTime.getMonth() + 1) + '-' + StarTime.getDate();
				} else {
					$scope.MinDate = null;
				}
				if ($scope.MaxDate) {
					$scope.MaxDate = EndTime.getFullYear() + '-' + (EndTime.getMonth() + 1) + '-' + EndTime.getDate();
				} else {
					$scope.MaxDate = null;
				}

				//查询提交数据
				queryObj.queryData = {
					MinDate: $scope.MinDate,
					MaxDate: $scope.MaxDate,
					SellerCode: $scope.userCode
				};
				$scope.GetGrid();
				//查询后重置
			}

			//查看
			$scope.Check = function (argument1, argument2, argument3) {
				ngDialog.open({
					template: argument1,
					className: 'ngdialog-theme-plain',
					controller: function ($scope) {
						$scope.serialNumber = argument3.serialNumber;
						$scope.BuyUserCode = argument3.buyerDetail.buyNickName;
						$scope.Total = argument3.price;
						$scope.BuyMobile = argument3.buyerDetail.buyMobile;
						$scope.sellUserCode = argument3.salerDetail.sellUserCode;
						$scope.SellMobile = argument3.salerDetail.sellMobile;
						$scope.BankName = argument3.salerDetail.bankName || '无';
						$scope.BankAddress = argument3.salerDetail.bankAddress || '无';
						$scope.BankCode = argument3.salerDetail.bankCode || '无';
						$scope.AlipayType = argument3.salerDetail.AlipayType || '银行转账';
					}
				});
			}

			//投诉
			$scope.Complain = function (argument1) {
				var ngDialogGetGrid = $scope.GetGrid;
				ngDialog.open({
					template: 'transaction_jyjf_csjl_money_ts.html',
					className: 'ngdialog-theme-plain',
					controller: function ($scope) {
						$scope.Confirm = function () {
							$wqtHttp.post({
								url: ServiceApi.Transaction.jfjy_csjl_money_Tousu,
								data: {
									Id: argument1,
									remark:$scope.ComplainState,
								},
								success: function (result) {
									if (result.status.code == 0) {
										toaster.pop('success', '投诉成功');
										$scope.closeThisDialog();
										ngDialogGetGrid();
									} else {
										//toaster.pop('danger', '投诉失败', result.status.desc);
									}
								}
							})
						}
					}

				});
			}

			//确认收款
			$scope.ConfirmBuy = function (argument1, argument2) {
				var ngDialogGetGrid = $scope.GetGrid;
				ngDialog.open({
					template: argument1,
					className: 'ngdialog-theme-plain',
					controller: function ($scope) {
						$scope.Confirm = function () {
							$wqtHttp.post({
								url: ServiceApi.Transaction.jfjy_csjl_ConfirmBuy, //'http://api.wqt.com/wqt/api/help/SellerConfirm'
								data: {
									hdId: argument2
								},
								success: function (result) {
									if (result.status.code == 0) {
										toaster.pop('success', '确认收款');
										$scope.closeThisDialog();
										ngDialogGetGrid();
									} else {
										//toaster.pop('danger', '确认收款失败', result.status.desc);
									}
								},
								error: function () {
									toaster.pop('warning', '确认收款接口链接失败', '');
								}
							})
						}
					}
				});
			}

		}]);