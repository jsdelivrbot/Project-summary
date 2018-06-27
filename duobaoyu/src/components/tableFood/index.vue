<template>
    <div class="table_foot">
        <router-link tag="div" to="/TradingHall/DirectionalTrade" class="DirectionalTrade btn btn_default">
            定向交易
            <!-- <img src="static/imgs/dingxiangjiaoyi.png"> -->
        </router-link>
        <div class="list_pagination">
            <button class="firstPage clear_fix">
                <img src="static/imgs/shouye.png">
            </button>
            <button class="uPbtn ">
                <img src="static/imgs/upText.png">
            </button>
            <div class="total_items">
                <img class="downImg" src="static/imgs/down.png">
                <span>15/19</span>
                <img class="upImg" src="static/imgs/up.png">
            </div>
            <button class="downbtn">
                <img src="static/imgs/downText.png">
            </button>
            <button class="lastPage">
                <img src="static/imgs/moye.png">
            </button>
        </div>
        <router-link tag="div" class="wanttoSell btn btn_active" to="/TradingHall/sell">
            我要挂卖
            <!-- <img src="static/imgs/woyaoguamai.png"> -->
        </router-link>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        }
    }
</script>

<style>

</style>
