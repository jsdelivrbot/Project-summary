<template>
  <!--平台公告-->
  <div class="address market-share container marTop330">
    <div class=" fullwidth com-div-fr">
      <div class="notice_detail">
        <div class="notice_detail_back">
          <div class="btn_sm" @click="$router.back()">
            <i class="icon_back m-r-sm"></i>
            {{'返回' | translate}}
          </div>
        </div>
        <div class="notice_detail_title">
          <h3 v-text="content.Title"></h3>
          <p v-text="content.CreateDate"></p>
        </div>
        <div class="notice_detail_inner" v-html="content.Content"></div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.market-share {
  padding-bottom: 57px;
}
.market-share .mtable {
  border-top: 1px solid #e5e5e5;
}
</style>
<script>
import { translate } from "@/tool/filters";
export default {
  data() {
    return {
      content: ""
    };
  },
  methods: {},
  mounted() {
    
    // 获取新闻内容;
    this.axios
      .post("/api/Content/GetNewsContent", {
        token: this.$store.state.token,
        userId: this.$store.getters.getUserId,
        NewsId: this.$route.params.id
      })
      .then(res => {
        this.content = res.Data;
        // this.content = {
        //   Title: "标题1", //标题
        //   Content:
        //     "内容内容内容内容内4545容内容内容内容内容内容内容内容内容内容内容", //内容
        //   CreateDate: "2017/30/10" //时间
        // };
      });
  }
};
</script>
