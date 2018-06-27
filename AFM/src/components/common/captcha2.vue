<template>
    <div>
        <a @click="SendSmsCode" key="1" href="javascript:;" v-if="timeCount == 60" class="btn red-btn com-btn" style="margin-left: 30px;">
            <span >{{'获取验证码' | translate}}</span>
            <!-- <span class="visible-xs-inline">{{'验证码' | translate}}</span> -->
        </a>
        <a key="2"  href="javascript:;" v-if="timeCount < 60" class="btn red-btn com-btn" style="margin-left: 30px;">
            <span class="hidden-xs">{{'重新发送' | translate}} <span>{{ '(' + timeCount + ')' }}</span></span>
            <span class="visible-xs-inline" v-text="'(' + timeCount + ')'"></span>
        </a>
    </div>
</template>

<script>
export default {
  data() {
    return {
      timeCount: 60 // 倒计时 时间
    };
  },
  methods: {
    // 获取手机验证码
    SendSmsCode(mobile) {
      var userInfo = JSON.parse(localStorage.getItem("amf_user"));
      this.axios
        .post("api/user/GetAnoMobileCaptcha", {
          userCode: userInfo.user.UserCode,
          mobile: userInfo.user.Mobile
        })
        .then(res => {
          this.CodeTimeOut();
        })
        .catch(err => {});
    },
    // 倒计时60后再次发送
    CodeTimeOut() {
      var _this = this;
      if (this.timeCount <= 0) {
        this.timeCount = 60;
        return;
      } else {
        this.timeCount -= 1;
      }
      setTimeout(function() {
        _this.CodeTimeOut();
      }, 1000);
    }
  }
};
</script>

