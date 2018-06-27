<template>
  <div class="disable">
      <div class="disable_top clearfix">
        <div class="disable_top_left fl"></div>
        <div class="disable_top_right fl">{{'会员管理系统' | translate}}</div>
      </div>
      <div class="disable_bottom">
        <div class="disable_bottom_msg1">
          <p>
          {{msg.OutOfServiceTitle}}
            
           <!-- {{'系统升级维护中，' | translate}} -->
          </p>
          <p>
           <!-- {{'请稍后访问...' | translate}} -->
          </p>
        </div>
        <div class="disable_bottom_msg2">
          {{msg.OutOfServiceContent}}
        </div>
        <div class="disable_bottom_img"></div>
      </div>
  </div>
</template>

<style>

</style>

<script>
export default {
  data() {
    return {
      msg: {}
    };
  },
  mounted() {
    this.axios
      .post("/api/user/GetSysOutInfo")
      .then(res => {
        this.msg = res.Data;
      })
      .catch(err => {});
  }
};
</script>



