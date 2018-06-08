console.log = function () { };
app.controller('transaction_jfggmjl',
	['$scope', '$http', '$state', '$wqtHttp', 'UserInfo', 'ServiceApi', '$wqtLocals', '$window', '$timeout', '$state', 'ngDialog',
		function ($scope, $http, $state, $wqtHttp, UserInfo, ServiceApi, $wqtLocals, $window, $timeout, $state, ngDialog) {

			//日历start
			$scope.disabled = function (date, mode) {
				return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
			};

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

			//奖金类型选择
			var UserInfo = UserInfo.get();
			$scope.prizeType = UserInfo.commonData.prizeType;

			//获取奖金类型值
			$scope.SelectChange = function (SelectVal) {
				$scope.prizeTypequrey = "Field_" + parseInt(SelectVal);
			}
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
						url: ServiceApi.Finace.Bonus, //http://api.wqt.com/wqt/api/finanical/prizelist,
						data: queryObj,
						success: function (data) {
							$scope.totalItems = data.result.records;
							$scope.currentPage = data.result.page;
							$scope.rows = data.result.rows;
							for (var i = 0; i < $scope.rows.length; i++) {
								var ab1 = $scope.rows[i].description;
								var reg = /[\u4E00-\u9FA5]/g;
								var result = ab1.replace(reg, '');
								$scope.rows[i].laiyuan = result.split(',')[0];
								$scope.rows[i].description = result.split(',')[1];
							};
							$scope.btnSuccess = false;
						},
						error: function () {
							$scope.logining = false;
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

				//转换日期格式 2017-8-8 
				var StarTime = null;
				$scope.KeyWord = {};
				var StarTime = new Date($scope.KeyWord.startTime);
				$scope.KeyWord.startTime = StarTime.getFullYear() + '-' + (StarTime.getMonth() + 1) + '-' + StarTime.getDate();

				$scope.btnSuccess = true;

				//查询提交数据
				queryObj.queryData = {};
				if ($scope.prizeTypequrey) {
					queryObj.queryData.field = $scope.prizeTypequrey;
				};
				if ($scope.KeyWord.startTime) {
					queryObj.queryData.minDate = $scope.KeyWord.startTime;
				};


				$scope.GetGrid();

				//查询后重置

				$scope.KeyWord.startTime = null;
				$scope.SelectVal = null;
			}
		}]);