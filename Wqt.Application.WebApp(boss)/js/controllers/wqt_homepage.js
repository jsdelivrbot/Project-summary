'use strict';
//console.log = function () { };
/* Controllers */
app
  .controller('homePageCtrl',
    ['$scope', '$ajaxPost', '$totalModel',
        function ($scope, $ajaxPost, $totalModel) {
      
            var userInfo = $totalModel.UserInfo.get();
        console.log(userInfo);
      $scope.isNews = userInfo.isNews;
      $scope.NewsClose = function () {
        $totalModel.UserInfo.set2({
          isNews: true
        });
        $('.TantiaoNews').addClass('hide');
      };
      //var moduleData = $totalModel.UserInfo.get().moduleData;

      //      for (var i = 0; i < moduleData.length; i++) {
      //          moduleData[i].name = $totalModel.T.T('PAGE.nav.' + moduleData[i].id);
      //      }
      //      console.log('moduleData', moduleData);
      //新闻公告
      $scope.notice = userInfo.notic;
      $scope.stop = function () {
        event.stopPropagation();
      }
      $scope.prizeSub = function () {
      }
     
      //标签高亮显示
      $('.chartcontent .radio').on('click', function () {
          console.log($(this));
          $(this).addClass('chartactive');
          $(this).siblings().removeClass('chartactive');
      })
      var chart1 = echarts.init($('#chart1')[0]);
      var chart2 = echarts.init($('#chart2')[0]);
      chart1.showLoading();
      chart2.showLoading();
      var hall = {
           //每日奖金
          chart1: function () {
              $ajaxPost.ajaxpost($totalModel,
                  $scope,
                  $totalModel.ServiceApi.Protal.home,
                  {},
                  function (data) {
                      console.log(data);
                      //更改值渲染页面
                      $scope.isNav.show = true;
                      $scope.MemberInfo = {}
                      $scope.MemberInfo.userCode = userInfo.usercode;
                      $scope.MemberInfo.level = userInfo.userlevel;
                      $scope.MemberInfo.name = userInfo.nickname;
                      $scope.MemberInfo.total = userInfo.teamCount;
                      $scope.MemberInfo.TjCode = userInfo.tJUserCode;
                      // $scope.MemberInfo.nickname = userInfo.nickname;
                      $scope.userLevel = userInfo.commonData['userLevelList'];



                      chart1.hideLoading();
                      //返回数据
                      var result = data.result;
                      console.log(result);
                      //首页控制变量
                      $scope.home = {};
                      $.extend($scope.home, result);
                      //多语言处理
                      console.log('wallet',$scope.home.wallet);
                      for (var i = 0; i < $scope.home.wallet.length; i++) {
                          $scope.home.wallet[0].name = $totalModel.T.T('homePage.wallet.' + $scope.home.wallet[0].id);
                          $scope.home.wallet[1].name = $totalModel.T.T('homePage.wallet.' + $scope.home.wallet[1].id);
                          $scope.home.wallet[2].name = $totalModel.T.T('homePage.wallet.' + $scope.home.wallet[2].id);
                          $scope.home.wallet[3].name = $totalModel.T.T('homePage.wallet.' + $scope.home.wallet[3].id);
                          $scope.home.wallet[4].name = $totalModel.T.T('homePage.wallet.' + $scope.home.wallet[4].id);
                          $scope.home.wallet[5].name = $totalModel.T.T('homePage.wallet.' + $scope.home.wallet[5].id);
                      
                      }
                      console.log(243342,$scope.home.wallet);
              
                      //获取折线图数组
                      function getPrizeX(data, prize) {
                          data[0].name = $totalModel.T.T('homePage.Straight');
                          data[1].name = $totalModel.T.T('homePage.award');
                          data[2].name = $totalModel.T.T('homePage.Management');
                          data[3].name = $totalModel.T.T('homePage.Point');
                          data[4].name = $totalModel.T.T('homePage.Declaration');
                          data[5].name = $totalModel.T.T('homePage.static');
                        
                          prize.x = [];
                          for (var i = 0; i < data.length; i++) {
                              
                              prize.x.push(data[i].name);
                          }
                      }
                      function getPrizeY(data, prize) {
                          prize.y = [];
                          for (var i = 0; i < data.length; i++) {
                              prize.y.push(data[i].value);
                          }
                      }

                      /*每日奖金折线S*/
                      var prize = {};
                      getPrizeX(result.dayprize, prize);
                      getPrizeY(result.dayprize, prize);

                      var option1 = {
                          color: ['#3398DB'],
                          tooltip: {
                              trigger: 'axis',
                              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                              }
                          },
                          grid: {
                              left: '3%',
                              right: '3%',
                              top: '3%',
                              bottom: '3%',
                              containLabel: true
                          },
                          xAxis: [
                              {
                                  type: 'category',
                                  data: prize.x,
                                  axisTick: {
                                      alignWithLabel: true
                                  },
                                  axisLine: {
                                      lineStyle: {
                                          color: 'black'
                                      }
                                  }
                              }
                          ],
                          yAxis: [
                              {
                                  type: 'value',

                                  axisLine: {
                                      lineStyle: {
                                          color: 'black'
                                      }
                                  }
                              }
                          ],
                          series: [
                              {
                                  name: '奖金',
                                  type: 'bar',
                                  barWidth: '30%',
                                  data: prize.y,
                                  itemStyle: {
                                      //通常情况下：
                                      normal: {
                                          color: function (params) {
                                              var colorList = [
                                                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                      offset: 0,
                                                      color: '#77aef7'
                                                  }, {
                                                      offset: 1,
                                                      color: '#d3e5fd'
                                                  }]),
                                                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                      offset: 0,
                                                      color: '#9faaff'
                                                  }, {
                                                      offset: 1,
                                                      color: '#dfe3ff'
                                                  }]),
                                                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                      offset: 0,
                                                      color: '#77aef7'
                                                  }, {
                                                      offset: 1,
                                                      color: '#d3e5fd'
                                                  }]),
                                                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                      offset: 0,
                                                      color: '#9faaff'
                                                  }, {
                                                      offset: 1,
                                                      color: '#dfe3ff'
                                                  }]),
                                                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                      offset: 0,
                                                      color: '#77aef7'
                                                  }, {
                                                      offset: 1,
                                                      color: '#d3e5fd'
                                                      }]),
                                                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                      offset: 0,
                                                      color: '#77aef7'
                                                  }, {
                                                      offset: 1,
                                                      color: '#d3e5fd'
                                                  }])


                                              ];
                                              return colorList[params.dataIndex];
                                          }
                                      }
                                      ,
                                      //鼠标悬停时：
                                      emphasis: {
                                          color: new echarts.graphic.LinearGradient(
                                              0, 0, 0, 1,
                                              [
                                                  { offset: 0, color: '#2378f7' },
                                                  { offset: 0.7, color: '#2378f7' },
                                                  { offset: 1, color: '#83bff6' }
                                              ]
                                          )
                                      }
                                  }
                              }
                          ]
                      };
                      chart1.setOption(option1);

                      /*每日奖金折线E*/
                      $scope.changeDay = function () {

                          getPrizeX(result.dayprize, prize);
                          getPrizeY(result.dayprize, prize);
                          option1.xAxis[0].data = prize.x;
                          option1.series[0].data = prize.y;
                          console.log(option1);

                          chart1.setOption(option1);
                      }
                      $scope.changeWeek = function () {

                          getPrizeX(result.weekprize, prize);
                          getPrizeY(result.weekprize, prize);
                          option1.xAxis[0].data = prize.x;
                          option1.series[0].data = prize.y;
                          console.log(option1);
                          chart1.setOption(option1);
                      }
                      $scope.changeMonth = function () {

                          getPrizeX(result.monthprize, prize);
                          getPrizeY(result.monthprize, prize);
                          option1.xAxis[0].data = prize.x;
                          option1.series[0].data = prize.y;
                          console.log(option1);
                          chart1.setOption(option1);
                      }
                  });
          },
           //股价折线图
          chart2: function () {
              $ajaxPost.ajaxpost($totalModel,
                  $scope,
                  $totalModel.ServiceApi.Transaction.jfg_indexdate,
                  {},
                  function (data) {
                      console.log(data);
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
                                      color: 'black'
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
                                      color: 'black'
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
                                          color: '#72abf7',
                                          borderWidth: 8,
                                          lineStyle: {
                                              color: '#27bdff',
                                              width: 4
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

                      $scope.changeDay2 = function () {
                          option2.xAxis.data = data.result.day.xLine;
                          option2.series[0].data = data.result.day.dataLine;
                          chart2.setOption(option2);
                      }

                      $scope.changeWeek2 = function () {
                          option2.xAxis.data = data.result.week.xLine;
                          option2.series[0].data = data.result.week.dataLine;
                          chart2.setOption(option2);
                      }
                      $scope.changeMonth2 = function () {
                          option2.xAxis.data = data.result.month.xLine;
                          option2.series[0].data = data.result.month.dataLine;
                          chart2.setOption(option2);
                      }
                  });
          }
      }

      hall.chart1();
	  hall.chart2();
      //图表响应式
      window.onresize = function() {
          chart1.resize();
          chart2.resize();
      }

    }]);
