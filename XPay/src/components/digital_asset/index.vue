<template>
  <div class="DigitalAsset">
    <div class="DigitalAsset__header">
        <top-bar>
            <div slot="content">
                {{'数字资产'| translate}}
            </div>
        </top-bar>
        <div class="DigitalAsset__header-bottom">
            <div class="present_Price present_Price-text">{{'当前价格' | translate}}</div>
            <div class="present_Price present_Price-value">{{currentCurrency.price}}</div>
        </div>
    </div>
    <div class="DigitalAsset__body BgWhite">
        <div class="DigitalAsset__body-content1 border_bottom">
            <div class="copyAddressBox">
                <img class="copyAddressBox__img" :src="imgCurrencyData[currentCurrency.currency]">
                <div class="copyAddressBox__property">
                    <span class="EFont">{{currencyInfo[currentCurrency.currency] ? currencyInfo[currentCurrency.currency].symbol : ''}}{{'资产' | translate}}</span>
                    <span class="redFont">{{currentCurrency.balance}}</span>
                </div>
                <div class="copyAddressBox__address">
                    <span class="EFont">{{'钱包地址' | translate}}</span>
                </div>
                <button v-if="currentCurrency.address" @click="copyAddress" class="copyAddressBtn YButton YBtton-round YButton-blueborder">{{'复制地址' | translate}}</button>
                <button @click="generateAddress" v-else class="copyAddressBtn YButton YBtton-round YButton-blueborder">{{'获取地址' | translate}}</button>
            </div>
            <div class="copyAddressText">{{currentCurrency.address}}</div>
        </div>
        <div class="DigitalAsset__body-content2">
            <div class="List">
                <router-link tag="div" :to="{name:'digital_rollout',params:{currency:currentCurrency.currency}}"  class="List__item">
                    <img class="Yicon Yicon38" :src="img.icon39">
                    <div>{{'转出' | translate}}</div>
                </router-link>
                <router-link v-if="currentCurrency.currency === 2000" tag="div" to="/crowdfundingCenter"  class="List__item">
                    <img class="Yicon Yicon39" :src="img.icon38">
                    <div>{{'众筹' | translate}}</div>
                </router-link>
                <router-link v-if="currentCurrency.currency === 2000"  tag="div" to="/vDigitalcenter" class="List__item">
                    <img class="Yicon Yicon40" :src="img.icon40">
                    <div>{{'X宝' | translate}}</div>
                </router-link>
                <router-link  tag="div" to="/Digital_Asset/trade_record" class="List__item">
                    <img class="Yicon Yicon41" :src="img.icon41">
                    <div>{{'交易' | translate}}</div>
                </router-link>
            </div>
        </div>
    </div>
    <div class="DigitalAsset__table BgWhite Y_margin_top Y_padding_lr">
        <div class="content3__tableheader">
            <div class="content3__tableheader-left">{{'交易' | translate}}</div>
        </div>
        <div class="content3__tableList" @click="currentCurrency = item" v-for="(item,index) in currencys" :key="index">
            <div class="tableList__item">
                <div class="tableList__item-cell border_bottom">
                    <img class="type_img" :src="imgCurrencyData[item.currency]">
                    <span class="buFont">{{currencyInfo[item.currency] ? currencyInfo[item.currency].symbol : ''}}</span>
                    <div class="blFont">{{item.balance.toFixed(4)}}</div>
                    <div class="EFont">{{currencyInfo[item.currency] ? currencyInfo[item.currency].symbol : ''}} {{'资产' | translate}}</div>
                </div>
                <div class="tableList__item-cell border_bottom">
                    <span class="buFont">&nbsp;</span>
                    <div class="blFont">{{item.price.toFixed(4)}}</div>
                    <div class="EFont"> {{'当前价格' | translate}}</div>
                </div>
                <div class="tableList__item-cell bgWidth border_bottom">
                    <span class="buFont">&nbsp;</span>
                    <div class="blFont">
                        <router-link tag="button" :to="'/Digital_Asset/digital_asset_type/' + item.currency + '-CASH'" class="tab__Button bg-color-01b3ff">现金交易</router-link>
                        <router-link tag="button" :to="'/Digital_Asset/digital_asset_type/' + item.currency + '-BALANCE'" class="tab__Button bg-color-0079f1">余额交易</router-link>
                    </div>
                    <div class="EFont">&nbsp;</div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import icon36 from "./icon-36.png";
import icon38 from "./icon-38.png";
import icon39 from "./icon-39.png";
import icon40 from "./icon-40.png";
import icon41 from "./icon-41.png";
import type_1 from "./type_1.png";
import type_2 from "./type_2.png";
import type_3 from "./type_3.png";
import type_4 from "./type_4.png";
import type_5 from "./type_5.png";
import server from 'src/api/digitalAsset';
export default {
    data() {
        return {
            imgCurrencyData:{
                2000:type_1,
                2001:type_2,
                2004:type_3,
                2002:type_4,
                2003:type_5
            },
            img: {
                icon36,
                icon38,
                icon39,
                icon40,
                icon41
            },
           isactive:true,
           tradeType:"CASH",
           currentCurrency:{},
           currencys:null
        }
    },
    computed:{
        currencyInfo(){
            if(!this.$store.getters.clientData.enums) return {};
            let data = this.$store.getters.clientData.enums.currency;
            let res = {};
            for(let key in data){
                res[key] = data[key].attribute;
            }
            return res;
        }
    },
    created() {
        this.getAssetDatas();
    },
    methods: {
        //复制到粘贴板
        copyAddress(){
            let platFrom = $getPlatform();
            if(platFrom.android) this.copyAddressForAndroid();
            if(platFrom.ios) this.copyAddressForIos();
        },
        //Andriod
        copyAddressForAndroid(){
            if(!window.plus) return;
            const Context = plus.android.importClass("android.content.Context");
            let main = plus.android.runtimeMainActivity();
            let clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
            plus.android.invoke(clip, "setText", this.currentCurrency.address);
            this.$toast($t('复制成功'));
        },
        //IOS
        copyAddressForIos(){
            if(!window.plus) return;
            let UIPasteboard  = plus.ios.importClass("UIPasteboard");
            let generalPasteboard = UIPasteboard.generalPasteboard();
            // 设置文本内容:
            generalPasteboard.setValueforPasteboardType(this.currentCurrency.address, "public.utf8-plain-text");
            // generalPasteboard.valueForPasteboardType("public.utf8-plain-text");  -- 获取文本内容:
            this.$toast($t('复制成功'));
        },
        changeData(type) {
            this.tradeType = type;
        },
        //获取资产数据信息
        getAssetDatas(){
            let $this = this;
            $mask();
            server.getWalletCoins().then(res =>{
                $this.$toast.clear();
                $this.currentCurrency = res.data[0];
                $this.currencys = res.data;
            }).catch(error =>{
                console.log(error);
            })
        },
        //获取钱包地址
        generateAddress(){
            let $this = this;
            $mask();
            server.generateAddress(this.currentCurrency.currency).then(res =>{
                $this.$toast.clear();
                $this.currentCurrency.address = res.data;
            }).catch(error =>{
                console.log(error);
            })
        }
    }
}
</script>


<style rel="stylesheet/scss" lang="scss">
    @import "src/style/util.scss";
    div.DigitalAsset__table.Y_padding_lr{
        padding-right: 0;
    }
</style>
