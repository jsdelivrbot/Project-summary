<template>
  <div class="rollOut__next">
    <top-bar :back-type="2" :has-back="false" @back="goBack">
       <span slot="content">{{type === 0 ? '转出' : '转入' | translate}}</span>
       <span tag="span" slot="right" @click="navigate">{{type === 0 ? '转出记录' : '转入记录' | translate}}</span>
    </top-bar>
    <div class="m__wrap_30 p__b_80">
      <img class="userCenter__msg-logo logo-icon" :src="otherUserInfo.avatarOriginalPath"/>
      <div class="rollOut__next-msg">{{otherUserInfo.nickName}}（{{otherUserInfo.id}}）</div>
      <div class="rollOut__next-select">
        <div class="rollOut__next-select-msg">
          <span>
            {{type === 0 ? '转出金额' : '转入金额' | translate}}
          </span>
          <div class="formItem">
            <input v-model.trim="submitData.amount" :class="{'error':hasValidate && !submitData.amount}" type="number" class="inputItem">
            <div class="formItem_border"></div>
          </div>
        </div>
        <div class="rollOut__next-select-btn" @click="popupShow = true">
          RMB（中国）<i class="dIcon dIcon_down"></i>
        </div>
      </div>
      <div class="formItem__wrap">
        <div class="formItem__title">
          {{'支付余额' | translate}}
        </div>
        <div class="formItem">
          <input readonly :value="balanceInfo.balance || 0" type="text" class="inputItem not-line">
          <div class="formItem_border"></div>
        </div>
      </div>
      <div class="formItem__wrap">
        <div class="formItem__title">
          {{'手机末4位' | translate}}
        </div>
        <div class="formItem">
          <input :placeholder="'输入对方手机号末4位' | translate" :class="{'error':hasValidate && !submitData.last4WordsOfMobileNo}" v-model.trim="submitData.last4WordsOfMobileNo" type="text" class="inputItem">
          <div class="formItem_border"></div>
        </div>
      </div>
       <div class="formItem__wrap">
        <div class="formItem__title">
          {{'支付密码' | translate}}
        </div>
        <div class="formItem">
            <van-password-input :value="submitData.l2Pwd" @focus="popupFadePassword = true" />
        </div>
      </div>

    </div>
    <div class="position__footer position__footer_md">
        <div class="dButton dButton__large dButton_blue" @click="submit">
          {{type === 0 ? '确认转出' : '确认转入' | translate}}
        </div>
    </div>
    <van-popup class="popShop__wrap" v-model="popupFadePassword">
      <div class="enter__password-box">
        <van-password-input :value="submitData.l2Pwd" />
        <van-number-keyboard  :hide-on-click-outside="false"  class="popShop-keyboadr" :show="popupFadePassword" theme="custom" :transition="false" :close-button-text="'完成' | translate" @input="updatePassword" @blur="popupFadePassword = false" @delete="updatePassword" />
      </div>
    </van-popup>
    <van-popup v-model="popupShow" position="bottom">
      <div class="padding_30">
        <div class="rollOut__next-select">
          <div class="rollOut__next-select-msg">
            {{type === 0 ? '转出金额' : '转入金额' | translate}}
            <p>100.00</p>
          </div>
          <div class="rollOut__next-select-btn" @click="popupShow = false">
            RMB（中国）<i class="dIcon dIcon_down"></i>
          </div>
        </div>
        <div class="coutry__wrap">
          <div class="coutry__wrap-row">
            <div class="coutry__wrap-item" v-for="(item, index) in countryData" :key="index">
              <div class="coutry__wrap-item-btn" @click="selectCoutry(item)">
                GBP（英国）
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import { GetOtherUser } from 'src/api/user';
  import transferServe from 'src/api/transfer';
  import homeServe from 'src/api/home';
  import defaultAvatar from "../../../../static/img/default-man.png";
  export default {
    data() {
      return {
        popupFadePassword:false,
        barcodeValue:"",
        hasValidate:false,
        type: '',
        popupShow: false,
        udata:{},
        balanceInfo:{},
        submitData:{
          "last4WordsOfMobileNo":"",
          "l2Pwd":"",
          toUserId:"",
          amount:""
        },
        otherUserInfo:{
          avatarOriginalPath:defaultAvatar
       },
        countryData: [1,2,3,4,5,73,2,3,4,5,73,2,3,4,5,73,2,3,4,5,73,2,3,4,5,73,2,3,4,5,73,2,3,4,5,73],
        serverPath: process.env.PROTOCOL +  process.env.BASE_API
      };
    },
    methods: {
      updatePassword:function(value){
          if(!value){
              this.submitData.l2Pwd = this.submitData.l2Pwd.slice(0,this.submitData.l2Pwd.length - 1);
              return;
          }
          this.submitData.l2Pwd = (this.submitData.l2Pwd + value).slice(0, 6);
      },
      submit(){
        this.hasValidate = true;
        if(!this.dataValidateEmpty()) return;
        if(!this.balanceInfo.balance){
          this.$toast($t('余额不足无法转出'));
          return;
        }
        this.transferOut();
      },
      transferOut(){
        $mask();
        transferServe.transferOut(this.submitData).then(res =>{
          this.$toast.clear();
          if(res.code !== 20000){
            this.$toast($t(res.message || '转出失败'));
            return;
          }
          this.$toast($t('转出成功'));
          this.submitData.amount = '';
          this.submitData.l2Pwd = '';
          this.hasValidate = false;
        }).catch(error =>{
          console.error("[ERROR]" + error);
        })
      },
      dataValidateEmpty(){
        let isPass = true;
        let $this = this;
        for(let i in this.submitData){
          let v = this.submitData[i]
          if(i == "l2Pwd") continue;
          if(!v){
            isPass = false;
            break;
          }
        }
        if(!isPass) return false;
        if(!this.submitData.l2Pwd || this.submitData.l2Pwd.length < 6){
          this.$toast($t("请输入6位支付密码"));
          isPass = false;
        }
        return isPass;
      },
      initData(){
        if(!this.barcodeValue) return;
        let data = eval("("+this.barcodeValue+")").value;
        
        let xpayTag = data.split('?')[0];
        let xpayData = data.split('?')[1];
        let resData = null;
        if(xpayTag !== "xpay://receive"){
          this.$toast($t("参数不合法"));
          return;
        }
        resData = "{"+xpayData.replace(/&/g,',').replace(/=/g,":")+"}";
        let udata = eval("("+resData+")");
        let mobileNo = udata.mno.toString();
        this.submitData.last4WordsOfMobileNo = mobileNo.substr(mobileNo.length-4);
        this.submitData.toUserId = udata.uid;
        this.getOtherUserInfo();
      },
      selectCoutry() {
        this.popupShow = false;
      },
      getBalance:function(){
          $mask();
          homeServe.GetCurrentUserAssets().then(res =>{
            this.$toast.clear();
            this.balanceInfo = res.data;
          }).catch(error =>{
            console.error("[ERROR]" + error);
          })
      },
      getOtherUserInfo(uid){
        this.getBalance();
        if(uid) this.submitData.toUserId = uid;
        $mask();
        GetOtherUser({
          keywords: uid || this.submitData.toUserId
        }).then(res =>{
          this.$toast.clear();
          res.data.avatarOriginalPath = res.data.avatarOriginalPath ? (this.serverPath + res.data.avatarOriginalPath) : defaultAvatar;
          res.data.avatarThumbnailPath = res.data.avatarThumbnailPath ? (this.serverPath + res.data.avatarThumbnailPath) : defaultAvatar;
          this.otherUserInfo =res.data;
        }).catch(error =>{
          console.error("[ERROR]" + error);
        })
      },
      goBack:function(){
          localStorage.rollRecordUid = '';
          if(!this.barcodeValue){
            this.$router.back();
            return;
          }
          this.$router.push({name: "main", params: {checkIn: false}});
          window.inBack = undefined;
      },
      navigate:function(){
          localStorage.rollRecordUid = this.submitData.toUserId;
          this.$router.push({name: "roll_out_rollRecord", params: {type: this.type}});
      }
    },
    mounted() {
      this.type = this.$route.params.type*1;
    },
    created(){
      let paramsBarcode =  this.$route.params.barcode || '';
      let uid = localStorage.rollRecordUid ? localStorage.rollRecordUid : (this.$route.params.uid || '');
      this.barcodeValue = paramsBarcode;
      if(paramsBarcode) window.inBack = this.goBack;
      if(uid) this.getOtherUserInfo(uid);
      this.initData();
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/style/util.scss";
.dIcon_down {
  background-image: url("icon-53.png");
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
div.formItem .van-password-input{
  width: 100%;
}
</style>

