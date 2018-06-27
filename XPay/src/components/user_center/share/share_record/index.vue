<template>
    <div class="rollOut__record backPadding boxWhite">
        <top-bar :back-type="2">
            <span slot="content">{{'分享记录' | translate}}</span>
        </top-bar>
        <div class="rollOut__exchange-padding"></div>
        <div class="rollOut__record-list">
            <div class="rollOut__record-list-item" v-for="item in listData">
                <div class="rollOut__record-list-item-left">
                    <img src="/static/img/icon-46.png" class="userCenter__msg-logo logo-icon">
                </div>
                <div class="rollOut__record-list-item-right">
                    <div class="rollOut__record-list-item-right-top">
                        <span>火星人</span>
                    </div>
                    <div class="rollOut__record-list-item-right-bottom">
                        <span>{{'手机号'}}:1772159</span>
                        <span>2018-04-30 09:00</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                listData: [1, 2, 3]
            };
        }
    };
</script>
