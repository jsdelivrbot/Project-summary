<template>
    <div class="register backPadding bgWhite">
        <top-bar :back-type="2"><span slot="content">{{'注册' | translate}}</span></top-bar>
        <div class="m__wrap_30">
            <form>
                <div class="formItem__wrap">
                    <div class="formItem__title">
                        {{'邀请人' | translate}}
                    </div>
                    <div class="formItem">
                        <input @blur="IsUserExisting" v-model="formData.recommendedUserId.value" :placeholder="'请输入邀请人' | translate" type="text" class="inputItem">
                        <div class="formItem_border"></div>
                    </div>
                </div>
                <div class="formItem__wrap">
                    <div class="formItem__title">
                        {{'昵称' | translate}}
                    </div>
                    <div class="formItem">
                        <input v-model="formData.nickName.value" :placeholder="'请输入昵称' | translate" type="text" class="inputItem">
                        <div class="formItem_border"></div>
                    </div>
                </div>
                <div class="formItem__wrap">
                    <div class="formItem__title">
                        {{'手机号码' | translate}}
                    </div>
                    <div class="formItem formItem__slot">
                        <div class="inputItem__slot">
                            <span class="register__phoneArea" v-text="formData.mobileCode.value"></span>
                        </div>
                        <input v-model="formData.mobileNo.value" :placeholder="'您的手机号码' | translate" type="text" class="inputItem">
                        <div class="formItem_border"></div>
                    </div>
                </div>
                <div class="formItem__wrap">
                    <div class="formItem__title">
                        {{'登录密码' | translate}}
                    </div>
                    <div class="formItem">
                        <input v-model="formData.l1Pwd.value"  :placeholder="'6~32位数字加字母' | translate" type="password" class="inputItem">
                        <div class="formItem_border"></div>
                    </div>
                </div>
                <div class="formItem__wrap">
                    <div class="formItem__title">
                        {{'支付密码' | translate}}
                    </div>
                    <div class="formItem">
                        <input v-model="formData.l2Pwd.value"  :placeholder="'6位数字支付密码' | translate" type="password" class="inputItem">
                        <div class="formItem_border"></div>
                    </div>
                </div>
                <div class="formItem__wrap ">
                    <div class="formItem__title">
                        {{'验证码' | translate}}
                    </div>
                    <div class="formItem formItem__slot">
                        <input v-model="formData.verificationCode.value"  :placeholder="'填写验证码' | translate" type="text" class="inputItem">
                        <div class="formItem_border"></div>
                        <div class="inputItem__slot">
                            <send-sms :mobile="formData.mobileNo.value" :type="1"></send-sms>
                        </div>
                    </div>
                </div>
            </form>
            <div @click="submit" class="dButton dButton__large dButton_blue">{{'确定' | translate}}</div>
        </div>
    </div>
</template>

<script>
import sendSms from "src/common/components/send_sms";
import { Register, IsUserExisting } from "src/api/user";
export default {
  data() {
    return {
      formData: {
        recommendedUserId: {
          value: "",
          tips: "请输入邀请人"
        },
        nickName: {
          value: "",
          tips: "请输入昵称"
        },
        mobileCode: {
          value: "+86",
          tips: "请选择国家区号"
        },
        mobileNo: {
          value: "",
          tips: "请输入手机号",
          reg: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
          regTips: "请输入正确手机格式"
        },
        l1Pwd: {
          value: "",
          tips: "请输入登录密码",
          reg: /^\d{6,}$/,
          regTips: "请输入6位以上密码"
        },
        l2Pwd: {
          value: "",
          tips: "请输入支付密码",
          reg: /^\d{6,}$/,
          regTips: "请输入6位以上支付密码"
        },
        verificationCode: {
          value: "",
          tips: "请输验证码"
        },
        type: {
          value: 1
        }
      }
    };
  },
  components: {
    sendSms
  },
  methods: {
    submit() {
      console.log(this.formData);
      const form = {};
      IsUserExisting({ userId: this.formData.recommendedUserId.value }).then(
        res => {
          console.log(111, res);
          if (res.data) {
            for (var k in this.formData) {
              var item = this.formData[k];
              if (item.value === "" && item.tips) {
                this.$toast($t(item.tips));
                return;
              }
              if (item.reg && !item.reg.test(item.value)) {
                this.$toast($t(item.regTips));
                return;
              }
            }
            for (var kk in this.formData) {
              form[kk] = this.formData[kk].value;
            }

            Register(form).then(res => {
              console.log("注册成功", res);
              if (res.code == 20000) {
                this.$toast($t("注册成功"));

                //   重置
                for (var k in this.formData) {
                  if (k != "mobileCode" && k != "type") {
                    this.formData[k].value = "";
                  }
                }
              }
            });
          } else {
            this.$toast($t("邀请人不存在"));
          }
        }
      );
    },
    IsUserExisting() {
      IsUserExisting({ userId: this.formData.recommendedUserId.value }).then(
        res => {
          console.log(111, res);
        }
      );
    }
  }
};
</script>

<style>

</style>
