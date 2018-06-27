<template>
    <div class="model_Box_wrapper touru_Model buy_goodsModel">
        <div class="model_Box">
            <div class="Title">
                <img src="static/imgs/push.png">
            </div>
            <div class="close" @click="close">
                <img src="static/imgs/close_page.png">
            </div>
            <div class="buyAmount input_group input_amount">
                <div class="input_amount">
                    <label class="label">输入数量</label>
                    <div class="amount_operate">
                        <img class="reduce" @click="btnPlus(-10)" src="static/imgs/reduce.png">
                        <input type="text" v-verify="count" v-model="count" class="input_common">
                        <span class="formValidateText" v-remind="count"></span>
                        <img class="plus" @click="btnPlus(10)" src="static/imgs/plus.png">
                    </div>
                </div>
            </div>
            <div class="btnBox">
                <button class="btn btn_active" @click="btnTouZi">
                    <img src="static/imgs/confirm.png">
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import * as ajax from "@/api/common";
    export default {
        props:['bindFun'],
        data() {
            return {
                isOpen: false,
                count: 0
            };
        },
        verify: {
            count: "minValue",
        },
        created: function() {},
        methods: {
            btnPlus(num) {
                var Total = parseInt(this.count);
                if (num > 0) {
                    Total += num;
                    this.count = Total;
                } else {
                    if (Total + num >= 0) {
                        Total += num;
                        this.count = Total;
                    }
                }
            },
            btnTouZi() {
                if (this.$verify.check()) {
                    ajax
                        .post("/api/Pond/AddFish", {
                            PondId: this.$route.query.PondId,
                            CurrencyId: this.$route.query.CurrencyId,
                            count: this.count
                        })
                        .then(response => {
                            this.$router.go(-1);
                            this.bindFun();
                            this.$store.dispatch('Fresh')
                        });
                }
            },
            close() {
                this.$router.go(-1);
            }
        }
    };
</script>

<style>

</style>
