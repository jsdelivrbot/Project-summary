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
            {{'提现至银行卡'| translate}}
            </span>
          <div class="desc com-changepwd-desc none-border-top">
            <div class="input-ar">
              <label>
                {{'开户行'| translate}}
              </label>
              <span  class="input-area tx" >{{ bankData.BankName |　bankType}}</span>
            </div>
            <div class="input-ar">
              <label>
                {{'所属支行'| translate}}
              </label>
              <span v-text="bankData.BankAddress" class="input-area tx"></span>
            </div>
            <div class="input-ar">
              <label>
                {{'户名'| translate}}
              </label>
              <span v-text="bankData.BankUserName" class="input-area tx"></span>
            </div>
            <div class="input-ar">
              <label>
                {{'卡号'| translate}}
              </label>
              <span v-text="bankData.BankCode" class="input-area tx"></span>
            </div>
            <div class="btn-ar">
              <router-link to="/profile/edit">
                <input type="submit" class="btn com-btn red-btn btn_pointer" :value="'修改' | translate">
              </router-link>
            </div>
          </div>
          <span class="title">
            {{'提现申请'| translate}}
            </span>
          <div class="desc com-changepwd-desc none-border-top">
            <div class="input-ar">
              <label>
                <i class="iconfont red">&#xe609;</i>
                {{'提现货币'| translate}}
              </label>
              <div class="right">
                <el-select 
                  class="input-area" v-model="formData.CurrencyId.value"
                  :placeholder="'--请选择--' | translate"
                  @change="getBL('Amount')">
                  <el-option
                    v-for="item in selectData.txCurrency"
                    :key="item.value"
                    :label="item.label | translate"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="input-ar">
              <label>
                {{'可提现余额'| translate}}
              </label>
              <span class="input-area tx" v-text="otherData.Amount">
              </span>
            </div>
            <div class="input-ar">
              <label>
                <i class="iconfont red">&#xe609;</i>
                {{'提现金额'| translate}}
              </label>
              <div class="right">
                <input @change="getFee" class="input-area" type="text" v-model="formData.Amount.value"/>
              </div>
            </div>
            <div class="input-ar">
              <label>
                <i class="iconfont red">&#xe609;</i>
                {{'到帐货币'| translate}}
              </label>
              <div class="right">
                <el-select 
                class="input-area"
                v-model="formData.RealCurrencyId.value"
                :placeholder="'--请选择--' | translate"
                @change="getBL">
                  <el-option
                    v-for="item in selectData.dzCurrency"
                    :key="item.value"
                    :label="item.label | translate"
                    :value="item.value">
                    <span style="float: left">
                      <img :src="'/static/img/'+item.lang+ '.png'"  class="langImg"/>
                      {{ item.label | translate}}
                    </span>
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="input-ar">
              <label>
                {{'汇率'| translate}}
              </label>
              <span class="input-area tx" v-if="otherData.CurrencyBLValue && otherData.RealCurrencyBLValue">
                {{otherData.CurrencyBLValue + ':' + otherData.RealCurrencyBLValue}}
              </span>
            </div>
            <div class="input-ar">
              <label>
                {{'手续费'| translate}}
              </label>
              <span class="input-area tx">
                <template v-if="formData.Fee.value === 0 || formData.Fee.value">
                    {{formData.Fee.value}}%
                </template>
              </span>
            </div>
            <div class="input-ar">
              <label>
                {{'实际提现金额'| translate}}
              </label>
              <span class="input-area tx" v-text="formData.RestAmount.value">
                {{formData.RestAmount.value}}
              </span>
            </div>
            <div class="input-ar">
              <label>
                <i class="iconfont red">&#xe609;</i>
                {{'二级密码'| translate}}
              </label>
              <div class="right">
                <input class="input-area" type="password" v-model="formData.L2Pwd.value"/>
              </div>
            </div>
          </div>
        </div>

        <div class="tab1-btn-ar">
          <a @click="btnSubmit" href="javascript:;" class="btn com-btn red-btn">{{'提交' | translate}}</a>
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
              prop="CreateDate"
              fixed
              width="100"
              :label="'申请日期'| translate"
            ></el-table-column>
            <el-table-column
              :label="'提现货币'| translate"
            >
              <template slot-scope="scope">
                  <span>{{ scope.row.CurrencyId | CurrencyType | translate}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="UserBankAccount"
            
              :label="'提现银行'| translate"
            >
              <template slot-scope="scope">
                  <span>{{ scope.row.UserBankAccount | bankType | translate}}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="'手续费'| translate"
            >
              <template slot-scope="scope">
                  <span>{{ scope.row.Fee + '%'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="RealCurrencyId"
              :label="'到账货币'| translate"
            >
              <template slot-scope="scope">
                  <span>{{ scope.row.RealCurrencyId | RealCurrencyType | translate}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="Amount"
              :label="'到帐金额'| translate"
            ></el-table-column>
            <el-table-column
              prop="BLText"
              :label="'汇率'| translate"
            ></el-table-column>
            <el-table-column
              prop="Status"
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
import { getList, getConfigArr } from "@/tool/data";

import {
  translate,
  CurrencyType,
  RealCurrencyType,
  fixedFilter2
} from "@/tool/filters";
import md5 from "blueimp-md5";

export default {
  data() {
    return {
      CashAmountConfig: {},
      tableData: null,
      CashConfig: null,
      bankData: {},
      userInfo: {
        token: this.$store.state.token,
        userId: this.$store.getters.getUserId
      },
      selectData: {
        txCurrency: null,
        dzCurrency: null
      },
      otherData: {
        Amount: "",
        CurrencyBLValue: "",
        RealCurrencyBLValue: ""
      },
      formData: {
        CurrencyId: {
          label: "提现货币",
          value: ""
        },
        Amount: {
          label: "提现金额",
          value: ""
        },
        RealCurrencyId: {
          label: "到帐货币",
          value: ""
        },
        Fee: {
          label: "手续费",
          value: ""
        },
        RestAmount: {
          label: "实际提现金额",
          value: ""
        },
        L2Pwd: {
          label: "二级密码",
          value: ""
        }
      },
      remitance_recharge: ["我要提现", "提现记录"],
      curIndex: 0,
      pagenum: 1,
      pageSize: 20,
      total: 0,

      filter: {
        status: null,
        minDate: null,
        maxDate: null
      },
      state_option: getList(
        ["已提交申请,等待审核", "受理申请,线下转账", "交易完成"],
        1
      )
    };
  },
  methods: {
    statusType(id) {
      if(id == 1) {
        return '已提交申请,等待审核';
      } else if(id == 2) {
        return '受理申请,线下转账';
      } else if(id == 3) {
        return '交易完成';
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
    getBL(isAmount) {
      // 获取余额，汇率
      // 重置
      this.otherData.CurrencyBLValue = "";
      this.otherData.RealCurrencyBLValue = "";
      if (this.formData.CurrencyId.value && isAmount === "Amount") {
        //  钱包余额
        this.axios
          .post("/api/Financial/GetWalletAmount", {
            token: this.userInfo.token,
            userId: this.userInfo.userId,
            walletId: this.formData.CurrencyId.value
          })
          .then(res => {
            this.otherData.Amount = res.Data;
          })
          .catch(err => {});
      }
      if (
        //  汇率
        this.formData.CurrencyId.value &&
        this.formData.RealCurrencyId.value
      ) {
        // 匹配汇率
        for (var i = 0; i < this.CashConfig.length; i++) {
          var item = this.CashConfig[i];
          if (
            item.CurrencyId === this.formData.CurrencyId.value &&
            item.RealCurrencyId === this.formData.RealCurrencyId.value
          ) {
            this.otherData.CurrencyBLValue = item.CurrencyBLValue;
            this.otherData.RealCurrencyBLValue = item.RealCurrencyBLValue;
          }
        }
      }

      // 提现手续费,剩余金额
      this.getFee();
    },
    getFee(val) {
      if (
        this.formData.Amount.value < this.CashAmountConfig.Min ||
        this.formData.Amount.value > this.CashAmountConfig.Max ||
        this.formData.Amount.value % this.CashAmountConfig.Multiple != 0
      ) {
        this.$message({
          message:
            translate("金额最小为") +
            this.CashAmountConfig.Min +
            translate("最大为") +
            this.CashAmountConfig.Max +
            translate("且必须是") +
            this.CashAmountConfig.Multiple +
            translate("的整数倍") +
            ",  " +
            translate("每天提现金额上限") +
            this.CashAmountConfig.DayMax,
          type: "error",
          duration: 3 * 1000
        });
        return;
      }

      if (
        // 提现手续费,剩余金额
        this.formData.CurrencyId.value &&
        this.formData.RealCurrencyId.value &&
        this.formData.Amount.value
      ) {
        //  提现手续费,剩余金额
        this.axios
          .post("/api/Financial/GetCashFee", {
            token: this.userInfo.token,
            userId: this.userInfo.userId,
            CurrencyId: this.formData.CurrencyId.value,
            RealCurrencyId: this.formData.RealCurrencyId.value,
            Amount: this.formData.Amount.value
          })
          .then(res => {
            var datas = res.Data;

            this.formData.Fee.value = datas.Fee;
            this.formData.RestAmount.value = datas.RestAmount;
          })
          .catch(err => {});
      }
    },
    btnSubmit() {
      // 提现
      // 验证
      for (var kk in this.formData) {
        if (kk != "Fee" && kk !== "RestAmount") {
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
        if (k == "L2Pwd") {
          params[k] = md5(this.formData[k].value);
        } else {
          params[k] = this.formData[k].value;
        }
      }
      params.token = this.userInfo.token;
      params.userId = this.userInfo.userId;
      // 发送
      this.axios
        .post("api/Financial/CreateCash", params)
        .then(res => {
          this.$message({
            showClose: true,
            message: translate("提现成功"),
            type: "warning"
          });

          // 重置
          for (var k in this.otherData) {
            this.otherData[k] = "";
          }
          for (var k in this.formData) {
            this.formData[k].value = "";
          }
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
      // 提现记录
      this.axios
        .post("api/Financial/GetCashList", {
          token: this.userInfo.token,
          userId: this.userInfo.userId,
          PageNum: this.pagenum,
          status: this.filter.status,
          minDate: this.filter.minDate,
          maxDate: this.filter.maxDate
        })
        .then(res => {
          this.tableData = res.Data.Data;
          // this.tableData = [
          //   {
          //     CurrencyId: "1", //提现货币
          //     Amount: "1", //提现金额
          //     RealCurrencyId: "1", //到账货币
          //     BLText: "1:1", //汇率
          //     Fee: "1:1", //手续费
          //     RealAmount: "1", //实际到账金额
          //     CreateDate: "1", //申请日期
          //     UserBankAccount: "1", //提现至银行卡
          //     Status: 1 //审核状态
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
    //  提现银行
    this.axios
      .post("/api/Financial/GetUserBank", {
        token: this.userInfo.token,
        userId: this.userInfo.userId
      })
      .then(res => {
        this.bankData = res.Data;
      })
      .catch(err => {});

    //  提现参数
    this.axios
      .post("/api/Financial/GetCashConfig", {
        token: this.userInfo.token,
        userId: this.userInfo.userId
      })
      .then(res => {
        this.CashConfig = res.Data;
        // 下拉框匹配赋值
        this.selectData.txCurrency = getConfigArr(
          this.CashConfig,
          CurrencyType,
          "CurrencyId"
        );
        this.selectData.dzCurrency = getConfigArr(
          this.CashConfig,
          RealCurrencyType,
          "RealCurrencyId"
        );
         this.selectData.dzCurrency.forEach((item, index) => {
          switch(item.label) {
            case "人民币":
            this.selectData.dzCurrency[index].lang = 'zh-CN'
            break;
            case "美元":
            this.selectData.dzCurrency[index].lang = 'en'
            break;
            case "欧元":
            this.selectData.dzCurrency[index].lang = 'oy'
            break;
            case "港币":
            this.selectData.dzCurrency[index].lang = 'zh-TW'
            break;
            case "韩元":
            this.selectData.dzCurrency[index].lang = 'ko'
            break;
            case "泰铢":
            this.selectData.dzCurrency[index].lang = 'th'
            break;
          }
        });

        // for (var i = 0; i < this.CashConfig.length; i++) {
        //   // 遍历每个配置
        //   var item = this.CashConfig[i];

        //   if (CurrencyArr.length <= 0) {
        //     // 没有值时
        //     CurrencyArr.push({
        //       label: CurrencyType(item.CurrencyId),
        //       value: item.CurrencyId
        //     });
        //   } else {
        //     var flag = false;
        //     for (var j = 0; j < CurrencyArr.length; j++) {
        //       var items = CurrencyArr[j];
        //       if (items.value === item.CurrencyId) {
        //         flag = true;
        //       }
        //     }

        //     if (!flag) {
        //       // 不相等，则添加
        //       CurrencyArr.push({
        //         label: CurrencyType(item.CurrencyId),
        //         value: item.CurrencyId
        //       });
        //     }
        //   }
        // }
      })
      .catch(err => {});

    //  提现金额限制
    this.axios
      .post("/api/Financial/GetCashAmountXZ", {
        token: this.userInfo.token,
        userId: this.userInfo.userId
      })
      .then(res => {
        this.CashAmountConfig = res.Data;
      })
      .catch(err => {});
  }
};
</script>
