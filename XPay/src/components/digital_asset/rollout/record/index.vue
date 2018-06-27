<template>
    <div class="digital_rollout_record backPadding">
        <top-bar :back-type="2">
            <span slot="content">{{'转出转入记录' | translate}}</span>
        </top-bar>
        <van-tabs @click="onTabClick" v-model="active">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-tab v-for="(item, index) in dataArr" :key="index" :title="item.title | translate">
                    <van-list :immediate-check="false" v-model="loading" :finished="finished" @load="onLoad">
                        <div class="rollOut__record-list-item" v-for="(data,index2) in viewData" :key="index2">
                            <div class="rollOut__record-list-item-left">
                                <img :src="data.avatarOriginalPath ? ( serverPath + data.avatarOriginalPath)  : defaultAvatar" class="userCenter__msg-logo logo-icon">
                            </div>
                            <div class="rollOut__record-list-item-right">
                                <div class="rollOut__record-list-item-right-top">
                                    <span>{{'名字' | translate}} {{data.nickName}}：{{data.userId}}</span>
                                    <p v-text="data.dateTime "></p>
                                </div>
                                <div class="rollOut__record-list-item-right-bottom">
                                    <p v-text="(active === 0 ? '-' : '+') + data.amount"></p>
                                    <span>{{(currencyDatas[data.currency] ? currencyDatas[data.currency].symbol : '') | translate}}</span>
                                </div>
                            </div>
                        </div>
                    </van-list>
                </van-tab>
                <div v-if="finished && (viewData && viewData.length > 0)" class="list-empty">已经到最后啦</div>
                <div v-else-if="(!viewData || viewData.length <= 0) && !loading" class="list-empty">{{'暂无数据记录' | translate}}</div>
            </van-pull-refresh>
        </van-tabs>
    </div>
</template>

<script>
    import server from 'src/api/send';
    import defaultAvatar from "../../../../../static/img/default-man.png";
    export default {
        data() {
            return {
                defaultAvatar,
                dataArr: [{
                        title: "转出记录"
                    },
                    {
                        title: "转入记录"
                    }
                ],
                requestData:{
                    "pageSize": 20,
                    "pageIndex": 1
                },
                viewData:null,
                loading:true,
                finished:false,
                isLoading:false,
                active: 0,
                serverPath: process.env.PROTOCOL + process.env.BASE_API
            };
        },
        created(){
            this.query();
        },
        computed:{
            currencyDatas(){
                if(!this.$store.getters.clientData.enums) return {};
                let data = this.$store.getters.clientData.enums.currency;
                let res = {};
                for(let key in data){
                    let val = data[key];
                    if(!val.attribute){
                        val.symbol = val.name;
                        res[key] = val;
                        continue;
                    }
                    val = val.attribute;
                    val.value = key;
                    res[key] = val;
                }
                return res;
            }
        },
        methods: {
            //查询数据
            query(){
                if(this.active === 0){
                    this.getSendOutRecord();
                    return;
                }
                this.getSendInRecord();
            },
            //获取转出记录
            getSendOutRecord(){
                $mask();
                server.getSendOutRecord(this.requestData).then(res =>{
                    this.loading = false;
                    this.isLoading = false;
                    this.$toast.clear();
                    res.data.rows.forEach(v=>{
                        v.dateTime   = $dataFormat(v.dateTime );
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
            //获取转入记录
            getSendInRecord(){
                $mask();
                server.getSendInRecord(this.requestData).then(res =>{
                    this.loading = false;
                    this.isLoading = false;
                    this.$toast.clear();
                    res.data.rows.forEach(v=>{
                        v.dateTime   = $dataFormat(v.dateTime );
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
            // 点击tab触发
            onTabClick(index, title) {
                if(this.active === index) return;
                this.viewData = null;
                this.active = index;
                this.query();
            },
            // 上拉加载
            onLoad() {
                setTimeout(() => {
                    for (let i = 0; i < 10; i++) {
                        this.dataArr[this.active].data.push({
                            type: 1,
                            number: 10,
                            time: "2018-04-30 09:00",
                            balance: "-100.00"
                        });
                    }
                    this.dataArr[this.active].bottomLoading = false;
                    if (this.dataArr[this.active].data.length >= 60) {
                        this.dataArr[this.active].bottomFinished = true;
                    }
                }, 500);
            },
            //下拉刷新
            onRefresh(){
                this.requestData.pageIndex = 1;
                this.query();
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/style/util.scss";
    div.list-empty{
        background-color: #ffffff;
        width: 100%;
        padding: f(50) 0;
        text-align: center;
        margin-top: f(10);
    }
</style>