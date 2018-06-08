//console.log = function () { };
//我推荐的会员
app.controller('TjListCtrl',
    ['$scope', '$ajaxPost', '$totalModel', '$wqtLocals','ngDialog','toaster',
		function ($scope, $ajaxPost, $totalModel, $wqtLocals, ngDialog, toaster) {

            $scope.noData = false;
            function getLevelDic() {
                var levelDic = [];
                var levellst = $totalModel.UserInfo.get().commonData.userLevelList;

                for (var i = 0; i < levellst.length; i++) {
                    var item = levellst[i];
                    levelDic[item.value] = item.text;
                }
                console.log(levelDic);
                return levelDic;
            }
            
            $scope.queryObj = {
                rows: 10,
                page: 1,
                queryData: { usercode: '', startTime: '', endTime: '' }
            };

            var grid = {
                pager: {
                    totalItems: 0, currentPage: 0, maxSize: 5,
                    itemTexts: function (type, page, current) {
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "末页";
                            case "page":
                                return page;
                        }
                    },
                    pageChanged: function () {
                        //  alert(this.currentPage);
                        console.log($scope.currentPage);
                        $scope.queryObj.page = $scope.currentPage;
                        grid.reflash();
                    }
                },
                rows: [],
                reflash: function () {
                    var levelDic = getLevelDic();
                    console.log(levelDic);
                    $scope.jiHuoTypeList = $totalModel.UserInfo.get().commonData.jiHuoTypeList;
                    $scope.taoCanList = $totalModel.UserInfo.get().commonData.taoCanList;
                    $ajaxPost.ajaxpost($totalModel,
                        $scope,
                        $totalModel.ServiceApi.MarketManage.TJlist,
                        $scope.queryObj,
                        function(data) {
                            console.log(data);
                            $scope.Grid.pager.totalItems = data.result.records;
                            $scope.Grid.pager.currentPage = data.result.page;
                            //没有数据
                            if (data.result.records == 0) {
                                $scope.noData = true;
                            } else {
                                $scope.noData = false;
                            }
                            var rows = data.result.rows;
                            for (var i = 0; i < rows.length; i++) {
                                var item = rows[i];
                                item['leveltext'] = levelDic[item.currentLevel];
                                console.log(item);
                            }
                            $scope.Grid.rows = rows;
                            //重置查询
                            //$scope.queryObj.queryData = {};
                        },
                        function() {

                        });
                }
            }

            $scope.Grid = grid;
            $scope.isClick = false;
            $scope.btnSuccess = false;
            $scope.rowId = 0;
            $scope.Grid.reflash();
			
            //追加子账户
			$scope.redeliveryChildren = function () {
				ngDialog.open({
					template: 'TjListCtrl_ngDialog.html',
					className: 'ngdialog-theme-plain',
					scope: $scope,
					controller: function ($scope) {
						

						var userInfo = $totalModel.UserInfo.get();

					    $scope.CommonData = {
							TJUserCode: userInfo.usercode,
							TaoCanList: userInfo.commonData.taoCanList
					    };
						$scope.regData = {
							TJUserCode: $scope.CommonData.TJUserCode
						};

					    $scope.Help = {
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
					        QueryUser: function (keword) {
					            if (keword.length >=2) {
					                $ajaxPost.ajaxpost($totalModel,
					                    $scope,
					                    $totalModel.ServiceApi.MarketManage.QueryUserCodeLike,
					                    { UserCode: keword },
					                    function (data) {
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
							Sumbit: function (isValid) {
								if (isValid) {
								    $scope.regData.JDUserCode = $scope.regData.JDUserCode.userCode;
								    $scope.btnSuccess = true;
					                $ajaxPost.ajaxpost($totalModel,
					                    $scope,
					                    $totalModel.ServiceApi.UserReg.regbyuesrft,
					                    $scope.regData,
										function (data) {
                                            toaster.pop('success', $totalModel.T.T('toaster.16'));
											$scope.closeThisDialog();
										    $scope.Grid.reflash();
					                    },
					                    function () {

					                    });
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
											{ tjuercode: $scope.CommonData.TJUserCode, jihuotcid: tcId },
					                        function (data) {
					                            help.ShowMsg = false;
					                            help.Msg = data.status.desc;
					                        },
					                        function () {
					                            help.ShowMsg = false;
                                                help.Msg = $totalModel.T.T('toaster.17');
					                        });
					                } else {
					                    help.ShowMsg = false;
                                        help.Msg = $totalModel.T.T('toaster.17');
					                }
					            }
					        }
					    };
						//自动获取
						$scope.Help.GenerateUserCode();
					    $scope.JdPostion = {
					        HasSelect: false,
							OnSelect: function (item, model) {
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
                                            this.List.push({ text: $totalModel.T.T('PAGE.scgl.register.left'), value: 2 });
					                    }
					                }
					                this.HasSelect = true;
					            } else {
					                this.List = [];
					                this.HasSelect = false;
					            }

					    
								
					        },
					        CheckPostion: function () {
					            $ajaxPost.ajaxpost($totalModel,
					                $scope,
					                $totalModel.ServiceApi.UserReg.checkjd,
					                { jduercode: $scope.regData.JDUserCode, position: $scope.regData.JDPosition },
					                function (data) {
					                    // $scope.isUsefulJDP = true;
					                },
					                function () {
					                    //  $scope.isUsefulJDP = false;
					                });
					        },
					        List: []
					    };
					}
				});
			}

			//复投
			$scope.redelivery = function() {
				ngDialog.open({
				    template: './tpl/ngDialog/HandleWindow.html',
				    className: 'ngdialog-theme-plain',
				    scope: $scope,
				    controller: function ($scope) {
						$scope.Confirm = function () {
						    $scope.btnSuccess = true;
						    $ajaxPost.ajaxpost($totalModel,
						        $scope,
						        $totalModel.ServiceApi.UserReg.ftbyuesr,
						        {},
								function (data) {
						            $scope.closeThisDialog();
						        },
						        function () {

						        });
				        }
				    }
				});
			}
        }]);

//会员升级
app.controller('UpgradeCtrl', ['$scope', '$ajaxPost', '$totalModel', 'ngDialog', function ($scope, $ajaxPost, $totalModel, ngDialog) {
   
    $scope.Upgrade = {},
        $scope.userLevel = $totalModel. UserInfo.get().commonData.userLevelList;
    console.log($scope.userLevel);
    $scope.btnSuccess = false;
    //获取数据
    $ajaxPost.ajaxpost($totalModel,
        $scope,
        $totalModel.ServiceApi.MemberCenter.UserInfo,
        {},
        function(data) {
            console.log(data);
            $scope.Upgrade = data.result;
            console.log($scope.Upgrade)
        });
    //前往充值中心
   
    //可选择的升级等级
    $ajaxPost.ajaxpost($totalModel,
        $scope,
        $totalModel.ServiceApi.MarketManage.UserCanChangeLevelList,
        {},
        function(data) {
            console.log(data);
            $scope.canChangeList = data.result;
            if (data.result.length == 0) {
                $scope.canChange = true;
                $totalModel.toaster.pop("warning", $totalModel.T.T('toaster.18'));
            }
        });
    //操作第一个弹出框
    $scope.dialog = '';
    $scope.dialogOpen = function (isValid) {
        var currentLevelId = $scope.Upgrade.currentLevelId;
        var levelId = $scope.Upgrade.level;
        if (levelId) {
            //获取充值金额
            $ajaxPost.ajaxpost($totalModel,
                $scope,
                $totalModel.ServiceApi.MemberCenter.UserChangeLevelTips,
                { LevelId: levelId },
                function(data) {
                    //console.log('升级', data);
                    $scope.dialog = ngDialog.open({
                        template: '../tpl/dialog_xxyl.html',
                        className: 'ngdialog-theme-default',
                        width: 800,
                        height: 400,
                        scope: $scope,
                        controller: function($scope) {
                            $scope.ylInfo = $scope.Upgrade;
                            //充值金额显示
                            $scope.ylInfo.gwwalletRest = data.result.gwwalletRest;
                            $scope.ylInfo.gwupdateLevelPrice = data.result.gwupdateLevelPrice;
                            $scope.ylInfo.gwwallet = data.result.gwwallet;
                            $scope.ylInfo.rpwalletRest = data.result.rpwalletRest;
                            $scope.ylInfo.rpupdateLevelPrice = data.result.rpupdateLevelPrice;
                            $scope.ylInfo.rpwallet = data.result.rpwallet;
                            console.log($scope.ylInfo);
                            //取消升级
                            $scope.Cancel = function() {
                                $scope.closeThisDialog();
                            }

                        },
                    });
                });


        } else {
            $totalModel.toaster.pop("error", $totalModel.T.T('toaster.19'));
        }

    }
    //操作第二个弹出框
    $scope.confirm = function (ylInfo) {
        $scope.ylInfo = ylInfo;
        $ajaxPost.ajaxpost($totalModel,
            $scope,
            $totalModel.ServiceApi.MemberCenter.ChangeMemberLevel,
            { LevelId: $scope.ylInfo.level },
            function(data) {
                $scope.dialog.close();
                $scope.dialog1 = ngDialog.open({
                    template: '../tpl/dialog_complete.html',
                    className: 'ngdialog-theme-default',
                    width: 500,
                    height: 325,
                    scope: $scope,
                    controller: function ($scope, $totalModel) {
                        //激活后跳到首页
                        $totalModel.$timeout(function() {
                                $scope.dialog1.close();
                                $totalModel.$state.go('app.dashboard-v1');
                            },
                            3000);
                    },
                });
            });
    }
    //操作第三个弹出框
    $scope.complete = function () {
        $scope.dialog1.close();
    }
   
}]);

//待激活列表
app.controller('sc_jihuolist',
    ['$scope', '$ajaxPost','$totalModel', 'ngDialog',
        function ($scope, $ajaxPost, $totalModel, ngDialog) {
            $scope.noData = false;
            $scope.btnSuccess = false;
            console.log($totalModel.UserInfo.get());
            function getLevelDic() {
                var levelDic = [];
                var levellst = $totalModel.UserInfo.get().commonData.userLevelList;
               
                for (var i = 0; i < levellst.length; i++) {
                    var item = levellst[i];
                    levelDic[item.value] = item.text;
                }
                console.log(levelDic);
                return levelDic;
            }
           
            $scope.queryObj = {
                rows: 10,
                page: 0,
                queryData: {
                    usercode: '',
                    startTime:'',
                    endTime: '',
                }
            };
            var indx = -1;
            var grid = {
                pager: {
                    totalItems: 0, currentPage: 0, maxSize: 5,
                    itemTexts: function (type, page, current) {
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "末页";
                            case "page":
                                return page;
                            }
                        },
                    pageChanged: function () {
                         //alert(this.currentPage);
                        //console.log($scope.currentPage);
                        $scope.queryObj.page = $scope.currentPage;
                        grid.reflash();
                    }
                },
                rows: [],
                reflash: function () {
                    var levelDic = getLevelDic();
                    console.log(levelDic);
                    $scope.jiHuoTypeList = $totalModel.UserInfo.get().commonData.jiHuoTypeList;
                    $scope.taoCanList = $totalModel.UserInfo.get().commonData.taoCanList;
                    $ajaxPost.ajaxpost($totalModel,
                        $scope,
                        $totalModel.ServiceApi.MarketManage.jhList,
                        $scope.queryObj,
                        function(data) {
                            console.log(data);
                            $scope.Grid.pager.totalItems = data.result.records;
                            $scope.Grid.pager.currentPage = data.result.page;
                            //没有数据
                            if (data.result.records == 0) {
                                $scope.noData = true;
                            } else {
                                $scope.noData = false;
                            }
                            var rows = data.result.rows;
                            for (var i = 0; i < rows.length; i++) {
                                var item = rows[i];
                                //console.log(item);
                                item['leveltext'] = levelDic[item.levelId];
                                //      console.log(item);
                            }
                            $scope.Grid.rows = rows;
                            $scope.sort = 'registerDate';
                            $scope.desc = 0;
                            //重置查询
                            //$scope.queryObj.queryData = {};
                            //实例化dialog，调用方法
                            $scope.dialog = '';
                            $scope.dialogOpen = function(JhData, index) {
                                indx = index;
                                //第一个dialog
                                $scope.dialog = ngDialog.open({
                                    template: '../tpl/dialog_jihuo.html',
                                    className: 'ngdialog-theme-default',
                                    width: 600,
                                    height: 400,
                                    scope: $scope,
                                    controller: function($scope) {
                                        $scope.jihuoList = JhData;
                                        //取消激活
                                        $scope.Cancel = function() {
                                            $scope.closeThisDialog();
                                        }
                                    }

                                });

                            };
                            $scope.confirm = function(ylInfo) {
                                // console.log('dialog1', $scope.dialog.id);
                                if (ylInfo.tcId) {
                                    //关闭第一个dialog
                                    $scope.dialog.close();
                                    //第二个dialog
                                    $scope.dialog1 = ngDialog.open({
                                        template: '../tpl/dialog_jihuoxxyl.html',
                                        className: 'ngdialog-theme-default',
                                        width: 550,
                                        height: 400,
                                        scope: $scope,
                                        controller: function($scope) {
                                            $scope.JhInfo = ylInfo;
                                            //取消激活

                                        }
                                    });
                                } else {
                                    $totalModel.toaster.pop("error", $totalModel.T.T('toaster.20'));
                                }

                            };
                            //确认激活
                            $scope.confirm1 = function(JhInfo) {
                                $scope.BtnSuccess = true;
                                $scope.JhInfos = JhInfo;
                                if (JhInfo.password) {
                                    $ajaxPost.ajaxpost($totalModel,
                                        $scope,
                                        $totalModel.ServiceApi.MarketManage.memberJiHuo,
                                        {
                                            TcId: $scope.JhInfos.tcId,
                                            UserId: $scope.JhInfos.id,
                                            JiHuoType: $scope.JhInfos.JiHuoType,
                                            L2Pass: $scope.JhInfos.password
                                        },
                                        function(data) {
                                            $scope.BtnSuccess = false;
                                            //关闭第二个dialog
                                            $scope.dialog1.close();
                                            //第三个dialog
                                            $scope.dialog2 = ngDialog.open({
                                                template: '../tpl/dialog_jhcomplete.html',
                                                className: 'ngdialog-theme-default',
                                                width: 600,
                                                height: 400,
                                                scope: $scope,
                                                controller: function($scope, $totalModel) {
                                                    console.log($('#jh'));
                                                    $($('.jh')[indx]).addClass('hide');
                                                    $($('.jhComplete')[indx]).removeClass('hide');
                                                    //激活完成后跳到首页
                                                    $totalModel.$timeout(function() {
                                                            $scope.dialog1.close();
                                                            $totalModel.$state.go('app.dashboard-v1');
                                                        },
                                                        1000);``
                                                }
                                            });
                                        });

                                } else {
                                    $scope.BtnSuccess = false;
                                    $totalModel.toaster.pop("error", $totalModel.T.T('toaster.21'));                                }


                            };
                            $scope.complete = function() {
                                //关闭第三个dialog
                                $scope.dialog2.close();

                            }
                        });
                }
            }
           
            $scope.Grid = grid;
            $scope.isClick = false;
            $scope.btnSuccess = false;
            $scope.rowId = 0;
            $scope.Grid.reflash();
            //language();
           
            //查询字段

        }]);


