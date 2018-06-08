app.controller('jydtCtrl',
    ['$scope', '$ajaxPost','$totalModel', '$wqtLocals', 'ngDialog',
        function ($scope, $ajaxPost, $totalModel, $wqtLocals, ngDialog) {
            var userInfo = $totalModel.UserInfo.get();
            //标签高亮显示
            $('.chartcontent .radio').on('click', function () {
                $(this).addClass('chartactive');
                $(this).siblings().removeClass('chartactive');
            })
            //股份价格变化曲线
            var chart2 = echarts.init($('#chart2')[0]);
			chart2.showLoading();
            var hall = {
                fresh: function () {
                    $ajaxPost.ajaxpost($totalModel,
                        $scope,
                        $totalModel.ServiceApi.Transaction.jfg_indexdate,
                        {},
						function (data) {
                            $scope.buyInfo = data.result.tradeInfo;
                            $scope.sellInfo = data.result.tradeInfo;
                            $scope.JFG_Buy = {};
                            $scope.JFG_Sell = {};
                            chart2.hideLoading();
                            var result = {
                                klinechart:
                                {
                                    values: data.result.day.dataLine,
                                    bval: 1.68, //上次拆分倍数
                                    nval: 0.36, //今日股价
                                    count: 2 //拆分次数
                                }
                            }
                            // 指定图表的配置项和数据
                            var xLine = data.result.day.xLine;
                            //var yLine = [0, 0.5, 1.0, 1.5, 2, 2.5, 3.0, 3.5, 4.0];
                            // 折线点数据
                            var dataLine = result.klinechart.values;
                            var option2 = {
                                backgroundColor: '#fff',
                                tooltip: {
                                    trigger: 'axis'
                                },
                                grid: {
                                    left: '3%',
                                    right: '3%',
                                    top: '3%',
                                    bottom: '3%',
                                    containLabel: true
                                },
                                xAxis: {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: xLine,
                                    axisLine: {
                                        lineStyle: {
                                            color: '#707273'
                                        }
                                    }
                                },
                                yAxis: {
                                    type: 'value',
                                    min: 0,
                                    max: 4,
                                    interval: 0.5,
                                    axisLine: {
                                        lineStyle: {
                                            color: '#707273'
                                        }
                                    }
                                },
                                series: [
                                    {
                                        type: 'line',
                                        stack: '总量',
                                        data: dataLine,
                                        areaStyle: { normal: {} },
                                        itemStyle: {
                                            normal: {
												color: '#00FF00',
												borderWidth: 8,
                                                lineStyle: {
													color: '#27bdff'
                                                }
                                            }
										},
										areaStyle: {
											normal: {
												color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
													offset: 0,
													color: '#f4fcff'
												}, {
													offset: 1,
													color: '#bfeaff'
												}])
											}
										}
                                    }
                                ]
							}



                            // 使用刚指定的配置项和数据显示图表。
                            chart2.setOption(option2);
                            /*股份价格变化折线E*/
                            //图表响应式
                            window.onresize = function() {
                                chart2.resize();
                            }
                            $scope.changeDay = function() {
                                option2.xAxis.data = data.result.day.xLine;
                                option2.series[0].data = data.result.day.dataLine;
                                chart2.setOption(option2);
                            }
                            $scope.changeWeek = function() {
                                console.log(data.result)
                                option2.xAxis.data = data.result.week.xLine;
                                option2.series[0].data = data.result.week.dataLine;
                                chart2.setOption(option2);
                            }
                            $scope.changeMonth = function() {

                                option2.xAxis.data = data.result.month.xLine;
                                option2.series[0].data = data.result.month.dataLine;
                                chart2.setOption(option2);
                            }
						}, function () {
							
						});
                }
            };
            hall.fresh();
            //认购窗口
            $scope.btnSuccess = false;
            $scope.sumbitBuy = function (JFG_Buy) {
                console.log(JFG_Buy);
                if (JFG_Buy.Count && JFG_Buy.L2pwd){
                    var rengou = JFG_Buy;
                    ngDialog.open({
                        template: 'transaction_jfg_jydt.html',
                        classname: 'ngdialog-theme-plain',
                        controller: function ($scope) {
                            $scope.affirm = JFG_Buy;
                            $scope.affirm.text = "购买";
                            $scope.confirm = function () {
                                $scope.btnSuccess = true;
                                $ajaxPost.ajaxpost($totalModel,
                                    $scope,
                                    $totalModel.ServiceApi.Transaction.CreateBuyRecord,
                                    {
                                        Price: $scope.affirm.price,
                                        Count: $scope.affirm.count,
                                        L2pwd: $scope.affirm.L2pwd
                                    },
                                    function(data) {
                                        console.log(data);
                                        $scope.closeThisDialog();
                                        $scope.btnSuccess = false;
                                        $totalModel.toaster.pop('success', '购买成功', '');
                                        $totalModel.$state.go('app.transaction_jfggmxq');
                                    },
                                    function() {
                                       $scope.btnSuccess = false;
                                        $totalModel.toaster.pop('warning', '购买失败', '');
                                    });

                            }
                            $scope.cancel = function () {
                                $scope.closeThisDialog(); //关闭弹窗

                            }
                        }

                    });
                } else {
                    $totalModel.toaster.pop('error', '购买信息必须完整');
                }

            }
            $scope.sumbitSell = function (JFG_Sell) {
                if (JFG_Sell.count  && JFG_Sell.L2pwd) {
                    ngDialog.open({
                        template: 'transaction_jfg_jydt.html',
                        classname: 'ngdialog-theme-plain',
                        controller: function ($scope) {
                            $scope.affirm = JFG_Sell;
                            $scope.affirm.text = "出售";
                            $scope.confirm = function () {
                                $scope.btnSuccess = true;
                                $ajaxPost.ajaxpost($totalModel,
                                    $scope,
                                    $totalModel.ServiceApi.Transaction.CreateSellRecord,
                                    { Count: $scope.affirm.count, L2pwd: $scope.affirm.L2pwd },
                                    function(data) {
                                        $scope.closeThisDialog();
                                        $scope.btnSuccess = false;
                                        $totalModel.toaster.pop('success', '出售成功');
                                        $totalModel.$state.go('app.transaction_jfgcsxq');
                                    },
                                    function() {
                                        $scope.btnSuccess = false;
                                        $totalModel.toaster.pop('warning', '出售失败');
                                    });

                            }
                            $scope.cancel = function () {
                                $scope.closeThisDialog(); //关闭弹窗
                            }
                        }
                    });
                } else {
                    $totalModel.toaster.pop('error', '出售信息必须完整');
                }
            }
		}]);

app.controller('jydtCtrlLsit',
    ['$scope', '$ajaxPost', '$totalModel',
        function ($scope, $ajaxPost, $totalModel) {
            var UserInfo = $totalModel.UserInfo.get();
			$scope.queryObj = {
				rows: 10,
				page: 1,
				queryData: {
					startTime: '', Status: ''
				}
			};
			$scope.totalItems = 0;
			$scope.currentPage = 0;
			$scope.GetGrid = function () {
                $ajaxPost.ajaxpost($totalModel,
			        $scope,
			        $totalModel.ServiceApi.Transaction.GuadanBuyRecord,
			        $scope.queryObj,
			        function(data) {
			            console.log(data);
			            $scope.totalItems = data.result.records;
			            $scope.currentPage = data.result.page;
			            $scope.rows = data.result.rows;
			            $scope.btnSuccess = false;
			            // 根据状态置灰按钮 初始化dom元素，ng-init

			            //没有数据
			            if (data.result.records == 0) {
			                $scope.noData = true;
			            } else {
			                $scope.noData = false;
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

			$scope.buyRecord = function (Id) {

			    $totalModel.$state.go('app.transaction_jfggmjl', { id: Id });
			}
		}]);