<script src="../build/webpack.base.conf.js"></script>
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import { translate } from '@/tool/filters'

  export default {
    name: 'app',
    data () {
      return {}
    }
  }
</script>

<style>

</style>
