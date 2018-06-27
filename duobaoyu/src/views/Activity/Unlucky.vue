<template>
    <div class="model_Box_wrapper">
        <div class="model_Box Activity_lucky Activity_unlucky">
            <div class="close" @click="close">
                <img src="static/imgs/close_page.png">
            </div>
            <div class="openPrize_box">
                <img class="open_prize" src="static/imgs/prize_1.png">
            </div>
            <div class="Tips_top">很遗憾</div>
            <div class="Tips_top">下次再接再厉吧！</div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        methods:{
            close(){
                this.$router.push({
                    path:'/activity/index'
                });
                this.$store.dispatch('Fresh');
            }
        }
    }
</script>

<style>

</style>
