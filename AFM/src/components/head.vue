<template>
  <div class="topBgWrap">
    <div class="topper">
      <div class="container">
        <img :src="'/static/img/'+logo_url" class="logo" />
        <div class="info" v-show="user&&user.UserId">
          <router-link :style="{fontSize: '30px'}" tag="i" :class="'iconfont btn_pointer'" :to="{name: 'gbook', params: {isEmail: true}}">&#xe602;</router-link>
          <span class="tx">{{user.NickName}}</span>
          <a href="javascript:;" @click="logout" style="font-size: 30px;" class="iconfont">&#xe60b;</a>
        </div>
      </div>
    </div>
    <div class="topBg"></div>
  </div>
</template>

<style lang="less">
  @import (reference) "../style/css/main.less";
  .topper {
    height: 48px;
    .row;
    .item-center;
    .con-betwwen;
  }
  .topper .info {
    .row;
    .item-center;
  }
  .topper .info .iconfont {
    color: #374049;
  }
  .topper .info .tx {
    padding-left: 30/@rem;
    padding-right: 20/@rem;
    font-size: 11px;
  }
  .el-menu-item {
    min-width: 150px !important;
  }
  .el-submenu .el-menu .el-menu-item:hover {
    background: #dc4b3c !important;
    color: #fff !important;
  }
  .t-22 {
    font-size: 22px !important;
  }
  .nav-1-fr .el-menu-demo .el-menu-item .m-nav .title {
    color: #fff;
  }
</style>

<script>
  import {
    translate
  } from "@/tool/filters";
  export default {
    data() {
      return {
        logo_url: "logo.png",
        query_params: {
          userid: null, //	string	会员id,唯一标识
          token: null //	string	登录成功后,返回的token值
        }
      };
    },
    computed: {
      user: {
        get() {
          let _self = this;
          let user = _self.$store.state.user ? _self.$store.state.user : {};
          return user;
        },
        set(val) {}
      }
    },
    mounted() {
      let _self = this;
      _self.query_params.token = _self.$store.state.token;
      _self.query_params.userid = _self.$store.getters.getUserId;
    },
    methods: {
      logout() {
        let _self = this;
        _self.axios
          .get("/api/user/Logout", {
            params: _self.query_params
          })
          .then(res => {
            if (res.Code == "0") {
              localStorage.removeItem("amf_user");
              _self.$router.push("/login");
            }
          })
          .catch(err => {});
      }
    }
  };
</script>
