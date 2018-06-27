<template>
    <div class="userCenter">
        <top-bar>
            <div class="topBar__right" slot="right">
                <i class="dIcon dIcon_set"></i>
                <router-link to="/userCenter_setting" tag="span">{{'设置' | translate}}</router-link>
            </div>
        </top-bar>
        <div class="userCenter__msg">
            <img class="userCenter__msg-logo logo-icon" :src="userInfo.avatarOriginalPath"/>
            <div class="userCenter__msg-text">
                <p>
                    UID：
                    <span class="userCenter__msg-text-span2">{{userInfo.id}}</span></p>
                <p>
                    {{'信用' | translate}}：
                    <i v-for="index in 5" :key="index" class="dIcon" :class="{'dIcon__default':index > userInfo.creditRating,'dIcon__start':index <= userInfo.creditRating}"></i>
                </p>
            </div>
        </div>
        <div class="userCenter__action">
            <router-link to="/userCenter_bnak" tag="div" :class="'userCenter__action-item'">
                <img :src="icon11">
                <p>{{'我的银行卡' | translate}}</p>
            </router-link>
            <router-link to="/userCenter_myCapital" tag="div" :class="'userCenter__action-item'">
                <img :src="icon49">
                <p>{{'我的资产' | translate}}</p>
            </router-link>
            <router-link :to="{name: 'userCenter_editPwd', params: {type: 0}}" tag="div" :class="'userCenter__action-item'">
                <img :src="icon12">
                <p>{{'登录密码' | translate}}</p>
            </router-link>
             <router-link :to="{name: 'userCenter_editPwd', params: {type: 1}}" tag="div" :class="'userCenter__action-item'">
                <img :src="icon13">
                <p>{{'支付密码' | translate}}</p>
            </router-link>
        </div>
        <div class="userCenter__action">
            <!-- <router-link to="/userCenter_personMsg" tag="div" :class="'userCenter__action-item'">
                <img :src="icon15">
                <p>{{'个人消息' | translate}}</p>
            </router-link> -->
            <div class="userCenter__action-item">
                <img :src="icon18">
                <p>{{'地址管理' | translate}}</p>
            </div>
            <div class="userCenter__action-item">
                <img :src="icon16">
                <p>{{'我的店铺' | translate}}</p>
            </div>
            <div class="userCenter__action-item">
                <img :src="icon17">
                <p>{{'我的订单' | translate}}</p>
            </div>
        </div>
        <div class="userCenter__action">
            <!-- userCenter_notice_detail -->
            <router-link to="/userCenter_personMsg" tag="div" :class="'userCenter__action-item'">
                <img :src="icon14">
                <p>{{'公告' | translate}}</p>
            </router-link>
            <router-link to="/userCenter_complain" tag="div" :class="'userCenter__action-item'">
                <img :src="icon19">
                <p>{{'投诉建议' | translate}}</p>
            </router-link>
            <router-link to="/userCenter_share" tag="div" :class="'userCenter__action-item'">
                <img :src="icon20">
                <p>{{'分享' | translate}}</p>
            </router-link>
        </div>
    </div>
</template>

<script>
import icon11 from "../../../static/img/icon-11.png";
import icon12 from "../../../static/img/icon-12.png";
import icon13 from "../../../static/img/icon-13.png";
import icon14 from "../../../static/img/icon-14.png";
import icon15 from "../../../static/img/icon-15.png";
import icon16 from "../../../static/img/icon-16.png";
import icon17 from "../../../static/img/icon-17.png";
import icon18 from "../../../static/img/icon-18.png";
import icon19 from "../../../static/img/icon-19.png";
import icon20 from "../../../static/img/icon-20.png";
import icon49 from "../../../static/img/icon-61.png";
export default {
  data() {
    return {
      imgLogo: "/static/img/icon-10.png",
      icon11,
      icon12,
      icon13,
      icon14,
      icon15,
      icon16,
      icon17,
      icon18,
      icon19,
      icon20,
      icon49,
      userInfo:null,
      serverPath: process.env.PROTOCOL +  process.env.BASE_API
    };
  },
  created(){
      let userInfo = eval("("+localStorage.userInfo+")");
      userInfo.avatarOriginalPath = userInfo.avatarOriginalPath ? (this.serverPath + userInfo.avatarOriginalPath) : '/static/img/default-man.png';
      userInfo.avatarThumbnailPath = userInfo.avatarThumbnailPath ? (this.serverPath + userInfo.avatarThumbnailPath) : '/static/img/default-man.png';
      this.userInfo = userInfo;
  },
  methods: {
    aa() {
      alert(1);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/style/util.scss";
.dIcon__start {
  background-image: url("../../../static/img/icon-45.png");
}
.dIcon_set {
  background-image: url("../../../static/img/icon-23.png");
}
.userCenter__msg {
  background-image: url("../../../static/img/userCenter_bg.png");
}
</style>

