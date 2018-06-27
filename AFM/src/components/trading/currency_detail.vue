<template>
  <!--出售详情-->
  <div class="market-share container marTop330">

    <div class=" fullwidth com-div-fr" style="position: relative;">
      <div v-if="!isCheck">
        <div class="notice_detail_back">
          <div class="btn_sm" @click="$router.back()">
            <i class="icon_back m-r-sm"></i>
            {{'返回'| translate}}
          </div>
        </div>
        <div class="con-title-fr">
          <div class="sub-fr"></div>
          <span class="con-title">
            {{'出售详情'| translate}}
          </span>
        </div>
        <div class="mtable">
          <div class="com-filter-ar  ">
            <div class="minput-area">
              <span style="flex:none;width:70px;font-size: 13px;">
                {{'出售日期'| translate}}
                </span>
              <div class="mrange-fr">
                <el-date-picker
                value-format="yyyy/MM/dd HH:mm:ss"
                 class="mrange" v-model="filter.minDate" type="datetime" :placeholder="'选择日期时间'| translate">
                </el-date-picker>
                <span class="m-l m-r">{{'至'| translate}}</span>
                <el-date-picker 
                value-format="yyyy/MM/dd HH:mm:ss"
                class="mrange" v-model="filter.maxDate" type="datetime" :placeholder="'选择日期时间'| translate">
                </el-date-picker>
              </div>
              <input class="oinput" type="text" v-model="filter.serialNumber" :placeholder="'流水号' | translate"/>
            </div>
            <div class="mbtn-area">
              <a @click="btnReset" href="javascript:;" class=" btn white-btn">
                <span>
                  {{'重置'| translate}}
                  </span>
              </a>
              <a @click="btnSearch" href="javascript:;" class="mbtn-area btn red-btn">
                <span>
                  {{'查询'| translate}}
                  </span>
              </a>
            </div>
          </div>
         
          <div class="table-fr">
            <el-table 
            :data="tableData"
            style="width: 100%" stripe border height="250">
              <el-table-column 
              prop="SerialNumber"
              fixed :label="'流水号' | translate" width="100">
              </el-table-column>
              <el-table-column 
              :label="'出售货币'| translate">
                <template slot-scope="scope">
                  <span>{{ scope.row.TradeCurrencyId | CurrencyType | translate}}</span>
                </template>
              </el-table-column>
              <el-table-column 
              prop="Tax"
              :label="'手续费'| translate">
              </el-table-column>
              <el-table-column 
              prop="Total"
              :label="'实际出售金额'| translate">
              </el-table-column>
              <el-table-column 
              :label="'接受货币'| translate">
                <template slot-scope="scope">
                  <span>{{ scope.row.RealCurrencyId | RealCurrencyType | translate}}</span>
                </template>
              </el-table-column>
              <el-table-column 
              prop="ReaCurrencyTotal"
              :label="'应收款金额'| translate">
              </el-table-column>
              <el-table-column 
              prop="CreateDate"
              :label="'出售时间'| translate">
              </el-table-column>
              <el-table-column 
              :label="'状态'| translate">
                <template slot-scope="scope">
                  <span>{{ scope.row.Status | jyStatusType | translate}}</span>
                </template>
              </el-table-column>
              <el-table-column 
              width="140px"
              :label="'操作'| translate">
                <template slot-scope="scope">
                  <template v-if="scope.row.Status === 200">
                    <span class="c_green btn_pointer" @click="btnDetail(scope.row.DetailId)">
                      {{'查看'| translate}}
                    </span>
                    <span class="c_green btn_pointer " @click="btnAppel(scope.row.DetailId)">   
                      {{'申诉'| translate}}
                    </span>
                  </template>
                  <template v-else-if="scope.row.Status === 300">
                    <span class="c_green btn_pointer" @click="btnDetail(scope.row.DetailId)">
                      {{'查看'| translate}}
                    </span>
                    <span class="c_green btn_pointer" @click="btnConfirmSk(scope.row.DetailId)">
                      {{'确认收款'| translate}}
                    </span>
                    <span class="c_green btn_pointer " @click="btnAppel(scope.row.DetailId)">   
                      {{'申诉'| translate}}
                    </span>
                  </template>
                  <template v-else>
                    <span class="c_green btn_pointer" @click="btnDetail(scope.row.DetailId)">
                      {{'查看'| translate}}
                    </span>
                  </template>
                </template>
              </el-table-column>
          </el-table>
          </div>
          <div class="mpagination">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="pagenum"
                :page-sizes="[10, 20]"
                :page-size="pageSize"
                layout="sizes,prev, pager, next, jumper"
                :total="total">
              </el-pagination>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="notice_detail_back">
          <div class="btn_sm" @click="confirmBack">
            <i class="icon_back m-r-sm"></i>
            {{'返回'| translate}}
          </div>
        </div>
        <div class="con-title-fr">
          <div class="sub-fr"></div>
          <span class="con-title">
            {{'确认付款'| translate}}
          </span>
        </div>
        <div class="mtable">
          <div class="Exchanges_currency_confirm_wrap">
            <el-row>
              <el-col :span="12" :xs="24">
                <div class="order_detail_item">
                <div class="order_detail_item_title">
                  {{'买单信息'| translate}}
                </div>
                <div class="order_detail_item_inner">
                  <div class="input-ar">
                    <label>
                        {{'流水号'| translate}}
                    </label> 
                    <span v-text="confirmData.data.SerialNumber" class="input-area tx">
                    </span>
                  </div>
                  <div class="input-ar">
                    <label>
                        {{'购买货币'| translate}}
                    </label> 
                    <span class="input-area tx">
                    {{ confirmData.data.TradeCurrencyId | CurrencyType | translate}}
                    </span>
                  </div>
                  <div class="input-ar">
                    <label>
                         {{'购买数额'| translate}}
                    </label> 
                    <span v-text="confirmData.data.Total" class="input-area tx">
                    </span>
                  </div>
                  <div class="input-ar">
                    <label>
                        {{'购买价格'| translate}}
                    </label> 
                    <span v-text="confirmData.data.ReaCurrencyTotal" class="input-area tx">
                    </span>
                  </div>
                </div>
              </div>
              </el-col>
              <el-col :span="12" :xs="24">
                <div class="order_detail_item">
                <div class="order_detail_item_title">
                  {{'卖方信息'| translate}}
                </div>
                <div class="order_detail_item_inner">
                  <div class="input-ar">
                    <label>
                        {{'卖家编号'| translate}}
                    </label> 
                    <span v-text="confirmData.data.SellUserCode" class="input-area tx">
                    </span>
                  </div>
                  <div class="input-ar">
                    <label>
                        {{'诚信星级'| translate}}
                    </label> 
                    <span class="input-area tx">
                      <i class="icon_star" v-for="item in (confirmData.data.Xinyu > 0 ? confirmData.data.Xinyu : 0)"></i>
                    </span>
                  </div>
                  <div class="input-ar">
                    <label>
                         {{'手机号码'| translate}}
                    </label> 
                    <span v-text="confirmData.data.SellMobile" class="input-area tx">
                    </span>
                  </div>
                  <div class="input-ar">
                    <label>
                        {{'银行卡号'| translate}}
                    </label> 
                    <span v-text="confirmData.data.BankCode" class="input-area tx" >
                    </span>
                  </div>
                  <div class="input-ar">
                    <label>
                        {{'支付宝账号'| translate}}
                    </label> 
                    <span v-text="confirmData.data.AlipayCode" class="input-area tx">
                    </span>
                  </div>
                  <div class="input-ar">
                    <label>
                        {{'微信账号'| translate}}
                    </label> 
                    <span v-text="confirmData.data.WebChat" class="input-area tx">
                    </span>
                  </div>
                </div>
              </div>
              </el-col>
            </el-row>
            <div>
              <div class="order_detail_item">
                <div class="order_detail_item_title">
                  {{'买单信息'| translate}}
                </div>
                <div class="order_detail_item_inner">
                  <div class="input-ar">
                    <label>
                        {{'支付方式'| translate}}
                    </label> 
                    <span class="input-area tx">
                      {{ confirmData.data.PayType | zfType}}
                    </span>
                  </div>
                  <div class="input-ar">
                    <label>
                      {{'支付凭证'| translate}}
                    </label> 
                    <div class="img_pz2">
                      <img-preview v-if="confirmData.data.ImgPath" :src="confirmData.data.ImgPath | getImgUrlFilter" :imgClass="{'img_block':  true}"></img-preview>
                      <span v-else>N/A</span>
                    </div>
                </div>
                </div>
              </div>
            </div>
            <div class="order_detail_bottom">
              <div class="btn_sm btn_sm_white m-r-lg" @click="checkData.cancel">
                {{'取消'| translate}}
              </div>
              <div class="btn_sm btn_sm_red" @click="checkData.confirm">
                {{'确认收款'| translate}}
              </div>
            </div>
          </div>
        </div>
      </div>


      
    </div>

    <!-- 撤销 -->
    <el-dialog :visible.sync="dialogData_cancel.d_visible" class="common-dialog" :class="'dialog_1'">
        <div slot="title">
            <div class="con-title-fr">
                <div class="sub-fr"></div>
                <span class="con-title">{{dialogData_cancel.title | translate}}</span>
            </div>
        </div>
        <div class="m-dialog-content">
            <p class="tcenter">{{dialogData_cancel.message | translate}}</p>
        </div>
        <div slot="footer" style="padding-bottom: 40px;font-size: 13px;">
            <div class="row con-betwwen item-center">
                <a href="javascript:;" @click="dialogData_cancel.cancel" class="btn white-btn com-btn" style="font-size: 13px;">{{'取消' | translate}}</a>
                <a href="javascript:;" @click="dialogData_cancel.confirm" class="btn red-btn com-btn" style="font-size: 13px;">{{'确定' | translate}}</a>
            </div>
        </div>
    </el-dialog>

    <!-- 查看详情 -->
    <el-dialog :visible.sync="dialogData_detail.d_visible" class="common-dialog" :class="'dialog_1'">
        <div slot="title">
            <div class="con-title-fr">
                <div class="sub-fr"></div>
                <span class="con-title">{{dialogData_detail.title | translate}}</span>
            </div>
        </div>
        <div class="m-dialog-content">
          <div class="input_wrap">
            <el-form  :model="dialogData_detail.formData" label-width="140px">
              <el-form-item :label="'流水号' | translate" >
                <div v-text="dialogData_detail.data.SerialNumber"></div>
              </el-form-item>
              <el-form-item :label="'打款金额' | translate" >
                <div v-text="dialogData_detail.data.ReaCurrencyTotal"></div>
              </el-form-item>
              <el-form-item :label="'打款人' | translate" >
                <div v-text="dialogData_detail.data.BuyUserCode"></div>
              </el-form-item>
              <el-form-item :label="'打款联系方式' | translate" >
                <div v-text="dialogData_detail.data.BuyMobile"></div>
              </el-form-item>
              <el-form-item :label="'收款人' | translate" >
                <div v-text="dialogData_detail.data.SellUserCode"></div>
              </el-form-item>
              <el-form-item :label="'收款人联系方式' | translate" >
                <div v-text="dialogData_detail.data.SellMobile"></div>
              </el-form-item>
              <el-form-item :label="'支付方式' | translate" >
                <div>
                  {{dialogData_detail.data.PayType | zfType}}
                </div>
              </el-form-item>
              <el-form-item :label="'支付凭证' | translate" >
                <div class="img_pz2">
                  <img-preview v-if="dialogData_detail.data.ImgPath" :src="dialogData_detail.data.ImgPath | getImgUrlFilter" :imgClass="{'img_block':  true}"></img-preview>
                  <span v-else>N/A</span>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div slot="footer" style="padding-bottom: 40px;font-size: 13px;">
            <div class="row con-betwwen item-center">
                <a href="javascript:;" @click="dialogData_detail.cancel" class="btn white-btn com-btn" style="font-size: 13px;">{{'取消' | translate}}</a>
                <a href="javascript:;" @click="dialogData_detail.confirm" class="btn red-btn com-btn" style="font-size: 13px;">{{'确定' | translate}}</a>
            </div>
        </div>
    </el-dialog>

    <!-- 申诉 -->
    <el-dialog :visible.sync="dialogData.d_visible" class="common-dialog" :class="'dialog_1'">
        <div slot="title">
            <div class="con-title-fr">
                <div class="sub-fr"></div>
                <span class="con-title">{{dialogData.title | translate}}</span>
            </div>
        </div>
        <div class="m-dialog-content">
          <div class="input_wrap">
            <el-form  :model="dialogData.formData" label-width="80px">
              <el-form-item :label="'申诉类型' | translate" >
                <div>
                  {{'卖家申诉'| translate}}
                  </div>
              </el-form-item>
              <el-form-item :label="'申诉内容' | translate" :class="'is-required'">
                <el-input type="textarea" :rows="8" v-model="dialogData.formData.content"></el-input>
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
<style lang="less">
.market-share {
  padding-bottom: 57px;
}

.market-share .mtable {
  border-top: 1px solid #e5e5e5;
}
</style>
<script>
import { getList } from "./../../tool/data.js";
import { translate, zfType } from "@/tool/filters";
import imgPreview from "@/components/common/imgPreview";

export default {
  components: {
    imgPreview
  },
  data() {
    return {
      id: "",
      pagenum: 1,
      pageSize: 20,
      total: 0,

      fileList: null,

      params: {
        token: this.$store.state.token,
        userId: this.$store.getters.getUserId
      },

      isCheck: false,
      tableData: [],
      filter: {
        sellUserCode: "",
        serialNumber: "",
        minDate: "",
        maxDate: ""
      },
      // 确认付款检查，提交
      checkData: {
        id: "",
        cancel: () => {
          this.isCheck = false;
        },
        confirm: () => {
          // 卖家-确认收款
          this.axios
            .post("/api/help/SellerConfirm", {
              token: this.params.token,
              userId: this.params.userId,
              hdId: this.checkData.id
            })
            .then(res => {
              this.$message({
                message: translate("确认收款成功"),
                type: "success",
                duration: 1 * 1000,
                onClose: () => {
                  this.getTabData();
                  this.isCheck = false;
                }
              });
            })
            .catch(err => {});
        }
      },
      confirmData: {
        data: {},
        formData: {
          payType: "",
          imageUrl: "",
          id: ""
        }
      },

      // 撤销
      dialogData_cancel: {
        d_visible: false,
        title: "",
        message: "",
        cancel: () => {
          this.dialogData_cancel.d_visible = false;
        },
        confirm: function() {}
      },

      // 详情
      dialogData_detail: {
        d_visible: false,
        title: "",
        message: "",
        data: {},
        formData: {
          content: "",
          type: ""
        },
        cancel: () => {
          this.dialogData_detail.d_visible = false;
        },
        confirm: function() {}
      },

      // 申诉Diaolog
      dialogData: {
        d_visible: false,
        title: "",
        message: "",
        formData: {
          content: "",
          type: ""
        },
        cancel: () => {
          this.dialogData.d_visible = false;
        },
        confirm: function() {}
      }
    };
  },
  methods: {
    // 确认收款款返回
    confirmBack() {
      this.isCheck = false;
    },
    //卖家确认收款
    btnConfirmSk(id) {
      this.isCheck = true;
      this.checkData.id = id;
      this.axios
        .post("/api/help/GetTradeDetail", {
          token: this.params.token,
          userId: this.params.userId,
          detailId: id
        })
        .then(res => {
          this.confirmData.data = res.Data;
        })
        .catch(err => {});
    },
    // 显示详情
    btnDetail(id) {
      

      this.dialogData_detail.title = translate("查看详情");
      this.dialogData_detail.d_visible = true;

      this.axios
        .post("/api/help/GetTradeDetail", {
          token: this.params.token,
          userId: this.params.userId,
          detailId: id
        })
        .then(res => {
          this.dialogData_detail.data = res.Data;
        })
        .catch(err => {});

      this.dialogData_detail.confirm = () => {
        this.dialogData_detail.d_visible = false;
      };
    },
    // 显示撤销
    btnCancle(id) {
      this.dialogData_cancel.title = translate("温馨提示");
      this.dialogData_cancel.message = translate("确认撤销购买吗？");
      this.dialogData_cancel.d_visible = true;
      this.dialogData_cancel.confirm = () => {
        
        this.dialogData_cancel.d_visible = false;
      };
    },
    // 卖家显示申诉
    btnAppel(id) {
      
      this.dialogData.formData = {
        content: "",
        type: ""
      };
      this.dialogData.title = translate("申诉");
      this.dialogData.d_visible = true;

      this.dialogData.confirm = () => {
        
        if (this.dialogData.formData.content == "") {
          this.$message({
            message: translate("请输入申诉内容"),
            type: "error",
            duration: 1 * 1000
          });
          return;
        }
        this.axios
          .post("/api/help/Tousu", {
            token: this.params.token,
            userId: this.params.userId,
            detailId: id,
            tsDescription: this.dialogData.formData.content
          })
          .then(res => {
            this.$message({
              message: translate("申诉成功"),
              type: "success",
              duration: 1 * 1000
            });
            this.dialogData.d_visible = false;
            this.getTabData();
          })
          .catch(err => {});
      };
    },
    // 重置
    btnReset() {
      // 重置filter
      for (var k in this.filter) {
        this.filter[k] = "";
      }
      this.getTabData();
    },
    // 查询
    btnSearch() {
      this.getTabData();
    },
    // 货币交易——购买记录
    getTabData() {
      this.axios
        .post("api/help/GetSellHelpDetail", {
          token: this.params.token,
          userId: this.params.userId,
          PageNum: this.pagenum,
          serialNumber: this.filter.serialNumber,
          minDate: this.filter.minDate,
          maxDate: this.filter.maxDate,
          id: this.id
        })
        .then(res => {
          this.tableData = res.Data.Data;
          // this.tableData = [
          //   {
          //     DetailId: 12, //记录id，唯一标示
          //     SerialNumber: "12554", //流水号
          //     TradeCurrencyId: 1, //出售货币,
          //     Total: "21", //实际出售金额
          //     Tax: "12", //手续费
          //     RealCurrencyId: 2, //接受货币ID,
          //     ReaCurrencyTotal: "212", //应收款金额
          //     Status: 300, //状态
          //     CreateDate: "2017" //出售日期
          //   }
          // ];
          this.total = res.Data.ItemCount; // 总条数
        })
        .catch(err => {});
    },

    handleSizeChange() {
      this.getTabData();
    },
    handleCurrentChange() {
      this.getTabData();
    }
  },
  mounted() {
    this.getTabData();
  },
  created() {
    
    this.id = this.$route.params.id;
    // 货币交易——是否开启交易
    this.axios
      .post("/api/help/GetHelpIsOpen")
      .then(res => {
        if (!res.Data.isOpenTrade) {
          this.$router.back();
        }
      })
      .catch(err => {});
  }
};
</script>
