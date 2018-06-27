<template>
    <div>
      <div class="nav-2">
        <div class="container ">
          <el-menu :default-active="activeIndex"
                   backgroundColor="#fbfafa"
                   text-color="#797979"
                   class="el-menu-demo">
            <div class="nav-2-fr" @click="vertical_isOpen = !vertical_isOpen">
              <div style="font-size: 14px;"> 
                {{'导航' | translate}}
                </div>
              <div>
                <i class="iconfont">&#xe603;</i>
              </div>
            </div>
            <div class="sub-nav" v-show="vertical_isOpen" style="position:absolute;z-index:999;width: 100%;">
              <template v-for="(item,index) in nav_arr">
                <template v-if="item.subNav&&item.subNav.length>0">
                  <el-submenu :index="''+index">
                    <template slot="title">
                      <i class="iconfont t-22" v-html="iconArr[index]"></i> {{item.title | translate}}
                    </template>
                    <el-menu-item :index="index+'-'+jndex" :key="jndex"
                                  v-for="(jtem,jndex) in item.subNav">
                      <a class="fullwh" @click="changeNavUrl(jtem.url)"  v-if="jtem.url">{{jtem.title | translate}}</a>
                      <span  v-else>{{jtem.title | translate}}</span>
                    </el-menu-item>
                  </el-submenu>
                </template>
                <template v-else>
                  <el-menu-item :index="''+index" route="">
                    <div class="row item-center">
                      <i class="iconfont t-22" v-html="iconArr[index]"></i>
                      <a class="fullwh" @click="changeNavUrl(item.url)" v-if="item.url">{{item.title | translate}}</a>
                      <span  v-else>{{item.title | translate}}</span>
                    </div>
                  </el-menu-item>
                </template>
              </template>
              <el-submenu :index="''+nav_arr.length">
                <template slot="title">
                  <img :src="'/static/img/'+langObj[lang.value]"/>
                  {{lang.title | translate}}
                </template>
                <el-menu-item @click="changeLanguage(lang.value)" index="1" :key="index" v-for="(lang,index) in langlist">
                  <img :src="'/static/img/'+lang.value+ '.png'"  class="langImg"/>
                  <a class="fullwh" >{{lang.title | translate}}</a>
                </el-menu-item>
              </el-submenu>
            </div>

          </el-menu>
        </div>
      </div>
      <div class="nav-1">
        <div class="container nav-1-fr">
          <el-menu :default-active="activeIndex"
                   class="el-menu-demo" mode="horizontal"
                   text-color="#ffffff"
                   active-text-color="#ffffff"
          >
            <template v-for="(item,index) in nav_arr">
              <template v-if="item.subNav&&item.subNav.length>0">
                <el-submenu :index="index+''">
                  <template slot="title">
                    <div class="m-nav">
                      <i class="iconfont t-22" v-html="iconArr[index]"></i>
                      <span class="title">{{item.title | translate}}</span>
                    </div>
                  </template>
                  <el-menu-item :index="index+'-'+jndex" :key="jndex"
                                v-for="(jtem,jndex) in item.subNav">
                    <div>
                      <router-link class="fullwh" :to="jtem.url" v-if="jtem.url">{{jtem.title | translate}}</router-link>
                      <span  v-else>{{jtem.title | translate}}</span>
                    </div>
                  </el-menu-item>
                </el-submenu>
              </template>
              <template v-else>
                <el-menu-item :index="''+index" route="">
                  <div class="m-nav">
                    <i class="iconfont t-22" v-html="iconArr[index]"></i>
                    <router-link  :to="item.url"  class="title fullwh" v-if="item.url">{{item.title | translate}}</router-link>
                    <span class="title" v-else>{{item.title | translate}}</span>
                  </div>
                </el-menu-item>
              </template>
            </template>

          </el-menu>
          <el-menu :default-active="activeIndex"
                   background-color="#1c1b18"
                   mode="horizontal">
            <el-submenu :index="''+nav_arr.length">
              <template slot="title">
                <div class="languageDiv">
                  <img :src="'/static/img/'+langObj[lang.value]"  class="langImg2"/>
                  <span class="title">{{lang.title | translate}}</span>
                </div>
              </template>
              <el-menu-item @click="changeLanguage(lang.value)" :index="lang.value" :key="index" v-for="(lang,index) in langlist">
                  <img :src="'/static/img/'+lang.value + '.png'"  class="langImg"/>
                <a >{{lang.title | translate}}</a>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </div>
    </div>
</template>
<style lang="less">
@import (reference) "./../../style/css/main.less";
@import "./../../style/css/home_nav.less";
.t-22 {
  font-size: 22px;
}
.nav-2 .sub-nav > .el-menu-item > .item-center > .fullwh {
  text-align: left;
}
@media (max-width: 1198px) {
  .fullwh {
    text-align: left;
    display: inline;
  }
}
</style>
<script>
import { langlist } from "./../../tool/data";
import { Menu, Submenu, MenuItem } from "element-ui";
import Vue from "vue";
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
export default {
  data() {
    return {
      vertical_isOpen: false,
      activeIndex: "",
      nav_arr: [],
      langlist: langlist,
      iconArr: [
        "&#xe605;",
        "&#xe60f;",
        "&#xe611;",
        "&#xe610;",
        "&#xe604;",
        "&#xe621;",
        "&#xe628;",
        "&#xe60e;"
      ],
      lang: {},
      langObj: {
        "zh-CN": "zh-CN.png",
        "zh-TW": "zh-TW.png",
        en: "en.png",
        ko: "ko.png",
        th: "th.png"
      }
    };
  },
  beforeMount() {
    let _self = this;
  },
  mounted() {
    let _self = this;
    let arr = [
      {
        title: "会员首页",
        url: "/"
      },
      {
        title: "个人信息",
        subNav: [
          { title: "详细资料", url: "/profile" },
          { title: "修改资料", url: "/profile/edit" },
          { title: "修改密码", url: "/profile/changepwd" },
          { title: "关联账号", url: "/profile/associate" },
          { title: "账户安全", url: "/profile/safety" }
        ]
      },
      {
        title: "市场管理",
        subNav: [
          { title: "注册会员", url: "/market/register" },
          { title: "我的分享", url: "/market/share" },
          { title: "级别升级", url: "/market/upgrade" }
        ]
      },
      {
        title: "我的网络",
        subNav: [
          { title: "推荐网络", url: "/network/recom" },
          { title: "安置网络", url: "/network/jpos" }
        ]
      },
      {
        title: "财务管理",
        subNav: [
          { title: "奖励明细", url: "/finance/award" },
          { title: "财务明细", url: "/finance/fdetail" },
          { title: "货币转账", url: "/finance/transfer" },
          { title: "货币兑换", url: "/finance/exchange" },
          { title: "汇款充值", url: "/finance/recharge" },
          { title: "提现管理", url: "/finance/cash" }
        ]
      },
      {
        title: "交易中心",
        subNav: [
          { title: "消费指数交易", url: "/trade/consume" },
          { title: "货币交易", url: "/trade/currency" }
        ]
      },
      {
        title: "购物商城",
        subNav: [
          { title: "商城首页", url: "/mall" },
          { title: "购物车", url: "/mall/car" },
          { title: "订单管理", url: "/mall/order" },
          { title: "收货地址", url: "/mall/address" }
        ]
      },
      {
        title: "信息管理",
        subNav: [
          { title: "平台公告", url: "/information" },
          { title: "留言管理", url: "/information/gbook" }
        ]
      }
    ];
    // 货币交易——是否开启交易
    var IsValid = localStorage.getItem("amf_user")
      ? JSON.parse(localStorage.getItem("amf_user")).user.IsValid
      : false;
    if (IsValid) {
      this.axios
        .all([
          this.axios.post("/api/help/GetHelpIsOpen"),
          this.axios.post("/api/mall/GetMallIsOpen")
        ])
        .then(
          this.axios.spread(function(res1, res2) {
            if (
              res1.Data.isOpenTrade === true &&
              res2.Data.isOpenTrade === false
            ) {
              _self.nav_arr = [
                {
                  title: "会员首页",
                  url: "/"
                },
                {
                  title: "个人信息",
                  subNav: [
                    { title: "详细资料", url: "/profile" },
                    { title: "修改资料", url: "/profile/edit" },
                    { title: "修改密码", url: "/profile/changepwd" },
                    { title: "关联账号", url: "/profile/associate" },
                      { title: "账户安全", url: "/profile/safety" }
                  ]
                },
                {
                  title: "市场管理",
                  subNav: [
                    { title: "注册会员", url: "/market/register" },
                    { title: "我的分享", url: "/market/share" },
                    { title: "级别升级", url: "/market/upgrade" }
                  ]
                },
                {
                  title: "我的网络",
                  subNav: [
                    { title: "推荐网络", url: "/network/recom" },
                    { title: "安置网络", url: "/network/jpos" }
                  ]
                },
                {
                  title: "财务管理",
                  subNav: [
                    { title: "奖励明细", url: "/finance/award" },
                    { title: "财务明细", url: "/finance/fdetail" },
                    { title: "货币转账", url: "/finance/transfer" },
                    { title: "货币兑换", url: "/finance/exchange" },
                    { title: "汇款充值", url: "/finance/recharge" },
                    { title: "提现管理", url: "/finance/cash" }
                  ]
                },
                {
                  title: "交易中心",
                  subNav: [
                    { title: "消费指数交易", url: "/trade/consume" },
                    { title: "货币交易", url: "/trade/currency" }
                  ]
                },

                {
                  title: "信息管理",
                  subNav: [
                    { title: "平台公告", url: "/information" },
                    { title: "留言管理", url: "/information/gbook" }
                  ]
                }
              ];
            } else if (
              res1.Data.isOpenTrade === false &&
              res2.Data.isOpenTrade === true
            ) {
              _self.nav_arr = [
                {
                  title: "会员首页",
                  url: "/"
                },
                {
                  title: "个人信息",
                  subNav: [
                    { title: "详细资料", url: "/profile" },
                    { title: "修改资料", url: "/profile/edit" },
                    { title: "修改密码", url: "/profile/changepwd" },
                    { title: "关联账号", url: "/profile/associate" },
          { title: "账户安全", url: "/profile/safety" }
                  ]
                },
                {
                  title: "市场管理",
                  subNav: [
                    { title: "注册会员", url: "/market/register" },
                    { title: "我的分享", url: "/market/share" },
                    { title: "级别升级", url: "/market/upgrade" }
                  ]
                },
                {
                  title: "我的网络",
                  subNav: [
                    { title: "推荐网络", url: "/network/recom" },
                    { title: "安置网络", url: "/network/jpos" }
                  ]
                },
                {
                  title: "财务管理",
                  subNav: [
                    { title: "奖励明细", url: "/finance/award" },
                    { title: "财务明细", url: "/finance/fdetail" },
                    { title: "货币转账", url: "/finance/transfer" },
                    { title: "货币兑换", url: "/finance/exchange" },
                    { title: "汇款充值", url: "/finance/recharge" },
                    { title: "提现管理", url: "/finance/cash" }
                  ]
                },
                {
                  title: "交易中心",
                  subNav: [{ title: "消费指数交易", url: "/trade/consume" }]
                },
                {
                  title: "购物商城",
                  subNav: [
                    { title: "商城首页", url: "/mall" },
                    { title: "购物车", url: "/mall/car" },
                    { title: "订单管理", url: "/mall/order" },
                    { title: "收货地址", url: "/mall/address" }
                  ]
                },
                {
                  title: "信息管理",
                  subNav: [
                    { title: "平台公告", url: "/information" },
                    { title: "留言管理", url: "/information/gbook" }
                  ]
                }
              ];
            } else if (
              res1.Data.isOpenTrade === true &&
              res2.Data.isOpenTrade === true
            ) {
              _self.nav_arr = arr;
            } else if (
              res1.Data.isOpenTrade === false &&
              res2.Data.isOpenTrade === false
            ) {
              _self.nav_arr = [
                {
                  title: "会员首页",
                  url: "/"
                },
                {
                  title: "个人信息",
                  subNav: [
                    { title: "详细资料", url: "/profile" },
                    { title: "修改资料", url: "/profile/edit" },
                    { title: "修改密码", url: "/profile/changepwd" },
                    { title: "关联账号", url: "/profile/associate" },
          { title: "账户安全", url: "/profile/safety" }
                  ]
                },
                {
                  title: "市场管理",
                  subNav: [
                    { title: "注册会员", url: "/market/register" },
                    { title: "我的分享", url: "/market/share" },
                    { title: "级别升级", url: "/market/upgrade" }
                  ]
                },
                {
                  title: "我的网络",
                  subNav: [
                    { title: "推荐网络", url: "/network/recom" },
                    { title: "安置网络", url: "/network/jpos" }
                  ]
                },
                {
                  title: "财务管理",
                  subNav: [
                    { title: "奖励明细", url: "/finance/award" },
                    { title: "财务明细", url: "/finance/fdetail" },
                    { title: "货币转账", url: "/finance/transfer" },
                    { title: "货币兑换", url: "/finance/exchange" },
                    { title: "汇款充值", url: "/finance/recharge" },
                    { title: "提现管理", url: "/finance/cash" }
                  ]
                },
                {
                  title: "交易中心",
                  subNav: [{ title: "消费指数交易", url: "/trade/consume" }]
                },

                {
                  title: "信息管理",
                  subNav: [
                    { title: "平台公告", url: "/information" },
                    { title: "留言管理", url: "/information/gbook" }
                  ]
                }
              ];
            }
          })
        );
    } else {
      _self.nav_arr = [
        {
          title: "会员首页",
          url: "/"
        },
        {
          title: "个人信息",
          subNav: [
            { title: "详细资料", url: "/profile" },
            { title: "修改资料", url: "/profile/edit" },
            { title: "修改密码", url: "/profile/changepwd" }
          ]
        },
        {
          title: "市场管理",
          subNav: [{ title: "我要激活", url: "/market/myActive" }]
        },
        {
          title: "我的网络",
          subNav: [
            { title: "推荐网络", url: "/network/recom" },
            { title: "安置网络", url: "/network/jpos" }
          ]
        },
        {
          title: "财务管理",
          subNav: [
            { title: "财务明细", url: "/finance/fdetail" },
            { title: "货币转账", url: "/finance/transfer" },
            { title: "货币兑换", url: "/finance/exchange" },
            { title: "汇款充值", url: "/finance/recharge" }
          ]
        },
        {
          title: "交易中心",
          subNav: []
        },
        {
          title: "购物商城",
          subNav: [
            { title: "商城首页", url: "/mall" },
            { title: "购物车", url: "/mall/car" },
            { title: "订单管理", url: "/mall/order" },
            { title: "收货地址", url: "/mall/address" }
          ]
        },
        {
          title: "信息管理",
          subNav: [
            { title: "平台公告", url: "/information" },
            { title: "留言管理", url: "/information/gbook" }
          ]
        }
      ];
    }

    for (var i = 0; i < langlist.length; i++) {
      var item = langlist[i];
      if (item.value == localStorage["lang"]) {
        _self.lang = item;
      }
    }
  },
  methods: {
    changeNavUrl(url) {
      let _self = this;
      _self.vertical_isOpen = false;
      _self.$router.push(url);
    },
    changeLanguage(lang) {
      if(lang.indexOf(0) === 0) return;
      localStorage["lang"] = lang;
      location.reload();
    }
  }
};
</script>
