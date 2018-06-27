<template>
    <div class="trade_order_content rollOut backPadding" @click="hideTipMenu">
        <top-bar back-type="2"></top-bar>
        <div class="bar_tabs_box">
           <div class="tabs_box">
                <a :class="{'active':activeTabsType == 'ASK'}" @click="chooseTabsType('ASK')">发布求购</a>
                <a :class="{'active':activeTabsType == 'SELL'}" @click="chooseTabsType('SELL')">发布出售</a>
                <a :class="{'active':activeTabsType == 'ORDER'}" @click="chooseTabsType('ORDER')">订单</a>
                <a :class="{'active':activeTabsType == 'TRADE_RECORD'}" @click="chooseTabsType('TRADE_RECORD')">交易记录</a>
           </div>
        </div>
        <div v-if="activeTabsType == 'ASK' || activeTabsType == 'SELL'">
            <div class="asset_detail">
                <label v-if="assetTypeValue">{{assetTypeValue}}资产</label>
                <label v-else>{{'资产数据加载中' | translate}}</label>
                <span>{{totalAssets.toFixed(4)}}</span>
            </div>
            <div class="asset_type" @click="showSelect" ref="assetTypeSelectd">
                <img class="icon" :src="currencysImg[currency]"/>
                <div class="select tip_area">
                    <span class="tip_area">{{assetTypeValue || '加载中' | translate}}</span>
                    <img src="../../../static/img/trade-1.png" class="tip_area"/>
                </div>
            </div>
            <div class="trade_price">
                <span class="width120">当前价格</span>
                <span class="blod">{{nowPrice}}</span>
            </div>
            <div class="order_form form_box">
                <div class="item disabled">
                    <label>{{activeTabsType == 'SELL' ? '出售价格' : '购买价格' | translate}}</label>
                    <input type="text" disabled :value="submitData.unitPrice" />
                </div>
                <div class="slider">
                    <span class="percentage" :style="{'left':value + '%'}">{{value}}%</span>
                    <van-slider v-model="value" ></van-slider>
                </div>
                <div class="item" :class="{'error':hasValidate && !submitData.totalQuantity}" >
                    <label>{{activeTabsType == 'SELL' ? '出售数量' : '购买数量' | translate}}</label>
                    <input type="number" v-model="submitData.totalQuantity" />
                </div>
                <div class="item disabled">
                    <label>{{activeTabsType == 'SELL' ? '购买金额' : '支付金额' | translate}}</label>
                    <input type="text" disabled  :value="(submitData.totalQuantity * submitData.unitPrice).toFixed(4)" />
                </div>
            </div>
            <div class="describe" v-if="activeTabsType == 'SELL'">
                <span>单笔交易金额范围：100~100000</span>
            </div>
            <div class="operat">
                <a class="btn bg-ff5755" @click="submit" v-if="activeTabsType == 'SELL'">发布出售订单</a>
                <a class="btn bg-1ed189" @click="submit" v-if="activeTabsType == 'ASK'">发布求购订单</a>
            </div>
        </div>
        <div v-else-if="activeTabsType == 'TRADE_RECORD'">
            <div class="seacrh__box">
                <div class="seacrh__btn-select TRADE" @click="showSelect('TRADE')" ref="assetTypeSelectd">
                    <label class="TRADE">{{assetTypeValue || '加载中' | translate}}</label>
                    <img class="TRADE" src="../../../static/img/icon-43.png"/>
                </div>
            </div>
            <div class="seacrh__box-time">
                <label>一天内</label>
                <img src="../../../static/img/trade-1.png"/>
            </div>
            <div class="view__list">
               <div class="view__list-item">
                    <div class="left">
                        <label>求购 BTC</label>
                        <span>2018-04-30 09:00</span>
                    </div>
                    <div class="right">
                        <span class="blod">+80.0000</span>
                        <span>BTC</span>
                    </div>
               </div>
               
               <div class="view__list-item">
                    <div class="left">
                        <label>求购 BTC</label>
                        <span>2018-04-30 09:00</span>
                    </div>
                    <div class="right">
                        <span class="blod">-80.00</span>
                        <span>余额</span>
                    </div>
               </div>
               <div class="view__list-item">
                    <div class="left">
                        <label>出售 BTC</label>
                        <span>2018-04-30 09:00</span>
                    </div>
                    <div class="right">
                        <span class="blod">-80.0000</span>
                        <span>BTC</span>
                    </div>
               </div>
               <div class="view__list-item">
                    <div class="left">
                        <label>出售 BTC</label>
                        <span>2018-04-30 09:00</span>
                    </div>
                    <div class="right">
                        <span class="blod">+80.00</span>
                        <span>余额</span>
                    </div>
               </div>
            </div>
        </div>
        <div v-else>
            <div class="seacrh__box">
                <div class="seacrh__btn-select ORDER" @click="showSelect('ORDER')" ref="assetTypeSelectd">
                    <label class="ORDER">{{assetTypeValue || '加载中' | translate}}</label>
                    <img class="ORDER" src="../../../static/img/icon-43.png"/>
                </div>
            </div>
            <div class="search__tabs_box">
                <div class="search__tabs_content" v-if="tradeType === 'BALANCE'">
                    <label :class="{'active':balanceOrderSatus === 'underway'}" @click="balanceOrderSatus = 'underway'">进行中</label>
                    <label :class="{'active':balanceOrderSatus === 'done'}" @click="balanceOrderSatus = 'done'">已完成</label>
                </div>
                <div  class="search__tabs_content-3"  v-else>
                    <label :class="{'active':cashOrderSatus === 'pending'}" @click="cashOrderSatus = 'pending'">待处理</label>
                    <label class="border" :class="{'active':cashOrderSatus === 'underway'}" @click="cashOrderSatus = 'underway'">进行中</label>
                    <label :class="{'active':cashOrderSatus === 'done'}" @click="cashOrderSatus = 'done'">已完成</label>
                </div>
            </div>
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <div class="view__list-orders"  v-if="tradeType === 'BALANCE'">
                    <van-list  v-model="loading" :finished="finished" @load="loadDatas" :offset="10" :immediate-check="false">
                        <div class="view__list-orders-item" v-for="(item,index) in orderDatas" :key="index">
                            <div class="top">
                                <img :src="currencysImg[item.currency]"/>
                                <span class="mrak color-ff5755" v-if="item.category == 1">{{"出售" | translate}}</span>
                                <span class="mrak color-1ed189" v-else>{{"求购" | translate}}</span>
                                <span>{{"单号" | translate}}：{{item.id}}</span>
                                <span class="view__list-orders-status">{{balanceOrderSatus === 'underway' ? '挂单中' : '交易完成' | translate}}</span>
                            </div>
                            <div class="content">
                                <p>
                                    <span class="bold">{{item.unitPrice.toFixed(4)}}</span>
                                    <span>{{'价格' | translate}}</span>
                                </p>
                                <p>
                                    <span class="bold">{{item.totalQuantity}}</span>
                                    <span>{{'数量' | translate}}</span>
                                </p>
                                <p>
                                    <span class="bold">{{item.totalPrice.toFixed(4)}}</span>
                                    <span>{{'总额' | translate}}</span>
                                </p>
                            </div>
                            <div class="footer">
                                <span>{{item.createTime}}</span>
                                <span class="right"  v-if="balanceOrderSatus === 'pending'">{{'撤单'| translate}}</span>
                                <span class="right" @click="navigateOrderDetail('DigitalAsset_tradeOrder_detail',item.id,1)" v-else>{{'查看' | translate}}</span>
                                
                            </div>
                        </div>
                    </van-list>
                    <div v-if="finished && (orderDatas && orderDatas.length > 0)" class="list-empty">{{'已经到最后啦' | translate}}</div>
                    <div v-else-if="(!orderDatas || orderDatas.length <= 0) && !loading" class="list-empty">{{'暂无相关记录' | translate}}</div>
                </div>
                <div class="view__list-orders"  v-else>
                    <van-list  v-model="loading" :finished="finished" @load="loadDatas" :offset="10" :immediate-check="false">
                        <div class="view__list-orders-item" v-for="(item,index) in orderDatas" :key="index">
                            <div class="top">
                                <img :src="currencysImg[item.currency]"/>
                                <span class="mrak color-ff5755" v-if="item.category == 1">{{"出售" | translate}}</span>
                                <span class="mrak color-1ed189" v-else>{{"求购" | translate}}</span>
                                <span>{{"单号" | translate}}：{{item.id}}</span>
                                <span class="view__list-orders-status">{{cashStatus[cashOrderSatus] | translate}}</span>
                            </div>
                            <div class="content">
                                <p>
                                    <span class="bold">{{item.unitPrice.toFixed(4)}}</span>
                                    <span>{{'价格' | translate}}</span>
                                </p>
                                <p>
                                    <span class="bold">{{item.totalQuantity}}</span>
                                    <span>{{'数量' | translate}}</span>
                                </p>
                                <p>
                                    <span class="bold">{{item.totalPrice.toFixed(4)}}</span>
                                    <span>{{'总额' | translate}}</span>
                                </p>
                            </div>
                            <div class="footer">
                                <span>{{item.createTime}}</span>
                                <span class="right" v-if="cashOrderSatus === 'pending'" @click="cancelOrder(item.id)">{{'撤单' | translate}}</span>
                                <span class="right" @click="navigateOrderDetail('DigitalAsset_tradeOrder_detail',item.id,0)" v-else>{{'查看' | translate}}</span>
                            </div>
                        </div>
                    </van-list>
                    <div v-if="finished && (orderDatas && orderDatas.length > 0)" class="list-empty">{{'已经到最后啦' | translate}}</div>
                    <div v-else-if="(!orderDatas || orderDatas.length <= 0) && !loading" class="list-empty">{{'暂无相关记录' | translate}}</div>
                </div>
            </van-pull-refresh>
        </div>
        <div class="tip_box" v-if="tipMenuFade && currencys[currency]" :style="topStyle">
            <span class="tip_item" :class="{'active':currency == type.value}" @click="selectedAssetType(type)" v-for="(type,index) in currencys" :key="index">{{type.symbol}}</span>
        </div>
    </div>
</template>
<script>
import currency1 from '../../../static/img/type_1.png';
import currency2 from '../../../static/img/type_2.png';
import currency3 from '../../../static/img/type_3.png';
import currency4 from '../../../static/img/type_4.png';
import currency5 from '../../../static/img/type_5.png';
import { getTradeConfigs } from 'src/api/common';
import serveAssetOrder from 'src/api/digitalAssetOrder';
export default {
    data(){
        return {
            finished:false,
            loading:true,
            isLoading:false,
            currencysImg:{
                "2000":currency1,
                "2001":currency2,
                "2004":currency3,
                "2002":currency4,
                "2003":currency5
            },
            submitData:null,
            searchData:null,
            orderDatas:null,
            value:0,
            nowPrice:0,
            totalAssets:0,
            tipMenuFade:false,
            hasValidate:false,
            topStyle:null,
            assetTypeValue:"",
            activeTabsType:"",
            topMarkName:'',
            balanceOrderSatus:"underway",
            cashOrderSatus:"pending",
            tradeType:"",
            cashStatus:{
                "pending":"挂单中",
                "underway":"等待买家确认",
                "done":"交易完成"
            },
            currency:'',
            TradeConfigs:null
        }
    },
    computed:{
        currencys(){
            if(!this.$store.getters.clientData.enums) return {};
            let data = this.$store.getters.clientData.enums.currency;
            let res = {};
            for(let key in data){
                let v = data[key].attribute;
                if(!v) continue;
                v.value = key;
                res[key] = v;
            }
            return res;
        },
        tradeValue(){
            if(!this.TradeConfigs[this.activeTabsType]) return 0;
            return this.TradeConfigs[this.activeTabsType].max - this.TradeConfigs[this.activeTabsType].min;
        }
    },
    watch:{
        value:function(){
            if(!this.TradeConfigs[this.activeTabsType]) return;
            this.submitData.unitPrice = (this.tradeValue * (this.value / 100) + this.TradeConfigs[this.activeTabsType].min).toFixed(4);
        },
        currencys(){
            this.assetTypeValue = this.currencys[this.currency].symbol;
        },
        cashOrderSatus(){
            this.searchData.pageIndex = 1;
            if(this.cashOrderSatus === 'pending'){
                delete this.searchData.isFinished;
                this.wiatActiveOrder();
                return;
            }
            let searchData = this.searchData;
            searchData.isFinished  = this.cashOrderSatus === 'done';
            this.searchData = searchData;
            this.getUnderwayOrDoneOrder();
        },
        balanceOrderSatus(){
            this.searchData.pageIndex = 1;
            this.searchData.isFinished = this.balanceOrderSatus === 'done';
            this.getUnderwayOrDoneOrder();
        }
    },
    created:function(){
        let params = this.$route.params.type;
        this.activeTabsType = params.split('-')[0];
        this.tradeType =  params.split('-')[1] || '';
        this.currency = this.$route.params.currency || '2000';
        if(this.currencys[this.currency]) this.assetTypeValue = this.currencys[this.currency].symbol;
        this.initSubmitData();
        this.getTradeConfigs();
        this.getCoinInfo();
        if(this.activeTabsType === 'ORDER') this.orderInit();
    },
    methods:{
        //订单信息初始化
        orderInit(){
            this.cashOrderSatus = 'pending';
            this.balanceOrderSatus = 'underway';
            this.initSearchData();
            if(this.tradeType == 'CASH'){
                this.wiatActiveOrder();
                return;
            }
            this.getUnderwayOrDoneOrder();
        },
        //初始化订单查询数据
        initSearchData(){
            let data  = {
                paymentType: (this.tradeType === 'CASH' ? 1 : 2),
                currency:this.currency,
                pageSize:20,
                pageIndex:1
            }
            if(this.tradeType === 'BALANCE'){
                data.isFinished = false;
            }
            this.searchData = data;
        },
        //数据是否全部加载完成
        isLoadDone(totalRecords){
            if(totalRecords > this.orderDatas.length)return;
            this.finished = true;
        },
        //加载更多数据
        loadDatas(){
            this.searchData.pageIndex += 1;
            this.loading = true;
            this.judgeLoadData();
        },
        //下拉刷新
        onRefresh(){
            this.searchData.pageIndex = 1;
            this.judgeLoadData();
        },
        //判断加载数据
        judgeLoadData(){
            if(this.tradeType === 'CASH' && this.cashOrderSatus === 'pending'){
                this.wiatActiveOrder();
                return;
            }
            this.getUnderwayOrDoneOrder();
        },
        //查询待处理的订单
        wiatActiveOrder(){
            $mask();
            serveAssetOrder.getMyActiveOrders(this.searchData).then(res =>{
                this.$toast.clear();
                this.loading = false;
                this.isLoading = false;
                res.data.rows.forEach(v =>{
                    v.createTime = $dataFormat(v.createTime);
                });
                if(res.data.pageIndex > 1){
                    this.orderDatas = this.orderDatas.concat(res.data.rows);
                }else{
                    this.orderDatas = res.data.rows;
                }
                this.isLoadDone(res.data.totalRecords);
            }).catch(error =>{
                console.error("[ERROR]" + JSON.stringify(error));
            })
        },
        //查询进行中OR已经完成订单
        getUnderwayOrDoneOrder(){
            $mask();
            serveAssetOrder.getUnderwayOrDoneOrders(this.searchData).then(res =>{
                this.$toast.clear();
                this.loading = false;
                this.isLoading = false;
                res.data.rows.forEach(v =>{
                    v.createTime = $dataFormat(v.createTime);
                });
                if(res.data.pageIndex > 1){
                    this.orderDatas = this.orderDatas.concat(res.data.rows);
                }else{
                    this.orderDatas = res.data.rows;
                }
                this.isLoadDone(res.data.totalRecords);
            }).catch(error =>{
                console.error("[ERROR]" + JSON.stringify(error));
            })
        },
        //路由跳转订单详情
        navigateOrderDetail(urlName,id,type){
            this.$router.push({name:urlName,params:{type:type,id:id}})
        },
        //提交求购OR出售数据
        submit(){
            this.hasValidate = true;
            if(!this.submitData.totalQuantity) return;
            $mask($t('提交中'));
            serveAssetOrder.publishOrder(this.submitData).then(res =>{
                this.$toast.clear();
                this.initSubmitData();
                this.$toast($t('发布成功'));
            }).catch(error =>{
                console.log('[ERROR]' + JSON.stringify(error));
            })
        },
        getCoinInfo(){
            $mask();
            serveAssetOrder.getCoinInfo(this.currency).then(res =>{
                this.$toast.clear();
                this.nowPrice = res.data.last;
                this.totalAssets = res.data.totalAssets;
            }).catch(error =>{
                console.error("[ERROR]" + JSON.stringify(error));
            })
        },
        getTradeConfigs(){
            $mask();
            getTradeConfigs(this.currency).then(res =>{
                this.$toast.clear();
                let TradeConfigs = {
                    "ASK":{
                        max:res.data.maxBuyingRisePct,
                        min:res.data.maxBuyingFallPct
                    },
                    "SELL":{
                        max:res.data.maxSellingRisePct,
                        min:res.data.maxSellingFallPct
                    }
                }
                this.TradeConfigs = TradeConfigs;
                this.value = 100;
            }).catch(error =>{
                console.error("[ERROR]" + JSON.stringify(error));
            })
        },
        initSubmitData(){
            this.hasValidate = false;
            let data = {
                "category": 2,
                "paymentType": 1,
                "currency": this.currency,
                "unitPrice": '',
                "totalQuantity": ''
            }
            if(this.tradeType === 'CASH'){
                data.countryCode = this.$store.getters.clientData.countryValue.code;
            }
            if(this.activeTabsType === 'SELL'){
                data.category = 1;
            }
            this.submitData = data;
        },
        showSelect:function(type){
            let top = this.$refs.assetTypeSelectd.offsetTop;
            let height = this.$refs.assetTypeSelectd.clientHeight;
            this.topMarkName = type;
            let topStyle  = {
                top: (top + height) + "px"
            }
            if(type === 'TRADE' || type === 'ORDER'){
                let width = this.$refs.assetTypeSelectd.clientWidth;
                topStyle.left = "50%";
                topStyle.marginLeft = -(width/2) + "px";
            }
            this.topStyle = topStyle;
            this.tipMenuFade = true;
        },
        hideTipMenu:function(event){
            let cls = event.target.className;
            if(cls.indexOf('tip') >= 0 || cls.indexOf(this.topMarkName) >= 0) return;
            this.tipMenuFade = false;
        },
        selectedAssetType:function(type){
            this.tipMenuFade = false;
            this.assetTypeValue = type.symbol;
            this.currency = type.value;
            if(this.activeTabsType === 'ORDER'){
                this.searchData.pageIndex = 1;
                this.searchData.currency = type.value;
                this.judgeLoadData();
                return;
            }
            this.getCoinInfo();
            this.getTradeConfigs();
        },
        chooseTabsType:function(typeName){
            if(this.activeTabsType === typeName) return;
            if(typeName === 'ASK' || typeName === 'SELL') this.value = 100;
            if(typeName === 'ORDER') this.orderInit();
            this.activeTabsType = typeName;
        },
        //撤销订单
        cancelOrder(orderId){
            let $this = this;
            this.$dialog.confirm({
                title: $t('提醒'),
                message: $t("确定撤销订单?")
                }).then(() => {
                    $mask("请求发送中");
                    serveAssetOrder.cancelOrder(orderId).then(res =>{
                        this.$toast.clear();
                        this.$toast($t('撤销订单成功'));
                        setTimeout(function(){
                            $this.wiatActiveOrder();
                        },1000);
                    }).catch(error =>{
                        console.error("[ERROR]" + JSON.stringify(error));
                    })
                })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
// scoped
    @import "src/style/util.scss";
    div.trade_order_content{
        div.list-empty{
            padding: f(30) 0;
            text-align: center;
            width: 100%;
            background-color: #ffffff;
        }
        div.bar_tabs_box{
            position: fixed;
            padding-left: 1rem;
            width: 100%;
            z-index: 1001;
            top: 0;
            div.tabs_box{
                width: 100%;
                position: absolute;
                top: 0;
                z-index: 1001;
                height: f(88);
                line-height: f(88);
            }
            a,a:active{
                color: #6e7581;
            }
            a{
                width: f(145);
                height: f(60);
                display:inline-block;
                text-align: center;
                line-height: f(60);
            }
            a.active{
                background-color: #0079f1;
                box-shadow:  0 f(4) f(10) 0
                    rgba(0, 121, 241, 0.3);
                border-radius: f(8);
                color: #ffffff;
            }
        }
        div.order_form{
            padding: 0 f(29.5);
            div.slider{
                position: relative;
                padding-top: f(38);
                span.percentage{
                    width: f(42);
                    height: f(16);
                    font-size: f(20);
                    color: #0079f1;
                    position: absolute;
                    margin-left: - f(21);
                    top: 0;
                }
            }
            div.item.disabled{
                background-color: #E1E1E1;
                input{
                    background-color: #E1E1E1;
                }
            }
            div.item{
                width: 100%;
                height: f(80);
                background-color: #f5f5f5;
                border-radius: f(8);
                position: relative;
                padding-left: f(150);
                input{
                    border: 0;
                    height: 100%;
                    line-height: 100%;
                    background-color: #f5f5f5;
                    text-align: right;
                    width: 100%;
                    padding-right: f(20);
                    font-weight: bold;
                    font-size: f(28);
                    color: #000000;
                }
                label{
                    display: inline-block;
                    width: f(150);
                    line-height:  f(80);
                    height: f(80);
                    position: absolute;
                    left: 0;
                    text-align: center;
                    color: #6e7581;
                }
                margin-bottom: f(20);
            }
            .van-slider{
                margin-bottom: f(20);
                padding: f(20) 0;
                background-color: #ffffff;
            }
        }
        div.describe{
            padding: f(10) f(52);
            span{
                font-size: f(22);
                letter-spacing: 0;
                color: #ff5755;
            }   
        }
        div.operat{
            padding: f(45) f(30) f(20);
            a.btn{
                width: 100%;
                height: f(80);
                border-radius: f(8);
                color: #ffffff;
                display: inline-block;
                text-align: center;
                line-height: f(80);
            }
            a.btn.bg-ff5755{
                background-color: #ff5755;
                box-shadow: 0 f(10) f(20) 0
                    rgba(255, 87, 85, 0.3);
            }
            a.btn.bg-1ed189{
                background-color: #1ed189;
                box-shadow: 0 f(10) f(20) 0
	            	rgba(30, 209, 137, 0.3);
            }
        }
        div.asset_detail{
            width: 100%;
            text-align: center; 
            padding: f(100) 0;
            label{
                color: #6e7581;
                font-size: f(28);
                display: block;
            }
            span{
                color: #000000;
                font-size: f(60);
            }

        }
        div.asset_type{
            width: 100%;
            padding: 0 f(32);
            position: relative;
            height: f(80);
            padding: f(10) 0 0 f(120);
            img.icon{
                width: f(80);
                height: 100%;
                position: absolute;
                left: f(20);
                top: 0;
            }
            .select{
                width: f(145);
                height:f(60);
                background-color: #ffffff;
                border-radius: f(8);
                border: solid f(2) #a1a4b4;
                font-weight: bold;
                font-size: f(24);
                text-align: center;
                line-height: f(60);
                img{
                    width: f(21);
                    height: f(13);
                }
            }
        }
        div.trade_price{
            padding: f(49) f(32);
            .width120{
                width: f(120);
                display: inline-block;
            }
            .blod{
                font-size: f(28);
                font-weight: bold;
            }
        }
        div.tip_box{
            position: absolute;
            left: f(120);
            width: f(145);
            background-color: #ffffff;
            box-shadow: 0 0 f(30) 0
                rgba(0, 0, 0, 0.1);
            border-radius: f(8);
            border: solid f(2) #e8eaee;
            padding: f(10) 0;
            padding-left: f(20);
            span{
                display: block;
                line-height: f(70);
                font-size: f(24);
            }
            span.active{
                color: #0055ff;
            }
        }
        div.seacrh__box{
            width: 100%;
            padding: f(36) 0;
            div.seacrh__btn-select{
                width: f(150);
                height: f(44);
                margin: 0 auto;
                line-height: f(44);
                background-color: #0079f1;
                box-shadow: 0 f(4) f(10) 0
                    rgba(0, 121, 241, 0.3);
                border-radius: f(22);
                color: #FFFFFF;
                text-align: center;
                font-size: f(24);
                img{
                    width: f(21);
                    height: f(13);
                }
            }
        }
        div.seacrh__box-time{
            width: 100%;
            padding: f(26) 0 f(26) f(29);
            background-color: #f5f5f5;
            img{
                width: f(21);
                height: f(13);
            }
        }
        div.view__list{
            width: 100%;
            div.view__list-item{
                padding: f(36) f(30);
                border-bottom: solid f(2) #e8eaee;
                width: 100%;
                overflow: hidden;
                div{
                    height: f(60);
                    line-height: f(60);
                }
                div.left{
                    float: left;
                    label,span{
                        height: f(30);
                        line-height: f(30);
                        display: block;
                    }
                    label{
                        color: #000000;
                        font-size: f(28);
                        font-weight: bold;
                    }
                    span{
                        font-size: f(22);
                        color: #6e7581;
                    }
                }
                div.right{
                    float: right;
                    span{
                        font-size: f(22);
                        color: #6e7581;
                    }
                    span.blod{
                        color: #000000;
                        font-size: f(36);
                        font-weight: bold;
                    }

                }
            }
        }
        div.view__list-orders{
            width: 100%;
            padding: f(20) f(30);
            background-color: #f5f5f5;
            div.view__list-orders-item{
                background-color: #ffffff;
                border-radius: f(8);
                padding: f(17);
                margin-bottom: f(21);
                img{
                    width: f(80);
                    height: f(80);
                }
                div.top{
                    width: 100%;
                    height: f(80);
                    line-height: f(80);
                    span.view__list-orders-status{
                        float: right;
                        font-size: f(24);
                        color: #0079f1;
                    }
                    span.mrak{
                        font-size: f(28);
                        font-weight: bold;
                        display: inline-block;
                        padding: 0 f(16);
                    }
                    span.mrak.color-ff5755{
                        color: #ff5755;
                    }
                    span.mrak.color-1ed189{
                        color: #1ed189;
                    }
                    span{
                        color: #6e7581;
                        font-size: f(24);
                    }
                }
                div.content{
                    width: 100%;
                    padding: f(25) 0;
                    border-top: f(2) solid rgba(232, 234, 238, 0.5);
                    border-bottom: f(2) solid rgba(232, 234, 238, 0.5);
                    overflow: hidden;
                    margin-top: f(15);
                    p{
                        width: 33.333%;
                        float: left;
                        text-align: center;
                        height: f(70);
                        span{
                            display:block;
                            height: f(35);
                            color: #6e7581;
                            font-size: f(22);
                        }
                        span.bold{
                            font-size: f(28);
                            font-weight: bold;
                        }
                    }
                }
                div.footer{
                    padding-top: f(20);
                    color: #6e7581;
                    font-size: f(22);
                    span.right{
                        width: f(120);
                        height: f(46);
                        background-color: #ffffff;
                        border-radius: f(23);
                        border: solid f(2) #0079f1;
                        float: right;
                        text-align: center;
                        line-height: f(46);
                        color: #0079f1;
                    }
                }
            }
        }
        div.search__tabs_box{
            padding: f(30);
            div.search__tabs_content,div.search__tabs_content-3{
                border: solid f(2) #a1a4b4;
                overflow: hidden;
                border-radius: f(8);
            }
            div.search__tabs_content-3{
                label{
                    width: 33.333%;
                }
            }
            label{
                width: 50%;
                float: left;
                text-align: center;
                height: f(60);
                line-height: f(60);
            }
            label.border{
                border-right: f(2) solid #a1a4b4;
            }
            label.active{
                color: #ffffff;
                background-color: #a1a4b4;
                border: 0;
            }
        }
    }
</style>

