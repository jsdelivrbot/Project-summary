<template>
    <div class="routerBox">
        <div class="common_bg setting">
            <close class="Common_close"></close>
            <div class="titleImg">
                <img src="static/imgs/setting.png">
            </div>
            <div class="content_Box">
                <div class="content">
                    <div class="music_switch" @click="audioPlay">
                        <img class="music" src="static/imgs/music.png">
                        <span>音乐设置</span>
                        <div class="switch">
                            <div  class="switch_core" :class="{'core_toggle' :isClose}"></div>
                            <div class="switch_change" :class="{'switch_toggle': isClose}">
                                <img src="static/imgs/switch_icon.png">
                            </div>
                        </div>
                    </div>
                    <div class="music_switch music_slider">
                         <img class="music" src="static/imgs/voice.png">
                        <span>音效设置</span>
                        <div class="switch_slider">
                             <el-slider v-model="audioData.volumn" :format-tooltip="formatTooltip" @change="changeVolumn"></el-slider>
                            <!-- <div class="switch_core"></div>
                            <div class="switch_change">
                                <img src="static/imgs/switch_icon.png">
                            </div> -->
                        </div>
                    </div>
                    <!-- <img class="slider" src="static/imgs/voice.png"> -->
                </div>
                <div class="btnBox text_center">
                    <button class="btn btn_active" @click="logout">
                                    <img src="static/imgs/logout.png">
                                  </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import close from '@/components/close'
    export default {
        data() {
            return {
                value1: true,
                value2: true,
                isClose:false,
                audioData:{
                    volumn: 100
                }
            }
        },
        methods: {
            logout() {
                this.$store.dispatch("FedLogOut").then(() => {
                    location.reload(); // 为了重新实例化vue-router对象 避免bug
                });
            },
            audioPlay() {
                this.isClose=!this.isClose;
                this.$store.dispatch("ControlAudioSwitch");
            },
            formatTooltip(val){
                return val/100
            },
            changeVolumn(val){
               
                var volumn=val/100;
                console.log(volumn);
                this.$store.dispatch("ControlAudioSlider",volumn)
            }
        },
        components: {
            close
        },
        
    }
</script>

<style>

</style>
