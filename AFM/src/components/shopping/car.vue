<template>
  <div class="shop_car">
    <template v-if="isOpen">
          <div class="container market-share mallTop mall_index_fr">
      <div class=" fullwidth com-div-fr">
        <div v-if="!isBuy">
          <div class="con-title-fr">
            <div class="sub-fr"></div>
            <span class="con-title">
                  {{'分享列表'| translate}}
                  <i>
                    {{'共'| translate}}
                    <span>
                      {{total}}
                      </span> {{'件商品'| translate}}
            </i>
            </span>
          </div>
          <div class="mtable">
            <div class="table-fr">
              <el-table ref="multipleTable" style="width: 100%" stripe border height="250" :data="tableData" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column width="400px" :label="'商品'| translate">
                  <template slot-scope="scope">
                        <div class="shop_car_goods">
                          <div class="shop_car_goods_img">
                            <img :src="scope.row.ImageUrl | getImgUrlFilter" :class="'img_block'">
                          </div>
                          <div class="shop_car_goods_msg">
                            <p>
                              <!-- {{'法国进口红酒'| translate}} -->
                              {{scope.row.ProductName}}
                            </p>
                            <!-- <p>
                              {{'拉菲（LAFITE）传奇波尔多干红葡萄酒 750ml'| translate}}
                            </p> -->
                          </div>
                        </div>
</template>
                </el-table-column>
                <el-table-column prop="Price" :label="'价格'| translate" >
                </el-table-column>
                <el-table-column prop="Count" :label="'购买数量'| translate" >
<template slot-scope="scope">
  <div class="shop_car_number">
    <input type="number" v-model="scope.row.Count" @change="editCount(scope.row.ProductId,scope.row.Count)">
  </div>
</template>
                </el-table-column>
                <el-table-column  :label="'合计'| translate" >
<template slot-scope="scope">
  <span class="c_green btn_pointer">
                         {{scope.row.Price*scope.row.Count}}
                          </span>
</template>
                </el-table-column>
                <el-table-column  :label="'操作'| translate" >
<template slot-scope="scope">
  <span class="c_green btn_pointer" @click="tableDelete(scope.row.ProductId)">
                          {{'删除'| translate}}
                          </span>
</template>
                </el-table-column>
              </el-table>
              <div class="shop_car_balance">
                <div class="shop_car_balance_msg">
                  {{'总计'| translate}}
                  <span>{{TotalAmount}}</span>
                </div>
                <div class="btn_sm btn_sm_red" @click="handleBuy">
                  {{'去结算'| translate}}
                </div>
              </div>
              <div class="mpagination">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pagenum" :page-sizes="[10, 20]" :page-size="pageSize" layout="sizes,prev, pager, next, jumper" :total="total">
                    </el-pagination>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="con-title-fr">
            <div class="sub-fr"></div>
            <span class="con-title">
              {{'结算'| translate}}
            </span>
          </div>
          <div class="mtable">
            <div class="table-fr">
                <div class="order_detail_item border-none shop_buy_selectAddress">
                  <div class="order_detail_item_title">
                  {{'收货地址'| translate}}
                  </div> 
                  <div class="order_detail_item_inner">
                   <el-radio-group v-model="BuyData.selectAddress">
                      <el-radio :label="item.Id" v-for="(item,index) in AddressData" :key="index">
                        <!-- {{'备选项1'| translate}} -->
                        {{item.Address}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.Recipient}}&nbsp;&nbsp;&nbsp;&nbsp; {{item.Mobile}}&nbsp;&nbsp;&nbsp;&nbsp; {{item.ZipCode}}
                        </el-radio>
                      <!-- <el-radio :label="6">
                        {{'备选项2'| translate}}
                        </el-radio>
                      <el-radio :label="9">
                        {{'备选项3'| translate}}
                        </el-radio> -->
                    </el-radio-group>
                    <div class="address_addBox clearfix ">
                      <div class="btn_sm btn_sm_red fl" @click="handlerAdd">
                        + 
                        {{'添加新地址'| translate}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="order_detail_item">
                  <div class="order_detail_item_title">
                  {{'描述'| translate}}
                  </div> 
                  <div class="order_detail_item_inner">
                    <el-input
                      type="textarea"
                      :rows="8"
                     :placeholder="'请输入内容'| translate"
                      v-model="BuyData.description">
                    </el-input>
                  </div>
                </div>
                
                <div class="order_detail_item">
                  <div class="order_detail_item_title">
                  {{'订单详情'| translate}}
                  </div> 
                  <div class="order_detail_item_inner">
                    <el-table
                      :data="tableData2"
                      style="width: 100%"
                      stripe
                      border
                      height="250">
                      <el-table-column
                        :label="'商品'| translate"
                       
                        width="400px"
                        >
<template slot-scope="scope">
  <div class="shop_car_goods">
    <div class="shop_car_goods_img">
      <img :src="scope.row.ImageUrl | getImgUrlFilter" :class="'img_block'">
    </div>
    <div class="shop_car_goods_msg">
      <p>
        <!-- {{'法国进口红酒'| translate}} -->
        {{scope.row.ProductName}}
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
                      <el-table-column :label="'合计'| translate">
<template slot-scope="scope">
  <span class="c_green btn_pointer">
                         {{scope.row.Price*scope.row.Count}}
                          </span>
</template>
                      </el-table-column>
                    </el-table>
                    <div class="shop_car_balance">
                      <div class="shop_car_balance_msg">
                      {{'总计'| translate}}
                      <span>{{TotalAmount}} </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="order_detail_item">
                  <div class="order_detail_item_title">
                  {{'支付方式'| translate}}
                  </div> 
                  <div class="order_detail_item_inner">
                     <el-select v-model="BuyData.payTypeValue" :placeholder="'--请选择--'| translate">
                      <el-option
                        v-for="(item,index) in BuyData.type"
                        :key="index"
                        :label="item.Name | translate"
                        :value="item.Id">
                      </el-option>
                    </el-select>
                  </div>
                </div>

                <div class="order_detail_bottom">
                  <div class="router-link-active btn_sm btn_sm_red" @click="CheckOrder">
                    {{'提交订单'| translate}}
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </template>
    <template v-else>
      <div class="shop_close">
          <div class="shop_close_img"></div>
          <div class="shop_close_msg">
            {{'暂未开放，敬请期待' | translate}}...
          </div>
        </div>
    </template>
    <el-dialog :visible.sync="dialogData.d_visible" class="common-dialog" :class="'dialog_1'">
        <div slot="title">
            <div class="con-title-fr">
                <div class="sub-fr"></div>
                <span class="con-title">{{dialogData.title | translate}}</span>
            </div>
        </div>
        <div class="m-dialog-content">
          <div class="input_wrap">
            <el-form  :model="formData" label-width="80px">
              <el-form-item :label="'地址' | translate" :class="'is-required'">
                <el-input v-model="formData.Address"></el-input>
              </el-form-item>
              <el-form-item :label="'收件人' | translate" :class="'is-required'">
                <el-input v-model="formData.Recipient"></el-input>
              </el-form-item>
              <el-form-item :label="'手机号码' | translate" :class="'is-required'">
                <el-input v-model="formData.Mobile"></el-input>
              </el-form-item>
              <el-form-item :label="'邮编' | translate" :class="'is-required'">
                <el-input v-model="formData.ZipCode"></el-input>
              </el-form-item>
              <el-form-item  prop="default">
                <el-checkbox-group v-model="checked">
                  <el-checkbox  :label="'默认收货地址' | translate" name="default"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
          </div>
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

<script>
import { translate } from "@/tool/filters";
export default {
  data() {
    return {
      isOpen: true,
      isBuy: false,
      payTypeValue: "",
      checked: true,
      BuyData: {
        type: [],
        description: "",
        selectAddress: "",
        payTypeValue: ""
      },
      AddressData: [],
      selectAddress: "",
      formData: {
        Address: "",
        Mobile: "",
        Recipient: "",
        ZipCode: "",
        isDefault: ""
      },
      pagenum: 1,
      pageSize: 20,
      total: 0,
      tableData: [],
      TotalAmount: 0,
      singlePrice: 0,
      tableData2: [],
      dialogData: {
        d_visible: false,
        title: "",
        message: "",
        cancel: () => {
          this.dialogData.d_visible = false;
        },
        confirm: function() {}
      }
    };
  },
  created() {
    this.axios.post("/api/mall/GetMallIsOpen").then(res => {
      this.isOpen = res.Data.isOpenTrade;
      this.bindTableData();
    });
  },
  methods: {
    //购物车数据
    bindTableData() {
      this.axios
        .post("/api/mall/ShoppingCart", {
          token: this.$store.state.token,
          UserId: this.$store.getters.getUserId,
          pagenum: this.pagenum
        })
        .then(res => {
          this.tableData = res.Data.Data;
          this.total = res.Data.ItemCount;
          //this.getTotal(this.tableData)
        });
    },
    //总计
    getTotal(tableData) {
      this.TotalAmount = 0;
      tableData.forEach(element => {
        this.singlePrice = element.Price * element.Count;
        this.TotalAmount += this.singlePrice;
      });
    },
    //修改购物车产品数量
    editCount(productId, Count) {
      this.axios
        .post("/api/mall/EditCartCount", {
          token: this.$store.state.token,
          UserId: this.$store.getters.getUserId,
          productId: productId,
          newCount: Count
        })
        .then(res => {
          
          this.bindTableData();
        });
    },
    // 删除订单
    tableDelete(productId) {
      this.axios
        .post("/api/mall/DeleteShopCart", {
          token: this.$store.state.token,
          userId: this.$store.getters.getUserId,
          productId: productId
        })
        .then(res => {
          
          this.bindTableData();
        });
    },
    //获取地址列表
    getAddressList() {
      this.axios
        .post("/api/mall/GetDeliveryAddress", {
          token: this.$store.state.token,
          userId: this.$store.getters.getUserId
        })
        .then(res => {
          
          this.AddressData = res.Data.Data;
          this.AddressData.forEach(element => {
            if (element.IsDefault) {
              this.BuyData.selectAddress = element.Id;
            }
          });
        });
    },
    //获取支付方式
    getPayType() {
      this.axios
        .post("/api/mall/GetPayType", {
          token: this.$store.state.token,
          userId: this.$store.getters.getUserId
        })
        .then(res => {
          
          this.BuyData.type = res.Data;
          
        });
    },
    // 结算
    CheckOrder() {
      //获取购买全部购买商品的id集合
      var productIds = [];
      this.tableData2.forEach(element => {
        productIds.push(element.ProductId);
      });
      
      var produnctIdsString = productIds.join(",");
      
      //结算
      this.axios
        .post("/api/mall/CheckOrder", {
          token: this.$store.state.token,
          userId: this.$store.getters.getUserId,
          DeliveryAddressId: this.BuyData.selectAddress,
          description: this.BuyData.description,
          PaytypeId: this.BuyData.payTypeValue,
          prodcutId: produnctIdsString
        })
        .then(res => {
          
          this.$router.push({
            path: "/mall/order"
          });
        });
    },
    // 添加地址
    handlerAdd() {
      // 重置
      for (var x in this.formData) {
        this.formData[x] = "";
      }
      this.dialogData.title = translate("添加收货地址");
      this.dialogData.message = translate("确认收货吗？");
      this.dialogData.d_visible = true;
      this.dialogData.confirm = () => {
        if (this.formData.Address == "") {
          this.$message({
            message: translate("请输入地址"),
            type: "error",
            duration: 1 * 1000
          });
          return;
        }
        if (this.formData.Recipient == "") {
          this.$message({
            message: translate("请输入收件人"),
            type: "error",
            duration: 1 * 1000
          });
          return;
        }
        if (this.formData.Mobile == "") {
          this.$message({
            message: translate("请输手机号码"),
            type: "error",
            duration: 1 * 1000
          });
          return;
        }
        if (this.formData.ZipCode == "") {
          this.$message({
            message: translate("请输入邮编"),
            type: "error",
            duration: 1 * 1000
          });
          return;
        }
        
        if (this.checked) {
          this.formData.isDefault = true;
        } else {
          this.formData.isDefault = "false";
        }
        this.axios
          .post("/api/mall/CreateDeliveryAddress", {
            token: this.$store.state.token,
            userId: this.$store.getters.getUserId,
            Address: this.formData.Address,
            Mobile: this.formData.Mobile,
            Recipient: this.formData.Recipient,
            ZipCode: this.formData.ZipCode,
            isDefault: this.formData.isDefault
          })
          .then(res => {
            
            this.getAddressList();
          });
        this.dialogData.d_visible = false;
      };
    },
    // 表格项选择触发
    handleSelectionChange(rows) {
      
      this.tableData2 = rows;
      this.getTotal(rows);
    },
    // 显示结算页
    handleBuy() {
      
      if (this.tableData2.length > 0) {
        this.isBuy = true;
        this.getTotal(this.tableData2);
        this.getAddressList();
        this.getPayType();
      }
    },
    handleSizeChange() {
      this.bindTableData();
    },
    handleCurrentChange() {
      this.bindTableData();
    }
  }
};
</script>

