<template>
  <el-dialog class="common-dialog" :visible.sync="data.d_visible">
    <div slot="title">
      <div class="con-title-fr">
        <div class="sub-fr"></div>
        <span class="con-title">
          {{'温馨提示'| translate}}
        </span>
      </div>
    </div>
    <div class="dia-content">
      <template v-if="data.register_way == 1">
        <span class="tcenter">
          {{'注册成功，请登录并激活账号！'| translate}}

        </span>
        <span class="tcenter">
          {{'激活方式：进入“市场管理-我要激活”页面升级激活。'| translate}}
        </span>
        <span class="tcenter">
          {{'注意：如果24小时没有激活，账号将自动删除。'| translate}}
        </span>
      </template>
      <template v-else>
        <span class="tcenter">
          {{'注册成功，请激活账号！'| translate}}
        </span>
        <span class="tcenter">
          {{'注意：如果24小时没有激活，账号将自动删除。'| translate}}
        </span>
      </template>

    </div>
    <div slot="footer" style="padding-bottom: 40px;font-size: 13px;">
      <div class="col con-center item-center" v-if="data.register_way == 1">
        <a href="javascript:;" @click="tologinPage"
           class="btn red-btn com-btn" style="font-size: 13px;">
           {{'确定'| translate}}
           </a>
      </div>
      <div class="row item-center con-center" v-else>
        <a style="color: #dc4b3c;" href="javascript:;" @click="toSharepage" class="red-fr-btn com-btn">
          {{'暂不激活'| translate}}
        </a>
        <a href="javascript:;" @click="toActiateUser" class="btn red-btn  com-btn"
           style="margin-left: 58px;">
           {{'立即激活'| translate}}
           </a>
      </div>
    </div>
  </el-dialog>

</template>
<style lang="less">
@import (reference) "../../style/css/main.less";
@import (reference) "../../style/css/com_dialog.less";
</style>
<script>
import { Dialog } from "element-ui";
import Vue from "vue";
Vue.use(Dialog);
import { translate } from "@/tool/filters";

export default {
  props: ["data"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    tologinPage() {
      //跳转登录页
      let _self = this;
      _self.data.d_visible = false;
      _self.$router.replace("/login");
    },
    toActiateUser() {
      //激活用户
      let _self = this;
      //打开激活对话框
      _self.data.d_visible = false;
      _self.$emit("to-activate");
    },
    toSharepage() {
      //跳转我的分享
      let _self = this;
      _self.$router.replace("/market/share");
    }
  }
};
</script>
