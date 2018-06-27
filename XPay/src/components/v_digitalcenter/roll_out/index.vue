<template>
  <div class="backPadding boxWhite">
    <top-bar :back-type="2">
      <span slot="content">{{'转出' | translate}}</span>
    </top-bar>
    <div class="m__wrap_30 p__b_80">
        <div class="formItem__wrap">
            <div class="formItem__title">
                {{'当前X宝资产' | translate}}
            </div>
            <div class="formItem">
                <input value="120" readonly type="text" class="inputItem not-line">
                <div class="formItem_border"></div>
            </div>
        </div>
        <div class="formItem__wrap">
            <div class="formItem__title">
                {{'转出数量' | translate}}
            </div>
            <div class="formItem">
                <input :class="{error:!requestData.amount && hasValidate}" v-model="requestData.amount" :placeholder="'请输入转入的X宝数量' | translate" type="text" class="inputItem">
                <div class="formItem_border"></div>
            </div>
        </div>
        <div class="tips">
            {{'提示：最少转入数量100，请输入100的整数倍' | translate}}
        </div>
    </div>
    <div class="position__footer position__footer_lg">
        <div class="dButton dButton__large dButton_blue" @click="validate()">{{'确定' | translate}}</div>
    </div>
    <van-popup v-model="popupData.show" class="show"> 
        <van-password-input :value="requestData.l2Pwd" @focus="popupData.show = true" />
        <van-number-keyboard :transition="false" :class="'popShop-keyboadr'" :hide-on-click-outside="false" :show="popupData.show" theme="custom" :close-button-text="'转出' | translate" @blur="validate('PAY_PASSWORD')" @input="updatePwd" @delete="updatePwd" />
    </van-popup>
  </div>
</template>

<script>
  import server from 'src/api/xbao';
  export default {
    data() {
      return {
        popupData:{
            show:false
        },
        assetInfo:{},
        hasValidate:false,
        requestData:null
      };
    },
    created() {
      this.query();
      this.initData();
    },
    methods: {
      //初始化数据 --建议当数据需要重置时（注:需要放在created生命周期里）
      initData(){
        this.hasValidate = false;
        this.requestData = {
            "amount": '',
            "l2Pwd": ""
        }
      },
      //提交数据
      submit(){
        $mask("提交请求中");
        server.xBaoTransferOut(this.requestData).then(res =>{
          this.$toast.clear();
          this.initData();
          this.$toast($t('资产转出成功'));
        }).catch(error =>{
            console.log("[ERROR]-" + JSON.stringify(error));
        });
      },
      //查询数据
      query(){

      },
      //提交数据认证
      validate(validateCode){
        if(validateCode === 'PAY_PASSWORD'){
          if(!this.requestData.l2Pwd || this.requestData.l2Pwd.length < 6){
              this.$toast($t('请输入6位支付密码'));
              return;
          }
          this.popupData.show = false;
          this.middleware("VALIDATE_PAY_PASSWORD");
          return;
        }
        this.hasValidate = true;
        if(!this.requestData.amount) return;
        if(this.requestData.amount%100 !== 0){
          this.$toast($t('请输入100的整数倍'));
          return;
        }
        this.middleware("VALIDATE");
      },
      //中间件 
      middleware(doneCode,data){
          let middlewareMap = {
            "VALIDATE": "openPasswordEnter",
            "VALIDATE_PAY_PASSWORD":  "submit"
          };
          if(!middlewareMap[doneCode]) return;
          this[middlewareMap[doneCode]](data);
      },
      //事件
      updatePwd(v){
        let l2Pwd = this.requestData.l2Pwd;
        if(v !== 0 && !v){
            l2Pwd = l2Pwd.substr(0,l2Pwd.length-1);
            this.requestData.l2Pwd = l2Pwd;
            return;
        }
        if(l2Pwd.length >= 6){
            l2Pwd = l2Pwd.substr(0,5);
        }
        l2Pwd += (v+'');
        this.requestData.l2Pwd = l2Pwd;
      },
      //打开输入支付密码
      openPasswordEnter(){
        this.popupData.show = true;
        this.requestData.l2Pwd = "";
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "src/style/util.scss";
 div.van-popup{
    &.show{
        top: 40% !important;
        width: 80%;
        div.popShop-keyboadr{
            bottom: -215px !important;
        }
        div.van-password-input{
            margin: 0;
        }
    }
 }
</style>
