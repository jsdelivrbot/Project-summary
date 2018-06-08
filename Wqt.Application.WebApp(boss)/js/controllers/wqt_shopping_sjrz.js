//申请入驻商家列表
app.controller('shopping_sjrzList',
	['$scope', '$rootScope', '$state', '$wqtHttp', 'UserInfo', '$window', 'ServiceApi', '$interval', 'toaster', '$timeout', 'ngDialog',
		function ($scope, $rootScope, $state, $wqtHttp, UserInfo, $window, ServiceApi, $interval, toaster, $timeout, ngDialog) {


			$scope.queryObj = {
				rows: 10,
				page: 0,
				queryJson: null
			};
			$scope.GetGrid = function () {
				$wqtHttp.post(
					{
						url: ServiceApi.shopping.shopping_sjrzList, //'http://api.wqt.com/wqt/api/mall/shopenter/applylist'
						data: $scope.queryObj,
						success: function (data) {
							if (data.status.code != 0) {
							    toaster.pop("error", "系统错误", data.status.desc);
						    }else{
						    $scope.totalItems = data.result.records;
							$scope.currentPage = data.result.page;
							$scope.rows = data.result.rows;
							    //没有数据
							    $scope.tablelistdatashow();
						    }
						},
						error: function () {
						    toaster.pop("error", "系统错误", data.status.desc);
						}
					});
			}
			//rows:每页大小  page:当前页, queryJson: {ke}
			$scope.GetGrid();
		    $rootScope.sjrzListGetGrid = $scope.GetGrid;
			$scope.query = function () {
				$scope.queryObj.queryJson = { keyword: $scope.keyword };
				$scope.GetGrid();
			}
			
		}]);

//提交入驻商家申请
app.controller('shopping_sjrzSet',
	['$scope', '$rootScope', '$state', '$wqtHttp', 'UserInfo', '$window', 'ServiceApi', '$interval', 'toaster', '$timeout', 'ngDialog',
		function ($scope, $rootScope, $state, $wqtHttp, UserInfo, $window, ServiceApi, $interval, toaster, $timeout, ngDialog) {

			var UserInfo = UserInfo.get();
		    $scope.userName = UserInfo.name;
			$scope.phoneNumber = UserInfo.mobile;
		    
			//提交
			$scope.Submit = function () {
				if (!$scope.shopName) {
					toaster.pop("warning", "请填写加盟店名称");
					return;
				};
			    $scope.applyRemark = angular.element('#applyRemark').text();
			    $scope.applyRemark = $scope.applyRemark.trim();
			    $scope.shoppingData = {
			        applyName: $scope.shopName,
					applyRemark: $scope.applyRemark
				};
			    ngDialog.open({
			        template: './tpl/ngDialog/HandleWindow.html',
					className: 'ngdialog-theme-plain',
			        scope: $scope,
					controller: function ($scope) {
						$scope.Confirm = function () {
						    $scope.btnSuccess = true;
			                $wqtHttp.post(
			                    {
									url: ServiceApi.shopping.shopping_sjrzSet, //'http://api.wqt.com/wqt/api//mall/shopenter/apply'
			                        data: $scope.shoppingData,
									success: function (data) {
									    $scope.closeThisDialog();
			                            if (data.status.code != 0) {
			                                toaster.pop("warning", "申请失败", data.status.desc);
										} else {
											toaster.pop("success", "申请成功", data.status.desc);
			                                $scope.steps.step1 = false;
											$scope.steps.step2 = true;
											$rootScope.sjrzListGetGrid();
										}
									    $scope.btnSuccess = false;
			                        },
									error: function () {
										toaster.pop("error", "系统错误", '');
									    $scope.btnSuccess = false;
			                        }
								});
			            }
			        }
			    });
			}
		}]);