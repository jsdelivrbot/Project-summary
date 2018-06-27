<template>
    <div class="app-wrapper">
        <audio ref="audio" loop="loop" preload="auto">
                                                  你的浏览器不支持html5的audio标签  
                                                      <source src="static/music/bg_music.mp3" type="audio/mpeg">
                                                </audio>
        <div class="head_Nav">
            <div class="header_userBox">
                <img class="userInfo_box" src="static/imgs/userBox_01.png">
                <span class="userName">{{userInfo}}</span>
            </div>
        </div>
        <sider-bar></sider-bar>
        <div class="main-container">
            <div class="dashboard-container">
                <div class="main_left">
                    <img v-for="(item,index) in haitunData" :key="index" src="static/imgs/haitun.png">
                </div>
                <div class="main_center">
                    <div class="Pond_items">
                        <div class="pond_item" v-if="pondData" v-for="item in pondData" :key="item.id">
                            <pond :item="item" :PondForm="PondForm" :bindFun="bind"></pond>
                        </div>
                    </div>
                </div>
                <div class="main_right">
                    <img v-for="(item,index) in meirenyuData" :key="index" src="static/imgs/meirenyu.png">
                </div>
                <!-- <div @click="logout" class="dashboard-text">name:{{name}}</div>
                                      <div class="dashboard-text">role:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->
            </div>
        </div>
        <div class="footNav">
            <div class="foot_Nav_item_5 foot_Nav_item" style="float:right" @click="touyu">
                <img class="item_img5" src="static/imgs/footImg_07.png">
                <div class="footNav_text">
                    <img src="static/imgs/footText4.png">
                </div>
            </div>
            <router-link tag="div" to="/dashboard" style="float:right" class="foot_Nav_item_4 foot_Nav_item">
                <img class="item_img4" src="static/imgs/footImg_09.png">
                <div class="footNav_text">
                    <img src="static/imgs/gohome.png">
                </div>
            </router-link>
        </div>
        <star></star>
    </div>
</template>

<script>
    import {
        siderBar,
        star,
        dashboard
    } from '@/views/layout/components'
    import pond from "@/components/pond/index";
    import {
        mapGetters
    } from "vuex";
    import * as ajax from "@/api/common";
    export default {
        data() {
            return {
                play: false,
                volumn: 0,
                userInfo: '',
                friendsId: '',
                haitunData: [],
                meirenyuData: [],
                PondForm: {
                    show: false,
                    data: false,
                    popShow: false
                },
                isOpenPond: false,
                openPondData: "",
                pondData: []
            }
        },
        components: {
            siderBar,
            star,
            dashboard,
            pond
        },
        created() {
            
            this.bind()
        },
        methods: {
            bind() {
               this.friendsId = this.$route.params.id;
                ajax.post('/api/User/FriendHome', {
                    friendid: this.friendsId
                }).then(response => {
                    
                    console.log(response);
                    this.userInfo = response.Data.FriendName;
                    this.pondData = response.Data.FriendPond;
                    this.isNeedReBind = false;
                    //好友道具
                    if (response.Data.FriendDaoJu.DaoJuType == 4) {
                        this.haitunData.push(response.Data.FriendDaoJu)
                    } else {
                        this.meirenyuData.push(response.Data.FriendDaoJu)
                    }
                })
            },
            aPlay() {
                var audio = this.$refs.audio;
                audio.play()
            },
            aPouse() {
                var audio = this.$refs.audio;
                audio.pause()
            },
            Setvolumn(vol) {
                var audio = this.$refs.audio;
                audio.volume = vol
            },
            touyu() {
                ajax.post('/api/pond/TouCai', {
                    friendid: this.friendsId
                }).then(response => {
                    console.log(response);
                     this.success('偷鱼成功!嘻嘻嘻~');
                      this.$store.dispatch('UpdateFriens');
                })
            }
        },
        watch: {
            "$route": "bind",
            controlAudioPlay(val) {
                //debugger;
                if (val) {
                    this.play = true;
                    this.aPlay();
                } else {
                    this.aPouse()
                }
            },
            controlAudioSlider(val) {
                this.Setvolumn(val)
            },
            updateFriends(val){
                if(val){
                    this.bind()
                }
            }
           
        },
        mounted() {},
        computed: {
            ...mapGetters(["audio", "bubble","friends"]),
            controlAudioPlay() {
                return this.audio.play
            },
            controlAudioSlider() {
                return this.audio.volumn
            },
            getBUbble() {
                return this.bubble.open
            },
            updateFriends() {
                return this.friends.update
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/mixin.scss";
    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;
        background: url('/static/imgs/homeBg.jpg') no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
    }
    
</style>
