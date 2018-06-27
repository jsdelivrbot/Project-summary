<template>
    <div class="share backPadding">
        <top-bar :back-type="1" class="share__top-bar">
            <div slot="content">{{'分享' | translate}}</div>
            <router-link to="/userCenter_share_record" tag="div" slot="right">
                {{'分享记录' | translate}}
            </router-link>
        </top-bar>
        <div class="share__wrap">
            <div class="share__title">
                {{'扫一扫，即可分享好友' | translate}}
            </div>
            <div class="share__triangle">
                <i class="dIcon dIcon_triangle"></i>
            </div>
            <div class="share__qr">
                <qriously :value="qrAdrees" :size=270 />
            </div>
            <div class="m-b dButton dButton__large dButton-radius-sm dButton-border_white">
                {{'复制Xpay下载地址' | translate}}
            </div>
            <div class="m-b dButton dButton__large dButton-radius-sm dButton_gray-white">
                {{'保存二维码' | translate}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                qrAdrees: "https://www.baidu.com/"
            };
        },
        computed: {},
        methods: {}
    };
</script>

<style rel="stylesheet/scss" lang="scss">
    .dIcon_triangle {
        background-image: url("../../../../static/img/icon-43.png");
    }
</style>
