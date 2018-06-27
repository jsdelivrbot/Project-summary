<template>
  <div class="rollOut__record">
    <top-bar :back-type="2">
       <span slot="content">{{type === 0 ? '转出记录' : '转入记录' | translate}}</span>
    </top-bar>
    <van-pull-refresh v-model="isLoading" :head-height="30" @refresh="onRefresh">
    <div class="rollOut__exchange-padding"></div>
    <div class="rollOut__record-list">
        <van-list v-model="loading" :finished="finished" @load="loadDatas" :offset="10" :immediate-check="false">
          <div class="rollOut__record-list-item" v-for="(item,index) in listData" :key="index">
            <div class="rollOut__record-list-item-left">
              <img :src="item.avatarOriginalPath" class="userCenter__msg-logo logo-icon">
            </div>
            <div class="rollOut__record-list-item-right">
              <div class="rollOut__record-list-item-right-top">
                <span>{{item.nickName}}</span>
                <span>{{item.amount}}</span>
              </div>
              <div class="rollOut__record-list-item-right-bottom">
                <span>UID:{{item.userId}}</span>
                <span>{{item.dateTime}}</span>
              </div>
            </div>
          </div>
          <div v-if="finished && (listData && listData.length > 0)" class="list-empty last">已经到最后啦</div>
          <div v-else-if="(!listData || listData.length <= 0) && !loading" class="list-empty">{{'暂无数据记录' | translate}}</div>
        </van-list>
    </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import server from 'src/api/transfer';
import defaultAvatar from "../../../../static/img/default-man.png";
export default {
  data() {
    return {
      type: "",
      listData: null,
      loading:true,
      isLoading:false,
      finished:false,
      submitData:{
        "pageSize": 20,
        "pageIndex": 1
      },
      serverPath: process.env.PROTOCOL +  process.env.BASE_API
    };
  },
  created() {
    this.type = this.$route.params.type * 1;
    this.getList();
  },
  methods:{
    onRefresh(){
      this.submitData.pageIndex = 1;
      this.getList();
    },
    getList(){
      if(this.type === 0){
        this.getTransferOuts();
        return;
      }
      this.getTransferIns(); 
    },
    loadDatas(){
      this.submitData.pageIndex += 1;
      this.loading = true;
      this.getList();
    },
    isLoadDone:function(totalRecords){
        if(totalRecords > this.listData.length)return;
        this.finished = true;
    },
    //获取转出记录
    getTransferOuts:function(){
      $mask();
      server.getTransferOuts(this.submitData).then(res =>{
        this.$toast.clear();
        this.loading = false;
        this.isLoading = false;
        res.data.rows.forEach(v =>{
          v.dateTime = $dataFormat(v.dateTime);
          v.avatarOriginalPath  = v.avatarOriginalPath  ? (this.serverPath + v.avatarOriginalPath) : defaultAvatar;
          v.avatarThumbnailPath   = v.avatarThumbnailPath   ? (this.serverPath + v.avatarThumbnailPath) : defaultAvatar;
        },this);
        if(res.data.pageIndex > 1){
            this.listData = this.listData.concat(res.data.rows);
        }else{
          this.listData = res.data.rows;
        }
        this.isLoadDone(res.data.totalRecords);
      }).catch(error =>{
        console.error("[ERROR]" + error);
      })
    },
    //获取转入记录
    getTransferIns:function(){
      $mask();
      server.getTransferIns(this.submitData).then(res =>{
        this.$toast.clear();
        this.loading = false;
        this.isLoading = false;
        res.data.rows.forEach(v =>{
          v.dateTime = $dataFormat(v.dateTime);
          v.avatarOriginalPath  = v.avatarOriginalPath  ? (this.serverPath + v.avatarOriginalPath) : defaultAvatar;
          v.avatarThumbnailPath   = v.avatarThumbnailPath   ? (this.serverPath + v.avatarThumbnailPath) : defaultAvatar;
        },this);
        if(res.data.pageIndex > 1){
            this.listData = this.listData.concat(res.data.rows);
        }else{
          this.listData = res.data.rows;
        }
        this.isLoadDone(res.data.totalRecords);
      }).catch(error =>{
        console.error("[ERROR]" + error);
      })
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/style/util.scss";
    .list-empty{
        text-align: center;
        padding: f(100) 0;
    }
    .list-empty.last{
      padding: f(35) 0;
    }
</style>
