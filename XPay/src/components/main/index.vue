<template>
    <div class="main">
        <top-bar :has-top-back="false" :changebar="false">
            <div slot="left" class="main__topBar-qr_wrap topBar__back">
                <router-link to="/barscan" tag="div" class="main__topBar-qr"></router-link>
                <img class="logo" src="../../../static/img/XPAY.png" alt="xpay"/>
            </div>
            <div class="main__topBar-msg" slot="right">
                <div class="main__topBar-msg-text">
                    <p>
                        UID：
                        <span>{{userInfo.id}}</span>
                        </p>
                    <p>
                        {{'信用' | translate}}：
                        
                        <i v-for="index in 5" :key="index" class="dIcon" :class="{'dIcon__default':index > userInfo.creditRating,'dIcon__start':index <= userInfo.creditRating}"></i>
                    </p>
                </div>
                <router-link :src="userInfo.avatarOriginalPath" to="/userCenter" tag="img" :class="'main__topBar-msg-logo logo-icon'">
                </router-link>
            </div>
        </top-bar>
        <div class="main__swipe">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(item, index) in slideData" :key="index">
                    <img :src="item | imgUrl" alt="...">
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="main__amount">
             <router-link to="/balance_record" tag="div" class="item left">
                <label>余额</label>
                <span>{{assetsInfo.balance}}</span>
                <img src="../../../static/img/home_7.png" alt="Xpay-余额"/>
            </router-link>
             <router-link to="/intergral_record" tag="div" class="item right">
                <label>积分</label>
                <span>{{assetsInfo.userPoints}}</span>
                <img src="../../../static/img/home_3.png" alt="Xpay-积分"/>
            </router-link>
        </div>
        <div class="main__messages">
          <img src="../../../static/img/home_6.png" alt="新闻-News-Xpay"/>
          <div class="item">
              <div class="news">
                <label>头条</label>
                <span>XPAY中国区运营20天致谢广大会员</span>
              </div>
          </div>
          <div class="item">
              <div class="notice">
                <label>最新</label>
                <span>加密货币矿业，大型矿商或将变身为游戏改变者</span>
              </div>
          </div>
        </div>
        <div class="main__action">
            <div class="item row-1">
              <label>{{'数字资产' | translate}}</label>
              <span>{{'完全去中心化' | translate}}</span>
              <router-link tag="a" to="/Digital_Asset" class="btn sm">{{'去交易' | translate}}</router-link>
            </div>
            <div class="item right">
              <router-link to="/roll_out/0/enter" tag="div" class="row-2">
                <label>{{'转出' | translate}}</label>
                <span>{{'点对点跨境转账' | translate}}</span>
              </router-link>
              <router-link to="/rollOut_nextQr" tag="div" class="row-2">
                <label>{{'转入' | translate}}</label>
                <span>{{'多币种快速转账' | translate}}</span>
              </router-link>
            </div>
        </div>
        <div class="main__shoping">
          <label>— 购物商城 —</label>
          <div class="shoping-box"><span>暂未开放，敬请期待</span></div>
        </div>
        <van-popup v-model="checkInData.show" :class="'checkInWrap'">
            <div class="checkIn">
                <div class="checkIn__number">{{checkInData.data.amount}}</div>
                <div class="checkIn__msg">{{'XPAY每日签到奖励' | translate}}</div>
                <div class="checkIn__tips">
                    {{'今日获得' | translate }}：{{checkInData.data.amount}}
                    {{'余额' | translate }}
                </div>
                <div @click="checkIn" class="dButton dButton__large dButton_blue">{{'存入余额' | translate}}</div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import server from "../../api/home";
import { GetCurrentUser } from "../../api/user";
import defaultAvatar from "../../../static/img/default-man.png";
export default {
  data() {
    return {
      checkInData: {
        show: false,
        data: {
          releaseDate: "",
          releasePct: "",
          releaseAmount: "",
          amount: ""
        }
      },
      assetsInfo: {
        balance: 0,
        userPoints: 0
      },
      userInfo: {
        id: "数据获取中"
      },
      slideData: [],
      serverPath: process.env.PROTOCOL + process.env.BASE_API
    };
  },
  methods: {
    // 是否需要签到
    isCheckIn() {
      if (this.$route.params.checkIn) {
        $mask();
        server.GetCurrentDailyReleaseInfo().then(res => {
          this.$toast.clear();
          if (res.data === null) {
            this.checkInData.show = false;
          } else {
            this.checkInData.show = true;
            this.checkInData.data = res.data;
          }
        });
      }
    },
    // 签到
    checkIn() {
      server.Release().then(res => {
        this.checkInData.show = false;
        this.$toast({
          message: $t("已成功存入余额") + " " + this.checkInData.data.amount,
          position: "bottom"
        });
      });
    },
    quitApp: function() {
      let $this = this;
      let clickNum = 0;
      this.$router.back = function() {
        if ($this.$route.path != "/main") {
          $this.$router.go(-1);
          return;
        }
        $this.$toast({ message: "再按一次退出", position: "bottom" });
        clickNum += 1;
        setTimeout(function() {
          if (clickNum >= 2) {
            plus.runtime.quit();
            return;
            ``;
          }
          clickNum = 0;
        }, 500);
      };
    },
    getUserInfo() {
      let $this = this;
      $mask();
      this.$store.dispatch("GetInfo").then(res =>{
        $this.$toast.clear();
        $this.initUserInfo();
      });
    },
    initUserInfo(){
      let user = this.$store.getters.userInfo;
      user.avatarOriginalPath = user.avatarOriginalPath ? (this.serverPath + user.avatarOriginalPath) : defaultAvatar;
      user.avatarThumbnailPath = user.avatarThumbnailPath ? (this.serverPath + user.avatarThumbnailPath) : defaultAvatar;
      this.userInfo = user;
    },
    getBalanceAndPoint() {
      let $this = this;
      $mask();
      server
        .GetCurrentUserAssets()
        .then(res => {
          this.$toast.clear();
          $this.assetsInfo = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 轮播图
    GetSlideshowList() {
      let $this = this;
      server.GetSlideshowList().then(res => {
        this.$toast.clear();
        this.slideData = res.data;
      });
    }
  },
  created() {
    this.quitApp();
    this.getUserInfo();
    this.getBalanceAndPoint();
    this.isCheckIn();
    this.GetSlideshowList();
  },
  mounted() {
    if (window.api) {
      api.setStatusBarStyle({
        style: "light",
        color: "#ff0000"
      });
    }
    document.addEventListener('DOMContentLoaded', function() {  
        attachFastClick(document.body);
    }, false);  
  },
  destroyed() {
    if (window.api) {
      api.setStatusBarStyle({
        style: "dark",
        color: "#ff0000"
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/style/util.scss";
div.barcode_popup{
    width: 100%;
    height: 100%;
}
div.main__swipe{
  min-height: f(400);
  width: 100%;
  img{
    height: 100%;
  }
}
.dIcon__start {
  background-image: url("../../../static/img/icon-45.png");
}
.dIcon__default {
  background-image: url("../../../static/img/icon-49.png");
}
.dIcon_yue {
  background-image: url("../../../static/img/icon-47.png");
}
.dIcon_jif {
  background-image: url("../../../static/img/icon-48.png");
}
.main__topBar-qr {
  background-image: url("../../../static/img/icon-21.png");
}
.checkIn {
  background-image: url("../../../static/img/checkInBg.png");
}
//single
div.main__amount{
  padding: 0 f(21);
  overflow: hidden;
  margin-top: - f(82);
  background-color: #FFFFFF;
  padding-bottom: f(30);
  div.item{
    width: f(345);
    height: f(160);
    border-radius: f(8);
    background-color: #FFFFFF;
    opacity: 0.96;
    position: relative;
    box-shadow: 0 f(10) f(20) 0 #cccccc;
    &.left{
      float: left;
    }
    &.right{
      float: right;
    }
    img{
      height: f(90);
      width: f(90);
      display: inline-block;
      position: absolute;
      top: f(35);
      right: f(35);
    }
    label{
      font-size: f(30);
      font-weight: bold;
      color: #000000;
      display: block;
      padding-top: f(45);
    }
    span{
      font-size: f(36);
      color: #6e7581;

    }
    padding:0 f(35);
  }
}
div.main__messages{
  padding: f(35);
  background-color: #FFFFFF;
  margin-bottom: f(20);
  padding-left: f(111);
  position: relative;
  img{
    position: absolute;
    left: f(35);
    width: f(62);
    height: f(67);
    top:f(50);
  }
  div.item{
    padding: f(5) 0;
    label{
      width: f(55);
      padding: 0 f(10);
      height: f(26);
      color: #0079f1;
      border: f(2) solid #0079f1;
      border-radius: f(4);
      font-size: f(20);
    }
    overflow: hidden;
    height: f(45);
    line-height: f(38);
    margin-bottom: f(8);
    &:last-child{
      margin-bottom: 0;
    }
  }
}
div.main__topBar-qr_wrap  {
  position: relative;
  img.logo{
    width: f(100);
    height: f(19);
    position: absolute;
    top: f(33);
    left: f(55);
  }
}
div.main__action{
  padding: f(20);
  background-color: #FFFFFF;
  overflow: hidden;
  div.item{
    background-color: #f9f9f9;
    label{
      display: block;
      font-size: f(30);
      font-weight: bold;
    }
    span{
      font-size: f(24);
      color: #6e7581;
    }
    a.btn{
      width: f(120);
      text-align: center;
      height: f(40);
      padding: f(8) f(23);
      background-color: #0055ff;
      border-radius: f(23);
      color: #FFFFFF;
    }
    &.row-1{
      span{
        display: block;
        margin-bottom: f(30);
      }
      label{
        font-weight: normal;
      }
      padding: 0 f(35);
      padding-top: f(36);
      width: f(345);
      height: f(309);
      margin-right: f(20);
      float: left;
      background-image: url('../../../static/img/home_5.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-position-x: - f(50);
    }
    &.right{
      float: right;
      background-color: #ffffff;
    }
    div.row-2{
      width: f(345);
      height: f(147);
      margin-bottom: f(15);
      padding: 0 f(35);
      padding-top: f(39);
      background-color: #f9f9f9;
      background-image: url('../../../static/img/home_4.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position-x: f(180);
      &:last-child{
        margin-bottom: 0;
        background-image: url('../../../static/img/home_2.png');
      }
    }
  }
}
div.main__shoping{
  margin-top: f(20);
  label{
    display: inline-block;
    width: 100%;
    height: f(88);
    line-height: f(88);
    background-color: #ffffff;
    text-align: center;
    margin-bottom: f(2);
    font-size: f(30);
    font-weight: bold;
  }
  div.shoping-box{
    width: 100%;
    height: f(211);
    text-align: center;
    background-color: #ffffff;
    background-image: url('../../../static/img/home_1.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position-y: - f(130);
    span{
      display: inline-block;
      width: f(352);
      height: f(117);
      line-height: f(117);
      margin-top: f(42);
      color: #6e7581;
      background-color: #ffffff;
      opacity: 0.8;
      box-shadow: 0 f(4) f(10) 0 #cccccc;
    }
  }
}
</style>