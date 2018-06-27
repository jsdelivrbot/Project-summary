<template>
    <div class="rollOut backPadding" @click="checkTipFade">
        <top-bar back-type="2">
            <div slot="right" class="choose_icon" @click="showMenu"></div>
            <div slot="content" class="padding_15">{{type === 'in' ? '买入' : '卖出' | translate}}</div>
        </top-bar>
        <div class="operat_choose_area">
            <img src="../../../static/img/icon-28.png"/>
            <span>中国</span>
            <div class="right">
                <label>请选择区域</label>
                <van-icon name="arrow" />
            </div>
        </div>
        <div class="gray-bg"></div>
        <div class="moneys">
            <label>{{type === 'in' ? '请选择买入金额' : '请选择卖出金额' | translate}}</label>
            <span @click="selectMoney(money)" v-for="money in moneyList" :key="money" :class="{'active':activeMoney === money}">{{money}}</span>
        </div>
        <div class="choose_bank" @click="openChooseBank">
            <label>{{ type === 'in' ? '选择绑定的银行卡' : '选择收款的银行卡'  | translate}}</label>
            <van-icon name="arrow" />
        </div>
       <div class="bank_card">
            <div class="shadow_default" v-if="selectedBank">
                <img :src="'../../../static/img/' + bankIcons[selectedBank.code]"/>
                <span>{{selectedBank.name}}</span>
                <span>{{selectedBank.cardNumber}}</span>
            </div>
            <div class="shadow_1"></div>
            <div class="shadow_2"></div>
       </div>
       <div class="remark_box" v-if="type === 'out'">
           <textarea :placeholder="'注意：不能输入表情' | translate"></textarea>
       </div>
       <router-link to="/buy/in/create_order" tag="div" class="operat">
            <a class="dButton dButton__large dButton_blue">{{"创建订单"  | translate}}</a>
        </router-link>
       <van-popup v-model="popupfade" position="right" :overlay="false">
            <top-bar back-type="2" :has-back="false" @back="closedPopup"></top-bar>
            <div class="view_bank-list rollOut backPadding">
                <label>选择银行卡</label>
                <div @click="chooseBank(bank)" class="view_bank-item" v-for="bank in bankList" :key="bank.id">
                    <img :src="'../../../static/img/' + bankIcons[bank.code]"/>
                    <span>{{bank.name}}</span>
                    <span>{{bank.cardNumber}}</span>
                </div>
            </div>
            <div class="operat">
                <a class="dButton dButton__large dButton_blue">{{"添加银行卡"  | translate}}</a>
            </div>
        </van-popup>
        <div class="van-modal" v-if="tipMenuFade" style="z-index: 998;"></div>
        <div class="tip-box" v-if="tipMenuFade">
            <span class="arrow_top"><img src="./buy-7.png"/></span>
            <div class="tip_operat">
                <div class="list-item">
                    <img src="./buy-2.png"/>
                    <label>{{'未完成订单' | translate}}</label>
                </div>
                <div class="list-item">
                    <img src="./buy-3.png"/>
                    <label>{{type === 'in' ? '确认打款' : '确认收款' | translate}}</label>
                </div>
                <div class="list-item">
                    <img src="./buy-4.png"/>
                    <label>{{'已完成订单' | translate}}</label>
                </div>
                <div class="list-item">
                    <img src="./buy-5.png"/>
                    <label>{{type === 'in' ? '买入记录' : '卖出记录' | translate}}</label>
                </div>
                <div class="list-item">
                    <img src="./buy-6.png"/>
                    <label>{{type === 'in' ? '买入中心': '卖出中心' | translate}}</label>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            moneyList:[500,1000,3000,5000,10000,30000],
            activeMoney:500,
            selectedBank:null,
            bankIcons:{
                "BOCOM":"bank-1.png",
                "ABC":"bank-2.png",
                "BOC":"bank-3.png"
            },
            bankList:[
                {
                    id:"1525317967183",
                    name:"交通银行",
                    code:"BOCOM",
                    cardNumber:"4302 0419 **** 5459"
                },
                {
                    id:"1525317981062",
                    name:"农业银行",
                    code:"ABC",
                    cardNumber:"4302 0419 **** 5459"
                },
                {
                    id:"1525317991331",
                    name:"中国银行",
                    code:"BOC",
                    cardNumber:"4302 0419 **** 5459"
                },
            ],
            popupfade:false,
            tipMenuFade:false,
            type:""
        }
    },
    created:function(){
        this.type = this.$route.params.type;
        this.selectedBank = this.bankList[0];
    },
    methods:{
        selectMoney:function(money){
            if(money === this.activeMoney) return;
            this.activeMoney = money;
        },
        openChooseBank:function(){
            this.popupfade = true;
        },
        chooseBank:function(data){
            this.selectedBank = data;
            this.closedPopup();
        },
        closedPopup:function(){
            this.popupfade = false;
        },
        showMenu:function(){
            if(this.tipMenuFade) return;
            this.tipMenuFade = true;
        },
        checkTipFade:function(event){
            if(!this.tipMenuFade) return;
            let cls = event.target.className;
            if(cls.indexOf('van-modal') < 0) return;
            this.tipMenuFade = false;
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
    @import "src/style/util.scss";
    .van-popup--right {
        width: 100%;
        height: 100%;
    }
    div.moneys{
        background-color: #ffffff;
        label{
            display: block;
            margin-left: f(16);
            color: #000000;
            font-size: f(28);
        }
        span{
            display: inline-block;
            width: f(216);
            height: f(120);
            line-height: f(120);
            text-align: center;
            border-radius: f(8);
            background-color: #ffffff;
            box-shadow:0 0 f(30) 0
                rgba(0, 0, 0, 0.1);
            margin: f(10) f(16);
        }
        span.active{
            color: #ffffff;
            background-image: linear-gradient(90deg, 
                #1588ff 0%, 
                #20d0ff 100%);
            box-shadow: 0 0 f(30) 0
                rgba(0, 121, 241, 0.3);
                
        }
    }
    div.bank_card{
        position: relative;
        height:f(180);
        padding: f(20) 0;
        margin: 0 0 f(75);
        div{
             position: absolute;
             height: f(140);
            background-color: #ffffff;
            box-shadow: 0 0 f(30) 0
                rgba(0, 0, 0, 0.1);
            border-radius: f(8);
            border: solid f(2) #e8eaee;
        }
        div.shadow_default{
            top: 0;
            z-index: 2;
            width: f(690);
            margin: 0 f(30);
            img{
                height: 100%;
                padding: f(20);
            }
        }
        div.shadow_1{
            top: f(20);
            z-index: 1;
            width: f(640);
            margin: 0 f(55);
        }
        div.shadow_2{
            top: f(40);
            z-index: 0;
            width: f(584);
            margin: 0 f(83);
        }
    }
    div.operat{
        padding: f(15) f(30);
    }
    div.choose_bank{
        padding: f(10);
        margin: 0.2rem 0;
        font-size: f(28);
        i{
            float: right;
        }
    }
    div.padding_15{
        padding: 0 f(20);
    }
    div.remark_box{
        padding:  0 f(30);
        textarea{
            width: f(690);
            height: f(229);
            background-color: #ffffff;
            border-radius: f(8);
            border: solid f(2) #e8eaee;
            padding: f(28)
        }
    }
    div.view_bank-list{
        padding: f(108) 0 f(20);
        label{
            padding: f(25);
            display: inline-block;
            width: 100%;
            background-color: #f5f5f5;
        }
        div.view_bank-item{
            width: f(750);
            height: f(140);
            background-color: #ffffff;
            border: solid f(2) #e8eaee;
            img{
                height: 100%;
                padding: f(30);
            }
        }
    }
    div.choose_icon{
        width: f(40);
        height: f(8);
        background-image: url('buy-1.png');
        background-size: cover;
        margin-right: 0.3rem;
    }
    div.app__title-right{
        padding-right: f(30);
    }

    div.tip-box{
        width: f(300);
        height: f(400);
        background-color: #ffffff;
        border-radius: f(8);
        position: absolute;
        top: 1.08rem;
        right: 0.2rem;
        z-index: 999;
        div.list-item{
            border-bottom: f(1) solid #c1c1c1;
            padding: f(15) f(20);
            img{
                width: f(40);
                height: f(48);
                margin-right: f(15);
            }
        }
        div.list-item:last-child{
            border-bottom: 0;
        }
        span.arrow_top{
            display: inline-block;
            width: f(37);
            height: f(17);
            position: absolute;
            top: - f(32);
            right: 0.4rem;
            img{
                height: 100%;
                width: 100%;
            }
        }
    }
    div.gray-bg{

        height: f(21);
        width: 100%;
        background-color: #f5f5f5;
    }
    div.operat_choose_area{
        height: f(80);
        line-height: f(80);
        margin-top: -0.34rem;
        padding: 0 f(20);
        font-size: f(28);
        width: 100%;
        img{
            width: f(30);
            height: f(36);
        }
        div.right{
            float: right;
            color: #a1a4b4;
        }
        span{
            width: f(90);
            height: f(44);
            line-height: f(44);
            text-align: center;
            background-color: rgba(0, 121, 241, 0.15);
            border-radius: f(10);
            display: inline-block;
            color: #0079f1;
        }
    }
</style>

