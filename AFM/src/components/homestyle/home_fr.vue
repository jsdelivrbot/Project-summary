<template>
    <div class="index com-home">
      <mheader></mheader>
      <mnav></mnav>
      <router-view></router-view>
    </div>
</template>
<style lang="less">
  @import (reference) "./../../style/css/main.less";
  @import "./../../style/css/home_fr_common.less";
</style>
<script>
  import { translate } from '@/tool/filters'

  export default {
    components:{
      "mnav":()=>import(/* webpackChunkName: "com" */'@/components/homestyle/common_nav.vue'),
      'mheader':() => import(/* webpackChunkName: "com" */'@/components/head.vue')
    },
    data () {
      return {
      }
    },


  }
</script>
