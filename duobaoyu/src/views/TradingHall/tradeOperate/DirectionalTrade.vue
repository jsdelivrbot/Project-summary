<template>
    <div class="routerBox">
        <div class="Directional_Trade common_bg">
            <close class="Common_close"></close>
            <div class="title">
                <img src="static/imgs/dingxiangjiaoyi.png">
            </div>
            <div class="content_Box">
                <div class="content">
                    <div class="trade_form">
                        <div class="trade_form_item trade_form_item_1  input_group">
                            <label class="label">对方账号:</label>
                            <input type="text" placeholder="请输入对方账号" v-model="formData.tousercode" class="input_common">
                        </div>
                        <div class="trade_form_item trade_form_item_2 input_group buyAmount">
                            <label class="label">普通多宝鱼数量:</label>
                            <div class="amount_operate">
                                <img class="reduce" @click="btnPlus(-100)" src="static/imgs/reduce.png">
                                <input type="number" v-verify="formData.nums" v-model="formData.nums" class="input_common">
                                <span class="formValidateText" v-remind="formData.nums"></span>
                                <img class="plus" @click="btnPlus(100)" src="static/imgs/plus.png">
                            </div>
                        </div>
                        <div class="trade_form_item trade_form_item_2 input_group buyAmount">
                            <label class="label">二级密码:</label>
                            <div class="amount_operate">
                                <input type="password" v-model="formData.L2Pwd" class="input_common">
                            </div>
                        </div>
                         <div class="clear_box">
                            <div class="trade_form_item trade_form_item_3 input_group input_group_inline_clearfix input_group_inline">
                                <label class="label">实际挂卖数量</label>
                                <!-- <input type="text" class="input_common"> -->
                                <span>{{configData.SellToUser*formData.nums/100}}</span>
                            </div>
                            <div class="trade_form_item trade_form_item_4 input_group input_group_inline">
                                <label class="label">交易手续费:</label>
                                <span>{{configData.SellTax*formData.nums/100}}</span>
                                <!-- <input class="input_common" type="text"> -->
                            </div>
                        </div>
                        <div class="trade_form_item trade_form_item_5 input_group">
                            <label class="label titleLabel">成交后获得利润</label>
                            <!-- <div class="list_items ">
                                        <div class="list_item input_group">
                                            <img src="static/imgs/renmingbi.png">
                                            <div class="input_group list_group_item">
                                                <label class="label">现金:</label>
                                                <span class="">{{99999}}</span>
                                            </div>
                                        </div>
                                    </div> -->
                            <div class="list_items ">
                                <div class="list_item input_group">
                                    <img src="static/imgs/chaifenyun.png">
                                    <div class="input_group list_group_item">
                                        <label class="label">拆分多宝鱼:</label>
                                        <span class="">{{configData.SellToChaiFen*formData.nums/100}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="list_items ">
                                <div class="list_item input_group">
                                    <img src="static/imgs/gouwuyu.png">
                                    <div class="input_group list_group_item">
                                        <label class="label">购物多宝鱼:</label>
                                        <span class="">{{configData.SellToGouWu*formData.nums/100}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="foot">
                <button class="cancelBtn btn btn_default" @click="cancel">
                       <img src="static/imgs/cancel.png">
                  </button>
                <button class="confirmBtn btn btn_active " @click="btnSubmit">
                       <img src="static/imgs/confirm.png">
                  </button>
            </div>
        </div>
    </div>
</template>

<script>
    import * as ajax from "@/api/common";
    import close from "@/components/close";
    export default {
        data() {
            return {
                formData: {
                    tousercode: '',
                    nums: 0,
                    CurrencyId: 1,
                    L2Pwd: ""
                },
                configData: false
            };
        },
        verify: {
            formData: {
                nums: "minValue",
            }
        },
        created: function() {
            this.bind()
        },
        methods: {
             bind() {
                ajax.post("/api/Financial/DXHelpRuleConfig", {}).then(response => {
                    this.configData = response.Data;
                });
            },
            btnPlus(num) {
                var Total = parseInt(this.formData.nums);
                if (num > 0) {
                    Total += num;
                    this.formData.nums = Total;
                } else {
                    if (Total + num >= 0) {
                        Total += num;
                        this.formData.nums = Total;
                    }
                }
            },
            btnSubmit() {
                ajax.post("/api/Financial/TransferPt", this.formData).then(response => {
                    this.$router.go(-1);
                });
            },
            cancel() {
                this.$router.go(-1);
            }
        },
        components: {
            close
        }
    };
</script>

<style>

</style>
