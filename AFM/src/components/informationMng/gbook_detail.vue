<template>
  <!--平台公告-->
  <div class="gbook_detail address market-share container marTop330">
    <div class=" fullwidth com-div-fr">
      <div class="notice_detail_back">
        <div class="btn_sm" @click="$router.back()">
          <i class="icon_back m-r-sm"></i>{{'返回' | translate}}
        </div>
      </div>
      <div class="con-title-fr">
        <div class="sub-fr"></div>
        <span class="con-title">
                      {{'留言详情'| translate}}
                  </span>
      </div>
      <div class="gbook_detail_inner">
        <div class="gbook_detail_inner_wrap">
          <div class="gbook_detail_inner_item"  v-for="(item,index) in MessageData" :key="index">
            <div class="gbook_detail_inner_item_left">
              <div
              :style="{backgroundImage: item.MemberType==2 && !item.UserCode? 'url(' + '/static/img/btn-6.png' + ')': 'url(' + '/static/img/c'+ item.CurrentLevelId +'.png' + ')'}" 
              class="gbook_detail_inner_item_left_img">
              </div>
            </div>
            <div class="gbook_detail_inner_item_right">
              <div class="gbook_detail_inner_item_right_top">
                {{item.UserCode ? item.UserCode : '客服' | translate}} <span>{{item.CreateDate}}</span>
              </div>
              <div class="gbook_detail_inner_item_right_bottom">
                {{item.Content}}
              </div>
            </div>
          </div>
          <!-- <div class="gbook_detail_inner_item gbook_detail_inner_item-service">
                <div class="gbook_detail_inner_item_left">
                  <div class="gbook_detail_inner_item_left_img">
                  </div>
                </div>
                <div class="gbook_detail_inner_item_right">
                  <div class="gbook_detail_inner_item_right_top">
                    hy00000001 <span>2017-10-27 14:45:50</span>
                  </div>
                  <div class="gbook_detail_inner_item_right_bottom">
                    总是提示账号不存在。
                  </div>
                </div>
              </div> -->
        </div>
      </div>
      <div class="gbook_detail_send">
        <div class="input-ar">
          <label>
                    <i class="iconfont red">&#xe609;</i>
                    {{'内容'| translate}}
                  </label>
          <div class="right">
            <el-input type="textarea" :rows="8" :placeholder="'请输入内容' | translate" v-model="send">
            </el-input>
          </div>
        </div>
        <div class="btn-ar" @click="submit()">
          <input type="submit" :value="'发送' | translate" class="btn com-btn red-btn" />
        </div>
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
  import {
    translate
  } from "@/tool/filters";
  export default {
    data() {
      return {
        msgId: '',
        send: "",
        MessageData: false
      };
    },
    methods: {
      bindData() {
        var msgaId = this.$route.params.id;
        
        // 获取站内信内容详情
        this.axios
          .post("/api/content/GetEmailContent", {
            token: this.$store.state.token,
            userId: this.$store.getters.getUserId,
            msgId: msgaId,
          })
          .then(res => {
            
            this.MessageData = res.Data;
          });
      },
      submit() {
        var msgaId = this.$route.params.id;
        this.axios.post('/api/Content/ReplyEmail', {
          token: this.$store.state.token,
          userId: this.$store.getters.getUserId,
          msgId: msgaId,
          content: this.send
        }).then(res => {
          this.bindData();
          this.send=''
        })
      }
    },
    mounted() {
      this.bindData()
    }
  };
</script>
