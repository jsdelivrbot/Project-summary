<template>
    <div class="rollOut backPadding">
        <top-bar :back-type="2">
            <span slot="content">{{'转出' | translate}}</span>
            <router-link to="/digital_rollout_record" tag="span" slot="right">
                {{'转出记录' | translate}}
            </router-link>
        </top-bar>
        <div class="m__wrap_30 p__b_80">
            <div class="formItem__wrap">
                <div class="formItem__title">
                    {{(currencyDatas[requestData.currency] ? currencyDatas[requestData.currency].symbol : '')  | translate}}
                </div>
                <div class="formItem">
                    <input v-model.trim="requestData.amount" @blur="events('BLUR_AMOUNT')" :class="{error:hasValidate && !requestData.amount}" :placeholder="'输入转出数量（如有小数保留2位）' | translate" type="text" class="inputItem">
                    <div class="formItem_border"></div>
                </div>
            </div>
            <div class="formItem__wrap">
                <div class="formItem__title">
                    {{'转出地址' | translate}}
                </div>
                <div class="formItem">
                    <input v-model.trim="requestData.to"  :class="{error:hasValidate && !requestData.to}" :placeholder="'手机/UID/钱包地址' | translate" type="text" class="inputItem">
                    <div class="formItem_border"></div>
                </div>
            </div>
        </div>
        <div class="position__footer position__footer_lg">
            <div class="m-b dButton dButton__large dButton_blue" @click="submit">{{'确定' | translate}}</div>
        </div>
        <van-popup v-model="popupData.show" class="show"> 
            <van-password-input :value="requestData.l2Pwd" @focus="popupData.show = true" />
            <van-number-keyboard :transition="false" :class="'popShop-keyboadr'" :hide-on-click-outside="false" :show="popupData.show" theme="custom" :close-button-text="'转出' | translate" @blur="requestSubmit" @input="updatePwd" @delete="updatePwd" />
        </van-popup>
    </div>
</template>

<script>
    import server from 'src/api/send';
    export default {
        data() {
            return {
                popupData:{
                    show:false
                },
                requestData:null,
                hasValidate:false
            };
        },
        created(){
            this.initData();
        },
        computed:{
            currencyDatas(){
                if(!this.$store.getters.clientData.enums) return {};
                let data = this.$store.getters.clientData.enums.currency;
                let res = {};
                for(let key in data){
                    let val = data[key];
                    if(!val.attribute){
                        val.symbol = val.name;
                        res[key] = val;
                        continue;
                    }
                    val = val.attribute;
                    val.value = key;
                    res[key] = val;
                }
                return res;
            }
        },
        methods:{
            //初始化数据  --重置数据可以复用
            initData(){
                let params = this.$route.params || {};
                let currency = params.currency || '2000';
                this.hasValidate = false;
                this.requestData = {
                    currency: currency,
                    amount:'',
                    to:"",
                    l2Pwd:""
                }
            },
            //提交数据验证
            validate(){
                let data = this.requestData;
                let isPass = true;
                this.hasValidate = true;
                for(let key in data){
                    let v = data[key];
                    if(key === 'l2Pwd') continue;
                    if(!v) isPass = false;
                }
                return isPass;
            },
            //数据提交
            submit(){
                if(!this.validate()) return;
                this.requestData.l2Pwd = "";
                this.popupData.show = true;
            },
            //提交请求
            requestSubmit(){
                if(!this.requestData.l2Pwd || this.requestData.l2Pwd.length < 6){
                    this.$toast($t('请输入6位支付密码'));
                    return;
                }
                this.popupData.show = false;
                $mask();
                server.assetSendOut(this.requestData).then(res =>{
                    this.$toast.clear();
                    this.initData();
                    this.$toast($t('转出成功'));
                }).catch(error =>{
                    console.log("[ERROR]-" + JSON.stringify(error));
                });
            },
            //事件列表
            events(code){
                let mapEvents = {
                    "BLUR_AMOUNT": "validateAmountFormat"
                }
                if(!mapEvents[code]) return;
                this[mapEvents[code]]();
            },
            //验证转出数量格式
            validateAmountFormat(){
                this.requestData.amount =  parseFloat(this.requestData.amount) || '';
            },
            //密码输入改变记录
            updatePwd(v){
                let l2Pwd = this.requestData.l2Pwd;
                if(!v){
                    l2Pwd = l2Pwd.substr(0,l2Pwd.length-1);
                    this.requestData.l2Pwd = l2Pwd;
                    return;
                }
                if(l2Pwd.length >= 6){
                    l2Pwd = l2Pwd.substr(0,5);
                }
                l2Pwd += (v+'');
                this.requestData.l2Pwd = l2Pwd;
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

