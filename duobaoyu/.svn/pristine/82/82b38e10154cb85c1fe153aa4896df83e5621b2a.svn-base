<template>
  <div class="shopping_mall">
    <div class="goods_items">
      <div class="goods_item" v-for="item in goodsList" :key="item.id">
        <div class="good_img">
          <img :src="item.ImageUrl | getImgUrlFilter">
        </div>
        <div class="good_name">{{item.ProductName}}</div>
        <div class="good_price">
          <div class="buy_duobaoyu">
            <img src="static/imgs/shop_11.png"> {{item.Price}}
          </div>
          <div class="buy_coin">
            <img src="static/imgs/renmingbi.png"> {{item.Money}}
          </div>
        </div>
        <div class="buy_good btn_active" @click="buy(item)">
          <img src="static/imgs/buy.png">
        </div>
      </div>
    </div>
    <div class="shopfoot">
      <pagination :page="page" v-on:first-page="firstPage" v-on:last-page="lastPage" v-on:pre-page="prePage" v-on:next-page="nextPage"></pagination>
    </div>
    <buy-model v-if="isOpenBuyModel" v-on:close-buyModel="closeBuyModel"></buy-model>
       <template>
             <router-view :bindFun="bind"></router-view>
        </template>
  </div>
</template>

<script>
  import * as ajax from "@/api/common";
  import buyModel from "@/views/shop/goods/buy";
  import tradeMarketVue from "../../TradingHall/tabItem/tradeMarket.vue";
  import pagination from '@/components/pagination'
  export default {
    data() {
      return {
        isOpenBuyModel: false,
        page: {
          defaultPage: '1',
          currentPage: '',
          totalPage: '',

        },
        goodsList: [],
      };
    },
    created: function() {
      this.bind();
    },
    methods: {
      bind() {
        var pageNum = this.page.defaultPage;
        ajax.post("/api/mall/ProductList", {
          pageNum: pageNum
        }).then(response => {
          console.log(response);
          this.goodsList = response.Data.Data;
          this.page.totalPage = response.Data.PageCount;
          this.page.currentPage = response.Data.PageNum;
          console.log(this.page.totalPage)
        });
      },
      firstPage(firstPage) {
        this.page.defaultPage = firstPage;
        console.log('f', this.page.defaultPage)
        this.bind()
      },
      lastPage(lastPage) {
        this.page.defaultPage = lastPage;
        console.log('l', this.page.defaultPage)
        this.bind()
      },
      prePage(prePage) {
        this.page.defaultPage = prePage;
        console.log('n', this.page.defaultPage)
        this.bind()
      },
      nextPage(nextPage) {
        this.page.defaultPage = nextPage;
        console.log('p', this.page.defaultPage)
        this.bind()
      },
      buy(product){
        this.$router.push({path:'/shop/cart/buy/'+product.Id,query:product})
      }
      // closeBuyModel(isOpen) {
      //   this.isOpenBuyModel = isOpen;
      // },
      // openBuyModel() {
      //   this.isOpenBuyModel = true;
      // }
    },
    components: {
      buyModel,
      pagination
    }
  };
</script>

<style>

</style>
