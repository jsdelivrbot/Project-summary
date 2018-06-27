<template>
    <div class="model_Box_wrapper buy_goodsModel">
        <div class="model_Box">
            <div class="Title">
                <img src="static/imgs/buyText.png">
            </div>
            <div class="close" @click="close">
                <img src="static/imgs/close_page.png">
            </div>
            <div class="model_content">
                <div class="goods_img">
                    <img :src="goodData.ImageUrl | getImgUrlFilter">
                    <div class="goods_name">{{goodData.ProductName}}</div>
                </div>
                <div class="buy_detail">
                    <div class="price input_group input_amount">
                        <label class="label">价格</label>
                        <div class="good_price">
                            <div class="buy_duobaoyu">
                                <img src="static/imgs/shop_11.png"> {{goodData.Price}}
                            </div>
                            <div class="buy_coin">
                                <img src="static/imgs/renmingbi.png"> {{goodData.Money}}
                            </div>
                        </div>
                    </div>
                    <div class="buyAmount input_group input_amount">
                        <div class="input_amount">
                            <label class="label">输入数量</label>
                            <div class="amount_operate">
                                <img class="reduce" src="static/imgs/reduce.png" @click="reduce">
                                <input v-model="buy.count" v-verify="buy.count" type="text" class="input_common">
                                <span class="formValidateText" v-remind="buy.count"></span>
                                <img class="plus" src="static/imgs/plus.png" @click="plus">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn_group">
                <button style="float:left" class="confirmBtn addCarBtn" @click="addCar">
                                                <img src="static/imgs/addCar.png">
                                            </button>
                <button class="cancelBtn goPayBtn" @click="goCash(goodData)">
                                                <img src="static/imgs/goPay.png">
                                            </button>
            </div>
        </div>
    </div>
</template>

<script>
    import * as ajax from "@/api/common";
    export default {
        props: ["bindFun"],
        data() {
            return {
                goodData: false,
                isOpen: false,
                buy: {
                    count: 0
                }
            }
        },
        verify: {
            buy: {
                count: "minValue",
            }
        },
        created() {
            this.goodData = this.$route.query;
            console.log(2222, this.$route.query)
        },
        methods: {
            plus() {
                this.buy.count++;
            },
            reduce() {
                this.buy.count--;
                if (this.buy.count < 0) {
                    this.buy.count = 0;
                }
            },
            addCar() {
                if (this.$verify.check()) {
                    var id = this.$route.params.id;
                    console.log(1111, id, this.buy.count);
                    ajax.post('/api/mall/Buy', {
                        productId: id,
                        Count: this.buy.count
                    }).then(response => {
                        console.log(response);
                        this.$router.push({
                            path: '/shop/cart'
                        });
                        this.bindFun();
                    })
                }
            },
            goCash(productData) {
                if (this.$verify.check()) {
                    this.$set(productData, 'Count', this.buy.count);
                    var id = 'buy';
                    this.$router.push({
                        path: '/shop/cart/pay' + id,
                        query: productData
                    })
                }
            },
            close() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style>

</style>
