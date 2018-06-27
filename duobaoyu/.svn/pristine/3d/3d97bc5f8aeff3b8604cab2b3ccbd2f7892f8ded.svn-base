<template>
    <div class="model_Box_wrapper">
        <div class="model_Box Activity_lucky">
            <div class="close" @click="close">
                <img src="static/imgs/close_page.png">
            </div>
            <div class="openPrize_box">
                <img class="open_prize" src="static/imgs/open_prize.png">
            </div>
            <div class="Tips_top">恭喜您抽中{{prizeAmount}}多宝鱼</div>
            <div class="Tips_bottom">已放入多宝鱼钱包中</div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                prizeAmount:''
            }
        },
        created(){
            this.bind()
        },
        methods:{
            bind(){
                this.prizeAmount=this.$route.query.Amount;
            },
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
