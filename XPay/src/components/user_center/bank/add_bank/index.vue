<template>
    <div class="bank backPadding bgWhite">
        <top-bar :back-type="2">
            <span slot="content">{{bankId ? '编辑银行卡信息' :'添加银行卡' | translate}}</span>
            <div class="bank__title-right" slot="right" @click="areaData.show = true">
                <div class="dIcon dIcon_coutry"></div>
                <div class="dButton bank__btn dButton_textBlue">{{areaData.value.name | translate}}</div>
            </div>
        </top-bar>
        <div class="bank__tips">* {{'请绑定持卡人本人的银行卡，姓名一旦填写不可更改' | translate}}</div>
        <div class="m__wrap_30">
            <div class="bank__input-wrap">
                <!-- <div class="formItem__wrap">
                    <div class="formItem__title">
                        <span class="text-orange">*</span> {{'邀请码' | translate}}
                    </div>
                    <div class="formItem">
                        <input :placeholder="'请输入邀请码' | translate" type="text" class="inputItem">
                        <div class="formItem_border"></div>
                    </div>
                </div> -->
                <div class="formItem__wrap">
                    <div class="formItem__title">
                        <span class="text-orange">*</span> {{'持卡人姓名' | translate}}
                    </div>
                    <div class="formItem">
                        <input :class="{'error':enabelValidate && !submitData.cardholderName}" v-model="submitData.cardholderName" :placeholder="'请输入持卡人姓名' | translate" type="text" class="inputItem">
                        <div class="formItem_border"></div>
                    </div>
                </div>
                <div class="formItem__wrap">
                    <div class="formItem__title">
                        <span class="text-orange">*</span> {{'开户银行' | translate}}
                    </div>
                    <div class="formItem formItem__slot">
                        <input :class="{'error':enabelValidate && !submitData.bankName}" v-model="submitData.bankName" @click="popupShow = true" readonly :placeholder="'请选择开户银行' | translate" type="text" class="inputItem">
                        <div class="formItem_border"></div>
                        <div @click="popupShow = true" class="inputItem__slot" >
                            <i class="dIcon dIcon_down"></i>
                        </div>
                    </div>
                </div>
                <div class="formItem__wrap">
                    <div class="formItem__title">
                        <span class="text-orange">*</span> {{'银行卡号' | translate}}
                    </div>
                    <div class="formItem">
                        <input :class="{'error':enabelValidate && !submitData.cardNo}" v-model="submitData.cardNo" :placeholder="'请输入开户银行的卡号' | translate" type="number" class="inputItem">
                        <div class="formItem_border"></div>
                    </div>
                </div>
                <div class="formItem__wrap">
                    <div class="formItem__title">
                        <span class="text-orange">*</span> {{'开户支行' | translate}}
                    </div>
                    <div class="formItem">
                        <input :class="{'error':enabelValidate && !submitData.subbranch}" v-model="submitData.subbranch" :placeholder="'请输入开户银行的支行分行' | translate" type="text" class="inputItem">
                        <div class="formItem_border"></div>
                    </div>
                </div>
                <div class="formItem__wrap">
                    <div class="formItem__checkbox">
                        <input id="check" type="checkbox" v-model="submitData.isDefault">
                        <label for="check">
                            设为默认
                        </label>
                        
                    </div>
                    
                </div>
            </div>
            <div @click="submit" class="dButton dButton__large dButton_blue">{{'确认' | translate}}</div>
        </div>

        <!-- 选择银行 -->
        <van-popup v-model="popupShow" position="bottom">
            <van-picker show-toolbar
            :title="''"
            :columns="columns"
            @cancel="onCancel"
            @confirm="onConfirm"
            @change="onChange" />
        </van-popup>
        <area-selection :value="areaData.value.name"  @update="selectionUpdate" :show.sync="areaData.show"></area-selection>
    </div>
</template>

<script>
import bankServer from '../../../../api/bankInfo';
import areaSelection from 'src/components/area_selection';
export default {
    components: {
        areaSelection
    },
    data() {
        return {
            popupShow: false,
            columns: ["中国银行", "农业银行", "工商银行", "建设银行", "招商银行"],
            submitData:{
                "countryCode": "",
                "cardholderName": "",
                "bankName": "",
                "cardNo": "",
                "subbranch": "",
                "isDefault": true
            },
            enabelValidate:false,
            areaData: {
                show: false,
                value: this.$store.getters.clientData.countryValue
            },
            bankId:0
    };
  },
  created(){
      this.submitData.countryCode = this.areaData.value.code;
      this.bankId = this.$route.params.bankId * 1;
      if(this.bankId > 0) this.getBankInfo();
  },
  methods: {
    submit() {
        let isPass = true;    
        this.enabelValidate = true;
        //非空判断
        for(let i in this.submitData){
            if(i === 'isDefault') continue;
            if(!this.submitData[i]){
                isPass = false;
                break;
            }
        }
        if(!isPass) return;
        let $this = this;
        if(this.submitData.id){
            this.editBankInfo();
            return
        }
        bankServer.addBankInfo(this.submitData).then(res =>{
            if(res.code !== 20000) {
                $this.$toast($t('添加银行卡失败'));
                return;
            }
             $this.$toast($t('添加银行卡成功'));
             $this.$router.back();
        }).catch(error =>{
            console.log("error");
        })
    },
    onChange(picker, value, index) {
      this.submitData.bankName = value;
    },
    selectionUpdate:function(val){
        this.areaData.value = val;
        this.$store.dispatch('changeCountryValue',val);
        this.submitData.countryCode = val.code;
    },
    onConfirm(value, index) {
      this.submitData.bankName = value;
      this.popupShow = false;
    },
    onCancel(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      this.popupShow = false;
    },
    getBankInfo(){
        let $this = this;
        bankServer.getBankInfoById(this.bankId).then(res =>{
            $this.submitData = res.data;
        }).catch(error =>{
            console.log(error);
        })
    },
    editBankInfo:function(){
        let $this = this;
        bankServer.updateBankInfo(this.submitData).then(res =>{
            if(res.code !== 20000) {
                $this.$toast($t("修改银行卡失败"));
                return;
            }
             $this.$toast($t('修改银行卡成功'));
             $this.$router.back();
        }).catch(error =>{
            console.log(error);
        })
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.dIcon_coutry {
  background-image: url("icon-28.png");
}
.dIcon_down {
  background-image: url("icon-53.png");
}
.formItem__checkbox {
  input[type="checkbox"] {
    &:checked + label {
      &:before {
        background-image: url("icon-55.png");
      }
    }
  }
  label {
    &:before {
      background-image: url("icon-54.png");
    }
  }
}
</style>
