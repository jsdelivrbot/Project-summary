<template>
    <div class="digital_rollout_record backPadding">
        <top-bar :back-type="2">
            <span slot="content">众筹消费记录</span>
        </top-bar>
        <van-tabs @click="onTabClick" v-model="active">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-tab v-for="(item, index) in dataArr" :key="index" :title="item.title | translate">
                    <div class="rollOut__exchange-padding"></div>
                    <div class="rollOut__record-list">
                        <van-list :immediate-check="false" v-model="loading" :finished="finished" @load="onLoad">
                            <div class="rollOut__record-list-item" v-for="(data, index2) in viewData" :key="index2">
                                <div class="rollOut__record-list-item-left">
                                    <img :src="'../../../../static/img/' + currencyImages[data.currency]" class="userCenter__msg-logo logo-icon">
                                </div>
                                <div class="rollOut__record-list-item-right">
                                    <div class="rollOut__record-list-item-right-top" v-if="active === 0">
                                        <span>{{'购买' | translate}}{{assetType[data.currency] ? assetType[data.currency].symbol : ''}}：{{data.quantity}}</span>
                                        <p v-text="data.createTime"></p>
                                    </div>
                                    <div class="rollOut__record-list-item-right-top" v-else>
                                        <span>{{data.name}}</span>
                                        <p>{{'释放比例' | translate}}{{(data.releasePct || 0).toFixed(2)}}%</p>
                                    </div>
                                    <div class="rollOut__record-list-item-right-bottom" v-if="active === 0">
                                        <p class="bold" v-text="(data.totalPrice || 0).toFixed(2)"></p>
                                        <span v-if="active === 0">{{assetType[data.consumeCurrency] ? assetType[data.consumeCurrency].symbol : '' | translate}}</span>
                                        
                                    </div>
                                    <div class="rollOut__record-list-item-right-top" v-else>
                                        <span class="bold" v-text="(data.releaseQuantity || 0).toFixed(2)"></span>
                                        <p>{{data.createTime}}</p>
                                    </div>
                                </div>
                            </div>
                            </van-list>
                    </div>
                </van-tab>
                <div v-if="finished && (viewData && viewData.length > 0)" class="list-empty">已经到最后啦</div>
                <div v-else-if="(!viewData || viewData.length <= 0) && !loading" class="list-empty">{{'暂无数据记录' | translate}}</div>
            </van-pull-refresh>
        </van-tabs>
        </div>
</template>

<script>
    import server from 'src/api/crowdFunding'
    export default {
        data() {
            return {
                currencyImages:{
                    2000:"type_1.png",
                    2001:"type_2.png",
                    2004:"type_3.png",
                    2002:"type_4.png",
                    2003:"type_5.png",
                },
                finished:false,
                isLoading:false,
                loading:true,
                viewData:null,
                submitData:{
                    pageIndex:1,
                    pageSize:20
                },
                dataArr: [{
                        title: "购买记录",
                    },
                    {
                        title: "释放记录"
                    }
                ],
                active: 0
            };
        },
        computed:{
            assetType(){
                if(!this.$store.getters.clientData.enums) return {};
                let data = this.$store.getters.clientData.enums.currency;
                let res = {};
                for(let key in data){
                    let v = data[key];
                    if(!v.attribute) {
                        v.symbol = v.name;
                        res[key] = v;
                        continue;
                    };
                    v = v.attribute;
                    v.value = key;
                    res[key] = v;
                }
                return res;
            }
        },
        created(){
            this.query();
        },
        methods: {
            // 点击tab触发
            onTabClick(index, title) {
                if(this.active == index) return;
                this.viewData = [];
                this.active = index;
                this.query();
            },
            query(){
                if(this.active == 0){
                    this.getPurchaseHistories();
                    return
                }
                this.getReleaseHistories();
            },
            //获取购买记录数据
            getPurchaseHistories(){
                $mask();
                server.getPurchaseHistories(this.submitData).then(res =>{
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
                })
            },
            //获取释放记录数据
            getReleaseHistories(){
                $mask();
                server.getReleaseHistories(this.submitData).then(res =>{
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
                })
            },
            //判断数据是否加载完成
            isLoadDone(totalRecords){
                if(totalRecords > this.viewData.length) return;
                this.finished = true;
            },
            // 上拉加载
            onLoad() {
                this.submitData.pageIndex += 1;
                this.loading = true;
                this.query();
            },
            //下拉刷新
            onRefresh(){
                this.submitData.pageIndex = 1;
                this.query();
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/style/util.scss";
.rollOut__record-list-item-right-top {
    .bold{
        font-weight: bold;
        font-size: f(36);
    }
}

  div.list-empty{
    background-color: #ffffff;
    width: 100%;
    padding: f(50) 0;
    text-align: center;
    margin-top: f(10);
  }
</style>
