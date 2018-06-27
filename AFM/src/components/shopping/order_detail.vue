<template>
  <!--订单详情-->
  <div class="order_detail market-share container marTop330">
    <div class=" fullwidth com-div-fr">
      <div class="con-title-fr">
        <div class="sub-fr"></div>
        <span class="con-title">
           {{'订单详情'| translate}}
        </span>
      </div>
      <div class="mtable">
        <div class="table-fr">
          <div class="order_detail_item_title">
            {{'商品信息'| translate}}
          </div>
          <el-table
            :data="tableData"
            style="width: 100%"
            stripe
            border
            height="250">
            <el-table-column
              :label="'商品'| translate"
              prop="a"
              width="400px"
              >
              <template slot-scope="scope">
                <div class="shop_car_goods">
                  <div class="shop_car_goods_img">
                    <img :src="scope.row.ImageUrl | getImgUrlFilter" :class="'img_block'">
                  </div>
                  <div class="shop_car_goods_msg">
                    <p>
                      {{scope.row.Product}}
                      </p>
                    <!-- <p>
                      {{'拉菲（LAFITE）传奇波尔多干红葡萄酒 750ml'| translate}}
                      </p> -->
                  </div>
                </div>
              </template> 
            </el-table-column>
            <el-table-column
              prop="Price"
              :label="'价格'| translate"
            >
            </el-table-column>
            <el-table-column
              prop="Count"
            
              :label="'购物数量'| translate"
            >
            </el-table-column>
            <el-table-column
              prop="d"
            
              :label="'合计'| translate"
            >
              <template slot-scope="scope">
              <span>
                {{scope.row.Price * scope.row.Count}}
                </span>
              </template>
            </el-table-column>
          </el-table>
          <div class="shop_car_balance">
            <div class="shop_car_balance_msg">
              {{'总计  '| translate}}
              <span>{{TotalAmount}} </span>
            </div>
          </div>

          <div class="order_detail_item">
            <div class="order_detail_item_title">
              {{'描述'| translate}}
            </div>
            <div class="order_detail_item_inner">
              {{otherData.Description}}
            </div>
          </div>
          <div class="order_detail_item">
            <div class="order_detail_item_title">
              {{'收货地址'| translate}}
            </div>
            <div class="order_detail_item_inner">
              {{otherData.DeliveryAddress}}
            </div>
          </div>
          <div class="order_detail_item" v-if="isConfirm">
            <div class="order_detail_item_title">
              {{'发货物流'| translate}}
            </div>
            <div class="order_detail_item_inner">
              <p>
                {{'物流公司'| translate}}
                ：{{wuliuData.Name}}
                </p> 
              <p>
                {{'联系电话'| translate}}
                ：{{wuliuData.Tel}}
                </p> 
              <p>
                {{'联系人'| translate}}
                ：{{wuliuData.Contacter}}
                </p> 
              <p>
                {{'物流单号'| translate}}
                ：{{wuliuData.TrackingNO}}
                </p> 
            </div>
          </div>
        </div>
      </div>
      <div class="order_detail_bottom">
        <router-link tag="div" to="/mall/order" :class="'btn_sm btn_sm_red'">
        {{'返回订单列表'| translate}}
        </router-link>
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
                <a href="javascript:;" @click="dialogData.cancel" class="btn white-btn com-btn" style="font-size: 13px;">{{'取消' | translate}}</a>
                <a href="javascript:;" @click="dialogData.confirm" class="btn red-btn com-btn" style="font-size: 13px;">{{'确定' | translate}}</a>
            </div>
        </div>
    </el-dialog>
  </div>
</template>
<style lang="less">
@import (reference) "./../../style/css/main.less";

.market-share {
  padding-bottom: 57px;
}

.market-share .mtable {
  border-top: 1px solid #e5e5e5;
}

@import "./../../style/css/com_table.less";
</style>
<script>
import { getList } from "./../../tool/data.js";
import { translate } from "@/tool/filters";

export default {
  data() {
    return {
      isConfirm:false,
      dialogData: {
        d_visible: false,
        title: "",
        message: "",
        cancel: () => {
          this.dialogData.d_visible = false;
        },
        confirm: function() {}
      },
      tableData: [],
      TotalAmount: 0,
      otherData:false,
      wuliuData:false,
      jihuoState_option: getList(["已付款", "已发货", "已确定"]),
      value9: "",
      filter: {
        status: ""
      },
      minDate: null,
      maxDate: null
    };
  },
  created(){
    this.bindTableData();
    
  },
  methods: {
    bindTableData(){
      var orderId = this.$route.params.id;
      this.axios.post('/api/mall/OrderDetail',{
        token: this.$store.state.token,
        userId: this.$store.getters.getUserId,
        orderId: orderId
      }).then(res =>{
        
        this.tableData = res.Data.data2;
        this.otherData = res.Data.data1;
        if(res.Data.data3){
          this.isConfirm = true;
          this.wuliuData = res.Data.data3;
        }
        this.getTotal(this.tableData)
      })
    },
     //总计
    getTotal(tableData){
      tableData.forEach(element => {
        this.singlePrice = element.Price * element.Count;
        this.TotalAmount +=this.singlePrice
      });
    },
    handlerConfirm(id) {
      this.dialogData.title = translate("温馨提示");
      this.dialogData.message = translate("确认收货吗？");
      this.dialogData.d_visible = true;
      this.dialogData.confirm = () => {
        
        this.dialogData.d_visible = false;
      };
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  },
  mounted() {
    
  }
};
</script>
