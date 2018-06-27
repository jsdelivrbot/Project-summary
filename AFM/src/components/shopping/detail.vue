<template>
    <div class="shop_detail">
        <div class="container mall_index_fr" style="margin-top: 60px;">
            <div class="clearfix">
                <el-breadcrumb :class="'fl'" separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/mall' }">
                        {{'商城首页'| translate}}
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>
                        {{'商品详情'| translate}}
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <router-link to="/mall/car" tag="div" :class="'shop_detail_carBox fr'">
                    <i>
                            <span>{{shopCarCount}}</span>
                        </i>
                    <span>
                            {{'购物车'| translate}}
                            </span>
                </router-link>
            </div>
            <div class="shop_detail_inner">
                <div class="shop_detail_inner_img">
                    <el-carousel height="588px">
                        <el-carousel-item>
                            <img :src="detailData.ImageUrl | getImgUrlFilter">
                        </el-carousel-item>
                        <el-carousel-item>
                            <img :src="detailData.ImageUrl | getImgUrlFilter">
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="shop_detail_inner_msg">
                    <div class="shop_detail_inner_msg_title">
                        <h3>
                            <!-- {{'法国进口红酒'| translate}} -->
                            {{detailData.ProductName}}
                        </h3>
                        <!-- <h3>
                                {{'拉菲（LAFITE）传奇波尔多干红葡萄酒 750ml'| translate}}
                            </h3> -->
                    </div>
                    <div class="shop_detail_inner_msg_price">
                        <h3>
                            {{'商品价格：'| translate}}
                        </h3>
                        <p>
                            {{detailData.Price}}
                        </p>
                    </div>
                    <div class="shop_detail_inner_msg_size">
                        <h3>
                            {{'商品规格：'| translate}}
                        </h3>
                        <!-- <div class="shop_detail_inner_msg_size_wrap clearfix">
                                <div class="shop_detail_inner_msg_size_item">
                                    <h3>
                                        {{'品牌'| translate}}
                                        </h3>
                                    <p> 
                                        {{'拉菲'| translate}}
                                        </p>
                                </div>
                                <div class="shop_detail_inner_msg_size_item">
                                    <h3>{{'原产国'| translate}}
                                    </h3>
                                    <p> {{'法国'| translate}}
                                    </p>
                                </div>
                                <div class="shop_detail_inner_msg_size_item">
                                    <h3>{{'原料'| translate}}
                                    </h3>
                                    <p> {{'葡萄汁'| translate}}
                                    </p>
                                </div>
                                <div class="shop_detail_inner_msg_size_item">
                                    <h3>{{'产区'| translate}}
                                    </h3>
                                    <p> {{'波尔多'| translate}}
                                    </p>
                                </div>
                                <div class="shop_detail_inner_msg_size_item">
                                    <h3>
                                        {{'年份'| translate}}
                                    </h3>
                                    <p> 1985</p>
                                </div>
                                <div class="shop_detail_inner_msg_size_item">
                                    <h3>
                                        {{'类型'| translate}}
                                        </h3>
                                    <p> 
                                        {{'红葡萄酒'| translate}}
                                        </p>
                                </div>
                                <div class="shop_detail_inner_msg_size_item">
                                    <h3>
                                        {{'葡萄品种'| translate}}
                                        </h3>
                                    <p> 
                                        {{'赤霞珠；梅洛'| translate}}
                                        </p>
                                </div>
                                <div class="shop_detail_inner_msg_size_item">
                                    <h3>
                                        {{'酒精度'| translate}}
                                        </h3>
                                    <p>12.5%vol</p>
                                </div>
                            </div> -->
                        <p>
                            {{detailData.GuiGe}}
                        </p>
                    </div>
                    <div class="shop_detail_inner_msg_btn clearfix">
                        <div class="shop_detail_inner_msg_btn_left fl">
                            <div class="shop_detail_inner_msg_btn_left_minus" @click="handCount(-1)">
                                <i></i>
                            </div>
                            <div class="shop_detail_inner_msg_btn_left_add" @click="handCount(1)">
                                <i></i>
                            </div>
                            <input type="text" v-model="buyCount">
                        </div>
                        <div class="shop_detail_inner_msg_btn_right fl" @click="handlerAdd">
                            <i></i>
                            <span>
                                    {{'加入购物车'| translate}}
                                    </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="shop_detail_presentation">
                <div class=" fullwidth com-div-fr">
                    <div class="con-title-fr">
                        <div class="sub-fr"></div>
                        <span class="con-title">
                                    {{'商品介绍'| translate}}
                                </span>
                    </div>
                </div>
                <div class="mtable" v-html="detailData.Description">
                </div>
            </div>
        </div>
        <el-dialog :visible.sync="dialogData.d_visible" class="common-dialog" :class="'dialog_1'">
            <div slot="title">
                <div class="con-title-fr">
                    <div class="sub-fr"></div>
                    <span class="con-title">{{dialogData.title | translate}}</span>
                </div>
            </div>
            <div class="m-dialog-content">
                <p class="tcenter">{{dialogData.message | translate}}</p>
            </div>
            <div slot="footer" style="padding-bottom: 40px;font-size: 13px;">
                <div class="row con-betwwen item-center">
                    <a href="javascript:;" @click="dialogData.cancel" class="btn white-btn com-btn" style="font-size: 13px;">{{'继续购物' | translate}}</a>
                    <a href="javascript:;" @click="dialogData.confirm" class="btn red-btn com-btn" style="font-size: 13px;">{{'去结算' | translate}}</a>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { translate } from "@/tool/filters";
export default {
  data() {
    return {
      dialogData: {
        d_visible: false,
        title: "",
        message: "",
        cancel: () => {
          this.dialogData.d_visible = false;
        },
        confirm: function() {}
      },
      productId: "",
      detailData: false,
      buyCount: 1,
      shopCarCount: 0
    };
  },
  created() {
    this.productId = this.$route.params.id;
    this.bindDetailData();
  },
  methods: {
    bindDetailData() {
      this.axios
        .post("/api/mall/ProductDetail", {
          productId: this.productId
        })
        .then(res => {
          this.detailData = res.Data;
        });
    },
    handCount(num) {
      var Total = parseInt(this.buyCount);
      if (num > 0) {
        Total += num;
        this.buyCount = Total;
      } else {
        if (Total + num > 0) {
          Total += num;
          this.buyCount = Total;
        }
      }
    },
    handlerAdd() {
      var obj = JSON.parse(localStorage.getItem("amf_user"));
      var user = obj && obj.user ? obj.user : null;
      if (user && user.UserId) {
        this.axios
          .post("/api/mall/AddToShoppingCart", {
            token: this.$store.state.token,
            userId: this.$store.getters.getUserId,
            ProductId: this.detailData.ProductId,
            Count: this.buyCount
          })
          .then(res => {
            this.dialogData.title = translate("温馨提示");
            this.dialogData.message = translate("已成功加入购物车");
            this.dialogData.d_visible = true;
            this.shopCarCount = this.buyCount;
          });
        this.dialogData.confirm = () => {
          this.dialogData.d_visible = false;
          this.$router.push({
            path: "/mall/car"
          });
        };
      } else {
        this.$router.push({ path: "/login" });
      }
    }
  }
};
</script>

