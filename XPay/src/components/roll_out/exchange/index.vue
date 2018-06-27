<template>
    <div class="rollOut__exchange">
        <top-bar :back-type="2">
            <span slot="content">{{'兑换积分' | translate}}</span>
            <router-link tag="span" :to="'/roll_out/'+type+'/exchangeRecord'" slot="right">
                {{'兑换记录' | translate}} 
            </router-link>
        </top-bar>
        <div class="rollOut__exchange-num">
            <div class="rollOut__exchange-num-item">
                <div class="rollOut__exchange-num-item-title">
                    <div class="dIcon dIcon_yue2"></div>
                    <p>{{'余额' | translate}}</p>
                </div>
                <div class="rollOut__exchange-num-item-value">
                    {{balanceInfo.balance || 0}}
                </div>
            </div>
            <div class="rollOut__exchange-num-item">
                <div class="rollOut__exchange-num-item-title">
                    <div class="dIcon dIcon_jif2"></div>
                    <p>{{'积分' | translate}}</p>
                </div>
                <div class="rollOut__exchange-num-item-value">
                    {{balanceInfo.userPoints || 0}}
                </div>
            </div>
        </div>
        <div class="rollOut__exchange-padding"></div>
        <div class="m__wrap_30 p__b_80">
            <div class="formItem__wrap">
                <div class="formItem__title">
                    {{'兑换成积分' | translate}}
                </div>
                <div class="formItem">
                    <input v-model.trim="submitData.amount" :class="{error:(!submitData.amount || this.submitData.amount <= 0) && hasValidate}" :placeholder="'输入兑换数量' | translate" type="number" class="inputItem">
                    <div class="formItem_border"></div>
                </div>
            </div>
            <div class="formItem__wrap">
                <div class="formItem__title">
                {{'支付密码' | translate}}
                </div>
                <div class="formItem">
                    <van-password-input :value="submitData.l2Pwd" @focus="popupFadePassword = true;submitData.l2Pwd = '';" />
                </div>
            </div>
            <div class="tips">{{'提示：最少兑换数量100，请输入100的整数倍' | translate}}</div>
        </div>
        <div class="position__footer position__footer_md">
            <div class="dButton dButton__large dButton_blue" @click="submit">{{'确认兑换' | translate}}</div>
        </div>
        <van-popup class="popShop__wrap" v-model="popupFadePassword">
            <div class="enter__password-box">
                <van-password-input :value="submitData.l2Pwd" />
                <van-number-keyboard  :hide-on-click-outside="false"  class="popShop-keyboadr" :show="popupFadePassword" theme="custom" :transition="false" :close-button-text="'完成' | translate" @input="updatePassword" @blur="popupFadePassword = false" @delete="updatePassword" />
            </div>
        </van-popup>
    </div>
</template>

<script>
import homeServe from 'src/api/home';
import exchangeServe from 'src/api/exchange';
export default {
  data() {
    return {
      type: "",
      balanceInfo:{},
      hasValidate:false,
      popupFadePassword:false,
      submitData:null
    };
  },
  created(){
      this.initData();
      this.getCurrentUserAssets()
  },
  methods:{
      initData(){
        this.hasValidate = false;
        this.submitData = {
            amount:'',
            l2Pwd:''
        };
      },
      updatePassword:function(value){
          if(!value){
              this.submitData.l2Pwd = this.submitData.l2Pwd.slice(0,this.submitData.l2Pwd.length - 1);
              return;
          }
          this.submitData.l2Pwd = (this.submitData.l2Pwd + value).slice(0, 6);
      },
      getCurrentUserAssets(){
          $mask();
          homeServe.GetCurrentUserAssets().then(res =>{
            this.$toast.clear();
            this.balanceInfo = res.data;
          }).catch(error =>{
            console.error("[ERROR]" + error);
          })
      },
      submit(){
          this.hasValidate = true;
          if(!this.submitData.amount){
              return;
          }
          if(!this.submitData.amount || this.submitData.amount <= 0){
              this.$toast($t("兑换数量不能小于等于0"));
              return;
          }
          if(this.submitData.amount%100 !== 0){
              this.$toast($t("数量必须是100的整数倍"));
              return;
          }
          if(!this.submitData.l2Pwd || this.submitData.l2Pwd.length < 6){
            this.$toast($t("请输入6位支付密码"));
            return;
          }
          $mask();
          let $this = this;
          exchangeServe.exchange(this.submitData).then(res =>{
              this.$toast.clear();
              this.initData();
              this.$toast($t('兑换成功'));
              setTimeout(()=>{
                 $this.getCurrentUserAssets();
              },1000);
          })

      }
  },
  mounted() {
    console.log(this.$route.params.type);
    this.type = this.$route.params.type*1;
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/style/util.scss";
.dIcon_yue2 {
  background-image: url("icon-24.png");
}
.dIcon_jif2 {
  background-image: url("icon-25.png");
}
.formItem__title{
    margin-top: f(30);
}
.formItem{
    margin: f(35) 0;
}
div.formItem .van-password-input{
  width: 100%;
}
.enter__password-box{
  width: f(610);
  border-radius: f(16);
  background-color: #ffffff;
  padding: f(18) 0;
}
.popShop__wrap{
    top: 35%;
}
.popShop-keyboadr{
  bottom: -212px !important;
}
</style>