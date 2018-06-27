<template>
  <!--购买记录-->
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
            {{'购买记录'| translate}}
          </span>
        </div>
        <div class="mtable">
          <div class="com-filter-ar  ">
              <div class="minput-area">
                <span style="flex:none;width:70px;font-size: 13px;">
                  {{'交易日期'| translate}}
                </span>
                <div class="mrange-fr">
                  <el-date-picker class="mrange"
                                  value-format="yyyy/MM/dd HH:mm:ss"
                                  v-model="filter.minDate"
                                  type="datetime"
                                  :placeholder="'选择日期时间'  | translate">
                  </el-date-picker>
                  <span class="m-l m-r">{{'至'| translate}}</span>
                  <el-date-picker class="mrange"
                                  value-format="yyyy/MM/dd HH:mm:ss"
                                  v-model="filter.maxDate"
                                  type="datetime"
                                  :placeholder="'选择日期时间'  | translate">
                  </el-date-picker>
                </div>
                <input v-model="filter.sellUserCode" class="oinput" type="text" :placeholder="'卖家编号' | translate"/>
                <input v-model="filter.serialNumber" class="oinput" type="text" :placeholder="'流水号' | translate"/>
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
              style="width: 100%"
              stripe
              border
              height="250">
              <el-table-column
                fixed
                :label="'序号'| translate"
                type="index"
                width="100">
              </el-table-column>
              <el-table-column
                prop="SerialNumber"
                :label="'流水号'| translate"
              >
              </el-table-column>
              <el-table-column
                prop="UserCode"
                :label="'卖家编号'| translate"
              >
              </el-table-column>
              <el-table-column
                :label="'诚信星级'| translate"
              >
                <template slot-scope="scope">
                  <i class="icon_star" v-for="items in (scope.row.Xinyu > 0 ? scope.row.Xinyu : 0)"></i>
                </template>
              </el-table-column>
              <el-table-column
                :label="'购买货币'| translate"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.TradeCurrencyId | CurrencyType | translate}}</span>
                </template>
              </el-table-column>
              <el-table-column
                :label="'接受货币'| translate"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.RealCurrencyId | RealCurrencyType | translate}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="Total"
                :label="'购买金额'| translate"
              >
              </el-table-column>
              <el-table-column
                prop="ReaCurrencyTotal"
                :label="'应付金额'| translate"
              >
              </el-table-column>
              <el-table-column
                :label="'打款凭证'| translate"
              >
                <template slot-scope="scope">
                  <img-preview v-if="scope.row.ImgPath" :src="scope.row.ImgPath | getImgUrlFilter" :imgClass="{'img_pz':  true}"></img-preview>
                  <span v-else>N/A</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="CreateDate"
                :label="'购买时间'| translate"
              >
              </el-table-column>
              <el-table-column
                :label="'状态'| translate"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.Status | jyStatusType | translate}}</span>
                </template>
              </el-table-column>
              <el-table-column
                width="165"
                :label="'操作'| translate"
                :class="'c_red'"
              >
              <template slot-scope="scope">
                <template v-if="scope.row.Status === 200">
                  <span class="c_green btn_pointer " @click="btnConfirm(scope.row.DetailId)"> 
                    {{'确认付款'| translate}}
                  </span>
                  <span class="c_green btn_pointer " @click="btnDetail(scope.row.DetailId)">  
                    {{'查看'| translate}}
                  </span>
                </template>
                <template v-else-if="scope.row.Status === 300">
                  <span class="c_green btn_pointer " @click="btnDetail(scope.row.DetailId)">  
                    {{'查看'| translate}}
                  </span>
                  <span class="c_green btn_pointer " @click="btnAppel(scope.row.DetailId)">   
                    {{'申诉'| translate}}
                  </span>
                </template>
                <template v-else>
                  <span class="c_green btn_pointer " @click="btnDetail(scope.row.DetailId)">  
                    {{'查看'| translate}}
                  </span>
                </template>
              </template>
              </el-table-column>
            </el-table>
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
                        {{'接受货币'| translate}}
                    </label> 
                    <span class="input-area tx">
                    {{ confirmData.data.RealCurrencyId | RealCurrencyType | translate}}
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
                      <el-select v-model="confirmData.formData.payType" :placeholder="'--请选择--' | translate">
                        <el-option
                          v-for="item in checkData.data"
                          :key="item.value"
                          :label="item.label | translate"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </span>
                  </div>
                  <div class="input-ar">
                    <label>
                      {{'支付凭证'| translate}}
                    </label> 
                    <el-upload
                      class="upload-demo"
                      ref="upload"
                      :on-change="addImg"
                      :auto-upload="false"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :limit="1">
                      <a slot="trigger" href="javascript:;" class="input-area btn com-btn red-btn" >
                        {{'点击上传'| translate}}
                      </a>
                      <div slot="tip" class="el-upload__tip">只能上传 jpg/gif/BMP/PNG 文件，且不超过2M</div>
                    </el-upload>
                </div>
                </div>
              </div>
            </div>
            <div class="order_detail_bottom">
              <div class="btn_sm btn_sm_white m-r-lg" @click="checkData.cancel">
                {{'取消'| translate}}
              </div>
              <div class="btn_sm btn_sm_red" @click="checkData.confirm">
                {{'确认付款'| translate}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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
                  {{'买家申诉'| translate}}
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
      <div slot="footer"  style="padding-bottom: 40px;font-size: 13px;">
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
                <div v-text="confirmData.data.SerialNumber"></div>
              </el-form-item>
              <el-form-item :label="'打款金额' | translate" >
                <div v-text="confirmData.data.ReaCurrencyTotal">324324</div>
              </el-form-item>
              <el-form-item :label="'打款人' | translate" >
                <div v-text="confirmData.data.BuyUserCode">324324</div>
              </el-form-item>
              <el-form-item :label="'打款联系方式' | translate" >
                <div v-text="confirmData.data.BuyMobile">324324</div>
              </el-form-item>
              <el-form-item :label="'收款人' | translate" >
                <div v-text="confirmData.data.SellUserCode">324324</div>
              </el-form-item>
              <el-form-item :label="'收款人联系方式' | translate" >
                <div v-text="confirmData.data.SellMobile">324324</div>
              </el-form-item>
              <el-form-item :label="'支付方式' | translate" >
                <div>
                  {{ confirmData.data.PayType | zfType }}
                </div>
              </el-form-item>
              <el-form-item :label="'支付凭证' | translate" >
                <div class="img_pz2">
                  <img-preview v-if="confirmData.data.ImgPath" :src="confirmData.data.ImgPath | getImgUrlFilter" :imgClass="{'img_block':  true}"></img-preview>
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
import { translate, zfType, RealCurrencyType, CurrencyType } from "@/tool/filters";
import imgPreview from "@/components/common/imgPreview";

export default {
  components: {
    imgPreview
  },
  data() {
    return {
      pagenum: 1,
      pageSize: 20,
      total: 0,

      fileList: null,
      confirmData: {
        data: {},
        formData: {
          payType: "",
          imageUrl: "",
          id: ""
        }
      },
      params: {
        token: this.$store.state.token,
        userId: this.$store.getters.getUserId
      },
      // 确认付款检查，提交
      checkData: {
        type: "",
        data: [
          {
            label: "银行转账",
            value: 2
          },
          {
            label: "支付宝",
            value: 3
          },
          {
            label: "微信",
            value: 4
          }
        ],
        cancel: () => {
          this.isCheck = false;
        },
        confirm: () => {
          if (this.confirmData.formData.payType == "") {
            this.$message({
              message: translate("支付方式") + translate("不能为空"),
              type: "error",
              duration: 1 * 1000
            });
            return;
          }
          if (this.confirmData.formData.imageUrl == "") {
            this.$message({
              message: translate("支付凭证") + translate("不能为空"),
              type: "error",
              duration: 1 * 1000
            });
            return;
          }

          this.axios
            .post("/api/help/BuyerPayment", {
              token: this.params.token,
              userId: this.params.userId,
              hdId: this.confirmData.formData.id,
              payType: this.confirmData.formData.payType,
              imageUrl: this.confirmData.formData.imageUrl
            })
            .then(res => {
              this.$message({
                message: translate("确认付款成功"),
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
      isCheck: false,
      tableData: [],
      filter: {
        sellUserCode: "",
        serialNumber: "",
        minDate: "",
        maxDate: ""
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
        formData: {
          content: "",
          type: ""
        },
        cancel: () => {
          this.dialogData_detail.d_visible = false;
        },
        confirm: function() {}
      }
    };
  },
  methods: {
    // 上传图片
    addImg(file, fileList) {
      this.fileList = fileList;
      var _this = this;
      // 大小验证
      const isLt2M = file.size / 1024 / 1024 < 2;
      
      // 格式验证
      if (
        !(file.type === "image/jpg" ||
        file.type === "image/gif" ||
        file.type === "image/bmp" ||
        file.type === "image/png")
      ) {
        this.$message.error(translate("上传头像图片只能是 jpg/gif/bmp/png 格式!"));
        fileList.length  = 0;
        return false;
      }
      if (!isLt2M) {
        this.$message.error(translate("上传头像图片大小不能超过 2MB!"));
        fileList.length = 0;
        return false;
      }
      // 添加图片
      var fileData = file.raw;
      var reader = new FileReader();
      reader.readAsDataURL(fileData);
      var that = this;
      reader.onload = function(e) {
        // this.result 是base64编码
        _this.confirmData.formData.imageUrl = e.target.result; // this.result;
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
        .post("api/help/GetBuyHelpDetail", {
          token: this.params.token,
          userId: this.params.userId,
          PageNum: this.pagenum,
          sellUserCode: this.filter.sellUserCode,
          serialNumber: this.filter.serialNumber,
          minDate: this.filter.minDate,
          maxDate: this.filter.maxDate
        })
        .then(res => {
          this.tableData = res.Data.Data;
          this.total = res.Data.ItemCount; // 总条数
        })
        .catch(err => {});
    },
    // 显示申诉
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

    // 显示撤销
    btnCancel(id) {
      
      this.dialogData_cancel.title = translate("提示");
      this.dialogData_cancel.message = translate("确认要撤销购买吗");
      this.dialogData_cancel.d_visible = true;
      this.dialogData_cancel.confirm = () => {
        this.dialogData_cancel.d_visible = false;
      };
    },

    // 显示详情
    btnDetail(id) {
      

      this.dialogData_detail.title = translate("查看详情");
      this.dialogData_detail.d_visible = true;

      // 货币交易——匹配详情
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

      this.dialogData_detail.confirm = () => {
        this.dialogData_detail.d_visible = false;
      };
    },

    // 确认付款显示
    btnConfirm(id) {
      // 重置
      if (this.fileList) this.fileList.length = 0;
      for (var k in this.confirmData.formData) {
        this.confirmData.formData[k] = "";
      }
      this.confirmData.formData.id = id;
      this.isCheck = true;

      // 货币交易——匹配详情
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
    // 确认付款返回
    confirmBack() {
      this.isCheck = false;
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
