<template>
    <div class="backPadding boxWhite">
        <top-bar :back-type="2">
            
                <span v-if="type === 0" slot="content">{{'修改登录密码' | translate}}</span>
                <router-link :to="{name: 'forgetPwd', params: {type: 0}}" v-if="type === 0" slot="right">{{'忘记登录密码' | translate}}</router-link>
                <span v-if="type === 1" slot="content">{{'修改支付密码' | translate}}</span>
                <router-link :to="{name: 'forgetPwd', params: {type: 1}}" v-if="type === 1" slot="right">{{'忘记支付密码' | translate}}</router-link>
        </top-bar>
        <div class="m__wrap_30 p__b_120">
            <div>
                <div class="formItem__wrap">
                    <div class="formItem__title">
                        {{type === 0 ? '旧密码' : '旧支付密码'  | translate}}
                    </div>
                    <div class="formItem">
                        <input v-if="type === 0" v-model.trim="submitData.l1Pwd" :class="{error:!submitData.l1Pwd && hasValidate}" :placeholder="'输入旧密码' | translate" type="password" class="inputItem">
                        <input v-if="type === 1" v-model.trim="submitData.l2Pwd" :class="{error:!submitData.l2Pwd && hasValidate}" :placeholder="'输入旧支付密码' | translate" type="password" class="inputItem">
                        <div class="formItem_border"></div>
                    </div>
                </div>
                 <div class="formItem__wrap ">
                    <div class="formItem__title">
                        {{type === 0 ? '新密码' : '新支付密码'  | translate}}
                    </div>
                    <div class="formItem">
                        <input v-if="type === 0" v-model.trim="submitData.newL1Pwd" :class="{error:!submitData.newL1Pwd && hasValidate}"  :placeholder="'输入您新密码' | translate" type="password" class="inputItem">
                        <input v-if="type === 1" v-model.trim="submitData.newL2Pwd" :class="{error:!submitData.newL2Pwd && hasValidate}"  :placeholder="'输入新支付密码' | translate" type="password" class="inputItem">
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
import server from '../../../api/userSecurity';
export default {
  data() {
    return {
      type: 0,
      hasValidate:false,
      submitData:null
    };
  },
  created(){  
    this.type = Number(this.$route.params.type);
    this.initData();
  },
  methods: {
    initData(){
        this.hasValidate = false;
        if(this.type == 1){
            this.submitData = {
                l2Pwd:"",
                newL2Pwd:""
            };
            return;
        }
        this.submitData = {
            l1Pwd:"",
            newL1Pwd:""
        };
    },
    submit() {
        this.hasValidate = true;
        let isPass = true;
        for(let i in this.submitData){
            if(!this.submitData[i]){
                isPass = false;
                break;
            }
        }
        if(!isPass) return;
        $mask("提交中");
        if(this.type === 0){
            this.submitEditUserPassword()
            return;
        }
        this.submitEditPayPassword();
    },
    //修改登陆密码
    submitEditUserPassword(){
        let $this = this;
        server.updateUserPassword(this.submitData).then(res =>{
            $this.$toast.clear();
            $this.initData();
            if(res.code !== 20000){
                $this.$toast($t("修改登录密码失败"));
                return;
            }
            $this.$toast($t("修改登录密码成功"));
        }).catch(error =>{
            console.log(error);
        });
    },
    //修改支付密码
    submitEditPayPassword(){
        let $this = this;
        server.updatePayPassword(this.submitData).then(res =>{
            $this.$toast.clear();
            $this.initData();
            if(res.code !== 20000){
                $this.$toast($t("修改支付密码失败"));
                return;
            }
            $this.$toast($t("修改支付密码成功"));
        }).catch(error =>{
            console.log(error);
        });
    }
  }
};
</script>

<style>

</style>
