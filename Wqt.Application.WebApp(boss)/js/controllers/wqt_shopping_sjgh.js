//申请供货商家列表
app.controller('shopping_sjghList',
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
                        url: ServiceApi.shopping.shopping_sjghList, //'http://api.wqt.com/wqt/api/mall/supplier/applylist'
                        data: $scope.queryObj,
                        success: function (data) {
                            if (data.status.code != 0) {
                                toaster.pop("error", "系统错误", data.status.desc);
                            } else {
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
            $rootScope.sjghListGetGrid = $scope.GetGrid;
            $scope.query = function () {
                $scope.queryObj.queryJson = { keyword: $scope.keyword };
                $scope.GetGrid();
            }

        }]);

//提交供货商家申请
app.controller('shopping_sjghSet',
    ['$scope', '$rootScope', '$state', '$wqtHttp', 'UserInfo', '$window', 'ServiceApi', '$interval', 'toaster', '$timeout', 'ngDialog',
        function ($scope, $rootScope, $state, $wqtHttp, UserInfo, $window, ServiceApi, $interval, toaster, $timeout, ngDialog) {

            var UserInfo = UserInfo.get();
            $scope.userName = UserInfo.name;
			$scope.phoneNumber = UserInfo.mobile;
           
            
            //图片上传 s--
            var myInfo = {};
            var handleFileSelectFon = function (evt) {
                var file = evt.currentTarget.files[0];
                var fileType = file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length);
                if (fileType == 'jpg' || fileType == 'JPG') {
                    var reader = new FileReader();
                    reader.onload = function (evt) {
                        $scope.$apply(function ($scope) {
                            myInfo.FontImg = evt.target.result;
                            $("#imgShow").attr('src', evt.target.result);
                        });
                    };
                    reader.readAsDataURL(file);
                } else {
                    alert("请选择JPG格式的图片!");
                }
            }
            angular.element(document.querySelector('#FontImg')).on('change', handleFileSelectFon);
            //图片上传 e--	

            

            //提交
			$scope.Submit = function () {
				$scope.myInfo = myInfo;
			    console.log($scope.myInfo.FontImg);
				if (!$scope.myInfo.FontImg) {
                    toaster.pop("warning", "请上传代表图");
                    return;
                };
                $scope.applyRemark = angular.element('#applyRemark').text();
                $scope.applyRemark = $scope.applyRemark.trim();
                $scope.shoppingData = {
					applyRemark: $scope.applyRemark,	
					img: $scope.myInfo.FontImg
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
                                    url: ServiceApi.shopping.shopping_sjghSet, //'http://api.wqt.com/wqt/api//mall/supplier/apply'
                                    data: $scope.shoppingData,
                                    success: function (data) {
                                        $scope.closeThisDialog();
                                        if (data.status.code != 0) {
                                            toaster.pop("warning", "申请失败", data.status.desc);
                                        } else {
                                            toaster.pop("success", "申请成功", data.status.desc);
                                            $scope.steps.step1 = false;
                                            $scope.steps.step2 = true;
                                            $rootScope.sjghListGetGrid();
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