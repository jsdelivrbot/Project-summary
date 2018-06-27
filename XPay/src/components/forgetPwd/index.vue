<template>
    <div class="backPadding boxWhite">
        <top-bar :back-type="2">
            <span v-if="type === 0" slot="content">{{'找回登录密码' | translate}}</span>
            <span v-if="type === 1" slot="content">{{'找回支付密码' | translate}}</span>
        </top-bar>
        <div class="m__wrap_30 p__b_120">
            <div>
                <div class="formItem__wrap">
                    <div class="formItem__title">
                        {{'手机号' | translate}}
                    </div>
                    <div class="formItem">
                        <input v-model.trim="submitData.mobileNo" :class="{error:hasValidate && !submitData.mobileNo}" :placeholder="'输入手机号' | translate" type="text" class="inputItem">
                        <div class="formItem_border"></div>
                    </div>
                </div>
                 <div class="formItem__wrap ">
                    <div class="formItem__title">
                        {{'验证码' | translate}}
                    </div>
                    <div class="formItem formItem__slot">
                        <input v-model.trim="submitData.verificationCode" :class="{error:hasValidate && !submitData.verificationCode}"  :placeholder="'填写验证码' | translate" type="text" class="inputItem">
                        <div class="formItem_border"></div>
                        <div class="inputItem__slot">
                            <send-sms :mobile="submitData.mobileNo" :type="submitData.type"></send-sms>
                        </div>
                    </div>
                </div>
                <div class="formItem__wrap">
                    <div class="formItem__title">
                        {{'新密码' | translate}}
                    </div>
                    <div class="formItem">
                        <input  v-if="type === 0" v-model.trim="submitData.newL1Pwd"  :class="{error:hasValidate && !submitData.newL1Pwd}"  :placeholder="'输入新密码' | translate" type="password" class="inputItem">
                        <input  v-if="type === 1" v-model.trim="submitData.newL2Pwd" :class="{error:hasValidate && !submitData.newL2Pwd}"  :placeholder="'输入新密码' | translate" type="password" class="inputItem">
                        <div class="formItem_border"></div>
                    </div>
                </div>
            </div>
            <div class="position__footer position__footer_md">
                <div @click="submit" class="dButton dButton__large dButton_blue">{{'确定' | translate}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import sendSms from "src/common/components/send_sms";
import server from 'src/api/userSecurity';
export default {
    components:{
        sendSms
    },
  data() {
    return {
      type: 0,
      submitData:null,
      hasValidate:false
    };
  },
  methods: {
    submit() {
      this.hasValidate = true;
      if(!this.validateDataEmpty() || !this.validateDataOther()) return;
      $mask("提交中");
      if(this.type === 0){
        this.submitUserForgetPassword();
          return;
      }
        this.submitPayForgetPassword();
    },
    initData(){
        this.hasValidate = false;
        if(this.type ===0){
            this.submitData = {
                "type": 2,
                "mobileNo": "",
                "verificationCode": "",
                "newL1Pwd": ""
            }
            return;
        }
        this.submitData = {
            "type": 3,
            "mobileNo": "",
            "verificationCode": "",
            "newL2Pwd": ""
        }
    },
    //提交数据非空判断
    validateDataEmpty(){
        let isPass = true;
        for(let i in this.submitData){
            if(i === "type") continue;
            if(!this.submitData[i]){
                isPass = false;
                break;
            }
        }
        return isPass;
    },
    //提交数据其他验证
    validateDataOther(){
        let data = this.submitData;
        let regMobile = /1[3,5,6,7,8,9]\d{9}$/;
        if(!regMobile.test(data.mobileNo)){
            this.$toast($t('请输入11位正确的手机号码'));
            return false;
        }
        if(this.type === 0 &&data.newL1Pwd.length < 6){
            this.$toast($t('请输入6位以上的密码'));
            return false;
        }
        if(this.type === 1 && data.newL2Pwd.length !== 6){
            this.$toast($t('请输入6位支付的密码'));
            return false;
        }
        return true;
    },
    //提交找回登陆密码
    submitUserForgetPassword(){
        let $this = this;
       server.forGetUserPassword(this.submitData).then(res=>{
           $this.$toast.clear();
            $this.initData();
            if(res.code !== 20000){
                $this.$toast($t("找回登陆密码失败"));
                return;
            }
            $this.$toast($t("找回登陆密码成功"));
       }).catch(error =>{
           console.log(error);
       })
    },
    // 提交找回支付密码
    submitPayForgetPassword(){
        let $this = this;
       server.forGetPayPassword(this.submitData).then(res=>{
           $this.$toast.clear();
            $this.initData();
            if(res.code !== 20000){
                $this.$toast($t("找回支付密码失败"));
                return;
            }
            $this.$toast($t("找回支付密码成功"));
       }).catch(error =>{
           console.log(error);
       })
    }
  },
  created() {
    this.type = Number(this.$route.params.type);
    this.initData();
  }
};
</script>

<style>

</style>
