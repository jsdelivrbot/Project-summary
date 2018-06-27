<template>
    <div class="complain backPadding boxWhite">
        <top-bar :back-type="2"><span slot="content">{{'投诉建议' | translate}}</span></top-bar>
        <div class="m__wrap_30">
            <textarea maxlength="200" v-model="textareaVal" class="formItem__textarea" :placeholder="'描述一下您的问题' | translate"></textarea>
            <div class="complain__textareaBottom">
                <p>
                 <span class="text-orange">*</span>
                 {{'问题反馈最少输入5个字' | translate}}
                </p>
                <span>{{valLength}}/200</span>  
            </div>
            <div class="complain__imgList">
                <div class="complain__imgItem complain__imgItem_after">
                    <div class="complain__imgItem_after-close">
                        <i class="dIcon dIcon_close"></i>
                    </div>
                    <img class="complain__imgItem_after-img" :src="dIcon_close" >
                </div>
                <div class="complain__imgItem complain__imgItem_before">
                </div>
            </div>
            <div class="complain__tips">
                {{'请提供相关问题的截图' | translate}}
            </div>
        </div>
        <div class="position__footer position__footer_md">
            <div class="m-b dButton dButton__large dButton_blue">
                {{'提交' | translate}}
            </div>
        </div>
    </div>
</template>

<script>
    import dIcon_close from "./type_2.png";
    export default {
        data() {
            return {
                dIcon_close,
                textareaVal: ''
            };
        },
        computed: {
            valLength() {
                return this.textareaVal.trim().length;
            }
        },
        methods: {
            openDetail(id) {
                this.$router.push({
                    path: "/userCenter_personMsg_detail",
                    query: {
                        id: 1
                    }
                });
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss">
.dIcon_close {
    background-image: url('icon-42.png');
}
</style>
