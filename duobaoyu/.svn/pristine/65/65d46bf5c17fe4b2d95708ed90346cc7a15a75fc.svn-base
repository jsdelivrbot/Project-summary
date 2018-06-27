<template>
  <div class="close" @click="goback(Router)">
    <img src="static/imgs/close_page.png">
  </div>
</template>

<script>
  export default {
    props: ['Router'],
    data() {
      return {
      }
    },
    created() {
      console.log('aaaa', this.$route)
    },
    methods: {
      goback(router) {
        if (router) {
          this.$router.push({path:'/dashboard'})
        } else {
          this.$router.go(-1);
        }
      }
    }
  }
</script>

<style>

</style>
