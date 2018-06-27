<template>
  <!--汇款充值-->
  <div class="container marTop330 recharge">
    <div class="com-div-fr">
      <div class="con-title-fr is-tab">
        <div class="sub-fr"></div>
        <div class=" tab-fr">
          <div class="tab " @click="changeTab(index)" :class="curIndex==index?'active':''"
               v-for="(item,index) in remitance_recharge">
            <span>{{item | translate}}</span>
          </div>
        </div>
      </div>
      <div class="recharge-desc-fr" v-show="curIndex == 0">
        <div class="part">
          <span class="title none-border-top">
            {{'汇款账号'| translate}}
            </span>
          <div class="desc com-changepwd-desc none-border-top">
            <div class="input-ar">
              <label>
                <i class="iconfont red">&#xe609;</i>
                {{'汇款银行'| translate}}
              </label>
              <div class="right">
                <input class="input-area" type="text" v-model="formData.BankName.value"/>
              </div>
            </div>
            <div class="input-ar">
              <label>
                <i class="iconfont red">&#xe609;</i>
                {{'支行'| translate}}
              </label>
              <div class="right">
                <input class="input-area" type="text" v-model="formData.BankAddress.value"/>
              </div>
            </div>
            <div class="input-ar">
              <label><i class="iconfont red">&#xe609;</i>
                {{'汇款账号'| translate}}
              </label>
              <div class="right">
                <input class="input-area" type="text" v-model="formData.BankCode.value"/>
              </div>
            </div>
            <div class="input-ar">
              <label><i class="iconfont red">&#xe609;</i>
                {{'汇款人'| translate}}
              </label>
              <div class="right">
                <input class="input-area" type="text" v-model="formData.BankUserName.value"/>
              </div>
            </div>
          </div>
          <span class="title">
            {{'汇款信息'| translate}}
            </span>
          <div class="desc com-changepwd-desc none-border-top">
            <div class="input-ar">
              <label><i class="iconfont red">&#xe609;</i>
                {{'收款账号'| translate}}
              </label>
              <div class="right">
                <el-select class="input-area" v-model="formData.SysBankAccountId.value"
                            :placeholder="'--请选择--' | translate">
                  <el-option
                    v-for="item in selectData.SysBankAccount"
                    :key="item.value"
                    :label="item.label | translate"
                    :value="item.value"> 
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="input-ar uploadImg">
              <label>
                <i class="iconfont red">&#xe609;</i>
                {{'汇款日期'| translate}}
              </label>
              <div class="right">
                <el-date-picker class="mrange"
                                v-model="formData.PostDate.value"
                                type="datetime"
                                value-format="yyyy/MM/dd HH:mm:ss"
                                :placeholder="'选择日期时间'| translate">
                </el-date-picker>
              </div>
            </div>
            <div class="input-ar">
              <label><i class="iconfont red">&#xe609;</i>
                {{'汇款货币'| translate}}
              </label>
              <div class="right">
                <el-select 
                 @change="getHuiLv"
                 class="input-area" v-model="formData.RealCurrencyId.value"
                            :placeholder="'--请选择--' | translate">
                  <el-option
                    v-for="item in selectData.RealCurrency"
                    :key="item.value"
                    :label="item.label | translate"
                    :value="item.value"
                   >
                    <span style="float: left">
                    <img :src="'/static/img/'+item.lang+ '.png'"  class="langImg"/>
                      {{ item.label | translate}}
                    </span>
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="input-ar">
              <label><i class="iconfont red">&#xe609;</i>
                {{'汇款金额'| translate}}
              </label>
              <div class="right">
                <input class="input-area" type="text" v-model="formData.RealAmount.value"/>
              </div>
            </div>
            <div class="input-ar">
              <label><i class="iconfont red">&#xe609;</i>
                {{'到账货币'| translate}}
              </label>
              <div class="right">
                <el-select 
                 @change="getHuiLv"
                 class="input-area" v-model="formData.CurrencyId.value"
                            :placeholder="'--请选择--' | translate">
                  <el-option
                    v-for="item in selectData.Currency"
                    :key="item.value"
                    :label="item.label | translate"
                    :value="item.value"
                   >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="input-ar">
              <label><i class="iconfont red">&#xe609;</i>
                {{'汇率'| translate}}
              </label>
              <div class="right">
              <span class="input-area tx" v-text="formData.BLText.value"></span>
              </div>
            </div>
            <div class="input-ar">
              <label><i class="iconfont red">&#xe609;</i>
                {{'到账金额'| translate}}
              </label>
              <span class="input-area tx" >
                {{formData.Amount.value | fixedFilter2}}
              </span>
            </div>
            <div class="input-ar ">
              <label>
                <i class="iconfont red">&#xe609;</i>
                {{'提交支付凭证'| translate}}
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
                <div slot="tip" class="el-upload__tip">{{'只能上传 jpg/gif/BMP/PNG 文件，且不超过2M' | translate}}</div>
              </el-upload>
              <input type="hidden" v-model="formData.PostVoucherUrl.value">
            </div>
          </div>
        </div>

        <div class="tab1-btn-ar">
          <a href="javascript:;" @click="btnSubmit" class="btn com-btn red-btn">{{'提交' | translate}}</a>
        </div>
      </div>

      <div class="mtable" v-show="curIndex == 1">
        <div class="com-filter-ar">
          <div class="minput-area">
            <span style="flex:none;width:70px;font-size: 13px;">
              {{'汇款日期'| translate}}
              </span>
            <div class="mrange-fr">
              <el-date-picker class="mrange"
                              value-format="yyyy/MM/dd HH:mm:ss"
                              v-model="filter.minDate"
                              type="datetime"
                              :placeholder="'选择日期时间'| translate">
              </el-date-picker>
              <span class="m-l m-r">{{'至'| translate}}</span>
              <el-date-picker class="date"
                              value-format="yyyy/MM/dd HH:mm:ss"
                              v-model="filter.maxDate"
                              type="datetime"
                              :placeholder="'选择日期时间'| translate">
              </el-date-picker>
            </div>
            <el-select class="jihuo" v-model="filter.status" :placeholder="'--审核状态--' | translate">
              <el-option
                v-for="item in state_option"
                :key="item.value"
                :label="item.label | translate"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="mbtn-area">
            <a @click="btnReset"  href="javascript:;" class=" btn white-btn">
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
            :data="tableDate"
            style="width: 100%"
            stripe
            border
            height="250">
            <el-table-column
              fixed
              prop="CreateDate"
              :label="'汇款日期'| translate"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="SysBankAccount"
              :label="'收款账号'| translate">
            </el-table-column>
            <el-table-column
              prop="PostBankAccount"
              :label="'汇款账号'| translate">
            </el-table-column>
            <el-table-column
              prop="RealCurrencyId"
              :label="'汇款货币'| translate"
            >
               <template slot-scope="scope">
                   <span>{{ scope.row.CurrencyId | RealCurrencyType | translate}}</span>
                </template>
            </el-table-column>
            <el-table-column
              prop="RealAmount"
              :label="'汇款金额'| translate"
            ></el-table-column>
            <el-table-column
              prop="BLText"
              :label="'汇率'| translate"
            ></el-table-column>
            <el-table-column
              :label="'到账货币'| translate"
            >
              <template slot-scope="scope">
                  <span>{{ scope.row.CurrencyId | CurrencyType | translate}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="Amount"
              :label="'到账金额'| translate"
            ></el-table-column>
            <el-table-column
              :label="'审核状态'| translate"
            >
              <template slot-scope="scope">
                  <span>{{ statusType(scope.row.Status) | translate}}</span>
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
  </div>
</template>
<style lang="less">
@import (reference) "./../../style/css/main.less";
@import "./../../style/css/com_table_header.less";
@import "./../../style/css/com_table.less";
@import "./../../style/css/edit_common.less";

.uploadImg .el-input {
  width: 80%;
}

@media (min-width: 992px) {
  .uploadImg .el-input {
    width: 4.97333333rem;
  }
}

.recharge {
  padding-bottom: 58px;
}

.recharge .is-tab .tab-fr .tab {
  margin: 0 20/@rem;
}
.none-border-top {
  border-top: none;
}

.recharge .is-tab .tab-fr .tab:first-child {
  margin-left: 0;
}

.recharge-desc-fr {
  border-top: 1px solid #e5e5e5;
}

.recharge-desc-fr .part {
  padding: 0 57/@rem;
}

.recharge-desc-fr .part .title {
  display: block;
  padding-top: 48px;
  font-size: 16px;
  border-top: 1px solid #e5e5e5;
}

.recharge-desc-fr .tab1-btn-ar {
  border-top: 1px solid #e5e5e5;
  padding: 19px 0;
  .row;
  .item-center;
  .con-center;
  margin-left: 0;
}
.recharge-desc-fr .input-ar > label {
  width: 110px;
}
@media (min-width: 768px) {
  .recharge-desc-fr .tab1-btn-ar {
    padding-left: 157/@rem;
    margin-left: 110px;
    justify-content: flex-start;
  }
}
@media (min-width: 992px) {
  .recharge-desc-fr .input-ar > label {
    width: 125/@rem;
  }
  .recharge-desc-fr .tab1-btn-ar {
    padding-left: 282/@rem;
    margin-left: 0;
    justify-content: flex-start;
  }
}
</style>
<script>
import { getList, getConfigArr } from "./../../tool/data";
import { translate, CurrencyType, RealCurrencyType } from "@/tool/filters";

export default {
  data() {
    return {
      HuiLv: {},
      config: {},
      userInfo: {},
      params: {
        token: this.$store.state.token,
        userId: this.$store.getters.getUserId
      },
      fileList: null,
      tableDate: null,
      HuiLvForIn: {},
      selectData: {
        bank: [
          { label: "中国银行", value: "中国银行" },
          { label: "工商银行", value: "工商银行" },
          { label: "建设银行", value: "建设银行" },
          { label: "交通银行", value: "交通银行" },
          { label: "农业银行", value: "农业银行" }
        ],
        RealCurrency: [],
        Currency: [],
        SysBankAccount: null
      },
      formData: {
        BankName: {
          label: "汇款银行",
          value: ""
        },
        BankAddress: {
          label: "支行",
          value: ""
        },
        BankCode: {
          label: "汇款账号",
          value: ""
        },
        BankUserName: {
          label: "汇款人",
          value: ""
        },
        SysBankAccountId: {
          label: "收款账号",
          value: ""
        },
        PostDate: {
          label: "汇款日期",
          value: ""
        },
        RealCurrencyId: {
          label: "汇款货币",
          value: ""
        },
        RealAmount: {
          label: "汇款金额",
          value: ""
        },
        CurrencyId: {
          label: "到账货币",
          value: ""
        },
        BLText: {
          label: "汇率",
          value: ""
        },
        Amount: {
          label: "到账金额",
          value: ""
        },
        PostVoucherUrl: {
          label: "支付凭证",
          value: ""
        }
      },
      remitance_recharge: ["我要充值", "汇款记录"],

      curIndex: 0,
      pagenum: 1,
      pageSize: 20,
      total: 0,

      filter: {
        status: null,
        minDate: null,
        maxDate: null
      },

      state_option: getList(["审核中", "审核通过"], 1)
    };
  },
  watch: {
    formData: {
      handler: function() {
        if (
          this.formData.RealCurrencyId.value &&
          this.formData.CurrencyId.value &&
          this.formData.RealAmount.value
        ) {
          this.formData.Amount.value =
            this.HuiLv.CurrencyBLValue /
            this.HuiLv.RealCurrencyBLValue *
            this.formData.RealAmount.value;
        }
      },
      deep: true
    }
  },
  methods: {
    // 得到汇率
    getHuiLv() {
      for (var i = 0; i < this.config.length; i++) {
        var item = this.config[i];
        if (
          item.RealCurrencyId == this.formData.RealCurrencyId.value &&
          item.CurrencyId == this.formData.CurrencyId.value
        ) {
          this.HuiLv = {
            RealCurrencyBLValue: item.RealCurrencyBLValue,
            CurrencyBLValue: item.CurrencyBLValue
          };
          this.formData.BLText.value =
            item.RealCurrencyBLValue + ":" + item.CurrencyBLValue;
        }
      }
    },
    statusType(id) {
      if (id === 1) {
        return "审核中";
      } else if (id === 2) {
        return "审核通过";
      }
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
    // 上传图片
    addImg(file, fileList) {
      this.fileList = fileList;
      var _this = this;
      // 格式验证
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (
        !(
          file.type === "image/jpg" ||
          file.type === "image/gif" ||
          file.type === "image/bmp" ||
          file.type === "image/png"
        )
      ) {
        this.$message.error(
          translate("上传头像图片只能是 jpg/gif/bmp/png 格式!")
        );
        fileList.length = 0;
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
      reader.onload = function(e) {
        // this.result 是base64编码
        _this.formData.PostVoucherUrl.value = this.result;
      };
    },
    btnSubmit() {
      // 汇款充值
      // 验证
      for (var kk in this.formData) {
        if (kk != "BLText" && kk !== "Amount") {
          if (this.formData[kk].value === "") {
            this.$message({
              type: "error",
              message: translate("请输入") + translate(this.formData[kk].label),
              duration: 1 * 1000
            });
            return;
          }
        }
      }
      // 配置参数
      var params = {};
      for (var k in this.formData) {
        params[k] = this.formData[k].value;
      }
      params.token = this.params.token;
      params.userId = this.params.userId;
      // 发送
      this.axios
        .post("api/Financial/CreateRemittance", params)
        .then(res => {
          this.$message({
            message: translate("汇款充值成功"),
            type: "success",
            duration: 1 * 1000
          });
          // 重置
          for (var k in this.formData) {
            this.formData[k].value = "";
          }
          this.formData.BankName.value = translate(this.userInfo.BankName);
          this.formData.BankAddress.value = this.userInfo.BankAddress;
          this.formData.BankCode.value = this.userInfo.BankCode;
          this.formData.BankUserName.value = this.userInfo.BankUserName;
          this.fileList.length = 0;
        })
        .catch(err => {});
    },
    changeTab(index) {
      let _self = this;
      _self.curIndex = index;
      if (index == 1) {
        _self.getTabData();
      }
    },
    getTabData() {
      // 历史记录
      this.axios
        .post("api/Financial/GetRemittanceList", {
          token: this.params.token,
          userId: this.params.userId,
          PageNum: this.pagenum,
          status: this.filter.status,
          minDate: this.filter.minDate,
          maxDate: this.filter.maxDate
        })
        .then(res => {
          this.tableDate = res.Data.Data;
          // this.tableDate = [
          //   {
          //     SysBankAccount: "1", //收款账号
          //     PostBankAccount: "1", //汇款账号,
          //     RealCurrencyId: "1", //汇款货币
          //     RealAmount: "1:1", //汇款金额
          //     BLText: "", //汇率
          //     Amount: "1", //到账金额
          //     CurrencyId: "1", //到账货币,
          //     Status: "1", //审核状态
          //     CreateDate: "1" //创建日期
          //   }
          // ];
          this.total = res.Data.ItemCount; // 总条数
        })
        .catch(err => {});
    },
    handleSizeChange(val) {
      _self.getTabData();
    },
    handleCurrentChange(val) {
      _self.getTabData();
    }
  },
  mounted() {
    // 汇款充值——收款账号
    this.axios
      .post("/api/Financial/GetSysBankAccountList")
      .then(res => {
        var arr = [];
        for (var i = 0; i < res.Data.length; i++) {
          var item = res.Data[i];
          arr.push({
            label: item.Bank + "-" + item.CardCode + "-" + item.CardUserName,
            value: item.Id
          });
        }
        this.selectData.SysBankAccount = arr;
      })
      .catch(err => {});

    // 个人资料
    this.axios
      .post("/api/user/getuserinfo", {
        token: this.params.token,
        userId: this.params.userId
      })
      .then(res => {
        this.userInfo = res.Data;
        this.formData.BankName.value = this.userInfo.BankName;
        this.formData.BankAddress.value = this.userInfo.BankAddress;
        this.formData.BankCode.value = this.userInfo.BankCode;
        this.formData.BankUserName.value = this.userInfo.BankUserName;
      })
      .catch(err => {});

    // 充值参数
    this.axios
      .post("/api/Financial/GetRemittanceConfig", {
        token: this.params.token,
        userId: this.params.userId
      })
      .then(res => {
        this.config = res.Data;
        console.log(11111, res.Data);
        this.selectData.RealCurrency = getConfigArr(
          this.config,
          RealCurrencyType,
          "RealCurrencyId"
        );
        
        this.selectData.RealCurrency.forEach((item, index) => {
          switch(item.label) {
            case "人民币":
            this.selectData.RealCurrency[index].lang = 'zh-CN'
            break;
            case "美元":
            this.selectData.RealCurrency[index].lang = 'en'
            break;
            case "欧元":
            this.selectData.RealCurrency[index].lang = 'oy'
            break;
            case "港币":
            this.selectData.RealCurrency[index].lang = 'zh-TW'
            break;
            case "韩元":
            this.selectData.RealCurrency[index].lang = 'ko'
            break;
            case "泰铢":
            this.selectData.RealCurrency[index].lang = 'th'
            break;
          }

        })

        console.log(33333, this.selectData.RealCurrency);
        this.selectData.Currency = getConfigArr(
          this.config,
          CurrencyType,
          "CurrencyId"
        );
      })
      .catch(err => {});
  }
};
</script>
