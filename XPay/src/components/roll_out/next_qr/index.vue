<template>
    <div class="share backPadding">
        <top-bar :back-type="1" >
            <div slot="content">{{'转入' | translate}}</div>
            <router-link to="/roll_out/1/rollRecord" tag="div" slot="right">
                {{'转入记录' | translate}}
            </router-link>
        </top-bar>
        <div class="share__wrap">
            <div class="share__title">
                {{'扫一扫，向我付款' | translate}}
            </div>
            <div class="share__triangle">
                <i class="dIcon dIcon_triangle"></i>
            </div>
            <div class="share__qr">
                <qriously :value="qrAdrees" :size=270 />
            </div>
            <div class="m-b dButton dButton__large dButton-radius-sm dButton_gray-white">
                {{'保存二维码' | translate}}
            </div>
        </div>
    </div>
</template>

<script>
    import { GetCurrentUser } from "../../../api/user";
    export default {
        data() {
            return {
                qrAdrees: "xpay://receive?uid={{UserId}}&mno={{MobileNo}}"
            };
        },
        created(){
            let data = this.$store.getters.userInfo;
            this.qrAdrees = this.qrAdrees.replace('{{UserId}}',data.id).replace('{{MobileNo}}',data.mobileNo);
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss">
    .dIcon_triangle {
        background-image: url("icon-43.png");
    }
</style>
