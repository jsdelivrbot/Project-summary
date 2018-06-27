<template>
    <div class="notice backPadding bgWhite">
        <top-bar :back-type="2">
            <span slot="content">{{'公告' | translate}}</span>
        </top-bar>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list class="notice_list" :immediate-check="false" v-model="loading" :finished="finished" @load="onLoad">
                <div class="notice_item active" v-for="(item,index) in viewData" :key="index" @click="openDetail(item.id)">
                    <p>{{item.title}}</p>
                    <span>{{item.createTime}}</span>
                </div>
            </van-list>
            <div v-if="finished && (viewData && viewData.length > 0)" class="list-empty">已经到最后啦</div>
            <div v-else-if="(!viewData || viewData.length <= 0) && !loading" class="list-empty">{{'暂无数据记录' | translate}}</div>
        </van-pull-refresh>
    </div>
</template>

<script>
    import server from 'src/api/notice';
    export default {
        data() {
            return {
                requestData:{
                    "pageSize": 20,
                    "pageIndex": 1
                },
                viewData:null,
                isLoading:false,
                loading:true,
                finished:false
                
            };
        },
        created(){
            this.query();
        },
        methods: {
            openDetail(id) {
                this.$router.push({path: '/userCenter_personMsg_detail', query: {id: id}});
            },
            //数据查询
            query(){
                $mask();
                server.getNoticeDatas(this.requestData).then(res =>{
                    this.loading = false;
                    this.isLoading = false;
                    this.$toast.clear();
                    res.data.rows.forEach(v=>{
                        v.createTime   = $dataFormat(v.createTime );
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
            //下拉刷新
            onRefresh(){
                this.requestData.pageIndex = 1;
                this.query();
            },
            //上拉刷新
            onLoad(){
                this.requestData.pageIndex += 1;
                this.loading = true;
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