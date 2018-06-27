<template>
    <div class="routerBox">
        <div class="teamManage common_bg News_bulletin">
            <close :Router="true" class="Common_close"></close>
            <div class="title">
                <img src="static/imgs/xinxiguanli.png">
            </div>
            <div class="content">
                <div class="content_right">
                    <div  class="tab_1" v-for="item in tab">
                        <router-link  tag="button" :to="'/infoManage/'+item.code" class="btn btn_default" :class="{'btn_active':item.code==select.code}" @click.native="select=item">
                                <img :src="item.img">
                                <div v-if="item.code=='news' && newsCount!=0" class="news_CountBox">
                                    <span>{{newsCount}}</span>
                                </div>
                        </router-link>
                    </div>
                    <div class="leave_message">
                        <router-link tag="button" to="/infoManage/message/form" class="btn btn_active">
                            <img src="static/imgs/news_3.png">
                        </router-link>
                        <div class="tips">客服工作时间：10:00-18:00</div>
                    </div>
                </div>
                <div class="content_left">
                     <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import close from "@/components/close";
    import * as ajax from "@/api/common";
    export default {
        data() {
            return {
                tab: [{
                    isActive: false,
                    code: 'news',
                    img: 'static/imgs/news_1.png'
                }, {
                    isActive: false,
                    code: 'message',
                    img: 'static/imgs/news_2.png'
                }],
                select: {
                    code: ''
                },
                newsCount:''
            }
        },
        created(){
            this.bindNewsCount();
        },
        components: {
            close,
         
        },
        methods:{
            bindNewsCount(){
                ajax.post('/api/Content/UnReadNewsCount',{}).then(response =>{
                    console.log(response)
                    this.newsCount = response.Data;
                   
                })
            }
        }
    }
</script>

<style>

</style>
