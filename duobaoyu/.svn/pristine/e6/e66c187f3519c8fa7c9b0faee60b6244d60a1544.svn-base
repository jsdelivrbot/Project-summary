<template>
    <div class="routerBox">
        <div class="Dmask">
            <div class="Activity">
                <div class="Activity_inner clearfix">
                    <close :Router="true"></close>
                    <div class="Activity_left pull-left">
                        <div class="Activity_left_dial">
                            <!-- <span class="config-text light-color">{{config.configJX1}}</span> -->
                            <div class="canvasBox" ref="turnTable" id="turnTable">
                                <div v-for="(item,index) in turnplate.restaraunts" :key="index">
                                    <!-- <img src="static/imgs/prize_1.png" v-if="item.Id==2" class="prize_item" :class="zjzlClass[index]" /> -->
                                    <img :src="prizeImg[index]" class="prize_item" :class="prizeClass[index]" />
                                </div>
                                <!-- <img src="static/imgs/prize_1.png" class="prize_item prize_1"/>
                                            <img src="static/imgs/prize_2.png" class="prize_item prize_2" />
                                            <img src="static/imgs/prize_3.png" class="prize_item prize_3" />
                                            <img src="static/imgs/prize_4.png" class="prize_item prize_4" />
                                            <img src="static/imgs/prize_5.png" class="prize_item prize_5" />
                                            <img src="static/imgs/prize_6.png" class="prize_item prize_6" />
                                            <img src="static/imgs/prize_7.png" class="prize_item prize_7" />
                                            <img src="static/imgs/prize_8.png" class="prize_item prize_8" /> -->
                                <canvas class="item" id="wheelcanvas" :width="width" :height="height"></canvas>
                            </div>
                           
                            <button class="Activity_left_dial_pointer go" :disabled="choujianging" ref="turnPoint" :class="{'startgo':this.rotate}" @click="Activity_start()">
                                 <span class="pointer_text">消耗x{{configData.NeedPtNums}}普通多宝鱼</span>
                            </button>
                            <div class="Activity_duobaoyu input_group">
                                <img class="duobaoyu" src="static/imgs/putong_03.png">
                                <input type="text" v-model="userWallet" disabled class="input_common input_dark">
                            </div>
                        </div>
                        <div class="Activity_left_human">
                            <img src="static/imgs/activity_bazhuayu.png">
                        </div>
                        <div class="Activity_left_title">
                            <img src="static/imgs/activity_title.png">
                        </div>
                    </div>
                    <div class="Activity_right inline">
                        <!-- <div class="Activity_right_tips">
                            您还有 <span>{{configData.QH}}</span> 次抽奖机会
                        </div> -->
                        <!-- <div class="Activity_right_tips" v-show="Error">
                                                        {{Error}}
                                                    </div> -->
                        <div class="Activity_right_rule">
                            <div>抽奖规则</div>
                            <div>①每次抽奖消耗部分普通多宝鱼。</div>
                            <div>②抽到相对应多宝鱼奖励，奖品直接存入钱包。</div>
                            <div>③抽到购物多宝鱼，可直接存入商城购物多宝鱼钱包，抽到实物后台直接产生消费订单，平台会在3个工作日内进行发货 。</div>
                            <div>具体详情请咨询客服，平台保留最终解释权</div>
                        </div>
                    </div>
                    <div class="Activity_bottom">
                        <div class="popBox2_bottom_footer_left ">
                            <span v-show="hintShow" style="font-size:24px;">{{hint}}</span>
                            <span v-show="!hintShow">距离{{configData.JieRi}}抽奖还有：</span>
                            <div class="countDown" v-show="!hintShow">
                                <span>{{resTime.days }}</span> 天
                                <span>{{resTime.hours}}</span> 时
                                <span>{{resTime.mins}}</span> 分
                                <span>{{resTime.secs}}</span>秒
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import close from "@/components/close";
    import * as ajax from "@/api/common";
    import {
        Message,
        MessageBox
    } from "element-ui";
    import {
        mapGetters
    } from "vuex";
    import {
        debounce
    } from "@/utils";
    export default {
        data() {
            return {
                isOpen: true,
                isCanChoujiang: true,
                choujianging: false,
                hintShow: false,
                canvas: null,
                rotate: false,
                hint: '',
                Error: '',
                turnWidth: '',
                turnHeigth: '',
                width: '',
                height: '',
                prizeImg: [],
                prizeClass: [],
                zjzlClass: [],
                rotateDeg: '',
                turnplate: {
                    restaraunts: [], //大转盘奖品名称
                    outsideRadius: 295, //大转盘外圆的半径
                    textRadius: 295, //大转盘奖品位置距离圆心的距离
                    insideRadius: 294, //大转盘内圆的半径
                    startAngle: 0, //开始角度
                    bRotate: false //false:停止;ture:旋转
                },
                turnData: [],
                configData: false,
                userWallet:0,
                prizeId: '',
                Count_DownTimer: null,
                resTime: {
                    startTime: '',
                    endTime: '',
                    days: '',
                    hours: '',
                    mins: '',
                    secs: '',
                },
            }
        },
        beforeCreate() {
            //debugger;
            ajax.post('/api/Activity/GetDzpConfig', {}).then(response => {
                console.log(response);
                //debugger;
                this.configData = response.Data;
                this.resTime.endTime = response.Data.StartTime;
                this.isOpen = response.Data.IsOpen;
                this.isCanChoujiang = response.Data.QH;
                this.turnData.push(response.Data.One);
                this.turnData.push(response.Data.Two);
                this.turnData.push(response.Data.Three);
                this.turnData.push(response.Data.Four);
                this.turnData.push(response.Data.Five);
                this.turnData.push(response.Data.Six);
                this.turnData.push(response.Data.Seven);
                this.turnData.push(response.Data.zjzl);
                //console.log(this.turnData);
                this.turnplate.restaraunts = this.turnData;
                this.turnplate.restaraunts.forEach(element => {
                    var prizeImg = "static/imgs/prize_" + element.Id + ".png";
                    this.prizeImg.push(prizeImg);
                    var className = "Zjzlprize_" + element.Id;
                    var prizeClassName = 'prize_' + element.Id;
                    this.zjzlClass.push(className);
                    this.prizeClass.push(prizeClassName);
                    //console.log(this.zjzlClass);
                    //console.log(this.prizeClass);
                });
                console.log(this.prizeImg)
                if (this.isOpen == false) {
                    this.$router.go(-1);
                    this.errorMsg('抽奖活动暂未开放！');
                }
            })
        },
        created() {
            this.bindWallet()
            this.countDown();
            this.Count_DownTimer = setInterval(() => {
                //debugger;
                this.countDown();
            }, 1000)
        },
        // beforeRouteEnter(to, from, next) {
        //     //alert(1);
        //     ajax.post('/api/Activity/GetDzpConfig', {}).then(response => {
        //         console.log(response);
        //         //debugger;
        //         // this.configData=response.Data;
        //         //this.isOpen=response.Data.IsOpen;
        //         if (response.Data.IsOpen) {
        //             //this.$router.go(-1);
        //             next();
        //            this.configData=response.Data
        //         } else {
        //             next(false);
        //              Message({
        //                 message: '活动暂未开放',
        //                 type: 'error',
        //                 duration: 3 * 1000,
        //                 customClass: 'requestMessage'
        //             })
        //         }
        //     })
        // },
        mounted() {
            //const that = this
            this.$nextTick(function() {
                this.drawRouletteWheel()
                //setInterval(this.drawRouletteWheel,1000);
            });
            // this.__resizeHanlder = debounce(() => {
            //     //debugger;
            //     this.drawRouletteWheel();
            // }, 100);
            // window.addEventListener("resize", this.__resizeHanlder);
        },
        watch: {
            Fresh(val) {
                if (val) {
                    this.$router.go(0);
                }
            }
        },
        computed: {
            ...mapGetters(["name", "roles", "bubble", "fresh"]),
            Fresh() {
                return this.fresh.isFresh
            }
        },
        methods: {
            bindWallet() {
                ajax.post('/api/User/GetUserWallets',{}).then(response =>{
                    console.log(response);
                    //debugger;
                    var walletList = response.Data;
                    walletList.forEach(element => {
                        if(element.CurrencyId == 1){
                            this.userWallet = element.Amount
                        }
                    });
                })
            },
            Activity_start() {
                this.choujianging = true;
                if (this.isCanChoujiang && this.choujianging) {
                    this.rotate = true;
                    setTimeout(() => {
                        this.choujiang();
                    }, 500)
                } else {
                    this.errorMsg('您今日抽奖机会已用完');
                }
            },
            choujiang() {
                this.$refs.turnPoint.style.transform = 'rotate(0deg)';
                ajax.post('/api/Activity/ChouJiang', {}).then(response => {
                    //debugger;
                    console.log(response);
                    this.prizeId = response.Data;
                    this.rotateDeg = (360 / this.turnplate.restaraunts.length * (this.prizeId + 1)) + 22.5;
                    //debugger;
                    console.log('rotateDeg', this.rotateDeg);
                    this.$refs.turnPoint.style.transform = 'rotate(' + this.rotateDeg + 'deg)';
                    this.$refs.turnPoint.style.transition = 'all 1s';
                   
                    if (this.prizeId == 8) {
                       // debugger;
                        setTimeout(() => {

                            //  this.$refs.turnPoint.style.transform = 'rotate('  + '-' + this.rotateDeg + 'deg)';
                            this.$router.push({
                                path: '/activity/unlucky'
                            })
                        }, 2500)
                    }
                    this.turnplate.restaraunts.forEach(element => {
                        if (element.Id == response.Data && this.prizeId != 8) {
                            //  this.$refs.turnPoint.style.transform = 'rotate('  + '-' + this.rotateDeg + 'deg)';
                            setTimeout(() => {
                                this.$router.push({
                                    path: '/activity/lucky',
                                    query: element
                                })
                            }, 2500)
                        }
                    });
                })
            },
            drawRouletteWheel() {
                var canvas = document.getElementById("wheelcanvas");
                this.canvas = canvas;
                //debugger;
                var dom = document.getElementById("turnTable");
                var width = dom.clientWidth;
                var height = dom.clientHeight;
                canvas.setAttribute('width', width + 'px');
                canvas.setAttribute('height', height + 'px');
                this.turnplate.outsideRadius = width * 0.8;
                this.turnplate.insideRadius = width * 0.8;
                console.log(width, height)
                if (canvas.getContext) {
                    //根据奖品个数计算圆周角度
                    var arc = Math.PI / (this.turnplate.restaraunts.length / 2);
                    var ctx = canvas.getContext("2d");
                    ctx.clearRect(0, 0, width, height);
                    ctx.strokeStyle = "transparent";
                    for (var i = 0; i < this.turnplate.restaraunts.length; i++) {
                        var angle = this.turnplate.startAngle + i * arc;
                        ctx.beginPath();
                        //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
                        ctx.arc(width / 2, height / 2, this.turnplate.outsideRadius, angle, angle + arc, false);
                        ctx.arc(width / 2, height / 2, this.turnplate.insideRadius, angle + arc, angle, true);
                        ctx.stroke();
                        ctx.save();
                        var b = i + 2;
                        var text = this.turnplate.restaraunts[i];
                        var line_height = 17;
                        if (b % 2) {
                            ctx.fillStyle = "#cd2226";
                        } else {
                            ctx.fillStyle = "#e68b0e";
                        };
                        var font = width / 20;
                        ctx.font = font + "px serif";
                       // debugger;
                        var text = this.turnplate.restaraunts[i].ShowMsg;
                        ctx.translate(width / 2 + Math.cos(angle + arc / 2) * this.turnplate.textRadius, height / 2 + Math.sin(angle + arc / 2) * this.turnplate.textRadius);
                        //rotate方法旋转当前的绘图
                        ctx.rotate(angle + arc / 2 + Math.PI / 2);
                        // ctx.fillText(text, 20, 148);\
                        var clientWidth = document.documentElement.clientWidth;
                        console.log('clientWidth', clientWidth)
                        //var y=
                        if (clientWidth < 750) {
                            ctx.fillText(text, -ctx.measureText(text).width / 2, height * 0.7);
                        }
                        ctx.fillText(text, -ctx.measureText(text).width / 2, 35);
                        //添加对应图标
                        //debugger;
                        // if (text == this.turnplate.restaraunts[0]) {
                        //     var img = document.getElementById("prize_1");
                        //     img.onload = function() {
                        //         ctx.save();
                        //         console.log('prize_1')
                        //         ctx.drawImage(img, i, height/2*0.3);
                        //         ctx.restore();
                        //     };
                        //     ctx.drawImage(img, width/2*0.65, height/2*0.3);
                        //     // ctx.save();
                        // }
                        // if (text == this.turnplate.restaraunts[1]) {
                        //     var img2 = document.getElementById("prize_2");
                        //     img2.onload = function() {
                        //         console.log('prize_2')
                        //         ctx.save();
                        //         ctx.drawImage(img2, 245, 65);
                        //         ctx.restore();
                        //     };
                        //     //ctx.drawImage(img, -135, 75);
                        //     // ctx.save();
                        // }
                        // if (text == this.turnplate.restaraunts[2]) {
                        //     var img3 = document.getElementById("prize_3");
                        //     img3.onload = function() {
                        //         console.log('prize_2')
                        //         ctx.save();
                        //         ctx.drawImage(img3, 345, 145);
                        //         ctx.restore();
                        //     };
                        //     //ctx.drawImage(img, -135, 75);
                        //     // ctx.save();
                        // }
                        // if (text == this.turnplate.restaraunts[3]) {
                        //     var img4 = document.getElementById("prize_4");
                        //     img4.onload = function() {
                        //         console.log('prize_2')
                        //         ctx.save();
                        //         ctx.drawImage(img4, 345, 245);
                        //         ctx.restore();
                        //     };
                        //     //ctx.drawImage(img, -135, 75);
                        //     // ctx.save();
                        // }
                        // if (text == this.turnplate.restaraunts[4]) {
                        //     var img5 = document.getElementById("prize_5");
                        //     img5.onload = function() {
                        //         console.log('prize_2')
                        //         ctx.save();
                        //         ctx.drawImage(img5, 255, 325);
                        //         ctx.restore();
                        //     };
                        //     //ctx.drawImage(img, -135, 75);
                        //     // ctx.save();
                        // }
                        // if (text == this.turnplate.restaraunts[5]) {
                        //     var img6 = document.getElementById("prize_6");
                        //     img6.onload = function() {
                        //         console.log('prize_2')
                        //         ctx.save();
                        //         ctx.drawImage(img6, 135, 325);
                        //         ctx.restore();
                        //     };
                        //     //ctx.drawImage(img, -135, 75);
                        //     // ctx.save();
                        // }
                        // if (text == this.turnplate.restaraunts[6]) {
                        //     var img7 = document.getElementById("prize_7");
                        //     img7.onload = function() {
                        //         console.log('prize_2')
                        //         ctx.save();
                        //         ctx.drawImage(img6, 55, 245);
                        //         ctx.restore();
                        //     };
                        //     //ctx.drawImage(img, -135, 75);
                        //     // ctx.save();
                        // }
                        // if (text == this.turnplate.restaraunts[7]) {
                        //     var img8 = document.getElementById("prize_8");
                        //     img8.onload = function() {
                        //         console.log('prize_2')
                        //         ctx.save();
                        //         ctx.drawImage(img8, 55, 145);
                        //         ctx.restore();
                        //     };
                        //     //ctx.drawImage(img, -135, 75);
                        //     // ctx.save();
                        // }
                        ctx.restore();
                    }
                }
            },
            countDown() {
                var myDate = new Date();
                this.resTime.startTime = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate() + ' ' + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();
                // console.log(this.resTime.startTime);
                var leftTime = (new Date(this.resTime.endTime)) - new Date();
                if (leftTime <= 0) {
                    this.hintShow = true;
                }
                //console.log(leftTime);
                var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10);
                var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10);
                var mins = parseInt(leftTime / 1000 / 60 % 60, 10);
                var secs = parseInt(leftTime / 1000 % 60, 10);
                //console.log(this.resTime.days,this.resTime.hours,this.resTime.mins,this.resTime.secs)
                if (days >= 0 || hours >= 0 || mins >= 0 || secs >= 0) {
                    //debugger;
                    this.resTime.days = this.checkTime(days);
                    this.resTime.hours = this.checkTime(hours);
                    this.resTime.mins = this.checkTime(mins);
                    this.resTime.secs = this.checkTime(secs);
                }
                if (days <= 0 && hours <= 0 && mins <= 0 && secs <= 0) {
                    //debugger;
                    window.clearInterval(this.Count_DownTimer);
                }
            },
            checkTime(Timer) {
                if (Timer < 10) {
                    Timer = "0" + Timer
                }
                return Timer
            }
        },
        updated: function() {
            this.drawRouletteWheel();
        },
        components: {
            close
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    // #wheelcanvas{
    //     width: f(744) !important;
    //     height: f(744) !important;
    // }
</style>
