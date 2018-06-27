<template>
    <!--商城首页-->
    <div class="shop_bg">
      <div class="container mall_index_fr" style="padding-top: 20px;">
        <div class="mall_index">
          <div class="country-area">
            <div class="country-item btn_pointer" v-for="(item,index) in mall_index_country"  @click="bindAllType(item.ProductId, index)">
                <img :src="'/static/img/country'+index+'.png'"/>
              <span class="tx">{{item.ProductName | translate}}</span>
            </div>
          </div>

          <div class="shop_default">
            <img v-if="defaultType === 1" src="/static/img/bgType_1.jpg">
            <img v-if="defaultType === 2" src="/static/img/bgType_2.jpg">
            <img v-if="defaultType === 3" src="/static/img/bgType_3.jpg">
            <img v-if="defaultType === 4" src="/static/img/bgType_4.jpg">
            <img v-if="defaultType === 5" src="/static/img/bgType_5.jpg">
            <img v-if="defaultType === 6" src="/static/img/bgType_6.jpg">
          </div>

          <div class="shop__list">
              <template v-if="typeData.length > 0" v-for="item in typeData">
                <div class="con-title-fr">
                  <div class="sub-fr"></div>
                  <span class="con-title">{{item.ProductName | translate}}</span>
                </div>
                <div class="content">
                  <!-- <div class="part1">
                    <router-link to="/mall/detail" :class="'img-ar1 rmargin20'" tag="div">
                        <img :src="'/static/img/test1.png'" class="fullwh" />
                    </router-link>
                    <div class="img-ar2 rmargin20">
                      <img :src="'/static/img/test2.png'" class="fullwh" />
                    </div>
                    <div class="img-ar2">
                      <img :src="'/static/img/test3.png'" class="fullwh" />
                    </div>

                  </div> -->
                  <div class="part2">
                    <router-link  :to="{name: 'mall_detail', params: {id: item.ProductId}}" tag="div" class="img-ar11" v-for="(item,index) in item.productList" :key="index">
                      <div class="thumnail">
                        <img :src="item.ImageUrl | getImgUrlFilter" class="max-fullwh" />
                      </div>
                      <div class="intro">
                        <span class="name">{{item.ProductName}}</span>
                        <span class="price">{{item.Price}}</span>
                      </div>
                    </router-link>

                  </div>
                </div>
              </template>
          </div>
      
          <template v-if="typeData.length == 0">
            <div class="shop_close">
              <div class="shop_close_img"></div>
              <div class="shop_close_msg">
                {{'暂未开放，敬请期待' | translate}}...
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
</template>
<style lang="less">
@import (reference) "./../../style/css/main.less";
.shop_close {
  position: relative;
  padding: 80px;
  background: #fff;
  text-align: center;
}
.shop_close_img {
  background: url("/static/img/footerBg.jpg") no-repeat;
  background-size: cover;
  margin: 0 auto;
  margin-bottom: 20px;
  height: 295px;
}
.shop_close_msg {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  text-align: center;
  margin-top: -15px;
  font-size: 35px;
  font-weight: bold;
  color: #797979;
}
.mall_index_fr {
  padding: 0 30/@rem;
}
.width1200 {
  width: 1200px;
}
.rmargin20 {
  margin-right: 20px;
}
.mall_index {
  width: 100%;
  overflow-x: scroll;
  padding-bottom: 92/@rem;
}

.country-area {
  .row;
  .item-center;
  margin-bottom: 30px;
}
.country-item {
  width: 224px;
  height: 80px;
  margin-right: 20px;
  position: relative;
}
.country-item > img {
  display: block;
  width: 100%;
  height: 100%;
}
.country-item .tx {
  position: absolute;
  color: #fff;
  font-size: 16px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.country-item:last-child {
  margin-right: 0;
}

.mall_index .con-title-fr {
  .width1200;
  border-radius: 0;
  border: 1px solid #e5e5e5;
}

.fullwh {
  width: 100%;
  height: 100%;
}
.max-fullwh {
  max-width: 100%;
  max-height: 100%;
}

.mall_index .content {
  padding: 27px 0 48px 0;
}

.mall_index .part1 .img-ar1 {
  flex: none;
  width: 224px;
  height: 320px;
  position: relative;
}

.mall_index .part1 .img-ar2 {
  flex: none;
  width: 467px;
  height: 320px;
  position: relative;
}
.mall_index .part1 {
  .row;
  align-items: stretch;
}

.mall_index .part2 {
  .row;
  align-items: stretch;
  padding-top: 20px;
}

.mall_index .part2 .img-ar11 {
  flex: none;
  width: 224px;
  min-height: 320px;
  position: relative;
  border: 1px solid #e5e5e5;
  margin-right: 20px;
}
.mall_index .part2 .img-ar11:last-child {
  margin-right: 0;
}

.mall_index .part2 .img-ar11 .thumnail {
  .col;
  .item-center;
  .con-center;
  width: 224px;
  height: 224px;
}

.mall_index .part2 .img-ar11 .intro {
  .col;
  .item-center;
}
.mall_index .part2 .img-ar11 .intro .name {
  color: #797979;
}
.mall_index .part2 .img-ar11 .intro .price {
  color: #dc4b3c;
}
.content > .part2 {
  min-width: 100px;
  overflow: auto;
}
@media (min-width: 768px) {
  .mall_index_fr {
    padding: 0;
  }
}
@media (max-width: 767px) {
  .shop_close_msg {
    font-size: 14px;
  }
  .country-area {
    flex-direction: column;
  }
  .country-item {
    width: 100%;
    float: left;
    height: 58px;
    margin-bottom: 10px;
    img {
      width: 100%;
      height: 58px;
      display: block;
    }
  }
}
</style>
<script>
import { translate } from "@/tool/filters";

export default {
  data() {
    return {
      defaultType: 1,
      isOpen: true,
      typeData: [],
      mall_index_country: false,
      mall_index_title: false,
      defaultTypeId: "",
      pagenum: 1,
      productData: false,
      mall_All_product: []
    };
  },
  created() {
    //this.bindData()
    this.axios.post("/api/mall/GetMallIsOpen").then(res => {
      this.isOpen = res.Data.isOpenTrade;
      this.bindCountryData();
    });
  },
  methods: {
    bindCountryData() {
      this.axios
        .post("/api/mall/GetParentType", {
          token: this.$store.state.token,
          userId: this.$store.getters.getUserId
        })
        .then(res => {
          
          var countryList = res.Data.list;
          this.mall_index_country = countryList;
          var defaultTypeId = countryList[0].ProductId;
          this.bindAllType(defaultTypeId);
        });
    },
    bindAllType(countryId, index) {
      if(!index) {
        index = 0;
      }
      this.defaultType = index + 1;
      this.mall_All_product = [];
      if (countryId) {
        this.defaultTypeId = countryId;
      }
      this.axios
        .post("/api/mall/GetType", {
          token: this.$store.state.token,
          userId: this.$store.getters.getUserId,
          fatherTypeId: this.defaultTypeId
        })
        .then(res => {
          var TypeList = res.Data.list;
          this.typeData = [];
          res.Data.list.forEach(element => {
            element["productList"] = [];
            this.typeData.push(element);
          });

          this.typeData.forEach(element => {
            this.bindData(element);
          });
        });
    },
    bindData(category) {
      this.axios
        .post("/api/mall/Index", {
          token: this.$store.state.token,
          userId: this.$store.getters.getUserId,
          pagenum: this.pagenum,
          productTypeId: category.ProductId
        })
        .then(res => {
          category["productList"] = res.Data.Data;
          
        });
    }
  }
};
</script>
