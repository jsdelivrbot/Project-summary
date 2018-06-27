<template>
    <div class="model_Box_wrapper news_detail">
        <div class="model_Box">
            <div class="Title">
                <img src="static/imgs/model_title1.png">
            </div>
            <div class="close" @click="close">
                <img src="static/imgs/close_page.png">
            </div>
            <div class="content">
               <div class="news_title">{{detailData.Title}}</div>
               <div class="news_content" v-html="detailData.Content"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            detailData:false
        }
        
    },
    created(){
        this.bind()
    },
    methods:{
        bind(){
            console.log(this.$route.query);
            this.detailData=this.$route.query
        },
        close(){
            this.$router.go(-1);
        }
    }
}
</script>

<style>

</style>
