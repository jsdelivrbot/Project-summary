<template>
    <div class="recordOne">
        <div class="recordOne__header">
            <p v-for="(item,index) in recordData.header" :key="index">
                {{item | translate}}
            </p>
        </div>
        <div class="recordOne__list">
            <van-list :offset="10"  v-model="loading" :finished="finished">
                <div v-if="recordData.type != 2" v-for="(item,index) in list" :key="index" class="recordOne__list-item">
                    <p>{{walletAuditLogType[item.type].name | translate}}</p>
                    <p>{{item.amount}}</p>
                    <p>{{item.createTime}}</p>
                </div>
                <div v-else v-for="(item,index) in list"  class="recordOne__list-item">
                    <p>{{item.fromAmount}}</p>
                    <p>{{item.toAmount}}</p>
                    <p>{{item.createTime}}</p>
                </div>
            </van-list>
            <div v-if="finished && (list && list.length > 0)" class="recordOne__list-empty">已经到最后啦</div>
            <div v-else-if="(!list || list.length <= 0) && !loading" class="recordOne__list-empty">{{'暂无数据记录' | translate}}</div>
        </div>
    </div>
</template>

<script>
    import server from '../../../api/home';
    import exChangServe from '../../../api/exchange';
    export default {
        props: ['recordData'],
        data() {
            return {
                list: [],
                loading: true,
                finished: false,
                submitData:{
                    "pageSize": 20,
                    "pageIndex": 1
                },
                walletAuditLogType:this.$store.getters.clientData.enums.walletAuditLogType
            };
        },
        created:function(){
            this.walletAuditLogType  = this.$store.getters.clientData.enums.walletAuditLogType;
            this.getList(this.recordData.type);
        },
        methods: {
            onLoad() {
                this.submitData.pageIndex += 1;
                this.loading = true;
                this.getList();
            },
            isLoadDone:function(totalRecords){
                if(totalRecords > this.list.length)return;
                this.finished = true;
            },
            getList(type){
                if(type === 0){
                    this.getBalanceDatas();
                    return;
                }
                if(type === 1){
                    this.getPointDatas();
                    return;
                }
                this.getExchangeRecord();
            },
            getBalanceDatas(){
                let $this = this;
                server.getBalanceChanges(this.submitData).then(res =>{
                    let data= res.data.rows;
                    $this.loading = false;
                    data.forEach(v =>{
                         v.createTime = $dataFormat(v.createTime);
                    });
                    if(res.data.pageIndex > 1){
                        $this.list =  $this.list.concat(data);   
                    }else{
                        $this.list = data;
                    }
                    $this.isLoadDone(res.data.totalRecords);
                }).catch(error =>{
                    console.log(error);
                })
            },
            getPointDatas(){
                let $this = this;
                server.getPointsChanges(this.submitData).then(res =>{
                    let data= res.data.rows;
                    data.forEach(v =>{
                         v.createTime = $dataFormat(v.createTime);
                    });
                    $this.loading = false;
                    if(res.data.pageIndex > 1){
                        $this.list =  $this.list.concat(data);   
                    }else{
                        $this.list = data;
                    }
                    $this.isLoadDone(res.data.totalRecords);
                }).catch(error =>{
                    console.log(error);
                })
            },
            getExchangeRecord(){
                let $this = this;
                exChangServe.getExchangeDetails(this.submitData).then(res =>{
                    let data= res.data.rows;
                    $this.loading = false;
                    data.forEach(v =>{
                         v.createTime = $dataFormat(v.createTime);
                    });
                    if(res.data.pageIndex > 1){
                        $this.list =  $this.list.concat(data);   
                    }else{
                        $this.list = data;
                    }
                    $this.isLoadDone(res.data.totalRecords);
                }).catch(error =>{
                    console.log(error);
                })
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss">
    @import "src/style/util.scss";
    .recordOne__list-empty{
        text-align: center;
        padding: f(30) 0;
    }
</style>
