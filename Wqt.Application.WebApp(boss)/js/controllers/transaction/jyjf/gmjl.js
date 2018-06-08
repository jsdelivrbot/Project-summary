app.controller('transaction_jyjf_gmjl',
	['$scope','$interval', '$http', '$state', '$wqtHttp', 'UserInfo', 'ServiceApi', '$wqtLocals', '$window', '$timeout', '$state', 'ngDialog', 'toaster',
		function ($scope, $interval,$http, $state, $wqtHttp, UserInfo, ServiceApi, $wqtLocals, $window, $timeout, $state, ngDialog, toaster) {

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
						url: ServiceApi.Transaction.jfjy_gmjl, //http://api.wqt.com/wqt/api/help/BuyList,
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

							var nowDate = new Date();
							console.log(nowDate);
							for (var i = 0; i < $scope.rows.length; i++){
								var buyDate = $scope.rows[i].createDate;
								console.log(buyDate);
							}


							$scope.btnSuccess = false;
						},
						error: function () {
							toaster.pop('error', '查询接口未连接');
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
			//打款凭证
			$scope.SumBuy = function (argument1, argument2, argument3) {
				var ngDialogGetGrid = $scope.GetGrid;
				var myInfo = {};
				ngDialog.open({
					template: 'transaction_jyjf_gmjl_check.html',
					className: 'ngdialog-theme-plain',
					onOpenCallback: function () {
						//图片上传 s--
						var handleFileSelectFon = function (evt) {
							var file = evt.currentTarget.files[0];
                            var fileType = file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length);
                            if (fileType == 'jpg' || fileType == 'JPG' || fileType == 'png' || fileType == 'PNG' || fileType == 'gif' || fileType == "GIF" || fileType == 'jpeg' || fileType == 'JPEG') {
								var reader = new FileReader();
								reader.onload = function (evt) {
									$scope.$apply(function ($scope) {
										myInfo.FontImg = evt.target.result;
										$("#imgShow").attr('src', evt.target.result);
									});
								};
								reader.readAsDataURL(file);
							} else {
								$scope.error = function () {
									toaster.pop("error", "系统错误", data.status.desc);
								}
								toaster.pop("warning", "请选择JPG, PNG或GIF格式的图片!");
							}
						}
						angular.element(document.querySelector('#FontImg')).on('change', handleFileSelectFon);
					    $('#imgShow').click(function () {
					        $('#FontImg').trigger("click");
					    });
							//图片上传 e--
					},
					controller: function ($scope) {
						$scope.serialNumber = argument3.serialNumber;
						$scope.Confirm = function () {
							if (!$("#imgShow").attr('src')) {
								toaster.pop("warning", "请选择打款凭证");
								return;
							};
							$scope.btnSuccess = true;
							$wqtHttp.post({
								url: ServiceApi.Transaction.jfjy_gmjl_voucher,
								data: {
									Id: argument1,
									ImgUrl: myInfo.FontImg
								},
								success: function (result) {
									if (result.status.code == 0) {
										toaster.pop('success', '凭证提交成功');
										$scope.closeThisDialog();
										ngDialogGetGrid();
									} else {
										//toaster.pop('danger', '上传失败', result.status.desc);
										$scope.btnSuccess = false;
									}
								}
							})
						}
					}
				});
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
							$scope.bankUserName = argument3.salerDetail.bankUserName;
							$scope.SellMobile = argument3.salerDetail.sellMobile;
							$scope.BankName = argument3.salerDetail.bankName || '无';
							$scope.BankAddress = argument3.salerDetail.bankAddress || '无';
							$scope.BankCode = argument3.salerDetail.bankCode|| '无';
							$scope.AlipayType = argument3.salerDetail.AlipayType || '银行转账';
							$scope.Confirm = function () {
								$scope.closeThisDialog();
							}
						}
					});
				}
			//取消购买
			$scope.cancel = function(argument) {
			    ngDialog.open({
					template: 'transaction_jyjf_gmjl_cancal.html',
					className: 'ngdialog-theme-plain',
					scope: $scope,
			        controller: function ($scope) {
			            $scope.Confirm = function () {
			                $scope.btnSuccess = true;
			                $wqtHttp.post({
								url: ServiceApi.Transaction.ManualMatchCancel,
			                    data: {
									hid: argument
			                    },
			                    success: function (result) {
									if (result.status.code == 0) {
									    $scope.closeThisDialog();
										toaster.pop('success', result.status.desc);
			                            $scope.GetGrid();
			                        } else {
			                            
			                        }
			                    },
			                    error: function () {
			                        toaster.pop('warning', '未知错误', '');
			                        $scope.btnSuccess = false;
			                    }
			                })
			            }
			        }
			    });
			}

			//投诉
			$scope.Complain = function (argument1) {
				var ngDialogGetGrid = $scope.GetGrid;
				ngDialog.open({
					template: 'transaction_jyjf_gmjl_ts.html',
					className: 'ngdialog-theme-plain',
					controller: function ($scope) {
						$scope.Confirm = function () {
							$wqtHttp.post({
								url: ServiceApi.Transaction.jfjy_csjl_money_Tousu,
								data: {
									Id: argument1,
									remark: $scope.ComplainState,
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

			}]);