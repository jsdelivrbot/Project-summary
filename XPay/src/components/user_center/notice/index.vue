<template>
    <div class="notice backPadding bgWhite">
        <top-bar :back-type="2"> <span slot="content">{{'公告' | translate}}</span></top-bar>
        <div class="rollOut__exchange-padding"></div>
        <div class="notice_list">
            <div class="notice_item" @click="openDetail(1)">
                <p>公告标题公告标题公告标题</p>
                <span>2018-04-30 09:00</span>
            </div>
             <div class="notice_item">
                <p>公告标题公告标题公告标题</p>
                <span>2018-04-30 09:00</span>
            </div>
             <div class="notice_item">
                <p>公告标题公告标题公告标题</p>
                <span>2018-04-30 09:00</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            };
        },
        methods: {
            openDetail(id) {
                this.$router.push({path: '/userCenter_notice_detail', query: {id: 1}});
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
