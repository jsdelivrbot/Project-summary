<template>
  <div class="V_DigitalCenter">
    <top-bar>
      <div class="topBar__right" slot="right">
        <div class="topBar__right-box">
          <img class="icon54" :src="icon54">
          <i>{{xbaoInfo.levelName}}</i>
        </div>
      </div>
      <div slot="content">
        {{'X宝数字中心'| translate}}
      </div>
    </top-bar>
    <div class="V_DigitalCenter__header">
      <div class="V_DigitalCenter__header-item">
        <div class="WPFont">{{'X宝总资产' | translate}}</div>
        <div class="WFont">{{xbaoInfo.totalAmount}}</div>
      </div>
      <div class="V_DigitalCenter__header-item">
        <div class="WPFont">{{'昨日收益（余额）' | translate}}</div>
        <div class="WFont">{{(xbaoInfo.yesterdayProfit || 0).toFixed(4)}}</div>
      </div>
      <div class="V_DigitalCenter__header-item">
        <div class="WPFont">{{'可用资产' | translate}}</div>
        <div class="WFont">{{xbaoInfo.availableAmount}}</div>
      </div>
    </div>
    <div class="V_DigitalCenter__body">
      <div class="V_DigitalCenter__tab">
        <van-tabs v-model="active" @click="onTabClick">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-tab v-for="(item, index) in dataArr" :key="index">
              <div slot="title">{{item | translate}}</div>
                <van-list :immediate-check="false"  v-model="loading" :finished="finished" @load="onLoad">
                  <div class="V_DigitalCenter__item" v-for="(item2, index2) in viewData" :key="index2">
                    <div class="V_DigitalCenter__item_left">
                      <p v-text="(logTypes[data.type] ? logTypes[data.type].name : '') | translate"></p>
                      <span v-text="data.createTime "></span>
                    </div>
                    <div class="V_DigitalCenter__item_right" :class="{'text-blue': index === 0}" v-text="((index === 0 || index ===2) ? '+' : '-') +data.amount"></div>
                  </div>
                </van-list>
            </van-tab>
            <div v-if="finished && (viewData && viewData.length > 0)" class="list-empty">{{'已经到最后啦' | translate}}</div>
            <div v-else-if="(!viewData || viewData.length <= 0) && !loading" class="list-empty">{{'暂无数据记录' | translate}}</div>
          </van-pull-refresh>
        </van-tabs>
      </div>
    </div>
    <div class="V_DigitalCenter__bottom">
      <router-link to="/vDigitalcenter_roullIn" tag="div" class="V_DigitalCenter__bottom-item">
        <img class="icon55" :src="icon55"> {{'转入' | translate}}
      </router-link>
      <router-link to="/vDigitalcenter_rollOut" tag="div" class="V_DigitalCenter__bottom-item">
        <img class="icon55" :src="icon56"> {{'转出' | translate}}
      </router-link>
    </div>
  </div>
</template>

<script>
  import icon54 from "../../../static/img/icon-62.png";
  import icon55 from "../../../static/img/icon-63.png";
  import icon56 from "../../../static/img/icon-56.png";
  import server from 'src/api/xbao';
  export default {
    data() {
      return {
        loading: true,
        finished: false,
        isLoading:false,
        icon54,
        icon55,
        icon56,
        active: 0,
        dataArr:["收益记录","转出记录","转入记录"],
        xbaoInfo:{},
        viewData:null,
        requestData:{
          "pageSize": 20,
          "pageIndex": 1
        }
      };
    },
    computed:{
      logTypes(){
        if(this.$store.getters.clientData.enums) return {};
        return this.$store.getters.clientData.enums.walletAuditLogType;
      }
    },
    created(){
      this.getXBaoDataInfo();
      this.query();
    },
    methods: {
      query(){
        if(this.active === 0){
          this.findProfitDetails();
          return;
        }
        this.findXBaoTransferDetails();
      },
      //获取X宝信息
      getXBaoDataInfo(){
        $mask();
        server.getXBaoDataInfo().then(res =>{
          this.$toast.clear();
          this.xbaoInfo = res.data;
        }).catch(error =>{
          console.log("[ERROR]-" + JSON.stringify(error));
        })
      },
      //获取转出OR转入记录
      findXBaoTransferDetails(){
        $mask();
        let data = JSON.parse(JSON.stringify(this.requestData));
        data.type = this.active;
        server.findXBaoTransferDetails(data).then(res =>{
          this.loading = false;
          this.isLoading = false;
          this.$toast.clear();
          res.data.rows.forEach(v=>{
              v.createTime  = $dataFormat(v.createTime);
          });
          if(res.data.pageIndex > 1){
              this.viewData = this.viewData.concat(res.data.rows);
          }else{
              this.viewData = res.data.rows;
          }
          this.isLoadDone(res.data.totalRecords);
        }).catch(error =>{
            this.loading = false;
            console.log("[ERROR]-" + JSON.stringify(error));
        });
      },
      //获取收益记录
      findProfitDetails(){
        server.findProfitDetails(this.requestData).then(res =>{
          this.loading = false;
          this.isLoading = false;
          this.$toast.clear();
          res.data.rows.forEach(v=>{
              v.createTime  = $dataFormat(v.createTime);
          });
          if(res.data.pageIndex > 1){
              this.viewData = this.viewData.concat(res.data.rows);
          }else{
              this.viewData = res.data.rows;
          }
          this.isLoadDone(res.data.totalRecords);
        }).catch(error =>{
            this.loading = false;
            console.log("[ERROR]-" + JSON.stringify(error));
        });
      },
      //判断数据是否加载完成
      isLoadDone(totalRecords){
          if(totalRecords > this.viewData.length) return;
          this.finished = true;
      },
      // 点击tab触发
      onTabClick(index, title) {
       if(this.active === index) return;
       this.active = index;
       this.viewData = null;
       this.query();
      },
      // 对应下拉刷新
      onRefresh() {
        this.requestData.pageIndex = 1;
        this.query();
      },
      // 上拉加载
      onLoad() {
        this.requestData.pageIndex += 1;
        this.loading = true;
        this.query();
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "src/style/util.scss";
    div.list-empty{
        background-color: #ffffff;
        width: 100%;
        padding: f(50) 0;
        text-align: center;
        margin-top: f(10);
    }
  .V_DigitalCenter__header {
    background: url("../../../static/img/v_digitalcenterbg.png") no-repeat;
    background-size: 100% 100%;
  }
</style>
