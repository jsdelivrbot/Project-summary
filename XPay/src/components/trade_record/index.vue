<template>
    <div class="rollOut backPadding"  @click="checkTipFade">
        <top-bar back-type="2"><div slot="content" class="padding_15">{{'交易记录' | translate}}</div></top-bar>
        <div class="btn-operat-box">
            <div class="btn-label tip-operat" @click="openTipMenu(0)">
                <label class="tip-operat">{{activeCurrency.symbol}}</label>
                <img class="tip-operat" src="../../../static/img/icon-43.png"/>
            </div>
        </div>
        <div class="operat-time-choose" ref="timeChoose" >
            <label class="tip"  @click="openTipMenu(1)">{{activeTime.name | translate}}</label>
            <img class="tip" src="./trade-1.png"  @click="openTipMenu(1)"/>
        </div>
        <van-pull-refresh v-model="isLoading" :head-height="30" @refresh="onRefresh">
            <div class="trade-list">
                <van-list :offset="10" v-model="loading" :finished="finished" @load="onLoad" :immediate-check="false">
                    <div class="item" v-for="record in tradeRecordList" :key="record.id">
                        <div class="left">
                            <span class="block blod-sm">{{recordType[record.type] | translate}}{{record.notes}}</span>
                            <span class="block colour-6e7581">{{record.createTime}}</span>
                        </div>
                        <div class="right">
                            <span class="blod">{{record.amount}}</span>
                            <span class="font-sm colour-6e7581">{{currencys[record.currency].symbol}}</span>
                        </div>
                    </div>
                    <div v-if="finished && (tradeRecordList && tradeRecordList.length > 0)" class="list-empty">{{'已经到最后啦' | translate}}</div>
                    <div v-else-if="(!tradeRecordList || tradeRecordList.length <= 0) && !loading" class="list-empty">{{'暂无数据记录' | translate}}</div>
                </van-list>
            </div>
        </van-pull-refresh>
        <div class="tip-box" :class="{'time':isTimeFade}" v-if="tipMenuFade" :style="tipTimeStyle">
            <div class="tip_operat" v-if="!isTimeFade">
                <div class="tip_list-item" @click="selectedCurrency(-1)" :class="{'active':activeCurrency.value == -1}">全部</div>
                <div class="tip_list-item" @click="selectedCurrency(currency)" :class="{'active':activeCurrency.value == key}" v-for="(currency,key) in currencys" :key="key">{{currency.symbol}}</div>
            </div>
            <div  class="tip_operat" v-else>
                <div class="tip_list-item" @click="selectedTime(item)" :class="{'active':activeTime.value == item.value}" v-for="(item,index) in times" :key="index">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import server from 'src/api/digitalAssetOrder';
export default {
    data(){
        return {
            tipMenuFade:false,
            recordType:{
                "12":"求购",
                "11":"出售",
                "6":"转出",
                "5":"转入",
            },
            loading: false,
            isLoading:false,
            finished: false,
            isTimeFade:false,
            times:[
                {
                    value:1,
                    name:"一天内"
                },
                {
                    value:5,
                    name:"五天内"
                },
                {
                    value:30,
                    name:"一个月"
                },
                {
                    value:90,
                    name:"三个月"
                }
            ],
            tipTimeStyle:{},
            activeTime:null,
            activeCurrency:{
                name:"全部",
                value: -1,
                symbol:"全部"
            },
            submitData:{
                inDays:1,
                type:"",
                pageSize:20,
                pageIndex:1
            },
            currencys:null,
            tradeRecordList:null
        }
    },
    created(){
        this.initBaseCurrencys();
        this.getTradeRecord();
        this.activeTime = this.times[0];
    },
    methods:{
        initBaseCurrencys:function(){
            let data = this.$store.getters.clientData.enums.currency;
            let res = {};
            for(let key in data){
                let v = data[key];
                if(v.attribute){
                    v.attribute.value = key;
                    res[key] = v.attribute;
                    continue;
                }
                v.symbol = v.name;
                res[key] = v;
            }
            this.currencys = res;
        },
        onRefresh(){
            this.submitData.pageIndex = 1;
            this.finished = false;
            this.getTradeRecord();
        },
        isLoadDone(totalRecords){
            if(totalRecords > this.tradeRecordList)return;
            this.finished = true;
        },
        //获取交易记录
        getTradeRecord:function(){
            $mask();
            server.getTradeRecord(this.submitData).then(res =>{
                this.$toast.clear();
                this.loading = false;
                this.isLoading = false;
                if(res.data.pageIndex > 1){
                    this.tradeRecordList = this.tradeRecordList.concat(res.data.rows);
                }else{
                    this.tradeRecordList = res.data.rows;
                }
                this.isLoadDone(res.data.totalRecords);
            }).catch(error =>{
                console.error("[ERROR]" + error);
            })

        },
        openTipMenu:function(isTime){
            if(this.tipMenuFade && this.isTimeFade) {
                this.isTimeFade = false;
                this.tipTimeStyle = null;
                return;
            }
            if(this.tipMenuFade && this.isTimeFade) return;
            if(isTime){
                this.isTimeFade = true;
                this.tipTimeStyle = {
                    top: (this.$refs.timeChoose.offsetTop + this.$refs.timeChoose.clientHeight)  + "px"
                }
            }
            this.tipMenuFade = true;
        },
        checkTipFade:function(event){
            let cls = event.target.className;
            if(cls.indexOf('tip') >= 0) return;
            this.closeTip();
        },
        closeTip:function(){
            this.tipMenuFade = false;
        },
        selectedCurrency:function(data){
            this.closeTip();
            let type = "";
            if(data === -1){
                this.activeCurrency = {
                    name:"全部",
                    value: -1,
                    symbol:"全部"
                };
            }else{
                type = data.value;
                this.activeCurrency = data;
            }
            this.submitData.pageIndex = 1;
            this.submitData.type = type;
            this.getTradeRecord();
            
        },
        selectedTime:function(data){
            this.isTimeFade = false;
            this.tipMenuFade = false;
            this.activeTime = data;
            this.submitData.inDays = data.value;
            this.getTradeRecord();
        },
        onLoad:function(){
            // this.submitData.pageIndex += 1;
            this.loading = true;
            this.getTradeRecord();
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/style/util.scss";
    .list-empty{
        text-align: center;
        padding: f(100) 0;
    }
    div.btn-operat-box{
        width: 100%;
        padding: f(25) 0;
        div.btn-label{
            position: relative;
            width: f(150);
            height: f(44);
            background-color: #0079f1;
            box-shadow: 0 f(4) f(10) 0
            rgba(0, 121, 241, 0.3);
            border-radius: f(22);
            color: #ffffff;
            text-align: center;
            padding-right: f(20);
            margin: 0 auto;
            img{
                width: f(21);
                height: f(13);
                position: absolute;
                right: f(20);
                top: f(15.5);
            }
        }
    }
    div.app__title{
        padding-left: f(30);
        margin-bottom: 0 !important;
    }
    div.operat-time-choose{
        width: f(749);
        background-color: #f5f5f5;
        height: f(80);
        line-height: f(80);
        padding-left: f(30);
        font-size: f(28);
        color: #6e7581;
        img{
            width: f(21);
            height: f(13);
        }
    }

    div.trade-list{
        background-color: #ffffff;
        div.item{
            padding: f(20) f(30);
            span.block{
                display: block;
               line-height: f(40);
            }
            div.left{
                float: left;
            }
            div.right{
                float: right;
                line-height: f(80);
                span.font-sm{
                    font-size: f(25);
                }
            }
            .blod-sm{
                font-size: f(30);
                font-weight: bold;
            }
            .blod{
                font-size: f(40);
                font-weight: bold;
            }
            overflow: hidden;
            border-bottom:f(1) solid #c1c1c1;
        }
        div.item:last-child{
            border-bottom: 0;
        }
    }
    .colour-6e7581{
        color: #6e7581;
    }

    div.tip-box{
        width: f(145);
        padding-left: f(24);
        background-color: #ffffff;
        border-radius: f(8);
        position: absolute;
        top: 1.6rem;
        left: 50%;
        margin-left: - f(72.5);
        z-index: 999;
        box-shadow: 0 0 f(30) 0 rgba(0, 0, 0, 0.1);
        border: solid f(2) #e8eaee;
        div.tip_list-item{
            padding: f(12) 0;
            font-size: f(24);
            img{
                width: f(40);
                height: f(48);
                margin-right: f(15);
            }
            font-weight: bold;
        }
        div.tip_list-item.active{
            color: blue;
        }
    }
    div.tip-box.time{
        left: f(20);
        margin-left: 0;
    }
</style>

