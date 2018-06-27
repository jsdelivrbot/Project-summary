<template>
    <div class="routerBox">
        <div class="TradeingHall common_bg">
            <close :Router="true" class="Common_close"></close>
            <div class="title">
                <img src="static/imgs/tradeHall_1.png">
            </div>
            <div class="content_Box">
                <div class="content">
                    <div class="tab_title">
                        <router-link tag="div" :to="'/TradingHall/'+item.code" v-for="(item,index) in tableData.items" :key="index" class="title_item" :class="[item.class,{'title_item_active':item.code==tableData.select.code}]" @click.native="tableData.select=item">
                            <img :src="item.src">
                        </router-link>
                    </div>
                     <router-view></router-view>
                
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import close from '@/components/close'
    import {
        tradeMarket,
        pendOrder,
        matchpendOrder,
        buyRecord
    } from '@/views/TradingHall/tabItem'
    export default {
        data() {
            return {
                isactiveTab: true,
                tableData: {
                    items: [{
                            class: {
                                title_item_1: true
                            },
                            code: "tradeMarket",
                            select: false,
                            src: "static/imgs/tradehall_2.png",
                        },
                        {
                            class: {
                                title_item_2: true
                            },
                            code: "pendOrder",
                            select: false,
                            src: "static/imgs/tradehall_3.png"
                        },
                        {
                            class: {
                                title_item_3: true
                            },
                            code: "matchpendOrder",
                            select: false,
                            src: "static/imgs/tradehall_4.png"
                        },
                        {
                            class: {
                                title_item_4: true
                            },
                            code: "buyRecord",
                            select: false,
                            src: "static/imgs/tradehall_5.png"
                        }
                    ],
                    select: {
                        code: ''
                    }
                },
            }
        },
        methods: {
          
        },
        components: {
            close,
          
        }
    }
</script>

<style>

</style>
