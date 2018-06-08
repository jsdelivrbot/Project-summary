console.log = function () { };
app.controller('transaction_jyjfdt',
	['$scope', '$http', '$state', '$wqtHttp', 'UserInfo', 'ServiceApi', '$wqtLocals', '$interval','ngDialog','toaster',
		function ($scope, $http, $state, $wqtHttp, UserInfo, ServiceApi, $wqtLocals, $interval, ngDialog, toaster) {

			//获取用户信息
			var UserInfo = UserInfo.get();
			
			//日历start
			$scope.disabled = function (date, mode) {
				return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
			};
			//积分详情
			$wqtHttp.post({
				url: ServiceApi.Transaction.jfjy_index_detail,
				data: null,
				success: function (result) {
					console.log(result);
				},
				error: function () {

				}
			})

			$scope.toggleMin = function () {
				$scope.minDate = $scope.minDate ? null : new Date();
			};
			$scope.toggleMin();
			$scope.openStart = function ($event) {
				$event.preventDefault();
				$event.stopPropagation();
				$scope.opened1 = true;
				$scope.opened2 = false;
			};
			$scope.openEnd = function ($event) {
				$event.preventDefault();
				$event.stopPropagation();
				$scope.opened1 = false;
				$scope.opened2 = true;
			};
			$scope.dateOptions = {
				formatDay: 'dd',
				formatMonth: 'MM',
				formatYear: 'yyyy',
				locale: 'zh-cn',
				startingDay: 1
			};
			$scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
			$scope.format = $scope.formats[0];
           //日历end

			var queryObj = {
				rows: 10,
				page: 1,
				queryData: null
			};

			$scope.totalItems = 0;
			$scope.currentPage = 0;
			$scope.GetGrid = function () {
				$wqtHttp.post(
					{
						url: ServiceApi.Finace.Ledger, //'http://api.wqt.com/wqt/api/finanical/financiallist'
						data: queryObj,
						success: function (data) {
							
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

				//查询提交数据
				queryObj.queryData = {};
				

				$scope.GetGrid();

				//查询后重置
				$scope.FinaicaSetType = null;
				$scope.KeyWord.startTime = null;
				$scope.KeyWord.endTime = null;
				$scope.CurrencyType = null;
				$scope.Description = null;
			}

			//出售
			$scope.submit = function () {
				ngDialog.open({
					template: 'transaction_jyjfdt.html',
					className: 'ngdialog-theme-plain',
					controller: function ($scope) {
						
						$scope.Confirm = function () {
							$scope.closeThisDialog();
							toaster.pop('success', '操作成功', '');

						}
						$scope.Cancel = function () {
							$scope.closeThisDialog(); //关闭弹窗
							toaster.pop('warning', '操作失败', '');
						}
					}

				});
			}
			//全额购买
			$scope.SumBuy = function (item, $index) {
				ngDialog.open({
					template: 'transaction_jyjfdt_gm.html',
					className: 'ngdialog-theme-plain',
					controller: function ($scope) {
						$scope.Confirm = function () {
							$scope.closeThisDialog();
							toaster.pop('success', '操作成功', '购买成功，请前往购买记录是完成付款！');
						}
						$scope.Cancel = function () {
							$scope.closeThisDialog(); //关闭弹窗
							toaster.pop('warning', '操作失败', '');
						}
					}

				});
			}

		}]);