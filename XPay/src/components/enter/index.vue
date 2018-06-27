<template>
  <div class="enter">
      <div class="enter__title">{{'创造区块链新支付时代' | translate}}</div>
      <div class="enter__action enter__action_top">{{'数字资产' | translate}}</div>
      <div class="enter__action enter__action_left">{{'流通增值' | translate}}</div>
      <div class="enter__action enter__action_right">{{'拆分互助' | translate}}</div>
      <div class="enter__action enter__action_bottom">{{'分红复利' | translate}}</div>
      <div class="enter__select">
        <router-link to="/register" tag="div" :class="'dButton dButton__middel dButton_transparency'">{{'注册' | translate}}</router-link>
        <router-link tag="div" to="/login" :class="'dButton dButton__middel dButton_white'">{{'登录' | translate}}</router-link>
      </div>
      <div class="enter__language">
        <span>Change English</span>
      </div>
  </div>
</template>

<script>
export default {};
</script>


<style rel="stylesheet/scss" lang="scss">
.enter:before {
    background-image: url(./login_enter.jpg);
}
</style>