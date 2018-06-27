<template>
  <div class="dashboard-container">
    <div class="margin-top">
      <div class="noticeBox">
        <img src="static/imgs/noticeIcon.png">
        <span>恭喜农场主<font class="userName">天天种地的富翁</font>，抽中IPAD!!!</span>
      </div>
    </div>
    <div class="main_left">
      <img src="static/imgs/haitun_06.png">
    </div>
    <div class="main_center">
      <div class="Pond_items">
        <div class="pond_item" v-if="pondData" v-for="item in pondData" :key="item.id">
           <pond :item="item"></pond>
        </div>
      </div>
    </div>
    <div class="main_right">
      <img src="static/imgs/meirenyu_05.png">
    </div>
    <!-- <div @click="logout" class="dashboard-text">name:{{name}}</div>
          <div class="dashboard-text">role:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->
          <open-pond v-if="isOpenPond" :openPond="openPondData" v-on:close-pond="closeOpenPond"></open-pond>
  </div>
</template>

<script>
import * as ajax from "@/api/common";
import { mapGetters } from "vuex";
import openPond from "@/components/openPond";
import shop from "@/views/shop/index";
import { pond } from "@/views/dashboard/part/pond";
export default {
  name: "dashboard",
  data() {
    return {
      isOpenPond: false,
      openPondData: "",
      pondData: false
    };
  },
  created:function() {
    this.isOpenPond = true;
    
    this.bindPondData();
    // this.$store.dispatch('GetInfo').then(response => { // 拉取用户信息
    //     console.log(response)
    // })
  },
  methods: {
    bindPondData() {
      ajax.post("/api/Pond/PondList", {}).then(response => {
        this.pondData = response.result;
      });
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    },
    closeOpenPond(open) {
      this.isOpenPond = open;
      console.log(this.isOpenPond);
    }
  },
  components: {
    openPond
  },
  mounted() {
    //this.isOpenPond=true
    console.log(this.$store);
  },
  computed: {
    ...mapGetters(["name", "roles"])
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
