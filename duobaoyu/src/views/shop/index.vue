<template>
    <div class="routerBox">
        <div class="TradeingHall shop common_bg">
            <close class="Common_close" :Router="true"></close>
            <div class="title">
                <img src="static/imgs/shop_title.png">
            </div>
            <div class="content_Box">
                <div class="content">
                    <div class="tab_title">
                        <router-link tag="div" :to="'/shop/'+item.code"  v-for="(item,index) in tableData.items" :key="index" class="title_item" :class="[item.class,{ 'title_item_active':item.code==tableData.select.code},{clear_fix:index==0}]" @click.native="tableData.select=item">
                            <img :src="item.src">
                        </router-link>
                    </div>
                    <div class="walletBox">
                      <div class="wallet_1">
                        <div class="wallet_Name">
                          <img src="static/imgs/duobaoyu.png" class="normal_fish">
                          <img src="static/imgs/duobaoyuName.png" class="normal_fish_text">
                        </div>
                        <div class="wallet_count">
                          {{walletData.normal.Amount}}
                        </div>
                      </div>
                       <div class="wallet_1 wallet_2">
                        <div class="wallet_Name">
                          <img src="static/imgs/shop_8.png" class="normal_fish">
                          <img src="static/imgs/shop_6.png" class="normal_fish_text">
                        </div>
                        <div class="wallet_count">
                            {{walletData.shop.Amount}}
                        </div>
                      </div>
                       <div class="wallet_1 wallet_3">
                        <div class="wallet_Name">
                          <img src="static/imgs/shop_9.png" class="normal_fish">
                          <img src="static/imgs/shop_7.png" class="normal_fish_text">
                        </div>
                        <div class="wallet_count">
                           {{walletData.split.Amount}}
                        </div>
                      </div>
                    </div>
                    <router-view></router-view>
                </div>
            </div>
          
        </div>
    </div>
</template>

<script>
import close from "@/components/close";
import * as ajax from "@/api/common";
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      tableData: {
        items: [
          {
            class: {
              title_item_1: true
            },
            code: "goods",
            select: false,
            src: "static/imgs/shop_1.png",
          
          },
          {
            class: {
              title_item_2: true
            },
            code: "cart",
            select: false,
            src: "static/imgs/shop_2.png"
          },
          {
            class: {
              title_item_3: true
            },
            code: "order",
            select: false,
            src: "static/imgs/shop_4.png"
          },
          {
            class: {
              title_item_4: true
            },
            code: "Cash",
            select: false,
            src: "static/imgs/shop_3.png"
          }
        ],
        select: {
          code: 'goods'
        }
      },
      walletData:{
        normal :{},
        shop:{},
        split:{}
      }
    };
  },
  created(){
    this.bind()
  },
  methods: {
    bind(){
      ajax.post('/api/User/GetUserWallets',{}).then(response=>{
        console.log(response);
        var walletData=response.Data;
        console.log(walletData.length);
        for(var i=0;i<walletData.length;i++){
           console.log('9999',walletData[i])
          if(walletData[i].CurrencyId==1){
           //this.walletData.push(walletData[i]);
            //this.walletData[i]=walletData[i]
            this.walletData.normal=walletData[i]
          }
           if(walletData[i].CurrencyId==2){
              this.walletData.shop=walletData[i]
            
          }
           if(walletData[i].CurrencyId==3){
            this.walletData.split=walletData[i]
          }
        }
        console.log('000',this.walletData)
      })
    }
  },
  components: {
    close
  },
  watch:{
    Fresh(val){
      //debugger;
      if(val){
        this.bind()
      }
    }
  },
  computed:{
    ...mapGetters(["fresh"]),
    Fresh() {
        return this.fresh.isFresh
      }
  }
};
</script>

<style>

</style>
