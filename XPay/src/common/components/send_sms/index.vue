<template>
  <div class="smsWrap">
    <span @click="open" class="dButton dButton__small dButton_textBlue">{{'获取验证码' | translate}}</span>
    <van-dialog :closeOnClickOverlay="false" v-model="show">
      <div class="sms">
        <div class="formItem sms-phone">
          <span>{{'手机号' | translate}}</span>
          <p v-text="mobile"></p>
        </div>
        <div class="formItem formItem__slot">
          <input v-model="formData.captchaCode" :placeholder="'填写验证码' | translate" type="text" class="inputItem">
          <div class="formItem_border"></div>
          <div @click="GetCaptcha" class="inputItem__slot">
            <img class="sms-img" :src="imgBase64" alt="...">
          </div>
        </div>
      </div>
      <div class="sms__footer">
        <div @click="cancel" class="dButton dButton__large">
              取消
        </div>
        <div @click="confirm" class="dButton dButton__large dButton_textBlue">
            确认
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { GetCaptcha, SendSmsCode } from "src/api/common";
export default {
  props: {
    mobile: {
      type: null,
      default: ""
    },
    type: {
      // 1，注册 2，找回登录密码，  3，找回交易密码
      type: Number
    }
  },
  data() {
    return {
      show: false,
      imgBase64: "",
      formData: {
        sessionId: "",
        captchaCode: "",
        mobileNoOrEmailAddress: "",
        type: 1
      }
    };
  },
  methods: {
    open() {
      if (this.mobile === "") {
        this.$toast($t("请输入手机号"));
      } else {
        this.show = true;
      }
    },
    confirm() {
      if(this.formData.captchaCode.trim() === "") {
        this.$toast($t('请输入图形验证码'));
        return;
      }
      SendSmsCode(this.formData).then(res => {
        if (res.code == 20000) {
          this.show = false;
          this.$toast($t("成功"));
        }
      });
    },
    cancel() {
      this.show = false;
    },
    GetCaptcha() {
      GetCaptcha().then(res => {
        const data = res.data;
        this.imgBase64 = data.imgBase64;
        this.formData.sessionId = data.sessionId;
      });
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.GetCaptcha();
        this.formData.mobileNoOrEmailAddress = this.mobile;
        this.formData.type = this.type;
      } else {
        for (var k in this.formData) {
          if (k != "type") {
            this.formData[k] = "";
          }
        }
      }
    }
  },
  created() {
    console.log(this.mobile, this.type);
  }
};
</script>