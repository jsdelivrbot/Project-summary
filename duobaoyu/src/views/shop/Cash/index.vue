<template>
    <div class="Cash_Settlement">
        <div class="settlement_info">
            <div class="bank">
                <label class="label">开户银行</label> {{bankData.Bank}}
            </div>
            <div class="banker">
                <label class="label">开户人</label>{{bankData.CardUserName}}
            </div>
            <div class="bankCard">
                <label class="label">银行卡</label> {{bankData.CardCode}}
            </div>
        </div>
        <div class="settlement_erweima">
            <div class="weixin">
                <div class="title">微信支付二维码</div>
                <div class="erweimaBox">
                    <img :src="bankData.ImageWX |getImgUrlFilter">
                </div>
            </div>
            <div class="aliPay">
                <div class="title">支付宝支付二维码</div>
                <div class="erweimaBox">
                    <img :src="bankData.ImageAli |getImgUrlFilter">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as ajax from "@/api/common";
    export default {
        data() {
            return {
                bankData:false            }
        },
        created() {
            this.bind();
        },
        methods: {
            bind() {
                ajax.post('/api/Financial/SysBankAccount', {}).then(response => {
                    console.log(response);
                    this.bankData=response.Data;
                })
            }
        }
    }
</script>

<style>

</style>
