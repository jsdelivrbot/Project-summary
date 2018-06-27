<template>
    <div class="notice_detail backPadding bgWhite">
        <top-bar :back-type="2">
        </top-bar>
        
        <div class="m__wrap_30" v-if="viewData">
            <div class="notice_detail-title">
                {{viewData.title}}
            </div>
            <div class="notice_detail-top">
                {{viewData.createTime}}
            </div>
            <div class="notice_detail-content">
                {{viewData.content}}
            </div>
        </div>
        <div v-else class="notice_detail-top">数据异常</div>
    </div>
</template>

<script>
    import server from 'src/api/notice';
    export default {
        data() {
            return {
                viewData:null
            };
        },
        methods: {},
        created(){
            this.query();
        },
        methods:{
            //数据查询
            query(){
                $mask();
                let id = this.$route.query.id || '';
                if(!id){
                    this.$dialog.alert({
                        title: '警告',
                        message: '非法参数'
                    }).then(() => {
                        this.$router.back();
                    });
                    return;
                }
                server.getNoticeDetail(id).then(res =>{
                    this.$toast.clear();
                    res.data.createTime = $dataFormat(res.data.createTime);
                    this.viewData = res.data;
                }).catch(error =>{
                    this.loading = false;
                    console.log("[ERROR]-" + JSON.stringify(error));
                })
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
