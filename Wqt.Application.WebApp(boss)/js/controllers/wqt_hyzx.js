//console.log = function () { };
// 查看个人详细资料
app.controller('userInfoController',
    [
        '$scope', '$ajaxPost', '$totalModel',
        function ($scope, $ajaxPost, $totalModel) {
          
            console.log($totalModel);
            console.log($ajaxPost);
            $scope.userInfo = null;
            $ajaxPost.ajaxpost($totalModel,
                $scope,
                $totalModel.ServiceApi.MemberCenter.UserInfo,
                {},
                function (data) {
                    //alert(1);
                    console.log(data);
                    $scope.userLevel = $totalModel.UserInfo.get().commonData.userLevelList;
                    console.log($scope.userLevel);
                    console.log(data);
                    $scope.userInfo = data.result;
                });

            console.log($scope.userInfo);
        }
    ]);
//推广二维码
app.controller('qrcode',
    ['$scope', '$wqtHttp', 'toaster', 'ServiceApi', 'UserInfo',
        function ($scope, $wqtHttp, toaster, ServiceApi, UserInfo) {
            var UserInfo = UserInfo.get();

            var TGurl = UserInfo.usercode;

            $scope.text = "http://" + location.host + "/erweima.html?usercode=" + TGurl;
            jQuery('#qrcodeCanvas').qrcode({
                text: $scope.text
            });

            var clipboard = new Clipboard('.urlcopy');
            console.log(clipboard);

            clipboard.on('success', function (e) {

                //toaster.pop("success", "文字已复制到剪贴板中");
                alert("网址已复制到剪贴板中");
                e.clearSelection();
                clipboard.destroy();
            });


            clipboard.on('error', function (e) {
                alert("异常错误： " + JSON.stringify(e));
                console.log(e);
            });
        }]);

//修改个人资料
app.controller('ModDemoCtrl', ['$scope', '$ajaxPost', '$totalModel', 'ngDialog', function ($scope, $ajaxPost, $totalModel, ngDialog) {
    
    $scope.user = {};
    $scope.countryList = $totalModel.UserInfo.get().commonData.countryList;
   
    for (var i = 0; i < $scope.countryList.length; i++) {

        $scope.countryList[i].nameChinese = $totalModel.T.T('country.' + $scope.countryList[i].nameEnglish);
    }
    console.log($scope.countryList);
    $scope.isSelected = false;
    $scope.regionData = [];
    $scope.citys = [];
    $scope.districts = [];
    $scope.regionText = {};
    $scope.btnSuccess = false;
    $scope.buttonText = $totalModel.T.T('PAGE.dialog.validate.0');
    $scope.selectHide = function () {
        $scope.isSelected = true;
    }
    //function bindUi(user) {
    //    function GetAreaList(areacode, callback) {
    //        $ajaxPost.ajaxpost(
    //            $totalModel,
    //            $scope,
    //            $totalModel.ServiceApi.MemberCenter.AreaList,
    //            { code: areacode },
    //            function(data) {
    //                callback(data.result);

    //            });

    //    }

    //    GetAreaList('', function (lst) {
    //        $scope.regionData = lst;
    //        console.log(lst);
    //        if (user.provinceId) {
             
    //            $scope.selectedProvince =  user.provinceId;
    //        }

    //        if (user.cityId) {
    //            $scope.selectedCity = user.cityId;
    //            $scope.loadCity(function () {
    //                if (user.countyId) {
    //                    $scope.loadDistrict(function () {
    //                        ///  alert(user.countyId)
    //                        $scope.selectedDstrict = user.countyId;
    //                    });
    //                }
    //            });
    //        }

      
    //    });

    //    $scope.loadCity = function (callback) {

    //        $scope.districts = [];
    //        $scope.citys = [];
    //        GetAreaList($scope.selectedProvince, function (lst) {
    //            $scope.citys = lst;
    //            if (callback) {
    //                callback();
    //            }
               
    //        });
    //    }

    //    $scope.loadDistrict = function (callback) {
    //        $scope.districts = [];
    //        GetAreaList($scope.selectedCity, function (lst) {
    //            $scope.districts = lst;
    //            if (callback) {
    //                callback();
    //            }
    //        });
    //    }
    //}

    //function init(callback) {
    //    $ajaxPost.ajaxpost(
    //        $totalModel,
    //        $scope,
    //        $totalModel.ServiceApi.MemberCenter.UserInfo,
    //        {},
    //        function(data) {
    //            console.log(data);
    //            $scope.secretSecurityList = $totalModel.UserInfo.get().commonData.secretSecurityList;
    //            console.log($scope.secretSecurityList);
    //            $scope.user = data.result;
    //            callback($scope.user);

    //        },
    //        function() {
    //            $scope.btnSuccess = false;
    //        });

    //}

    //init(function (entity) {
    //    bindUi(entity);
    //});

        //alert(2);
        $ajaxPost.ajaxpost(
            $totalModel,
            $scope,
            $totalModel.ServiceApi.MemberCenter.UserInfo,
            {},
            function (data) {
                console.log(data);
                $scope.secretSecurityList = $totalModel.UserInfo.get().commonData.secretSecurityList;
                console.log($scope.secretSecurityList);
                $scope.user = data.result;
                $scope.user.countryCode = '';
                // setCountry(data.result);
            },
            function () {
                $scope.btnSuccess = false;
            });

    

    $scope.getName = function (countryList, selectedCountry) {
        console.log(countryList, selectedCountry);
        for (var i = 0; i < countryList.length; i++) {
            if (countryList[i].code === selectedCountry) {
                console.log(i);
                $scope.user.countryName = countryList[i].nameChinese;
            }
        }
    }
    $scope.GetMobileValidation = function () {
        console.log($scope.user.mobile );
            var InterValObj;
            var count = 60;
            var curCount;
            if ($scope.user.mobile!== undefined) {
                $totalModel.$http.get($totalModel.ServiceApi.UserReg.GetSecurityCode +
                        '?Mobile=' +
                        $scope.user.mobile +
                        '&Type=2')
                    .then(function (data) {
                            console.log(data);
                            ngDialog.open({
                                template: '../tpl/dialog_mobilevalidate.html',
                                className: 'ngdialog-theme-plain',
                                scope: $scope,
                                controller: function ($scope) {
                                    console.log($scope.user.mobile);
                                    curCount = count;
                                    $scope.buttonText = $totalModel.T.T('PAGE.dialog.validate.2') + '' + '' + curCount + '' + '' + $totalModel.T.T('PAGE.dialog.validate.3');
                                    InterValObj = $totalModel.$interval(SetRemainTime, 1000); //启动计时器,1秒执行一次  
                                    //timer处理函数  
                                    function SetRemainTime() {
                                        if (curCount == 0) {
                                            window.clearInterval(InterValObj);//停止计时器  
                                            $scope.buttonText = $totalModel.T.T('PAGE.dialog.validate.1');     
                                            $scope.hasgetCode = false;

                                        }
                                        else {
                                            curCount--;
                                            $scope.hasgetCode = true;
                                            $scope.buttonText = $totalModel.T.T('PAGE.dialog.validate.2') + '' + '' + curCount + '' + '' + $totalModel.T.T('PAGE.dialog.validate.3');
                                        }
                                    }

                                    $scope.reGetValidateCode = function () {
                                        console.log(curCount);
                                        curCount = count;
                                        $totalModel.$http.get($totalModel.ServiceApi.UserReg.GetSecurityCode +
                                                '?Mobile=' +
                                                $scope.user.mobile +
                                                '&Type=2')
                                            .then(function (data) {
                                                console.log(data);
                                                $scope.hasgetCode = true;
                                                SetRemainTime();
                                            });
                                    };
                                    $scope.Confirm = function () {
                                        $totalModel.$http.get($totalModel.ServiceApi.UserReg.CheckVerifCode +
                                                '?Mobile=' +
                                                $scope.user.mobile +
                                                '&Code=' +
                                                $scope.validateCode +
                                                '&Type=2')
                                            .then(function (response) {
                                                    console.log(response);
                                                    if (response.data.resultdata == true) {
                                                        $scope.closeThisDialog();
                                                        $totalModel.toaster.pop("success", response.data.message);
                                                        $scope.user.validateCode = $scope.validateCode;
                                                    } else {
                                                        $totalModel.toaster.pop("error", response.data.message);
                                                        $scope.user.validateCode = $scope.validateCode;
                                                    }
                                                },
                                                function (x) {

                                                });

                                    };


                                }
                            });
                        },
                        function (x) {

                        });
            } else {
                $totalModel.toaster.pop("error", $totalModel.T.T('toaster.9'));
            }


        },

    $scope.mod = function () {
        console.log($scope.validateCode);
        console.log($scope.countryName);
        
            $scope.btnSuccess = true;
            $ajaxPost.ajaxpost(
                
                $totalModel,
                $scope,
                $totalModel.ServiceApi.MemberCenter.EditMember,
                {
                    SecretSecurityId: $scope.user.secretSecurityId,
                    SecretSecurityMatchText: $scope.user.secretSecurityMatchText,
                    BankUserName: $scope.user.bankUserName,
                    bankName: $scope.user.bankName,
                    bankAddress: $scope.user.bankAddress,
                    bankCode: $scope.user.bankCode,
                    countryCode: $scope.user.countryCode,
                    countryName: $scope.user.countryName,
                    AreaText: $scope.user.areaText,
                    ValidCode: $scope.user.validateCode
                },
                function(data) {
                    $totalModel.toaster.pop("success", $totalModel.T.T('toaster.10'));

                },
                function() {
                    $scope.btnSuccess = false;
                });

        
        
    }
}]);
//  密码修改
app.controller('PWDDemoCtrl', ['$scope', '$ajaxPost', '$totalModel', 'ngDialog', function ($scope, $ajaxPost, $totalModel, ngDialog) {

    $scope.PWD = {},
        $scope.buttonText = $totalModel.T.T('PAGE.dialog.validate.0');
    console.log($scope.buttonText);
    $scope.btnSuccess = false;
    $ajaxPost.ajaxpost(
        $totalModel,
        $scope,
        $totalModel.ServiceApi.MemberCenter.UserInfo,
        {},
        function(data) {
            console.log('result', data);
            $scope.PWD = data.result;
            console.log($scope.PWD);
        });
        $scope.GetMobileValidation = function () {
            console.log($scope.PWD.mobile);
            var InterValObj;
            var count = 60;
            var curCount;
            if ($scope.PWD.mobile !== undefined) {
                $totalModel.$http.get($totalModel.ServiceApi.UserReg.GetSecurityCode +
                        '?Mobile=' +
                    $scope.PWD.mobile +
                        '&Type=1')
                    .then(function (data) {
                            console.log(data);
                            ngDialog.open({
                                template: '../tpl/dialog_mobilevalidate.html',
                                className: 'ngdialog-theme-plain',
                                scope: $scope,
                                controller: function ($scope) {
                                    console.log($scope.PWD.mobile);
                                    curCount = count;
                                    $scope.buttonText = $totalModel.T.T('PAGE.dialog.validate.2') +''+''+ curCount +''+''+ $totalModel.T.T('PAGE.dialog.validate.3');
                                    InterValObj = $totalModel.$interval(SetRemainTime, 1000); //启动计时器,1秒执行一次  
                                    //timer处理函数  
                                    function SetRemainTime() {
                                        if (curCount == 0) {
                                            window.clearInterval(InterValObj);//停止计时器  
                                            $scope.buttonText = $totalModel.T.T('PAGE.dialog.validate.1');     
                                            $scope.hasgetCode = false;

                                        }
                                        else {
                                            curCount--;
                                            $scope.hasgetCode = true;
                                            $scope.buttonText = $totalModel.T.T('PAGE.dialog.validate.2') + curCount + $totalModel.T.T('PAGE.dialog.validate.3');
                                        }
                                    }

                                    $scope.reGetValidateCode = function () {
                                        console.log(curCount);
                                        curCount = count;
                                        $totalModel.$http.get($totalModel.ServiceApi.UserReg.GetSecurityCode +
                                                '?Mobile=' +
                                            $scope.PWD.mobile +
                                                '&Type=1')
                                            .then(function (data) {
                                                console.log(data);
                                                $scope.hasgetCode = true;
                                                SetRemainTime();
                                            });
                                    };
                                    $scope.Confirm = function () {
                                        $totalModel.$http.get($totalModel.ServiceApi.UserReg.CheckVerifCode +
                                                '?Mobile=' +
                                            $scope.PWD.mobile +
                                                '&Code=' +
                                                $scope.validateCode +
                                                '&Type=1')
                                            .then(function (response) {
                                                    console.log(response);
                                                    if (response.data.resultdata == true) {
                                                        $scope.closeThisDialog();
                                                        $totalModel.toaster.pop("success", response.data.message);
                                                        $scope.PWD.ValidCode = $scope.validateCode;
                                                    } else {
                                                        $totalModel.toaster.pop("error", response.data.message);
                                                        $scope.PWD.ValidCode = $scope.validateCode;
                                                    }
                                                },
                                                function (x) {

                                                });

                                    };


                                }
                            });
                        },
                        function (x) {

                        });
            } else {
                $totalModel.toaster.pop("error", $totalModel.T.T('toaster.9'));
            }


        },
        $scope.changePWD = function (PWD) {

        console.log(PWD.OldPwd, PWD.NewPwd);
        if (PWD.OldPwd !== PWD.NewPwd) {
                $scope.btnSuccess = true;
                $ajaxPost.ajaxpost($totalModel,
                    $scope,
                    $totalModel.ServiceApi.MemberCenter.Repwd,
                    $scope.PWD,
                    function(data) {
                        console.log('result', data);
                        //$scope.btnSuccess = false;
                        ngDialog.openConfirm({
                            template: '../tpl/dialog_psdcomplete.html',
                            className: 'ngdialog-theme-default',
                            width: 500,
                            height: 325,
                            scope: $scope,
                            controller: function($scope) {

                            }
                        }).then(function() {
                                $scope.PWD.OldPwd = "";
                                $scope.PWD.NewPwd = "";
                            },
                            function(reason) {
                                console.log('Modal promise rejected. Reason: ');
                            });
                    });
            } else {
            $totalModel.toaster.pop("error", $totalModel.T.T('toaster.11'));
            }

        }

}]);

//报单申请
app.controller('BDSQCtrl', ['$scope', '$ajaxPost', '$totalModel', function ($scope, $ajaxPost, $totalModel) {

    $scope.BDSQ = {};
    $scope.btnSuccess = false;
    var userInfo = $totalModel.UserInfo.get();
    $scope.BDSQ.UserCode = userInfo.usercode;
    $scope.ReportCenterList = userInfo.commonData.reportCenterList;
    //console.log(userInfo);
    //console.log($scope.BDSQ);
    //if (userInfo.userLevel < 6) {
    //    $totalModel.toaster.pop("error", "您还不是BOS6等级,无法申请成为银商！");
    //}
    $scope.BdApply = function (isValid) {
        if (userInfo.userlevel < 3) {
            $totalModel.toaster.pop("error", $totalModel.T.T('toaster.12'));
        } else {
            //console.log($scope.BDSQ);
            if (isValid) {
                $scope.btnSuccess = true;
                $ajaxPost.ajaxpost($totalModel,
                    $scope,
                    $totalModel.ServiceApi.MemberCenter.applyreportcenter,
                    $scope.BDSQ,
                    function (data) {
                        //$scope.btnSuccess = false;
                        $totalModel.toaster.pop("success", data.status.desc);
                        console.log(data);
                    },
                    function () {
                        $scope.btnSuccess = false;
                        //$totalModel.toaster.pop("error", "您已申请过表单,请耐心等待");
                    });
            } else {
                $totalModel.toaster.pop("error", $totalModel.T.T('toaster.13'));
            }
        }
    }
}]);
//实名认证
app.controller('SMRZCtrl', ['$scope', '$ajaxPost', '$totalModel', function ($scope, $ajaxPost, $totalModel) {
   
    $scope.myInfo = {};
    $scope.btnSuccess = false;
    $scope.showForm = false;
    $scope.showDetail = false;

	//判断用户验证状态
    $ajaxPost.ajaxpost($totalModel,
        $scope,
        $totalModel.ServiceApi.UserReg.accountState,
        {},
        function (data) {
            console.log(data);
            $totalModel.$timeout(function () {
                if (data.result == 1) {
                    //未申请实名认证
                    $scope.accountStateNull = true;
                    $scope.showForm = true;
                } else if (data.result == 2) {
                    $scope.accountStateNull = false;
                    $scope.showDetail = true;
                    $scope.eventFun.setStep(2);
                    $scope.TabLiNavResult02 = true;
                    $scope.TabLiNavResult01 = false;
                    $scope.TabLiNavResult03 = false;
                } else {
                    $scope.accountStateNull = false;
                    $scope.showDetail = true;
                    $scope.eventFun.setStep(3);
                    $scope.TabLiNavResult03 = true;
                    $scope.TabLiNavResult01 = false;
                    $scope.TabLiNavResult02 = false;
                    if (data.result == 3) {
                        $scope.AuditResult = '审核通过';
                    } else if (data.result == 4) {
                        $scope.AuditResult = '审核未通过';
                        $scope.AuditResultLose = true;
                    }
                }
            }, 0, false);
        });

    var handImg = {
        handleFileSelectFon: function (evt) {
            var file = evt.currentTarget.files[0];

            var fileType = file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length);

            if (fileType == 'jpg' || fileType == 'JPG') {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function ($scope) {
                        $scope.myInfo.FontImg = evt.target.result;

                    });
                };
                reader.readAsDataURL(file);

            } else {
                $scope.error = function () {
                    toaster.pop("error",  data.status.desc);
                }
                alert("请选择JPG格式的图片!");
            }
        },
        handleFileSelectBack: function (evt) {
            
            var file = evt.currentTarget.files[0];

            var fileType = file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length);

            if (fileType == 'jpg' || fileType == 'JPG') {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function ($scope) {
                        $scope.myInfo.BackImg = evt.target.result;
                        //alert($scope.myInfo.FontImg)
                    });
                };
                reader.readAsDataURL(file);

            } else {
                $scope.error = function () {
                    toaster.pop("error",  data.status.desc);
                }
                alert("请选择JPG格式的图片!");
            }

        },
        
    }
    angular.element(document.querySelector('#FontImg')).on('change', handImg.handleFileSelectFon);
    angular.element(document.querySelector('#BackImg')).on('change', handImg.handleFileSelectBack);
     //申请实名认证
    $scope.RZ=function (isValid) {
        if (isValid) {
            $scope.btnSuccess = true;
            $ajaxPost.ajaxpost($totalModel,
                $scope,
                $totalModel.ServiceApi.MemberCenter.ApplyIdentify,
                $scope.myInfo,
                function(data) {
                    $totalModel.toaster.pop("success", $totalModel.T.T('toaster.14'), data.status.desc);
                    $totalModel.$timeout(function() {
                            $totalModel.$state.reload();
                        },
                        2000);
                });

        } else {
            toaster.pop("error", $totalModel.T.T('toaster.15'));
        }
    }

    //重新提交
	$scope.afresh = function () {
	    $scope.accountStateNull = true;
	}
	//审核进程
	$scope.eventFun = {
		setStep: function (index) {
			for (var i = 2; i <= index; i++) {
				$("#step" + i + "Li").addClass("blue").removeClass("gray");
				$("#step" + i + "Img").attr("src", "img/accountBB.png");
			}
			for (var i = index + 1; i <= 4; i++) {
				$("#step" + i + "Li").addClass("gray").removeClass("blue");
				$("#step" + i + "Img").attr("src", "img/accountGG.png");
			}
			$("#step" + (index + 1) + "Img").attr("src", "img/accountBG.png");
		}
	};
}]);

