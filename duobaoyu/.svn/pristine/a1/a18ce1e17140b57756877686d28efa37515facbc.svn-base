<template>
    <div class="siderBar" :class="{'toggleSiderBar':istoggle}">
        <div class="sider_box">
            <img @click="togglefriends"  class="BgImg" src="static/imgs/friends_03.png">
            <!-- <img class="textImg" src="static/imgs/firends.png"> -->
            <!-- <span class="sider_text">好友</span> -->
            <div class="friends_list">
                <div class="friends_item" v-show="friendsList" v-for="(item,index) in friendsList.Data" :key="index">
                    <!-- <div class="item_level clear_fix">
                            <img src="static/imgs/level_3.png">
                        </div> -->
                    <div class="item_photo" >
                        <img src="static/imgs/userPhoto.png">
                    </div>
                    <div class="item_username" >
                        {{item.NickName}}
                    </div>
                    <div class="item_touyu" ref="imganimation"  v-bind:style="styleObject"  @click="touyu(item)">
                        <img v-if="!(item.IsTouCai==1)" src="static/imgs/touyu.png">
                        <!-- <button class="btn btn_active">偷鱼</button> -->
                    </div>
                </div>
                <div v-if="!hasData" class="body_items no_data">
                    好友列表为空！快去添加吧！
                </div>
            </div>
            <div class="" v-if="hasData">
                <pagination :page="page" v-on:pre-page="prePage" v-on:next-page="nextPage"></pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import * as ajax from "@/api/common";
    import pagination from '@/components/pagination'
     import {
    mapGetters
  } from "vuex";
    export default {
        name: "siderBar",
        data() {
            return {
                hasData: true,
                friendsList: false,
                istoggle: true,
                levelImg: '',
                hsaTouyu:false,
                page: {
                    defaultPage: '1',
                    currentPage: '',
                    totalPage: '',
                },
                styleObject:{
                    transform:'rotate(25deg)'
                },
                Timer:null
                
            };
        },
        created: function() {
            this.bind();
           
           
        },
        mounted:function(){
            
        },
        methods: {
            bind() {
                ajax.post("/api/User/MyFriends", {
                    pagenum: this.page.defaultPage
                }).then(response => {
                    if (response.Data.Data.length == 0) {
                        this.hasData = false
                    }
                    this.friendsList = response.Data;

                    this.page.totalPage = response.Data.PageCount;
                    this.page.currentPage = response.Data.PageNum;
                    setInterval(()=>{
                        this.imgAnimation()
                    },2000)
                     
                });
            },
            togglefriends() {
                this.istoggle = !this.istoggle;
            },
            prePage(prePage) {
                this.page.defaultPage = prePage;
                console.log('n', this.page.defaultPage)
                this.bind()
            },
            nextPage(nextPage) {
                //debugger;
                this.page.defaultPage = nextPage;
                console.log('p', this.page.defaultPage)
                this.bind()
            },
            touyu(item) {
               
                // ajax.post('/api/pond/TouCai', {
                //     friendid: item.Id
                // }).then(response => {
                //     console.log(response);
                //     this.suceess('偷鱼成功!嘻嘻嘻~');
                // })
              
                this.$router.push({
                    path:'/friendsHome/index/'+item.Id,
                })
            },
            
            imgAnimation(){
                this.$nextTick(() => {
               // debugger;
                this.styleObject = {
                    transform:'rotate(0deg)'
                }
                this.Timer = setTimeout(() => {
                    this.styleObject = {
                        transform:'rotate(-25deg)'
                    }
                }, 1000);
                
            })
            }
        },
        watch:{
            updateFriends(val){
                if(val){
                    this.bind()
                }
            }
        },
        computed: {
            ...mapGetters(["friends"]),
            updateFriends() {
                return this.friends.update
            }
        },
        components: {
            pagination
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
   
</style>
