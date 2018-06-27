<template>
    <div class="container home">
      <div class="fullwidth  home_part1 home-com-fr marTop330">
        <div class="left">
          <div class="me-info">
            <div class="con-title-fr">
              <div class="sub-fr"></div>
              <span class="con-title">
                {{'我的信息' | translate}}
                </span>
            </div>
            <div class="detail">
              <div class="level">
                <img :src="'/static/img/c'+ userInfo.LevelId +'.png'" class="lev-icon"/>
              </div>
              <div class="desc">
                <div class="minfo-item">
                  <div class="left">
                    {{'会员编号'| translate}}
                  </div>
                  <div class="right" v-text="userInfo.UserCode">
                    
                  </div>
                </div>
                <div class="minfo-item">
                  <div class="left">
                    
                    {{'姓名'| translate}}
                  </div>
                  <div class="right"  v-text="userInfo.NickName">
                  </div>
                </div>
                <div class="minfo-item">
                  <div class="left">
                    
                    {{'消费套餐'| translate}}
                  </div>
                  <div class="right" >
                    {{userInfo.LevelId | LevelType}}
                  </div>
                </div>
              </div>

            </div>
            <div class="com-opt opt">
              <div class="opt-item-fr">
                <router-link to="/profile" :class="'opt-item'">
                  {{'详细资料'| translate}}
                </router-link>
                <router-link to="/profile/edit" :class="'opt-item'">
                  {{'修改资料'| translate}}
                </router-link>
                <router-link to="/profile/changepwd" :class="'opt-item'">
                  {{'修改密码'| translate}}
                </router-link>
                <router-link to="/market/upgrade" :class="'opt-item'">
                  {{'级别升级'| translate}}
                </router-link>
              </div>
            </div>
          </div>
          <div class="me-divis hidden-xs">
            <div class="bg-div">
            </div>
            <img :src="'/static/img/home_divis.png'"/>
          </div>

        </div>
        <div class="right">
          <div class="team">
            <div class="con-title-fr">
              <div class="sub-fr"></div>
              <span class="con-title">
                
                {{'我的团队'| translate}}
                </span>
            </div>
            <div class="detail">
              <div class="sub">
                <div class="sub-item third">
                  <span class="title">
                    
                    {{'子账号数'| translate}}
                    </span>
                  <span class="value" v-text="userInfo.ZiUserCount"></span>
                </div>
                <div class="sub-item third">
                  <span class="title">
                    
                    {{'分享会员数'| translate}}
                    </span>
                  <span class="value" v-text="userInfo.TJCount ? userInfo.TJCount: '--'"></span>
                </div>
                <div class="sub-item third">
                  <span class="title">
                    
                    {{'团队总业绩'| translate}}
                    </span>
                  <span class="value" v-text="userInfo.TJTeamGrade ? userInfo.TJTeamGrade: '--'"></span>
                </div>
              </div>
              <div class="com-opt opt">
                <div class="opt-item-fr">
                  <router-link to="/profile/associate" :class="'opt-item'">
                    <span>
                    {{'绑定子账号'| translate}}
                    </span>
                  </router-link>
                  <router-link to="/market/share" :class="'opt-item'">
                    <span>
                    {{'分享列表'| translate}}
                    </span>
                  </router-link>
                  <router-link to="/market/register" :class="'opt-item'">
                    <span>
                    {{'注册会员'| translate}}
                    </span>
                  </router-link>
                  <!-- <router-link to="/market/share" :class="'btn opt-item'">
                    <span>
                    {{'激活会员'| translate}}
                    </span>
                  </router-link> -->
                </div>
              </div>
            </div>
          </div>
          <div class="account">
            <div class="con-title-fr">
              <div class="sub-fr"></div>
              <span class="con-title">
                
                {{'我的账户'| translate}}
                </span>
            </div>
            <div class="detail">
              <div v-if="index !=6 && index != 8" class="acc-item" v-for="(item,index) in accountArr" :class="{'acc-item-2': index > 5}">
                <div class="acc-item-fr">
                  <div class="part1">
                    <el-tooltip class="tip" effect="dark" :content="item.msg | translate" placement="top-end">
                        <i class="iconfont">&#xe60a;</i>
                    </el-tooltip>
                    <div class="tx">
                      <span class="t1">{{item.label | translate}}</span>
                      <span class="t2" >{{userInfo[item.value + ""]}}</span>
                    </div>
                    <div class="logo">
                      <img :src="'/static/img/ac'+(index+1)+'.png'"/>
                    </div>
                  </div>
                  <div class="part2" v-show="index<=4">
                    <template v-if="index == 0">
                      <router-link to="/finance/recharge" :class="'opt-link half'">
                        {{'我要充值'| translate}}
                      </router-link>
                      <i class="iconfont">&#xe608;</i>
                      <router-link to="/finance/transfer" :class="'opt-link half'">
                        {{'我要转账'| translate}}
                      </router-link>
                    </template>
                     <template v-if="index == 1">
                      <router-link to="/finance/recharge" :class="'opt-link half'">
                        {{'我要充值'| translate}}
                      </router-link>
                      <i class="iconfont">&#xe608;</i>
                      <router-link to="/finance/transfer" :class="'opt-link half'">
                        {{'我要转账'| translate}}
                      </router-link>
                    </template>
                    <template v-else-if="index == 2">
                      <router-link to="/finance/cash" :class="'opt-link '">
                        {{'提现'| translate}}
                      </router-link>
                      <i class="iconfont">&#xe608;</i>
                      <router-link to="/finance/exchange" :class="'opt-link '">
                        {{'兑换'| translate}}
                      </router-link>
                      <i class="iconfont ">&#xe608;</i>
                      <router-link to="/trade/currency" :class="'opt-link '">
                        {{'购买'| translate}}/
                        {{'出售'| translate}}
                      </router-link>
                    </template>
                    <template v-else-if="index == 3">
                      <router-link to="/finance/cash" :class="'opt-link '">
                        {{'提现'| translate}}
                      </router-link>
                      <i class="iconfont">&#xe608;</i>
                      <router-link to="/finance/exchange" :class="'opt-link '">
                        {{'兑换'| translate}}
                      </router-link>
                      <i class="iconfont">&#xe608;</i>
                      <router-link to="/trade/currency" :class="'opt-link '">
                        {{'购买'| translate}}/
                        {{'出售'| translate}}
                      </router-link>
                    </template>
                    <template v-if="index == 4">
                       <router-link to="/trade/consume" :class="'opt-link '" style="flex: auto;">
                        {{'消费指数交易中心'| translate}}
                      </router-link>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="fullwidth home-com-fr home_part_next" v-if="userInfo.IsValid">
        <div class="left  com-border">
          <div class="con-title-fr">
            <div class="sub-fr"></div>
            <span class="con-title">
              
              {{'分享链接'| translate}}
              </span>
          </div>
          <div class="ercode-fr">
            <qriously :value="QrAdrees + '?id=' + userInfo.UserCode" :size=190 />
            <!-- <img :src="qrDate.imgUrl"/> -->
            <span class="link-tx" v-text="QrAdrees + '?id=' + userInfo.UserCode"></span>
            <a id="cpybtn2" class="btn red-btn link-btn" href="javascript:;"
               :data-clipboard-text="QrAdrees + '?id=' + userInfo.UserCode">
               
               {{'复制链接'| translate}}
               </a>
          </div>
        </div>
        <div class="right  com-border consume">
          <div class="con-title-fr">
            <div class="sub-fr"></div>
            <span class="con-title">
              
              {{'消费指数价格变化'| translate}}
              </span>
            <!-- <div class="chart-tab">
              <div class="chart-tab-item" @click="toggleEchart(1)" :class="{active: hasSelectTime === 1}">
                24
                {{'小时'| translate}}
                </div>
              <div class="chart-tab-item" @click="toggleEchart(2)" :class="{active: hasSelectTime === 2}">
                {{'周'| translate}}
                </div>
              <div class="chart-tab-item" @click="toggleEchart(3)" :class="{active: hasSelectTime === 3}">
                {{'月'| translate}}
                </div>
            </div> -->
          </div>
          <div class="consume-chart">
            <div ref="chartBox" class="Exchanges_expoent_bottom_date_inner_chart">
              </div>
          </div>
        </div>
      </div>
      <div class="fullwidth home-com-fr home_part_last" style="margin-top: 20px;">
        <div class="right  com-border notice">
          <div class="con-title-fr">
            <div class="sub-fr"></div>
            <span class="con-title">
              
              {{'最新公告'| translate}}
              </span>
              <router-link to="/information" tag="div" :class="'more-btn btn_pointer'">
                <span>
                {{'更多'| translate}}
              </span><i class="iconfont">&#xe647;</i>
              </router-link>
          </div>
          <div class="list-notice">
            <router-link tag="div" :to="{name: 'notice_detail', params: {id: itemNews.NewsId}}" :class="'notice-item btn_pointer'" v-for="(itemNews, index) in newsList" :key="index">
              <div class="notice-item-fr">
                <img v-if="index % 2 === 0" src="/static/img/timg1.png" class="thumnail"/>
                <img v-if="index % 2 === 1" src="/static/img/timg2.png" class="thumnail"/>
                <div class="intro">
                  <span class="title" v-text="itemNews.Title">
                  </span>
                  <div class="desc">
                  </div>
                </div>
                <span class="date" v-text="itemNews.CreateDate">  
                </span>
              </div>
            </router-link>
           
          </div>
        </div>
        <div class="left  com-border news">
          <div class="con-title-fr">
            <div class="sub-fr"></div>
            <span class="con-title">
              
              {{'最新留言'| translate}}
              </span>
            <router-link :to="{name: 'gbook', params: {isEmail: true}}" tag="div" :class="'more-btn btn_pointer'">
                <span>
                {{'更多'| translate}}
              </span><i class="iconfont">&#xe647;</i>
              </router-link>
          </div>
          <div class="list-news">
            <router-link :to="{name: 'gbook_detail', params: {id: itemEmail.MsgId}}" tag="div" :class="'news-item btn_pointer'" v-for="(itemEmail, index) in emailList" :key="index">
              <div class="news-item-fr">
                <div class="title-fr">
                  <span class="title" v-text="itemEmail.MainTitle"></span>
                  <span class="date" v-text="itemEmail.CreateDate"></span>
                </div>
                <p class="desc"></p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
.acc-item {
  flex-basis: 33.33% !important;
  width: 33.33% !important;
}
.acc-item-2 {
  flex-basis: 25% !important;
  width: 25% !important;
}
.consume-chart {
  height: auto;
  padding: 20px;
}

@media (max-width: 767px) {
  .acc-item {
    flex-basis: 100% !important;
    width: 100% !important;
  }
  .acc-item-2 {
    flex-basis: 100% !important;
    width: 100% !important;
  }
}

.com-opt .opt-item:hover,
.com-opt .opt-item:focus {
  border: 1px solid #dc4b3c;
  background-color: #dc4b3c;
  color: #fff;
}
.com-opt .opt-item {
  width: 34%;
}
.notice .list-notice .notice-item .thumnail {
  width: auto;
}

@media (max-width: 767px) {
  .home_part1 {
    margin-top: 20px !important;
  }
}
</style>

<script>
import Clipboard from "clipboard";

import { translate } from "@/tool/filters";
import echarts from "echarts";
import { parseTime } from "@/tool/index";
var baseURL1 = location.protocol + "//" + "www.amfzone.com/";
var baseURL2 = location.protocol + "//" + "front.y34.lmh168.com/";
export default {
  data() {
    return {
      getEchart: false,
      QrAdrees: baseURL2 + "#/register",
      hasSelectTime: null,
      qrDate: {},
      userInfo: {},
      accountArr: [
        {
          msg: "用于会员注册激活，同部门可转，旁部门不能转。",
          label: "激活积分",
          value: "JiHuoJF"
        },
        {
          msg: "用于会员注册激活，同部门可转，旁部门不能转。",
          label: "激活币",
          value: "JiHuoBi"
        },
        {
          msg: "消费指数交易产生，可置换成激活积分，可提现。",
          label: "幸福指数",
          value: "XingFuZS"
        },
        {
          msg: "动态收益的主账户，可置换成激活积分，可提现。",
          label: "幸运指数",
          value: "XingYunZS"
        },
        {
          msg: "投资消费配套后，自动配的股，用于拆分增值。",
          label: "消费指数",
          value: "XiaoFeiZS"
        },
        { msg: "用于商城中购物使用。", label: "消费积分", value: "XiaoFeiJF" },
        { msg: "用于发放会员福利。", label: "福利基金", value: "FuLiJJ" },
        { msg: "用于爱心互助活动。", label: "爱心基金", value: "AiXinJJ" },
        { msg: "用于平台发展。", label: "发展基金", value: "FaZhanJJ" },
        { msg: "用于复投。", label: "复投积分", value: "FuTouJF" }
      ],
      account_list: [],

      newsList: null,
      emailList: null,

      echartLine: null,
      echartData: {
        x: [],
        y: []
      },
      echartOption: null
    };
  },
  components: {
    mheader: () => import(/* webpackChunkName: "com" */ "@/components/head.vue")
  },
  mounted() {
    // 复制
    let _self = this;
    _self.$nextTick(function() {
      var clipboard2 = new Clipboard("#cpybtn2");
      clipboard2.on("success", function(e) {
        //复制成功
        _self.$message({
          showClose: true,
          message: translate("复制成功"),
          type: "success"
        });
        e.clearSelection();
      });
    });
    // 个人资料相关
    this.axios
      .post("/api/user/GetUserInfoForIndex", {
        token: this.$store.state.token,
        userId: this.$store.getters.getUserId
      })
      .then(res => {
        this.userInfo = JSON.parse(localStorage.getItem("amf_user"))["user"];
        for (var k in res.Data) {
          this.userInfo[k + ""] = res.Data[k];
        }
      })
      .catch(err => {});

    // 二维码
    this.axios
      .post("/api/user/GetUserQrcode", {
        token: this.$store.state.token,
        userId: this.$store.getters.getUserId
      })
      .then(res => {
        this.qrDate = res.Data;
      });

    // 最新公告
    this.axios
      .post("/api/user/GetNews", {
        token: this.$store.state.token,
        userId: this.$store.getters.getUserId
      })
      .then(res => {
        var data = res.Data;
        this.newsList = data;
      });

    // 最新留言
    this.axios
      .post("/api/content/GetEmailList", {
        token: this.$store.state.token,
        userId: this.$store.getters.getUserId,
        PageNum: 1
      })
      .then(res => {
        var data = res.Data.Data;
        this.emailList = data;
      });

    // 分价格数据
  },
  updated() {
    if (this.$refs.chartBox && !this.getEchart) {
      this.getEchart = true;
      this.echartLine = echarts.init(this.$refs.chartBox);
      this.toggleEchart();
      window.onresize = () => {
        setTimeout(() => {
          this.echartLine.resize();
        }, 100);
      };
    }
  },
  methods: {
    // 分价格数据
    toggleEchart(id) {
      // 重置
      this.echartData.x = [];
      this.echartData.y = [];

      var minDate,
        maxDate = parseTime(new Date(), "{y}/{m}/{d} {h}:{i}:{s}");

      if (id) {
        this.hasSelectTime = id;
      } else {
        this.hasSelectTime = 1;
      }

      if (this.hasSelectTime === 1) {
        minDate = parseTime(
          new Date(new Date().valueOf() - 24 * 60 * 60 * 1000),
          "{y}/{m}/{d} {h}:{i}:{s}"
        );
      } else if (this.hasSelectTime === 2) {
        minDate = parseTime(
          new Date(new Date().valueOf() - 7 * 24 * 60 * 60 * 1000),
          "{y}/{m}/{d} {h}:{i}:{s}"
        );
      } else if (this.hasSelectTime === 3) {
        minDate = parseTime(
          new Date(new Date().valueOf() - 30 * 24 * 60 * 60 * 1000),
          "{y}/{m}/{d} {h}:{i}:{s}"
        );
      }

      this.echartOption = {
        title: {
          text: ""
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          top: "4%",
          left: "4%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.echartData.x,
          axisLine: {
            lineStyle: {
              color: "#7f9aa8"
            }
          }
        },
        yAxis: {
          min: 0.2,
          max: 0.4,
          type: "value",
          maxInterval: 0.01,
          axisLine: {
            lineStyle: {
              color: "#7f9aa8"
            }
          }
        },
        series: [
          {
            type: "line",
            smooth: true,
            symbolSize: 8,
            data: this.echartData.y,
            itemStyle: {
              normal: {
                color: "#49da90"
              }
            }
          }
        ]
      };
      this.echartLine.showLoading({
        color: "#c23531",
        textColor: "#fff",
        maskColor: "rgba(0,0,0, 0.8)",
        zlevel: 0
      });

      // 请求
      this.axios
        .post("/api/stock/GetStockNet", {
          token: this.$store.state.token,
          userId: this.$store.getters.getUserId,
          minDate: minDate,
          maxDate: maxDate
        })
        .then(res => {
          var data = res.Data;

          for (var i = 0; i < data.length; i++) {
            var item = data[i];
            this.echartData.x.push(
              parseTime(new Date(item.CreateDate), "{y}-{m}-{d}")
            );
            this.echartData.y.push(item.Price);
          }
          this.echartLine.setOption(this.echartOption);
          this.echartLine.hideLoading();
        })
        .catch(err => {
          this.echartLine.hideLoading();
        });
    },
    getAmount(name) {}
  }
};
</script>
