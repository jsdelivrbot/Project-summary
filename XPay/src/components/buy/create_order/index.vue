<template>
    <div class="rollOut backPadding">
        <top-bar :back-type="2">
            <span slot="content">{{'订单请求' | translate}}</span>
        </top-bar>
        <div class="operat_choose_remittance">
            <img src="../../../../static/img/icon-34.png"/>
            <label>请选择打款人</label>
        </div>
    </div>
</template>
<script>
export default {
  
}
</script>
<style rel="stylesheet/scss" lang="scss">
    @import "src/style/util.scss";
   div.operat_choose_remittance{
        width: f(750);
        height: f(80);
        background-color: #1ec2ff;
   }
</style>


