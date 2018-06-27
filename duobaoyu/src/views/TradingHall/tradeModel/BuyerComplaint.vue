<template>
    <div class="model_Box_wrapper checkInfo_model BuyerComplaint_model">
        <div class="model_Box">
            <div class="Title">
                <img src="static/imgs/model_title1.png">
            </div>
            <div class="close" @click="close">
                <img src="static/imgs/close_page.png">
            </div>
            <div class="content">
                <div class="info_item input_group">
                    <label class="label">投诉内容</label>
                    <select class="input_common select_common">
                      <option value="1">已打款但未确认</option>
                    </select>
                </div>
                <div class="info_item input_group">
                    <label class="label">备注信息</label>
                    <textarea class="input_form input_common"></textarea>
                </div>
            </div>
            <div class="text_center">
                <button class="btn btn_yellowBg">
                    <img src="static/imgs/confirm.png">
                  </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isOpen: false
            }
        },
        methods: {
            close() {
                this.$emit('close-buyerComplaint', this.isOpen)
            },
        }
    }
</script>

<style>

</style>
