app.controller('transaction_jyjf_csjl',
	['$scope', '$http', '$state', '$wqtHttp', 'UserInfo', 'ServiceApi', '$wqtLocals', '$window', '$timeout', '$state', 'ngDialog', 'toaster',
		function ($scope, $http, $state, $wqtHttp, UserInfo, ServiceApi, $wqtLocals, $window, $timeout, $state, ngDialog, toaster) {
			
			$scope.queryObj = {
				rows: 10,
				page: 0,
				queryData: {}
			};
			$scope.totalItems = 0;
			$scope.currentPage = 0;
			$scope.GetGrid = function () {
				$wqtHttp.post(
					{
						url: ServiceApi.Transaction.jfjy_csjl, //http://api.wqt.com/wqt/api/help/SellList,
						data: $scope.queryObj,
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
							$scope.btnSuccess = false;
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
			$scope.query = function () {
				var StarTime = null;
				var EndTime = null;
				if ($scope.queryObj.queryData.startTime) {
					var StarTime = new Date($scope.queryObj.queryData.startTime);
					$scope.queryObj.queryData.startTime = StarTime.getFullYear() + '-' + (StarTime.getMonth() + 1) + '-' + StarTime.getDate();
				}
				if ($scope.queryObj.queryData.endTime) {
					var EndTime = new Date($scope.queryObj.queryData.endTime);
					$scope.queryObj.queryData.endTime = EndTime.getFullYear() + '-' + (EndTime.getMonth() + 1) + '-' + EndTime.getDate();
				} 
				//查询提交数据
				$scope.queryObj.queryData = {
					MinDate: $scope.queryObj.queryData.startTime,
					MaxDate: $scope.queryObj.queryData.endTime,
					SerialNumber: $scope.SerialNumber
				};
				$scope.btnSuccess = true;
				$scope.GetGrid();
				//查询后重置
				$scope.SerialNumber = null;
				$scope.MinDate = null;
				$scope.MaxDate = null;
			}

			//撤销
			$scope.Submit = function (argument1, argument2) {
				var ngDialogGetGrid = $scope.GetGrid;
				ngDialog.open({
					template: argument1,
					className: 'ngdialog-theme-plain',
					controller: function ($scope) {
						$scope.Confirm = function () {
							$scope.btnSuccess = true;
							$wqtHttp.post({
								url: ServiceApi.Transaction.jfjy_csjl_backout, //'http://api.wqt.com/wqt/api/help/HelpListCancel'
								data: {
									hid: argument2
								},
								success: function (result) {
									$scope.closeThisDialog();
									if (result.status.code == 0) {
										toaster.pop('success', '撤销成功');
										ngDialogGetGrid();
									} else {
										//toaster.pop('danger', '撤销失败', result.status.desc);
										$scope.btnSuccess = false;
									}
								},
								error: function () {
									toaster.pop('warning', '操作取消', '');
									$scope.btnSuccess = false;
								}
							})
						}
					}

				});
			}

			//查看
			$scope.Check = function (argument1, argument2) {
				console.log(argument2);
				ngDialog.open({
					template: argument1,
					className: 'ngdialog-theme-plain',
					controller: function ($scope) {
							$wqtHttp.post({
								url: ServiceApi.Transaction.jfjy_csjl_check, //'http://api.wqt.com/wqt/api/help/HelpMaList'
								data: {
									'hdId': argument2
								},
								success: function (result) {
									$scope.serialNumber = '';
									$scope.BuyUserCode = '';
									$scope.Total = '';
									$scope.BuyMobile = '';
									$scope.SellUserCode = '';
									$scope.SellMobile = '';
									$scope.BankCode = '';
									$scope.WeixinCode = '';
									$scope.AlipayCode = '';
								}
							})
							$scope.Confirm = function () {
								$scope.closeThisDialog();
							}
						$scope.Cancel = function () {
							$scope.closeThisDialog(); //关闭弹窗
							toaster.pop('warning', '操作取消', '');
						}
					}

				});
			}
		}]);