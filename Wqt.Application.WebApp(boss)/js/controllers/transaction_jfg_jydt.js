console.log = function () { };
app.controller('transaction_jfg_jydt',
	['$scope', '$http', '$state', '$wqtHttp', 'UserInfo', 'ServiceApi', '$wqtLocals', '$interval','ngDialog','toaster',
		function ($scope, $http, $state, $wqtHttp, UserInfo, ServiceApi, $wqtLocals, $interval, ngDialog, toaster) {
			var userInfo = UserInfo.get();
			//股份价格变化曲线
			var chart2 = echarts.init($('#chart2')[0]);
            chart2.showLoading();
            var hall = {
                fresh: function () {
                    $wqtHttp.post({
                        url: ServiceApi.Transaction.jfg_indexdate,
                        data: {},
                        success: function (data) {
                            console.log(data);
                            if (data.status.code != 0) {
                                toaster.pop("error", "系统错误", response.status.desc);
                            } else {
                                console.log(data);
                                $scope.buyInfo = data.result.tradeInfo;
                                $scope.sellInfo = data.result.tradeInfo;
                                $scope.JFG_Buy = {};
                                $scope.JFG_Sell = {};
                                chart2.hideLoading();
                                var result = {
                                    klinechart:
                                    {
                                        values: data.result.day.dataLine,
                                        bval: 1.68,//上次拆分倍数
                                        nval: 0.36,//今日股价
                                        count: 2//拆分次数
                                    }
                                }
                                // 指定图表的配置项和数据
                                var xLine = data.result.day.xLine;
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
                                            itemStyle: {
                                                normal: {
                                                    color: '#ccc',
                                                    lineStyle: {
                                                        color: '#bcc6c9'
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                }
                                // 使用刚指定的配置项和数据显示图表。
                                chart2.setOption(option2);
                                /*股份价格变化折线E*/
                                //图表响应式
                                window.onresize = function () {
                                    chart2.resize();
                                }
                                $scope.changeDay = function () {
                                    option2.xAxis.data = data.result.day.xLine;
                                    option2.series[0].data = data.result.day.dataLine;
                                    chart2.setOption(option2);
                                }
                                $scope.changeWeek = function () {
                                    console.log(data.result)
                                    option2.xAxis.data = data.result.week.xLine;
                                    option2.series[0].data = data.result.week.dataLine;
                                    chart2.setOption(option2);
                                }
                                $scope.changeMonth = function () {
                                    option2.xAxis.data = data.result.month.xLine;
                                    option2.series[0].data = data.result.month.dataLine;
                                    chart2.setOption(option2);
                                }

                            }
                        }
                    });
                }
            };
            hall.fresh();
			//认购窗口
            $scope.sumbitBuy = function (JFG_Buy) {
                console.log(JFG_Buy);
                var rengou = JFG_Buy;
                ngDialog.open({
                    template: 'transaction_jfg_jydt.html',
                    classname: 'ngdialog-theme-plain',
                    controller: function ($scope) {
                        $scope.affirm = JFG_Buy;
                        $scope.affirm.text = "购买";
                        $scope.confirm = function () {
                            $wqtHttp.post({
                                url: ServiceApi.Transaction.CreateBuyRecord,
                                data: $scope.affirm,
                                success: function (data) {
                                    console.log(data);
                                    if (data.status.code != 0) {
                                        toaster.pop("error", data.status.desc);
                                    } else {
                                        console.log(data);
                                        $scope.closeThisDialog();
                                        
                                        toaster.pop('success', '购买成功', '');
                                        hall.fresh();
                                        
                                    }
                                },
                                error: function () {
                                    toaster.pop('warning', '购买失败', '');
                                }
                            })
                        }
                        $scope.cancel = function () {
                            $scope.closeThisDialog(); //关闭弹窗
                            
                        }
                    }

                });
                
				
            }
            $scope.sumbitSell = function (JFG_Sell) {
                ngDialog.open({
                    template: 'transaction_jfg_jydt.html',
                    classname: 'ngdialog-theme-plain',
                    controller: function ($scope) {
                        $scope.affirm = JFG_Sell;
                        $scope.affirm.text = "出售";
                        $scope.confirm = function () {
                            $wqtHttp.post({
                                url: ServiceApi.Transaction.CreateSellRecord,
                                data: $scope.affirm,
                                success: function (data) {
                                    console.log(data);
                                    if (data.status.code != 0) {
                                        toaster.pop("error", data.status.desc);
                                    } else {
                                        console.log(data);
                                        $scope.closeThisDialog();
                                        toaster.pop('success', '出售成功');
                                        hall.fresh();
                                    }
                                },
                                error: function () {
                                    toaster.pop('warning', '出售失败');
                                }
                            })
                        }
                        $scope.cancel = function () {
                            $scope.closeThisDialog(); //关闭弹窗

                        }
                    }

                });

            }

            
		}]);