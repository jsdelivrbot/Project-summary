<template>
    <!--平台公告-->
    <div class="address market-share container marTop330">
        <div class=" fullwidth com-div-fr">
            <div class="con-title-fr">
                <div class="sub-fr"></div>
                <span class="con-title">
                                 {{'平台公告'| translate}}
                              </span>
            </div>
            <div class="mtable">
                <div class="notice_wrap">
                     <router-link v-for="(item, index) in BulletinData" :key="index" tag="div" :to="{name: 'notice_detail', params: {id: item.NewsId}}" :class="'notice_item'">
                        <h3>{{item.Title}}</h3>
                        <p v-html="item.Content"></p>
                        <span>{{item.CreateDate}}</span>
                    </router-link>
                    <!-- <router-link tag="div" :to="{name: 'notice_detail', params: {id: 3333}}" :class="'notice_item'">
                        <h3>【放假通知】春节放假通知</h3>
                        <p>春节将放假七天，人工客服暂停服务，服务器正常运行。有问题请先留言，假期结束后，人工客服会第一时间予以回复。</p>
                        <span>2017-10-27 14:45:50</span>
                    </router-link> -->
                </div>
                <div class="mpagination">
                    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pagenum" :page-sizes="[10, 20]" :page-size="pageSize" layout="sizes,prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less">
    .market-share {
        padding-bottom: 57px;
    }
    .market-share .mtable {
        border-top: 1px solid #e5e5e5;
    }
</style>
<script>
    import {
        getList
    } from "./../../tool/data.js";
    import {
        translate
    } from "@/tool/filters";
    export default {
        data() {
            return {
                params: {
                    token: this.$store.state.token,
                    userId: this.$store.getters.getUserId
                },
                pagenum: 1,
                pageSize: 20,
                total: 0,
                BulletinData:false
            };
        },
        created(){
            this.getTabData()
        },
        methods: {
            getTabData() {
                this.axios.post('/api/Content/GetNews', {
                    userId: this.params.userId,
                    token: this.params.token,
                    pagenum: this.pagenum,
                    type: 1
                }).then(res => {
                    
                    this.BulletinData = res.Data.Data;
                    this.total = res.Data.ItemCount; 
                })
            },
            handleSizeChange() {
                this.getTabData()
            },
            handleCurrentChange() {
                this.getTabData()
            }
        }
    };
</script>
