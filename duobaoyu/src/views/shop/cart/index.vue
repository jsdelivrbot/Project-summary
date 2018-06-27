<template>
  <div class="shop_Car">
    <div class="tab_content">
      <div class="table_head">
        <div class="head_item">产品</div>
        <div class="head_item" >单价</div>
        <div class="head_item head_item_3" style="width:15%;">数量</div>
        <div class="head_item">合计</div>
      </div>
      <div class="table_body">
           <div v-if="!hasData" class="body_items no_data">
              购物车空如也！快去购物吧！
            </div>
        <div class="body_items" v-for="item in tableData" :key="item.id">
          <div class="body_item body_item1">
            <div class="item1_box">
             {{item.Product.ProductName}}
            </div>
          </div>
          <div class="body_item body_item2">
            <div class="good_price">
              <div class="buy_duobaoyu">
                <img src="static/imgs/shoppfish_03.png"> X{{item.Product.Price}}
              </div>
              <div class="buy_coin">
                <img src="static/imgs/renmingbi.png"> X{{item.Product.Money}}
              </div>
            </div>
          </div>
          <div class="body_item body_item3">
            <div class="amount">{{item.Count}}</div>
          </div>
            <div class="body_item body_item4">
             <div class="good_price">
              <div class="buy_duobaoyu">
                <img src="static/imgs/shoppfish_03.png"> X{{item.Product.Price*item.Count}}
              </div>
              <div class="buy_coin">
                <img src="static/imgs/renmingbi.png"> X{{item.Product.Money*item.Count}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="foot btn_group">
      <button class="btn btn_default" @click="goshopping">
        <img src="static/imgs/shop_btn1.png">
      </button>
      <button class="btn btn_active" @click="goPay(tableData)" :disabled="!hasData">
          <img src="static/imgs/shop_btn2.png">
      </button>
    </div>
    <!-- 去结算弹出框 -->
      <template>
             <router-view></router-view>
        </template>
    <!-- <pay-model v-if="isOpenPayModel" v-on:close-payModel="closeOpenModel"></pay-model> -->
     <!-- 去结算弹出框 -->
       <!-- 购买成功弹出框 -->
        <!-- <buy-success v-if="isOpenBuySuccess" v-on:close-BuySuccessModel="closeBuySuccessModell"></buy-success> -->
         <!-- 购买成功弹出框 -->
  </div>
</template>

<script>
import PayModel from "@/views/shop/confirmOrder";
import buySuccess from '@/views/shop/confirmOrder/payment/success'
import * as ajax from "@/api/common";
  export default {
    data(){
      return{
        isOpenPayModel:false,
        isOpenBuySuccess:false,
        tableData:[],
        hasData:true
      }
    },
    created(){
      this.bind()
    },
    methods:{
      bind(){
        ajax.post('/api/mall/ShopCartList',{}).then(response=>{
          console.log(response)
          if(response.Data.length==0){
            this.hasData=false
          }
          this.tableData=response.Data;
        })
      },
      goshopping(){
        this.$router.push({path:'/shop/goods'})
      },
      goPay(productData){
        // this.isOpenPayModel=true;
        var id='cart';
        this.$router.push({path:'/shop/cart/pay'+id,query:productData})
      },
      
    
    },
    components:{
      PayModel,
       buySuccess
    }
  }
</script>

<style>

</style>
