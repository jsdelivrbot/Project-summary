<template>
  <div class="CrowdfundingCenter">
    <top-bar :back-type="2">
      <router-link slot="right" to="/crowdfundingCenter_record" tag="div" class="topBar__right">
        <span>{{'消费记录' | translate}}</span>
      </router-link>
      <div slot="content">
        {{'众筹中心'| translate}}
      </div>
    </top-bar>
    <div class="CrowdfundingCenter__Tab YTab">
      <van-tabs v-model="active" @click="onTabClick">
        <van-tab v-for="(item,index) in tabDatas" :key="index">
          <div slot="title" class="Ytab__title">
              <img class="Yicon50" :src="item.img">
              <font>{{item.name}}</font>
          </div>
          <van-pull-refresh v-model="isLoading" :head-height="30" @refresh="onRefresh">
            <div class="content" :class="{empty:((!viewDatas || viewDatas.length <= 0) && !loading) || (finished && (viewDatas && viewDatas.length > 0))}">
              
              <van-list v-model="loading" :finished="finished" @load="onLoad" :offset="10" :immediate-check="false">
                <div class="content__item BgWhite" v-for="(data,index) in viewDatas" :key="index">
                  <div class="content__item_top">
                    <div class="state__flag" :class="{'state__flag-preheating':active==0,'state__flag-finished':active==2,'state__flag-underway':active==1}">
                      <font v-if="active == 0">预热中</font>
                      <font v-if="active == 1">进行中</font>
                      <font v-if="active == 2">已结束</font>
                    </div>
                    <div class="dateFont">{{data.startTime}}</div>
                  </div>
                  <div class="content__item_middle">
                    <div class="middle_cell-1">
                      <img class="BTimg" :src="img.BTimg">
                      <div class="BTC_Title blFont Y_lineheight">{{data.name}}</div>
                      <div class="BTC_tips EFont Y_lineheight">每个ID限购{{data.maxLimit}}枚 释放比例{{data.releasePct}}%</div>
                      <div class="BTC_coinType EFont Y_lineheight">接收币种：{{currencyDatas[data.consumeCurrency] ? currencyDatas[data.consumeCurrency].symbol : ''}}</div>
                    </div>
                    <div class="middle_cell-2">
                      <div class="middle_cell-2__item item__span3">
                        <div class="blFont Y_lineheight">{{(data.totalInTenThousand).toFixed(2)}}万</div>
                        <div class="EFont Y_lineheight">众筹规模</div>
                      </div>
                      <div class="middle_cell-2__item item__span6">
                        <div class="blFont Y_lineheight">1{{currencyDatas[data.currency] ? currencyDatas[data.currency].symbol : ''}}={{data.price || '?'}}</div>
                        <div class="EFont Y_lineheight">价格</div>
                      </div>
                      <div class="middle_cell-2__item item__span3">
                        <div class="blFont Y_lineheight" v-if="active === 0">{{'未开始' | translate}}</div>
                        <div class="blFont Y_lineheight" v-else-if="active === 2">{{'已结束' | translate}}</div>
                        <div class="blFont Y_lineheight" v-else>{{getRemainTime(data.leftSeconds)}}</div>
                        <div class="EFont Y_lineheight">剩余时间</div>
                      </div>
                    </div>
                    <div class="middle_cell-3">
                      <div class="Y_progress">
                        <van-progress v-if="active === 1 || active == 2" :percentage="100 - (data.soldPct || 0)" />
                        <van-progress v-else :percentage="0" />
                      </div>
                      <span class="percentValue Y_lineheight" :class="{'buFEFontont': active == 1 || active == 2,'EB4Font': active == 0}">{{(100 - (data.soldPct || 0)).toFixed(2)}}%</span>
                      <button @click="buy(data)" class="stateBtn " :class="{'stateBtn-disabled': active == 0 || active == 2,'stateBtn-green': active == 1}">立即购买</button>
                    </div>
                  </div>
                </div>
                <div v-if="finished && (viewDatas && viewDatas.length > 0)" class="list-empty">已经到最后啦</div>
                <div v-else-if="(!viewDatas || viewDatas.length <= 0) && !loading" class="list-empty">{{'暂无数据记录' | translate}}</div>
              </van-list>
            </div>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 购买 -->
    <van-popup :class="{popShop__wrap: true, show: true}" v-model="popupData.show">
      <div class="popShop">
        <div class="popShop__head">
          <div class="popShop__head-close">
            <div @click="popupData.show = false" class="popShop__head-close-box bg-green">
              <i class="dIcon dIcon_close"></i>
            </div>
          </div>
          <div class="popShop__head-msg text-gray">{{'购买' | translate}}</div>
          <div class="popShop__head-msg text-blue">{{currencyDatas[selectedData.currency] ? currencyDatas[selectedData.currency].symbol : ''}}{{'数字资产' | translate}}</div>
        </div>
        <div class="popShop-content">
          <div class="popShop-content__item popShop-content__item_stepper">
            <div class="popShop-content__item-title">{{currencyDatas[selectedData.currency] ? currencyDatas[selectedData.currency].symbol : ''}}{{'数量' | translate}}</div>
            <div class="popShop-content__item-right">
              <div class="stepper">
                <div @click="popupData.minus" class="stepper__minus"></div>
                <input v-model="placeSubmitData.quantity" @input="quantityValidate" type="number" class="inputItem stepper__input" />
                <div @click="popupData.plus" class="stepper__plus"></div>
              </div>
            </div>
          </div>
          <!-- 密码输入框 -->
          <van-password-input :value="placeSubmitData.l2Pwd" @focus="popupData.show = true" />
        </div>
      </div>
      <!-- 数字键盘 -->
      <van-number-keyboard :transition="false" :class="'popShop-keyboadr'" :hide-on-click-outside="false" :show="popupData.show" theme="custom" :close-button-text="'完成' | translate" @blur="submit" @input="onInput" @delete="onDelete" />
    </van-popup>
  </div>
</template>

<script>
  import icon50 from "./icon-50.png";
  import icon51 from "./icon-51.png";
  import icon52 from "./icon-52.png";
  import BTimg from "./BTimg.png";
  import server from 'src/api/crowdFunding'
  export default {
    data() {
      return {
        submitData:{
          "pageSize": 20,
          "pageIndex": 1,
          "status":1
        },
        finished:false,
        loading:false,
        viewDatas:null,
        isLoading:false,
        selectedData:{},
        tabDatas:[
          {
            active:0,
            name:"预热中",
            img:icon50
          },
          {
            active:1,
            name:"进行中",
            img:icon51
          },
          {
            active:1,
            name:"已结束",
            img:icon52
          }
        ],
        placeSubmitData:{
          crowdFundingId:"",
          l2Pwd:"",
          quantity:1
        },
        popupData: {
          show: false,
          minLimit:1,
          maxLimit:1,
          minus: () => {
            this.placeSubmitData.quantity = --this.placeSubmitData.quantity;
            if (this.placeSubmitData.quantity <= this.popupData.minLimit) {
              this.placeSubmitData.quantity = this.popupData.minLimit;
            }
          },
          plus: () => {
            if (this.placeSubmitData.quantity >= this.popupData.maxLimit) {
              this.placeSubmitData.quantity = this.popupData.maxLimit;
            } else {
              this.placeSubmitData.quantity = ++this.placeSubmitData.quantity;
            }
          }
        },
        active: 0,
        img: {
          BTimg
        }
      };
    },
    computed:{
        currencyDatas(){
            if(!this.$store.getters.clientData.enums) return {};
            let data = this.$store.getters.clientData.enums.currency;
            let res = {};
            for(let key in data){
                let v = data[key];
                if(!v.attribute) {
                  v.symbol = v.name;
                  res[key] = data[key];
                  continue
                };
                v = v.attribute;
                v.value = key;
                res[key] = v;
            }
            return res;
        }
    },
    methods: {
      quantityValidate(){
        let val = this.placeSubmitData.quantity;
        if(val <= this.popupData.minLimit){
          this.placeSubmitData.quantity = this.popupData.minLimit;
          return;
        }
        if(val >= this.popupData.maxLimit){
          this.placeSubmitData.quantity = this.popupData.maxLimit;
        }
      },
      //获取剩余时间 
      getRemainTime(secondsValue){
        let hour = "";
        let minute = "";
        let day = "";
        let seconds = "";
        if(secondsValue < 3600){
          minute = parseInt(secondsValue/60);
          seconds = (secondsValue - (minute*60));
          return minute +  $t("分") + (seconds > 0 ? (seconds + $t("秒")) : "");
        }
        if(secondsValue < 86400){
          hour = parseInt(secondsValue/3600);
          minute = parseInt((secondsValue - (hour*3600))/60);
          return hour + $t("时") + (minute > 0 ? ( minute + $t("分")) : '');
        }
        
        if(secondsValue >= 86400){
          day = parseInt(secondsValue/86400);
          hour = parseInt((secondsValue - (day*86400))/3600);
          minute = parseInt((secondsValue - (day*86400 + hour * 3600))/60);
          return day + $t("天") + (hour > 0 ? (hour +  $t("时")) : '') + (minute > 0 ? (minute + $t("分")) : '');
        }
      },
      //众筹购买
      submit(){
        if(this.placeSubmitData.l2Pwd.length < 6){
          this.$toast($t('请输入6位支付密码'))
          return;
        }
        this.popupData.show = false;
        $mask($t("请求发送中"));
        let $this = this;
        server.submitPlaceOrder(this.placeSubmitData).then(res =>{
          this.$toast.clear();
          this.$toast($t('购买成功'));
          setTimeout(function(){
            $this.getListDatas();
          },1000);
        }).catch(error =>{
          console.log("[ERROR]-" + JSON.stringify(error));
        })
      },
      onInput(key) {
        this.placeSubmitData.l2Pwd = (this.placeSubmitData.l2Pwd + key).slice(0, 6);
      },
      onDelete() {
        this.placeSubmitData.l2Pwd = this.placeSubmitData.l2Pwd.slice(
          0,
          this.placeSubmitData.l2Pwd.length - 1
        );
      },
      // 购买
      buy(data) {
        if (this.active !== 1) return;
        this.popupData.show = true;
        this.selectedData = data;
        this.placeSubmitData.crowdFundingId = data.id;
        this.placeSubmitData.quantity = data.minLimit;
        this.placeSubmitData.l2Pwd = "";
        this.popupData.minLimit = data.minLimit;
        this.popupData.maxLimit = data.maxLimit;
      },
      // 点击tab触发
      onTabClick(index, title) {
        if(this.active === index) return;
        this.active = index;
        this.viewDatas = [];
        this.getListDatas();
      },
      // 对应下拉刷新
      onRefresh() {
        this.getListDatas();
      },
      // 上拉加载
      onLoad() {
        if(this.loading) return;
        this.loading = true;
        this.getListDatas();
      },
      isLoadDone:function(totalRecords){
          if(totalRecords > this.viewDatas.length)return;
          this.finished = true;
      },
      //获取众筹预热中列表
      getWarmupCrowdFundings(){
        $mask();
        server.getWarmupCrowdFundings(this.submitData).then(res =>{
          this.$toast.clear();
          this.isLoading = false;
          this.loading = false;
          res.data.rows.forEach(v =>{
            v.createTime = $dataFormat(v.createTime);
            v.startTime = $dataFormat(v.startTime);
          })
          if(res.data.pageIndex > 1){
            this.viewDatas = this.viewDatas.concat(res.data.rows);
          }else{
            this.viewDatas = res.data.rows;
          }
          this.isLoadDone(res.data.totalRecords);
        }).catch(error =>{
          this.isLoading = false;
          this.loading = false;
          console.error("[ERROR]" + JSON.stringify(error));
        })
      },
      //获取众筹进行中 OR 已结束
      getCrowdFundings(id){
        this.submitData.status = id + 1;
        $mask();
        server.getCrowdFundings(this.submitData).then(res =>{
          this.$toast.clear();
          this.isLoading = false;
          this.loading = false;
          res.data.rows.forEach(v =>{
            v.createTime = $dataFormat(v.createTime);
            v.startTime = $dataFormat(v.startTime);
            v.endTime = $dataFormat(v.endTime);
          })
          if(res.data.pageIndex > 1){
            this.viewDatas = this.viewDatas.concat(res.data.rows);
          }else{
            this.viewDatas = res.data.rows;
          }
          this.isLoadDone(res.data.totalRecords);
        }).catch(error =>{
          this.isLoading = false;
          this.loading = false;
          console.error("[ERROR]" + JSON.stringify(error));
        })
      },
      getListDatas(){
        if(this.active === 0){
          this.getWarmupCrowdFundings();
          return;
        }
        this.getCrowdFundings(this.active);
      }
    },
    created(){
      this.getListDatas();
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
    @import "src/style/util.scss";
  .dIcon_close {
    background-image: url("icon-42.png");
  }
  div.list-empty{
    background-color: #ffffff;
    width: 100%;
    padding: f(50) 0;
    text-align: center;
  }
  .CrowdfundingCenter .CrowdfundingCenter__Tab div.content.empty{
    padding: 0;
  }
</style>
