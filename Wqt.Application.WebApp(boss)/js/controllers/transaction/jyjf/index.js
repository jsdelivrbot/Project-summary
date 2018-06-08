app.controller('transaction_jyjf_index',
	['$scope', '$http', '$state', '$wqtHttp', 'UserInfo', 'ServiceApi', '$wqtLocals', '$interval', 'ngDialog', 'toaster', '$totalModel','$interval',
		function ($scope, $http, $state, $wqtHttp, UserInfo, ServiceApi, $wqtLocals, $interval, ngDialog, toaster, $totalModel, $interval) {

		    //获取用户信息
			var UserInfo = UserInfo.get();
			$scope.phoneNumber = UserInfo.mobile;
			//积分详情
		    $wqtHttp.post({
		        url: ServiceApi.Transaction.jfjy_index_detail,
		        data: null,
		        success: function(result) {
		            $scope.jFAmount = result.result.jFAmount;
		            $scope.NowLV = result.result.jFLv + ':' + result.result.rMBLv;
		        },
		        error: function() {
                    toaster.pop('warning', $totalModel.T.T('toaster.0'));
		        }
		    });

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
						url: ServiceApi.Transaction.jfjy_index_buylist, //'http://api.wqt.com/wqt/api/help/AllHelpList'
						data: $scope.queryObj,
						success: function (data) {
							$scope.rows = data.result.rows;
                            //没有数据
                            if (data.result.records == 0) {
                                $scope.noData = true;
                            } else {
                                $scope.noData = false;
                            }
							$scope.btnSuccess = false;
						},
						error: function () {
                            toaster.pop('warning', $totalModel.T.T('toaster.1'));
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
					SellerCode: $scope.userCode
				};
				$scope.btnSuccess = true;
				$scope.GetGrid();
			}

			 //回车查询
			$('#EnterQuery').bind('keypress', function (event) {
				if (event.keyCode == '13') {
					$('#btnSearch').trigger('click');
				}
			})

			//出售
			$scope.sellOutProduct = function (argument) {
			    ngDialog.open({
			        template: 'transaction_jyjfdt_cs.html',
			        className: 'ngdialog-theme-plain',
			        width: 600,
			        
					scope: $scope,
					controller: function ($scope) {

					    var curCount = 60;
					    console.log($scope.phoneNumber);
                        $scope.PhoneText = $totalModel.T.T('PAGE.dialog.validate.0');
						$scope.GetMobileValidation = function () {
							//发送短信
						    $totalModel.$http.get($totalModel.ServiceApi.UserReg.GetSecurityCode + '?Mobile=' + $scope.phoneNumber + '&Type=3')
                                .then(function (data) {
						            console.log(data);
						            var curCount = 60;
                                    $scope.PhoneText = $totalModel.T.T('PAGE.dialog.validate.2') + '' + '' + curCount + '' + '' + $totalModel.T.T('PAGE.dialog.validate.3');
						            
						            $scope.PhoneCodeInterval = $interval(function () {
						                if (curCount == 0) {
						                    $scope.clickSuccess = false;
                                            $scope.PhoneText = $totalModel.T.T('PAGE.dialog.validate.1');
						                } else {
                                            curCount--;
						                    $scope.clickSuccess = true;
                                            $scope.PhoneText = $totalModel.T.T('PAGE.dialog.validate.2') + '' + '' + curCount + '' + '' + $totalModel.T.T('PAGE.dialog.validate.3');
						                }
						            }, 1000);

						        }, function (x) {

								});

							
							
					    };

						$scope.NowLV = argument;
						$scope.Confirm = function () {
							if (!$scope.SellNumberSum) {
                                toaster.pop("warning", $totalModel.T.T('toaster.2'));
								return;
							};
							if (!$scope.SellL2Pwd) {
                                toaster.pop("warning", $totalModel.T.T('toaster.3'));
								return;
							};
							$scope.btnSuccess = true;
							var SellData = {
								Total: $scope.SellNumberSum,
                                L2Pwd: $scope.SellL2Pwd,
                                ValidCode: $scope.phoneCode
							}
						    $wqtHttp.post({
						        url: ServiceApi.Transaction.jfjy_index_sell,
						        data: SellData,
						        success: function(result) {
						            if (result.status.code == 0) {
                                        toaster.pop('success', $totalModel.T.T('toaster.4'));
						                $scope.closeThisDialog();
						                $scope.GetGrid();
						            } else {
						                //toaster.pop('danger', result.status.desc);
                                        $scope.btnSuccess = false;
						                $scope.clickSuccess = false;
						                $scope.PhoneText = $totalModel.T.T('PAGE.dialog.validate.1');
						            }
						        },
						        error: function() {
						            $scope.closeThisDialog();
                                    //toaster.pop('warning', $totalModel.T.T('toaster.5'));
						            $scope.btnSuccess = false;
						        }
						    });
						}
					}
				});
			}
			//购买
			$scope.SumBuy = function (argument1, argument2) {
				var ngDialogGetGrid = $scope.GetGrid;
				ngDialog.open({
					template: 'transaction_jyjfdt_gm.html',
					className: 'ngdialog-theme-plain',
					controller: function ($scope) {
						$scope.Rest = argument2;
						$scope.Confirm = function () {
							if (!$scope.BuyNum){
                                toaster.pop("warning", $totalModel.T.T('toaster.6'));
								return;
							};
							$scope.btnSuccess = true;
						    $wqtHttp.post({
						        url: ServiceApi.Transaction.jfjy_index_buy, //'http://api.wqt.com/wqt/api/help/ManualMatch'
						        data: {
						            serialNumber: argument1,
						            buyAmount: $scope.BuyNum
						        },
						        success: function(result) {
						            if (result.status.code == 0) {
                                        toaster.pop('success', $totalModel.T.T('toaster.7'));
						                $scope.closeThisDialog();
						                ngDialogGetGrid();
						                //跳转购买记录页面
						                //$state.go('app.transaction_jyjf_gmjl', '', {
						                //	reload: true
						                //});  
						            } else {
						                //toaster.pop('danger', result.status.desc);
						                $scope.btnSuccess = false;
						            }
						        },
						        error: function() {
                                    toaster.pop('warning', $totalModel.T.T('toaster.8'));
						            $scope.btnSuccess = false;
						        }
						    });
						}
					}

				});
			}

		}]);