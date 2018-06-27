<template>
  <div class="DigitalAsset">
    <div class="DigitalAsset__header">
        <top-bar>
            <div class="topBar__right" slot="right">
                <span>{{'交易记录' | translate}}</span>
            </div>
            <div slot="content">
                {{'数字资产'| translate}}
            </div>
        </top-bar>
        <div class="DigitalAsset__header-bottom">
            <div class="present_Price present_Price-text">当前价格</div>
            <div class="present_Price present_Price-value">17.668</div>
        </div>
    </div>
    <div class="DigitalAsset__body BgWhite">
        <div class="DigitalAsset__body-content1 border_bottom">
            <div class="copyAddressBox">
                <img class="copyAddressBox__img" :src="icon36">
                <div class="copyAddressBox__property">
                    <span class="EFont">Xpay资产</span>
                    <span class="redFont">0.00000</span>
                </div>
                <div class="copyAddressBox__address">
                    <span class="EFont">钱包地址</span>
                </div>
                <button class="copyAddressBtn YButton YBtton-round YButton-blueborder">复制地址</button>
            </div>
            <div class="copyAddressText">XpAy31164646YTIA4636JNojaMLi1A6YTIA4636JN</div>
        </div>
        <div class="DigitalAsset__body-content2">
            <div class="List">
                <div class="List__item">
                    <img class="Yicon Yicon38" :src="icon38">
                    <span>转出</span>
                </div>
                <div class="List__item">
                    <img class="Yicon Yicon39" :src="icon39">
                    <span>众筹</span>
                </div>
                <div class="List__item">
                    <img class="Yicon Yicon40" :src="icon40">
                    <span>X宝</span>
                </div>
                <div class="List__item">
                    <img class="Yicon Yicon41" :src="icon41">
                    <span>交易</span>
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
export default {
    data() {
        return {
           icon36,
           icon38,
           icon39,
           icon40,
           icon41
        }
    }
}
</script>

<style>

</style>
