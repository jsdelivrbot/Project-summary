<template>
    <div class="versions backPadding bgWhite">
        <top-bar :back-type="2">
            <div slot="content">{{'版本' | translate}}</div>
        </top-bar>
        <div class="versions_content">
            <div class="login__logoTop"></div>
            <div class="login__logoBottom"></div>
            <div class="versions_content-msg">
                <p>{{'版本号' | translate}}：1.1.3</p>
                <p>{{'更新时间' | translate}}：2018-04-30</p>
            </div>
        </div>
        <div class="versions_footer">
            <div class="versions_footer-title">
                {{'发布内容' | translate}}：
            </div>
            <div class="versions_footer-content">
                <p>1.{{'优化注册登录' | translate}}：</p>
                <p>2.{{'优化后台管理登录' | translate}}。</p>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        methods: {
            submit() {}
        },
        mounted() {}
    };
</script>

<style rel="stylesheet/scss" lang="scss">
    .login__logoTop {
        background-image: url("./icon_1.png");
    }
    .login__logoBottom {
        background-image: url("./icon_2.png");
    }
</style>
