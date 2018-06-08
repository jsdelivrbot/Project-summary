
//console.log = function () { };
/* Controllers */
// regiser controller
app.controller('registerController',
    [
        '$scope', '$ajaxPost', '$totalModel','ngDialog',
        function ($scope, $ajaxPost, $totalModel, ngDialog) {

            $scope.regData = {};
            $scope.select = {};
            $scope.buttonText = $totalModel.T.T('PAGE.dialog.validate.0');
            var userInfo = $totalModel.UserInfo.get();

            $scope.CommonData = {
                TaoCanList: userInfo.commonData.taoCanList,
                SecretSecurityList: userInfo.commonData.secretSecurityList
            };
            console.log($scope.CommonData.TaoCanList);
            $scope.select.TJUser = { userCode: userInfo.usercode };
            console.log($scope.CommonData.SecretSecurityList);
            //多语言处理
            //密码强度
            var arr = ["", "低", "中", "高"];;
          
            for (var i=0;i<arr.length;i++) {
                arr[i] = $totalModel.T.T("PAGE.scgl.register.psdStrength." + i);
            };
            for (var i = 0; i < $scope.CommonData.SecretSecurityList.length; i++) {
                
                $scope.CommonData.SecretSecurityList[i].text = $totalModel.T.T("PAGE.scgl.register.SecretSecurityList." + $scope.CommonData.SecretSecurityList[i].value);
            }
           //密保问题

            $scope.Help = {
                Pwd: {
                    StrengthShowL1: false,
                    StrengthShowL2: false,
                    Psd: function (id) { //密码强度
                        if (id === 1) {
                            $scope.Help.Pwd.StrengthShowL1 = true;
                        }
                        if (id === 2) {
                            $scope.Help.Pwd.StrengthShowL2 = true;
                        }
                    }
                },
                GenerateUserCode: function () {
                    $ajaxPost.ajaxpost($totalModel,
                        $scope,
                        $totalModel.ServiceApi.UserReg.auto,
                        {},
                        function (data) {
                            console.log('auto');
                            console.log(data);
                            $scope.regData.UserCode = data.result.userCode;
                        },
                        function () {

                        });
                },
                GetMobileValidation: function () {
                    console.log($scope.regData.Mobile);
                    var InterValObj;
                    var count = 60;
                    var curCount;
                    if ($scope.regData.Mobile !==undefined) {
                        $totalModel.$http.get($totalModel.ServiceApi.UserReg.GetSecurityCode +
                                '?Mobile=' +
                                $scope.regData.Mobile +
                                '&Type=0')
                            .then(function(data) {
                                console.log(data);
                                    if (data.data.type == 1) {
                                        ngDialog.open({
                                            template: '../tpl/dialog_mobilevalidate.html',
                                            className: 'ngdialog-theme-plain',
                                            scope: $scope,
                                            controller: function($scope) {
                                                console.log($scope.regData.Mobile);
                                                curCount = count;
                                                $scope.buttonText =
                                                    $totalModel.T.T('PAGE.dialog.validate.2') +
                                                    curCount +
                                                    $totalModel.T.T('PAGE.dialog.validate.3');
                                                InterValObj =
                                                    $totalModel.$interval(SetRemainTime, 1000); //启动计时器，1秒执行一次  

                                                //timer处理函数  
                                                function SetRemainTime() {
                                                    if (curCount == 0) {
                                                        window.clearInterval(InterValObj); //停止计时器  
                                                        $scope.buttonText = $totalModel.T.T('PAGE.dialog.validate.1');
                                                        $scope.hasgetCode = false;

                                                    } else {
                                                        curCount--;
                                                        $scope.hasgetCode = true;
                                                        $scope.buttonText =
                                                            $totalModel.T.T('PAGE.dialog.validate.2') +
                                                            curCount +
                                                            $totalModel.T.T('PAGE.dialog.validate.3');
                                                    }
                                                }

                                                $scope.reGetValidateCode = function() {
                                                    console.log(curCount);
                                                    curCount = count;
                                                    $totalModel.$http
                                                        .get($totalModel.ServiceApi.UserReg.GetSecurityCode +
                                                            '?Mobile=' +
                                                            $scope.regData.Mobile +
                                                            '&Type=0')
                                                        .then(function(data) {
                                                            console.log(data);
                                                            $scope.hasgetCode = true;
                                                            SetRemainTime();
                                                        });
                                                };
                                                $scope.Confirm = function() {
                                                    $totalModel.$http
                                                        .get($totalModel.ServiceApi.UserReg.CheckVerifCode +
                                                            '?Mobile=' +
                                                            $scope.regData.Mobile +
                                                            '&Code=' +
                                                            $scope.validateCode +
                                                            '&Type=0')
                                                        .then(function(response) {
                                                                console.log(response);
                                                                if (response.data.resultdata == true) {
                                                                    $scope.closeThisDialog();
                                                                    $totalModel.toaster.pop("success",
                                                                        response.data.message);
                                                                    $scope.regData.ValidCode = $scope.validateCode;

                                                                } else {
                                                                    $scope.regData.ValidCode = $scope.validateCode;
                                                                    $totalModel.toaster.pop("error",
                                                                        response.data.message);
                                                                }
                                                            },
                                                            function(x) {

                                                            });

                                                };


                                            }
                                        });
                                    } else {
                                        $totalModel.toaster.pop("error", data.data.message);
                                    }
                                },
                            function(x) {

                            });
                    } else {
                        $totalModel.toaster.pop("error", "请输入手机号码");
                    }
                  
                  
                },
                QueryUser: function (keword) {
                    
                    if (keword.length >= 2) {
                        $ajaxPost.ajaxpost($totalModel,
                            $scope,
                            $totalModel.ServiceApi.MarketManage.QueryUserCodeLike,
                            { UserCode: keword },
                            function (data) {
                                console.log('queryData',data);
                                if (data.result && data.result.length > 0) {
                                    $scope.userList = data.result;
                                } else {
                                    $scope.userList = [];
                                }
                            },
                            function () {

                            });
                    }
                },
                QueryYSUser: function (keword) {
                    if (keword.length >= 2) {
                        $ajaxPost.ajaxpost($totalModel,
                            $scope,
                            $totalModel.ServiceApi.MarketManage.QueryYSUserList,
                            { UserCode: keword},
                            function (data) {
                                console.log(data.result);

                                if (data.result && data.result.length > 0) {
                                    $scope.userysList = data.result;
                                } else {
                                    $scope.userysList = [];
                                }
                            },
                            function () {

                            });
                    }
                },
                Sumbit: function (isValid) {
                    //select
                    $scope.regData.JDUserCode = $scope.select.JDUser.userCode;
                    $scope.regData.TJUserCode = $scope.select.TJUser.userCode;
                    $scope.regData.ReportCenterUserCode = $scope.select.ReportCenter.userCode;
                    //alert(isValid);
                    if (isValid) {
                        
                        //$scope.userInfo=UserInfo.get().commonData
                        console.log($scope.regData.JDUserCode);
                        $ajaxPost.ajaxpost($totalModel,
                            $scope,
                            $totalModel.ServiceApi.UserReg.reg,
                            $scope.regData,
                            function (data) {
                                //$state.go('app.scgl.activation.index');
                                $totalModel.$state.go('app.scgl.directpush.index');
                                //console.log("注册成功！");
                            },
                            function () {

                            });
                    }
                },
                CheckPwdStrong: {//密码强度验证
                    strengthL1: function () {
                        var regEx = /^((?!\d+$)(?![a-zA-Z]+$)[a-aA-Z\d@#$%^&_+].{7,11})/;
                        //console.log(arr);
                        var level = 0;
                        var strengthLevel = document.getElementById("strengthLevel");
                        if (!$scope.regData.L1Pwd) {
                            $scope.level1 = "";
                            strengthLevel.className = "strengthLv0";
                        } else {


                            if (/[a-zA-Z]/.test($scope.regData.L1Pwd)) {
                                //console.log(level)
                                ++level;
                            }
                            if (/[0-9]/.test($scope.regData.L1Pwd)) {
                                //console.log(level)
                                ++level;
                            }
                            if (/[a-aA-Z\d@#$%^&_+].{7,11}/.test($scope.regData.L1Pwd)) {
                                // console.log(level)
                                ++level;
                            }
                            $scope.level1 = arr[level];

                            strengthLevel.className = "strengthLv" + level;
                        }
                        return $scope.level1;
                    },
                    strengthL2: function () {
                        var regEx = /^((?!\d+$)(?![a-zA-Z]+$)[a-aA-Z\d@#$%^&_+].{7,11})/;
                        //var arr = ["", "低", "中", "高"]
                        //console.log(arr);
                        var level = 0;
                        var strengthLevel = document.getElementById("strengthLeve2");
                        if (!$scope.regData.L2Pwd) {
                            $scope.level2 = "";
                            strengthLevel.className = "strengthLv0";
                        } else {


                            if (/[a-zA-Z]/.test($scope.regData.L2Pwd)) {
                                level++;
                            }
                            if (/[0-9]/.test($scope.regData.L2Pwd)) {
                                level++;
                            }
                            if (/[a-aA-Z\d@#$%^&_+].{7,11}/.test($scope.regData.L2Pwd)) {
                                level++;
                            }
                            $scope.level2 = arr[level];
                            strengthLevel.className = "strengthLv" + level;
                        }
                        return $scope.level2;
                    }
                },
                RegLevel: {
                    Msg: "",
                    ShowMsg: false,
                    CheckUserLevel: function (tcId) {
                        
                        var help = $scope.Help.RegLevel;
                        if (tcId != null) {
                            $ajaxPost.ajaxpost($totalModel,
                                $scope,
                                $totalModel.ServiceApi.UserReg.checktj,
                                { tjuercode: $scope.select.TJUser.userCode, jihuotcid: tcId },
                                function (data) {
                                    help.ShowMsg = false;
                                    help.Msg = data.status.desc;
                                },
                                function () {
                                    help.ShowMsg = false;
                                    help.Msg = "请选择会员等级";
                                });
                        } else {
                            help.ShowMsg = false;
                            help.Msg = "请选择会员等级！";
                        }
                    }
                }
            };
            $scope.Help.GenerateUserCode();

            $scope.JdPostion = {
                HasSelect: false,
                OnSelect: function (item, model) {
                    console.log('selelct', item, model);
       
                    $scope.regData.JDPosition = '';
                    if (model.jDPosition.length > 0) {
                        this.List = [];
                        console.log(model.jDPosition);
                        for (var i = 0; i < model.jDPosition.length; i++) {
                            var obj = model.jDPosition[i];
                            if (obj.value === 1) {
                                this.List.push({ text: $totalModel.T.T('PAGE.scgl.register.left'), value: 1 });
                            }
                            if (obj.value === 2) {
                                this.List.push({ text: $totalModel.T.T('PAGE.scgl.register.right'), value: 2 });
                            }
                        }
                        this.HasSelect = true;
                    } else {
                        this.List = [];
                        this.HasSelect = false;
                    } 
                   // $scope.regData.JDUserCode = model.userCode;
                    //$("#AZWZ").val('');
                },
                CheckPostion: function () {
                    
                    $ajaxPost.ajaxpost($totalModel,
                        $scope,
                        $totalModel.ServiceApi.UserReg.checkjd,
                        { jduercode: $scope.select.JDUser.userCode, position: $scope.regData.JDPosition },
                        function (data) {
                            // $scope.isUsefulJDP = true;
                        },
                        function () {
                            //  $scope.isUsefulJDP = false;
                        });
                },
                List: []
            };
            $scope.TjPostion = {
                OnSelect: function(item, model) {

                    $scope.regData.TJUserCode = model.userCode;
                }
            };
            $scope.someFunction = function (item, model) {

            }
        }
    ]);