<template>
    <div class="myCapital setting backPadding bgWhite">
        <top-bar :back-type="2">
            <span slot="content">{{'我的资产' | translate}}</span>
        </top-bar>
        <div class="myCapital__transform">
            <div class="myCapital__transform_msg">
                <p>{{currencyInfo.balance}}</p>
                <span>{{'余额' | translate}}</span>
            </div>
            <i class="dIcon dIcon_transform"></i>
            <div class="myCapital__transform_msg" @click="popupShow = true">
                <p>{{currencyInfo.balance}}</p>
                <span>RMB（中国）<i class="dIcon dIcon_down"></i></span>
            </div>
        </div>
        <div class="m__wrap_30">
            <div class="myCapital__box">
                <div class="myCapital__box-title">
                    {{'数字资产' | translate}}
                </div>
                <div class="myCapital__box-content">
                    <div v-for="(item, index) in currencyInfo.assets" :key="index" class="myCapital__box-content-item">
                        <div class="myCapital__box-content-item-img">
                            <img class="dIcon dIcon_currency" :src="imgCurrencyData[item.currency]">
                        </div>
                        <div class="myCapital__box-content-item-msg">
                            <span>{{baseCurrencyData[item.currency].attribute ? baseCurrencyData[item.currency].attribute.symbol : ''}}</span>
                            <p>{{item.total}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="myCapital__box">
                <div class="myCapital__box-title">
                    {{'其他' | translate}}
                </div>
                <div class="myCapital__box-content">
                    <div class="myCapital__box-content-item">
                        <div class="myCapital__box-content-item-img">
                            <img class="dIcon dIcon_currency" :src="icon_jf">
                        </div>
                        <div class="myCapital__box-content-item-msg">
                            <span class="text-gray">{{'积分' | translate}}</span>
                            <p>{{currencyInfo.userPoints}}</p>
                        </div>
                    </div>
                    <div class="myCapital__box-content-item">
                        <div class="myCapital__box-content-item-img">
                            <img class="dIcon dIcon_currency" :src="icon_vb">
                        </div>
                        <div class="myCapital__box-content-item-msg">
                            <span class="text-gray">X宝</span>
                            <p>{{currencyInfo.xBao}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="myCapital__tips text-orange">
                说明：资产的统计包含可用资产+冻结资产
            </div>
        </div>
        <van-popup v-model="popupShow" position="bottom">
            <div class="myCapital__transform">
                <div class="myCapital__transform_msg">
                    <p>{{currencyInfo.balance}}</p>
                    <span>{{'余额' | translate}}</span>
                </div>
                <i class="dIcon dIcon_transform"></i>
                <div class="myCapital__transform_msg" @click="popupShow = false">
                    <p>{{currencyInfo.balance}}</p>
                    <span>RMB（中国）<i class="dIcon dIcon_down"></i></span>
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
        </van-popup>
    </div>
</template>

<script>
import currency_1 from "./type_1.png";
import currency_2 from "./type_2.png";
import currency_3 from "./type_3.png";
import currency_4 from "./type_4.png";
import currency_5 from "./type_5.png";
import icon_jf from "./icon-57.png";
import icon_vb from "./icon-58.png";
import server from 'src/api/home'
export default {
  data() {
    return {
        icon_jf,
        icon_vb,
        popupShow: false,
        imgCurrencyData:{
            2000:currency_1,
            2001:currency_2,
            2004:currency_3,
            2002:currency_4,
            2003:currency_5,
        },
        currencyInfo:{},
        countryData: [],
        baseCurrencyData:this.$store.getters.clientData.enums.currency
    };
  },
  methods: {
      selectCoutry() {
        this.popupShow = false;
      },
      getCurrentAsset(){
          $mask();
          server.GetCurrentUserAssets().then(res =>{
              this.$toast.clear();
              res.data.assets.forEach(v=>{
                v.total = v.total.toFixed(4);   
              })
              res.data.xBao =  res.data.xBao.toFixed(4);   
              this.currencyInfo = res.data;
          }).catch(error =>{
              console.error("[ERROR]" + error)
          })
      }
  },
  created() {
      this.getCurrentAsset();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.dIcon_down {
  background-image: url("icon-53.png");
}
.dIcon_transform {
  background-image: url("icon-59.png");
}
</style>

 


