<template>
  <div class="bank backPadding bgWhite">
    <top-bar :back-type="2">
      <span slot="content">{{'我的银行卡' | translate}}</span>
      <div slot="right" class="bank__title-right" @click="changeArea">
        <div class="dIcon dIcon_coutry"></div>
        <div class="dButton bank__btn dButton_textBlue">{{areaData.value.name | translate}}</div>
      </div>
    </top-bar>
    <div class="rollOut__exchange-padding"></div>
    <van-cell-swipe v-for="(item,index) in bankList" :key="index" :data-value="item.id" :left-width="100" :right-width="100">
      <div class="bank__item active">
        <div class="bank__item-img">
          <img class="dIcon dIcon_bank" :src="bankImg[index]">
        </div>
        <div class="bank__item-msg">
          <span>{{item.bankName}}</span>
          <p>{{setHideBankNo(item.cardNo)}}</p>
        </div>
        <div class="bank__item-right">
          <i class="van-icon van-icon-success" :style="{'visibility':item.isDefault ? 'visible' :'hidden'}"></i>
          <p @click="setDefalutBank(item.id)">{{'设为默认' | translate}}</p>
        </div>
      </div>
      <div class="bank__item-swipeRight" slot="right" @click="deleteBankInfo(item.id)">{{'删除' | translate}}</div>
      <div class="bank__item-swipeRight" slot="left" @click="editBankInfo(item.id)">{{'编辑' | translate}}</div>
      
    </van-cell-swipe>
    <div class="empty__date" v-if="!bankList || bankList.length <= 0">
      <span>{{'暂无银行卡信息，您可添加银行卡信息' | translate}}</span>
    </div>
    <div class="position__footer position__footer_lg">
      <router-link to="/add_bank/0" tag="div" :class="'m-b dButton dButton__large dButton_blue'">{{'+ 添加银行卡' | translate}}</router-link>
    </div>

    <area-selection :value="areaData.value.name"  @update="selectionUpdate" :show.sync="areaData.show"></area-selection>
  </div>
</template>

<script>
  import bank1 from "./bank-1.png";
  import bank2 from "./bank-2.png";
  import bank3 from "./bank-3.png";
  import areaSelection from 'src/components/area_selection';
  import bankServer from '../../../api/bankInfo';
  export default {
    components: {
      areaSelection
    },
    data() {
      return {
        bankList:null,
        areaData: {
          show: false,
          value: this.$store.getters.clientData.countryValue
        },
        bankImg: [bank1, bank2, bank3,bank3,bank3,bank3,bank3],
        defalutIndex: -1
      };
    },
    created:function(){
      this.getAllBankInfo();
    },
    methods: {
      changeArea() {
        this.areaData.show = true;
        console.log(this.areaShow);
      },
      selectionUpdate:function(val){
        this.areaData.value = val;
        this.$store.dispatch('changeCountryValue',val);
        this.getAllBankInfo();
      },
      // 设为默认银行卡
      setDefalutBank(bankId) {
         let $this = this;
        bankServer.setDefalutBankInfo(bankId).then(res =>{
          if(res.code !== 20000){
             $this.$toast('设置默认银行卡失败');
            return;
          }          
          $this.$toast('设置默认银行卡成功');
          $this.getAllBankInfo();
        })
      },
      //获取所有银行卡信息
      getAllBankInfo(){
        let $this = this;
        bankServer.getBankAll(this.areaData.value.code).then(res =>{
          $this.bankList = res.data;
        }).catch(error =>{
          console.log(error)
        })
      },
      //银行卡隐藏中心位数
      setHideBankNo(bankno){
        let res = " **** **** ";
        let start = bankno.substr(0,3);
        let end = bankno.substr(bankno.length-4);
        return start + res + end;
      },
      //删除银行卡信息
      deleteBankInfo(bankId){
        let $this = this;
        bankServer.deleteBankInfo(bankId).then(res =>{
          if(res.code !== 20000){
             $this.$toast('删除银行卡失败');
            return;
          }          
          $this.$toast('删除银行卡成功');
          $this.getAllBankInfo();
        })
      },
      editBankInfo(bankId){
         this.$router.push("/add_bank/" + bankId);
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
    @import "src/style/util.scss";
  .dIcon_coutry {
    background-image: url("icon-28.png");
  }
  div.empty__date{
      text-align: center;
      padding: f(48) 0;
      border-bottom: f(2) solid #c1c1c1;
  }
  div.bank__item-swipeRight.bg-color-red{
    background-color: red;
  }
</style>
