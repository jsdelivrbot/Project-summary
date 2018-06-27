<template>
    <div class="walletDetail">
        <div class="tab_content">
            <div class="tabSub_title">
                <div class="subtitle_item" v-for="(item,index) in tabList" :key="index" :class="{'subtitle_item_active':item.isActive}" @click="tabChange(item)">
                    {{item.text}}
                </div>
            </div>
            <div class="total_table">
                <div class="table_head">
                    <div class="head_item head_item1">时间</div>
                    <div class="head_item head_item2">金额</div>
                    <div class="head_item head_item3">说明</div>
                </div>
                <div class="table_body">
                    <div class="body_items" v-for="(item,index) in tableList" :key="index">
                        <div class="body_item body_item1">
                            <span>{{item.CreateDate}}</span>
                            <!-- <span>10:20:14</span> -->
                        </div>
                        <div class="body_item body_item2">
                            <div class="amount">{{item.Amount}}</div>
                        </div>
                        <div class="body_item body_item3">
                            <div class="info">{{item.Description}}</div>
                        </div>
                    </div>
                    <div v-if="!hasData" class="news_item no_data">
                        没有数据！
                    </div>
                </div>
            </div>
        </div>
        <div v-if="hasData" class="foot_pull">
            <div class="pull_box"  @click="pullList(code)">
                下拉显示其他
                <img src="static/imgs/pull_03.png">
            </div>
        </div>
    </div>
</template>

<script>
    import * as ajax from "@/api/common";
    export default {
        data() {
            return {
                hasData:true,
                code:0,
                tabList: [{
                        text: '全部',
                        isTotal: true,
                        isActive: true,
                        code: 0
                    },
                    {
                        text: '每日拆分',
                        children1: false,
                        isActive: false,
                        code: 1
                    },
                    {
                        text: '直推取苗',
                        children2: false,
                        isActive: false,
                        code: 2
                    },
                    {
                        text: '平台交易',
                        children3: false,
                        isActive: false,
                        code: 3
                    },
                    {
                        text: '开塘',
                        children4: false,
                        isActive: false,
                        code: 4
                    },
                    {
                        text: '商城',
                        children5: false,
                        isActive: false,
                        code: 5
                    },
                    {
                        text: '其他',
                        children6: false,
                        isActive: false,
                        code: 6
                    },
                ],
                page: {
                    defaultPage: '1',
                    currentPage: 0,
                    totalPage: '',
                },
                tableList: [],
                FinancialId: 0,
            }
        },
        created() {
            this.bind();
        },
        methods: {
            bind() {
                ajax.post('/api/Content/DealInfoList', {
                    FinancialId: this.FinancialId,
                    pagenum: this.page.defaultPage
                }).then(response => {
                    console.log(response);
                    if(response.Data.Data.length==0){
                        //debugger;
                        this.hasData=false
                    }else{
                        this.hasData=true
                    }
                    this.tableList = response.Data.Data;
                    this.page.totalPage = response.Data.PageCount;
                    this.page.currentPage = response.Data.PageNum;
                })
            },
            tabchangeClass() {
                for (var x in this.tabList) {
                    this.tabList[x].isActive = false
                }
            },
            tabChange(item) {
                this.tabchangeClass();
                this.page.defaultPage=1;
                item.isActive = true;
                this.code=item.code;
                this.FinancialId = item.code;
                this.bind();
            },
            pullList(code) {
                var page = this.page.currentPage;
                page=page+1;
                console.log(page)
                if (page <=this.page.totalPage) {
                    this.page.defaultPage = page;
                    console.log(this.page.defaultPage);
                    this.FinancialId = code;
                    this.bind()
                } 
            }
        },
        watch:{

        }
    }
</script>

<style>

</style>
