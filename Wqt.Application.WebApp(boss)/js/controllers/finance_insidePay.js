//console.log = function () { };
app.controller('finance_insidePay',
	['$scope','$rootScope', '$state', '$wqtHttp', 'UserInfo', '$window', 'ServiceApi', '$interval', 'toaster', '$timeout','ngDialog',
		function ($scope, $rootScope,$state, $wqtHttp, UserInfo, $window, ServiceApi, $interval, toaster, $timeout, ngDialog) {
			
            //汇款充值记录
            $scope.queryObj = {
				rows: 10,
				page: 0,
				queryJson: null
			};
			$scope.GetGrid = function () {
				$wqtHttp.post(
					{
						url: ServiceApi.Finace.insidePaylist, //'http://api.wqt.com/wqt/api/finanical/remittancelist'
                        data: $scope.queryObj,
						success: function (data) {
							console.log(data);
							$scope.totalItems = data.result.records;
							$scope.currentPage = data.result.page;
							$scope.rows = data.result.rows;
						},
						error: function () {

						}
					});
			}
			$rootScope.insidePayGetGrid = $scope.GetGrid;
			//rows:每页大小  page:当前页, queryJson: {ke}
			$scope.GetGrid();
			$scope.maxSize = 5;

			$scope.reflash = function () {
				$scope.GetGrid();
			}
			$scope.query = function () {
				//  alert(11)
				$scope.queryObj.queryJson = { keyword: $scope.keyword };
				$scope.GetGrid();

			}
			$scope.dialog = function (item, index) {
				
				var itemID = item.id;
				ngDialog.open({
					template: 'insideDelete.html',
					className: 'ngdialog-theme-plain',
					controller: function ($scope) {
						$scope.ConfirmDelete = function () {
							$wqtHttp.post(
								{
									url: ServiceApi.Finace.insidePayDelete, //'http://api.wqt.com/wqt/api/finanical/DelRemittance'
									data: { rid: itemID },
									success: function (data) {
										console.log(data);
										$scope.closeThisDialog();
										$scope.GetGrid();
										
									},
									error: function () {
										toaster.pop("warning", "删除失败");
									}
								});
						}
						$scope.show = function () {
							$scope.closeThisDialog(); //关闭弹窗
							}
						}
					
				});
			}
			
		}]);




//汇款充值
app.controller('finance_deal',
	['$scope', '$rootScope','$state', '$wqtHttp', 'UserInfo', '$window', 'ServiceApi', '$interval', 'toaster', '$timeout', 'ngDialog',
		function ($scope, $rootScope, $state, $wqtHttp, UserInfo, $window, ServiceApi, $interval, toaster, $timeout, ngDialog) {

			//获取本地信息
			var UserInfoData = UserInfo.get();
			$scope.KeyWord = {};

			$scope.BankAccountList = UserInfoData.commonData.sysBanklist;

			//汇款货币
			$scope.RealCurrencyIdlist = UserInfoData.commonData.remittanceConfigList;
			//消费积分
			$scope.CurrencyId = 1;

			$scope.SelectChang = function () {
				var BLText = $scope.RealCurrencyIdlist[$scope.RealCurrencyId - 1].currencyList[0];
				$scope.BLText = BLText.currencyBLValue / BLText.realCurrencyBLValue;
				$scope.BLTextData = BLText.currencyBLValue + ':' + BLText.realCurrencyBLValue;
				$scope.RealAmount = 0;
				$scope.Amount = 0;
			};


			$scope.RealAmountChange = function (RealAmount) {
				$scope.Amount = +RealAmount * +$scope.BLText;
			}

			if ( isNaN($scope.Amount) ) {
				$scope.Amount = 0;
			}	
			//图片上传 s--
			var myInfo = {};
			var handleFileSelectFon = function (evt) {
				var file = evt.currentTarget.files[0];
				var fileType = file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length);
				if (fileType == 'jpg' || fileType == 'JPG' || fileType == 'png' || fileType == 'PNG') {
					var reader = new FileReader();
					reader.onload = function (evt) {
						$scope.$apply(function ($scope) {
							myInfo.FontImg = evt.target.result;
							$("#imgShow").attr('src', evt.target.result);
						});
					};
					reader.readAsDataURL(file);
				} else {
				    toaster.pop("warning", "请选择JPG或PNG格式的图片!");
					//alert("请选择JPG格式的图片!");
				}
			}
			angular.element(document.querySelector('#FontImg')).on('change', handleFileSelectFon);
			$('#imgShow').click(function () {
				$('#FontImg').trigger("click");
		    });
			//图片上传 e--
			
			//提交
			$scope.queryObj = {
				queryData: {
					startTime: ''
				}
			};

			var fontImgSelect = function() {
				if (!$('#FontImg').val()) {
			        toaster.pop("warning", "请提交支付凭证");
			        return;
			    };
			}

			$scope.Submit = function (isValid) {
			   
				if (isValid) {

				    fontImgSelect();

			    var StarTime = null;

				StarTime = new Date($scope.queryObj.queryData.startTime);
				$scope.PostDate = StarTime.getFullYear() + '-' + (StarTime.getMonth() + 1) + '-' + StarTime.getDate();

				//提交按钮效果
				$scope.btnSuccess = true;
				var SubmitData = {
					SysBankAccountId: $scope.SysBankAccountId,
					Bank: $scope.Bank,
					PostUserName: $scope.PostUserName,
					PostDate: $scope.PostDate,
					RealCurrencyId: $scope.RealCurrencyId,
					RealAmount: $scope.RealAmount,
					BLText: $scope.BLText,
					CurrencyId: $scope.CurrencyId,
					Amount: $scope.Amount,
					BankCode: $scope.BankCode,  //汇款银行账号
					BankAddress: $scope.PayBank,	//汇款支行
					FontImg: myInfo.FontImg		//汇款凭证
				}
				
				$wqtHttp.post(
					{
						url: ServiceApi.Finace.insidePay, //'http://api.wqt.com/wqt/api/finanical/createremittance'
						data: SubmitData,
						success: function (data) {
							if (data.status.code == 0) {
								toaster.pop("success", "汇款成功", data.status.desc);
								$scope.Bank = null;
								$scope.PostUserName = null;
								$scope.queryObj.queryData.startTime = null;
								$scope.RealAmount = null;
								$scope.Amount = null;
								$scope.BankCode = null;
								$scope.PayBank = null;
								$scope.RealCurrencyId = null;
								$scope.SysBankAccountId = null;
								$('#imgShow').attr('src', null);
								$('#FontImg').val(null);
								$scope.steps.step1 = false;
								$scope.steps.step2 = true;
								$rootScope.insidePayGetGrid();
							} else {
								toaster.pop("warning", "汇款失败", data.status.desc);
								$scope.btnSuccess = false;
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