<template>
  <div class="rollOut">
      <top-bar>
        <div v-if="tradeType === 'CASH'" class="topBar__right" slot="right" @click="areaData.show = true">
            <label>{{areaData.value.name}}</label>
            <img class="tip-operat" src="./asset_type.png"/>
        </div>
        <div class="topBar__content" slot="content">
            <label @click="tipMenuFade = true">{{assetType[assetIndex] ? assetType[assetIndex].symbol : ''}}</label>
            <img @click="tipMenuFade = true" class="tip-operat" src="../../../../static/img/icon-43.png"/>
        </div>
    </top-bar>
    <div class="asset_type_top">
        <div class="left">
            <img :src="'../../../../static/img/' + assetImages[assetIndex]"/>
            <p>
                <span class="fixedWidth80">{{'资产' | translate}}</span>
                <span>{{(coinInfo.totalAssets || 0).toFixed(4)}}</span>
            </p>
            <p>
                <span class="fixedWidth80">{{'余额' | translate}}</span>
                <span>{{coinInfo.balance}}</span>    
            </p>
        </div>
        <div class="right">
            <p><span class="fixedWidth120">{{'当前价格' | translate}}</span>{{(coinInfo.last || 0).toFixed(4)}}</p>
            <p>{{'高' | translate}} {{(coinInfo.highest || 0).toFixed(4)}}   {{'低' | translate}} {{(coinInfo.lowest || 0).toFixed(4)}}</p>
        </div>
    </div>
    <div class="tabs-box">
        <div class="tabs">
            <label :class="{'active':klineTime === 5}" @click="changeTime(5)">5分钟</label>
            <label :class="{'active':klineTime === 300}" @click="changeTime(300)">5小时</label>
            <label :class="{'active':klineTime === 999}" @click="changeTime(999)">日线</label>
        </div>
    </div>
    <div id="main"></div>
    <div class="buying_centre" :class="{empty:(!orderList || orderList.length <= 0) && !loading}">
        <van-tabs v-model="vanTabActive" @click="vanTabChange">
            <van-tab title="购买">
                <van-list @load="loadDatas"  v-model="loading" :offset="10" :finished="finished"  :immediate-check="false">
                    <div class="buying_list_item" v-for="(item,index) in orderList" :key="index">
                       <img :src="item.publisherAvatarOriginalPath ? serverPath + item.publisherAvatarOriginalPath : defaultAvatar"/>
                       <div class="box">
                           <span class="color-000 blod">{{item.publisherNickName}}</span>
                           <span>限额{{item.availableQuantity}}</span>
                       </div>
                       <div class="box">
                           <span class="color-1ed189 blod">{{item.unitPrice.toFixed(4)}}</span>
                           <span>当前价格</span>
                       </div>
                       <a class="btn_sm bg-1ed189" @click="buy('IN')">购买</a>
                   </div>
                </van-list>
            </van-tab>
             <van-tab title="出售">
                 <van-list @load="loadDatas"  v-model="loading" :finished="finished" :offset="10"  :immediate-check="false">
                    <div class="buying_list_item" v-for="(item,index) in orderList" :key="index">
                       <img :src="item.publisherAvatarOriginalPath ? serverPath + item.publisherAvatarOriginalPath : defaultAvatar"/>
                       <div class="box">
                           <span class="color-000 blod">{{item.publisherNickName}}</span>
                           <span>限额{{item.availableQuantity}}</span>
                       </div>
                       <div class="box">
                           <span class="color-1ed189 blod">{{item.unitPrice.toFixed(4)}}</span>
                           <span>当前价格</span>
                       </div>
                       <a class="btn_sm bg-ff5755" @click="buy('OUT')">出售</a>
                   </div>
                </van-list>
            </van-tab>
            <div v-if="finished && (orderList && orderList.length > 0)" class="list-empty">已经到最后啦</div>
            <div v-else-if="(!orderList || orderList.length <= 0) && !loading" class="list-empty">{{'暂无相关记录' | translate}}</div>
        </van-tabs>
    </div>
    <div class="fiexd_operat">
        <router-link tag="a" class="btn btn_green" :to="{name:'trade_order',params:{type:'ASK-' + tradeType,currency:(assetType[assetIndex] ? assetType[assetIndex].value : '')}}">发布求购</router-link>
        <router-link tag="a" class="btn btn_red" :to="'/Digital_Asset/trade_order/SELL-' + tradeType">发布出售</router-link>
        <router-link tag="a" class="btn btn_gray" :to="'/Digital_Asset/trade_order/ORDER-'+ tradeType">订单</router-link>
        <router-link tag="a" class="btn btn_gray margin_empty" to="/Digital_Asset/trade_order/TRADE_RECORD">记录</router-link>
    </div>
    <van-popup v-model="popupData.fade" class="popShop__wrap" :class="{show: popupData.moveTop,balance:tradeType === 'BALANCE'}">
        <div class="buy__box">
            <div class="buy__box-dateil-top">
                <img src="../../../../static/img/icon-46.png"/>
                <div>
                    <span class="block">向<label>火星人</label>{{buyType === 'IN' ? '购买' : '出售' | translate}}</span>
                    <label>BTC</label>
                </div>
                <div class="buy__box-dateil-close" @click="popupData.fade = false">
                    <div class="box" :class="{'bg-color-1ed189':buyType === 'IN','bg-color-ff5755':buyType === 'OUT'}"></div>
                    <i class="dIcon dIcon_close"></i>
                </div>
            </div>
            <div class="buy__box-content">
                <div class="buy__box-content-item">
                    <label>{{'限额' | translate}}</label>
                    <span>170.0000</span>
                </div>
                <div class="buy__box-content-item">
                    <label>{{'当前价格' | translate}}</label>
                    <span>17.6236</span>
                </div>
                <div class="buy__box-content-item">
                    <label>BTC{{'数量' | translate}}</label>
                    <a class="btn">{{'全额' | translate}}</a>
                    <input type="number" v-model="buyNumber" />
                </div>
                <div class="buy__box-content-item">
                    <label v-if="tradeType === 'CASH'">{{buyType === 'IN' ? '线下支付' : '线下收款' | translate}}</label>
                    <label v-else>{{buyType === 'IN' ? '余额' : '成交获取余额' | translate}}</label>
                    <span :class="{'color-1ed189':buyType === 'IN','color-ff5755':buyType === 'OUT'}">17.6236 RMB</span>
                </div>
            </div>

            <van-password-input :value="popupData.password" @focus="showKeyboard" />
            <span v-if="buyType === 'IN' && tradeType === 'CASH'" class="buy__box-remrak">{{'请在3小时内线下打款到卖家账户，否则将影响你的信用值！' | translate}}</span>
            <span v-if="buyType === 'OUT' && tradeType === 'CASH'" class="buy__box-remrak">{{'请耐心等待3小时，买方线下打款到您的账户。' | translate}}</span>
        </div>
        <van-number-keyboard class="popShop-keyboadr"  :hide-on-click-outside="false"  :show="popupData.showKeyboard" theme="custom" :close-button-text="'完成' | translate" @blur="popupData.showKeyboard = false;popupData.moveTop = false;" @input="updatePassword" @delete="updatePassword" />
    </van-popup>
    
    <div class="tip_box" v-if="tipMenuFade">
        <span class="arrow_top"><img src="./buy-7.png"/></span>
        <span class="tip_item" :class="{'active':assetIndex == index}" @click="selectedAssetType(index)" v-for="(type,index) in assetType" :key="index" v-if="type">{{type.symbol}}</span>
    </div>
    <div class="van-modal"  @click="tipMenuFade = false"  v-if="tipMenuFade" style="z-index: 100;"></div>
    <area-selection :value="areaData.value.name"  @update="selectionUpdate" :show.sync="areaData.show"></area-selection>
  </div>
</template>
<script>
import echarts from 'echarts';
import areaSelection from 'src/components/area_selection';
import server from 'src/api/digitalAssetOrder';
import defaultAvatar from "../../../../static/img/default-man.png";
export default {
    components: {
      areaSelection
    },
    data(){
        return {
            finished:false,
            loading:true,
            tipMenuFade:false,
            popupData:{
                password:"",
                showKeyboard:false,
                moveTop:false,
                fade:false
            },
            areaData: {
                show: false,
                value: this.$store.getters.clientData.countryValue
            },
            coinInfo:{},
            serverPath: process.env.PROTOCOL + process.env.BASE_API,
            defaultAvatar:defaultAvatar,
            klineTime:5,
            searchData:null,
            vanTabActive:0,
            orderList:null,
            assetIndex:0,
            assetImages:{
                2000:"type_1.png",
                2001:"type_2.png",
                2004:"type_3.png",
                2002:"type_4.png",
                2003:"type_5.png"
            },
            myChart:null,
            tradeType:"",
            buyNumber:1,
            buyType:""
        }
    },
    computed:{
        assetType(){
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
        }
    },
    created:function(){
        // debugger
        let params = this.$route.params.type;
        this.assetIndex = params.split('-')[0] * 1;
        this.tradeType =  params.split('-')[1];
        this.initSearchData();
        this.getCoinInfo();
        this.getCoinPriceTrends();
        this.getActiveOrders();
    },
    mounted:function(){
        this.getKlineChart();
    },
    methods:{
        //生产k线图
        getKlineChart(){
            this.myChart = echarts.init(document.getElementById('main'));
            let option = {
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#cccccc'
                            }
                        }
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : [0]
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            type:'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data:[0]
                        }
                    ]
                };

            this.myChart.setOption(option);
        },
        //获取指定货币行情
        getCoinInfo(){
            $mask();
            server.getCoinInfo(this.assetIndex).then(res =>{
                this.$toast.clear();
                this.coinInfo =res.data;
            }).catch(error =>{
                console.log("[ERROR]-" + JSON.stringify(error));
            })
        },
        //获取价格趋势数据
        getCoinPriceTrends(){
            $mask();
            server.getCoinPriceTrends({
                currency:this.assetIndex,
                type:this.klineTime
            }).then(res =>{
                this.$toast.clear();
                let dateValue = [];
                let prices = [];
                res.data.forEach(v =>{
                    prices.push(v.price);
                    dateValue.push($dataFormat(v.time,"{MM-dd}"));
                })
                this.kLinkChartData = {
                    price:prices,
                    dateValue:dateValue
                };
                this.setKlinkChart();
            }).catch(error =>{
                console.log("[ERROR]-" + JSON.stringify(error));
            });
        },
        //获取日K线数据
        getCoinKLines(){
            $mask();
            server.getCoinKLines(this.assetIndex).then(res =>{
                this.$toast.clear();
                let dateValue = [];
                let prices = [];
                res.data.forEach(v =>{
                    prices.push([v.open,v.close,v.lowest,v.highest]);
                    dateValue.push($dataFormat(v.date,"{yyyy-MM-dd}"));
                })
                this.kLinkChartData = {
                    price:prices,
                    dateValue:dateValue
                };
                this.setKlinkChart(true);
            }).catch(error =>{
                console.log("[ERROR]-" + JSON.stringify(error));
            });
        },
        //是否全部加载完成
        isLoadDone(totalRecords){
            if(totalRecords > this.orderList.length)return;
            this.finished = true;
        },
        //获取下一页数据
        loadDatas(){
            this.searchData.pageIndex += 1;
            this.loading = true;
            this.getActiveOrders();
        },
        //获取订单数据
        getActiveOrders(){
            $mask();
            server.getActiveOrders(this.searchData).then(res =>{
                this.$toast.clear();
                this.loading = false;
                if(res.data.pageIndex > 1){
                    this.orderList = this.orderList.concat(res.data.rows);
                }else{
                    this.orderList = res.data.rows;
                }
                this.isLoadDone(res.data.totalRecords);
            }).catch(error =>{
                console.log("[ERROR]-" + JSON.stringify(error));
            });
        },
        //切换tab
        changeTime:function(time){
            if(this.klineTime === time) return;
            this.klineTime = time;
            if(time === 999){
                this.getCoinKLines();
                return;
            }
            this.getCoinPriceTrends();
        },
        //初始化查询数据
        initSearchData(){
            let searchData = {
                category:1,
                paymentType:1,
                sortField:"unitPrice",
                sortDirection:0,
                pageSize:20,
                pageIndex:1,
                currency:this.assetIndex,
            }
            searchData.paymentType =  this.tradeType === 'CASH' ? 1 : 2;
            if(this.tradeType === 'CASH'){
                searchData.countryCode = this.$store.getters.clientData.countryValue.code;
            }
            this.searchData = searchData;
        },
        //出售OR购买tab切换
        vanTabChange(index){
            this.searchData.category = index + 1;
            this.getActiveOrders();
        },
        selectionUpdate:function(val){
            this.areaData.value = val;
            this.searchData.countryCode = val.code;
            this.$store.dispatch('changeCountryValue',val);
            this.getActiveOrders();
        },
        updatePassword:function(value){
            if(!value){
                this.popupData.password = this.popupData.password.slice(0,this.popupData.password.length - 1);
                return;
            }
            this.popupData.password = (this.popupData.password + value).slice(0, 6);
        },
        buy:function(type){
            this.buyType = type;
            this.popupData.password = "";
            this.popupData.fade = true;
        },
        setKlinkChart:function(kline){
            if(kline){
                this.myChart.setOption({
                    tooltip:{formatter:function(params){
                        var res = params[0].seriesName + ' ' + params[0].name;
                        res += '<br/>  开盘 : ' + params[0].value[0] + '  最高 : ' + params[0].value[3];
                        res += '<br/>  收盘 : ' + params[0].value[1] + '  最低 : ' + params[0].value[2];
                        return res;
                    }},
                    series : [
                        {
                            name:'日K:',
                            type:'k',
                            data: this.kLinkChartData.price || [0]
                        }
                    ],
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : true,
                            axisTick: {onGap:false},
                            splitLine: {show:false},
                            data : this.kLinkChartData.dateValue || [0]
                        }
                    ]
                })
                return;
            }
            this.myChart.setOption({
                tooltip:{formatter:null},
                toolbox:null,
                dataZoom:null,
                series : [
                    {
                        name:'价格',
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data: this.kLinkChartData.price || [0]
                    }
                ],
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : this.kLinkChartData.dateValue || [0]
                    }
                ]
            })
        },
        showKeyboard:function(){
            this.popupData.moveTop = true;
            this.$nextTick(function(){
                this.popupData.showKeyboard = true;
            })
        },
        selectedAssetType:function(type){
            this.assetIndex =  type;
            this.searchData.currency = type;
            this.tipMenuFade = false;
            this.getCoinInfo();
            this.getActiveOrders();
            if(this.klineTime === 999){
                this.getCoinKLines();
                return;
            }
            this.getCoinPriceTrends();
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/style/util.scss";
    #main{
        height: f(490);
        width: 100%;
    }
    .topBar__right{
        img{
            width: f(30);
            height: f(36);
            margin-left: f(10);
        }
    }
    .topBar__content{
        label{
            font-size: f(36);
        }
        img{
            width: f(21);
            height: f(13);
        }
    }
    .asset_type_top{
        background-image: linear-gradient(0deg, #0469e5 0%, #1f8df7 100%);
        height: f(284);
        padding-top: f(88);
        color: #FFFFFF;
        font-size: f(24);
        span.fixedWidth80{
            display: inline-block;
            width: f(80);
        }
        span.fixedWidth120{
            display: inline-block;
            width: f(120);
        }
        div.left{
            border-right: f(2) solid rgba(255, 255, 255, 0.5);
            float: left;
            position: relative;
            padding-left: f(120);
        }
        div.right{
            float: right;
        }
        div{
            padding-left: f(30);
            width: 50%;
            height: f(80);
            margin-top: f(58);
        }
        img{
            position: absolute;
            left: f(30);
            height: f(80);
            width: f(80);
        }
        // height: f(284);
    }
    div.tabs-box{
        width: 100%;
        padding: 0.2rem 0.285rem;
        div.tabs{
            border-radius: f(8);
            border: solid f(2) #a1a4b4;
            width: f(690);
            height: f(60);
            text-align: center;
            line-height: f(60);
            label{
                width: 33.33%;
                border-right: solid f(2) #a1a4b4;
                float: left;
                height: 100%;
                
            }
            label:last-child{
                border-right: 0;
            }
            label.active{
                background-color: #a1a4b4;
                color: #ffffff;
            }
        }
    }
    div.fiexd_operat{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: f(120);
        background-color: #ffffff;
        box-shadow: 0 - f(2) f(5) 0
        rgba(161, 164, 180, 0.2);
        line-height: f(120);
        padding: 0 f(27.5);
        .margin_empty{
            margin: 0;
        }
    }
    .btn{
        display: inline-block;
        text-align:center;
        line-height: f(70);
        color: #ffffff;
        margin-right: f(10);
    }
    a.btn:active{
        color: #ffffff;
    }
    .btn_green{
        width: f(190);
        height: f(70);
        background-color: #1ed189;
        box-shadow: 0 f(10) f(20) 0
            rgba(30, 209, 137, 0.3);
        border-radius: 8px;
    }
    .btn_red{
        width: f(190);
        height: f(70);
        background-color: #ff5755;
        box-shadow:  0 f(10) f(20) 0
            rgba(255, 87, 85, 0.3);
        border-radius: 8px;
    }
    .btn_gray{
        width: f(126);
        height: f(70);
        background-color: #a1a4b4;
        box-shadow:  0 f(10) f(20) 0
            rgba(161, 164, 180, 0.3);
        border-radius: 8px;
    }
    div.buying_centre{
        &.empty{
            padding-bottom: 0;
        }
        padding-bottom: f(120);
        div.buying_list_item{
            width: 100%;
            height: f(130);
            padding: 0 f(29);
            div.box{
                width: f(177);
                height: f(60);
                float: left;
                margin: f(25) 0;
                font-size: f(22);
                padding-left: f(30);
                span{
                    display: block;
                    color: #6e7581;
                }
                span.blod{
                    font-weight: bold;
                    font-size: f(28);
                }
                span.color-000{
                    color: #000000;
                } 
            }
            img{
                width: f(80);
                height: f(80);
                border-radius: 50%;
                margin: f(15) 0;
                float: left;
            }
            .btn_sm{
                width: f(126);
                height: f(50);
                text-align: center;
                line-height: f(50);
                border-radius:f(8);
                color:#FFFFFF;
                float: right;
                margin: f(30) 0;
            }
            .btn_sm.bg-ff5755{
                background-color: #ff5755;
                box-shadow: 0 f(4) f(10) 0
                    rgba(255, 87, 85, 0.3);
            }
            .btn_sm.bg-1ed189{
                background-color: #1ed189;
                box-shadow: 0 f(4) f(10) 0
                    rgba(30, 209, 137, 0.3);
            }
        }
    }
    div.buy__box{
        width: f(610);
        border-radius: f(16);
        background-color: #ffffff;
        padding-bottom: f(38);
        div.buy__box-dateil-top{
            text-align: center;
            padding-top: f(65);
            img{
                width: f(130);
                height: f(130);
                border-radius: 50%;
                position: absolute;
                top: - f(65);
                left: 50%;
                margin-left: - f(65);
            }
            span.block{
                display: block;
                font-size: f(28);
                color: #6e7581;
                label{
                    font-size: f(32);
                    display: inline-block;
                    padding: 0 f(10);
                    font-weight: bold;
                    color: #6e7581;
                }
            }
            label{
                color: #0079f1;
                font-size: f(28);
            }
            div.buy__box-dateil-close{
                position: absolute;
                top: 0;
                right: 0;
                width: 0.72rem;
                height: 0.75rem;
                overflow: hidden;
                border-radius: 0 f(16) 0 0;
                div.box{
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 1.45rem;
                    height: 1.5rem;
                    border-radius: 0.72rem 0.75rem;
                }
                .bg-color-1ed189{
                    background-color: #1ed189;
                }
                .bg-color-ff5755{
                    background-color: #ff5755;
                }
                .dIcon_close {
                    background-image: url("icon-42.png");
                    position: absolute;
                    bottom: 0.37rem;
                    left: 0.34rem;
                    width: 0.16rem;
                    height: 0.15rem;
                }
            }
            border-bottom: f(2) solid #e8eaee;
        }
        span.buy__box-remrak{
            font-size: f(22);
            color: #ff5755;
            display: inline-block;
            padding: f(34) f(45);
        }
        div.buy__box-content{
            padding: f(32) f(46);
            div.buy__box-content-item{
                height: f(70);
                font-size: f(28);
                span{
                    float: right;
                    font-weight: bold;
                }
                input{
                    width: f(160);
                    height: f(60);
                    background-color: #f5f5f5;
                    border-radius: f(8);
                    border: 0;
                    padding-right: f(15);
                    text-align: right;
                    font-weight: bold;
                    float: right;
                }
                a.btn{
                    width: f(100);
                    height: f(60);
                    margin-left: f(26);
                    background-color: #f5f5f5;
                    border-radius:f(8);
                    float: right;
                    color: #6e7581;
                    margin-right: 0;
                }
            }
        }
    }
    div.popShop__wrap.show{
        top: 38% !important;
    }
    div.popShop__wrap.show.balance .popShop-keyboadr{
        bottom: -208px !important;
    }
    span.color-1ed189{
        color: #1ed189;
    }
    span.color-ff5755{
        color: #ff5755;
    }
    
    div.tip_box{
        position: fixed;
        left:  50%;
        top: f(110);
        margin-left: - f(150);
        width: f(300);
        background-color: #ffffff;
        box-shadow: 0 0 f(30) 0
            rgba(0, 0, 0, 0.1);
        border-radius: f(8);
        border: solid f(2) #e8eaee;
        z-index: 101;
        text-align: center;
        span.arrow_top{
            width: f(37);
	        height: f(17);
            position: absolute;
            top: - f(45);
            left: 50%;
            margin-left: - f(19);
            img{
                width: f(37);
                height: f(17);
            }
            border: 0;
        }
        span{
            display: block;
            line-height: f(70);
            font-size: f(24);
            border-bottom: f(2) solid #e8eaee;
        }
        span.active{
            color: #0055ff;
        }
    }
    div.van-modal{
        top:f(88);
    }
    div.list-empty{
        text-align: center;
        width: 100%;
        padding: f(20) 0;
    }
</style>
