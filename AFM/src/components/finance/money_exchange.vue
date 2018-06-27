<template>
  <!--货币兑换-->
    <div class="container marTop330 money_exchange">
      <div class="com-div-fr">
        <div class="con-title-fr is-tab" style="border-bottom: 1px solid #e5e5e5;">
          <div class="sub-fr"></div>
          <div class=" tab-fr">
            <div class="tab " @click="changeTab(index)" :class="curIndex==index?'active':''"
                 v-for="(item,index) in money_exchange">
              <span>{{item | translate}}</span>
            </div>
          </div>
        </div>
        <form  @submit.prevent="tocheckExchange"  class="desc com-changepwd-desc" v-show="curIndex == 0">
          <div class="input-ar">
            <label><i class="iconfont red">&#xe609;</i>
              {{'转出货币'| translate}}
            </label>
            <div class="right">
              <el-select class="input-area" v-model="tab1.FromCurrencyId.value"
                         :placeholder="'--请选择--' | translate">
                <el-option
                  v-for="item in FromCurrencyId_option"
                  :key="item.value"
                  :label="item.label | translate"
                  :value="item.value">
                </el-option>
              </el-select>
              <span class="errHint">{{tab1.FromCurrencyId.errhint}}</span>
            </div>
          </div>
          <div class="input-ar">
            <label>
              {{'转出货币余额'| translate}}
              </label>
            <span class="input-area tx">{{tab1.wallet_amount}}</span>
          </div>
          <div class="input-ar">
            <label><i class="iconfont red">&#xe609;</i>
              {{'转入货币'| translate}}
            </label>
            <div class="right">
              <el-select class="input-area" v-model="tab1.ToCurrencyId.value"
                         :placeholder="'--请选择--' | translate">
                <el-option
                  v-for="item in ToCurrencyId_option"
                  :key="item.value"
                  :label="item.label | translate"
                  :value="item.value">
                </el-option>
              </el-select>
              <span class="errHint">{{tab1.ToCurrencyId.errhint}}</span>
            </div>
          </div>
          <div class="input-ar">
            <label><i class="iconfont red">&#xe609;</i>
              {{'转出金额'| translate}}
            </label>
            <div class="right">
              <input class="input-area" type="text"
                     v-model="tab1.Amount.value"
              />
              <span class="errHint">{{tab1.Amount.errhint}}</span>
            </div>
          </div>
          <div class="input-ar">
            <label>
              {{'汇率'| translate}}
              </label>
            <span class="input-area tx">{{tab1.exchange_rate}}</span>
          </div>
          <div class="input-ar">
            <label>
              {{'手续费'| translate}}
              </label>
            <span class="input-area tx">{{tab1.Fee}}</span>
          </div>
          <div class="input-ar">
            <label>
              {{'实际转入金额'| translate}}
              </label>
            <span class="input-area tx">{{tab1.RestAmount}}</span>
          </div>
          <div class="input-ar">
            <label>
              {{'二级密码'| translate}}
              </label>
              <div class="right">
                 <input class="input-area" type="password"
                     v-model="tab1.L2Pwd"/>
              </div>
           
          </div>
          <div class="btn-ar">
            <input type="submit" :value="'提交' | translate" class="btn com-btn red-btn"/>
          </div>
          <dialog-result :data="result_dialog"></dialog-result>

        </form>
        <div class="mtable" v-show="curIndex == 1">
          <div class="com-filter-ar">
            <div class="minput-area">
              <span style="flex:none;width:70px;font-size: 13px;">
                {{'创建日期'| translate}}
                </span>
              <div class="mrange-fr">
                <el-date-picker 
                value-format="yyyy/MM/dd HH:mm:ss"
                class="date"
                                v-model="filter.minDate"
                                type="datetime"
                                :placeholder="'选择日期时间'| translate">
                </el-date-picker>
                <span class="m-l m-r">{{'至'| translate}}</span>
                <el-date-picker 
                value-format="yyyy/MM/dd HH:mm:ss"
                class="date"
                                v-model="filter.maxDate"
                                type="datetime"
                                :placeholder="'选择日期时间'| translate">
                </el-date-picker>
              </div>
              <el-select class="jihuo" v-model="filter.fromCurrencyId" :placeholder="'转出货币'| translate">
                <el-option
                  v-for="item in FromCurrencyId_option"
                  :key="item.value"
                  :label="item.label | translate"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select class="jihuo" v-model="filter.toCurrencyId" :placeholder="'转入货币'| translate">
                <el-option
                  v-for="item in ToCurrencyId_option"
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
              :data="listData"
              style="width: 100%"
              stripe
              border
              height="250">
              <el-table-column
                prop="CreateDate"
                fixed
                :label="'日期'| translate"
                width="100">
              </el-table-column>
              <el-table-column
                :label="'转出货币'| translate"
                 > 
                  <template slot-scope="scope">
                      <span>{{ scope.row.FromCurrencyId | CurrencyType | translate}}</span>
                  </template>
              </el-table-column>
              <el-table-column
                prop="CreateDate"
              
                :label="'转出金额'| translate"
              > <!--'转出金额',-->
              </el-table-column>
              <el-table-column
                :label="'转入货币'| translate"
              > 
                <template slot-scope="scope">
                    <span>{{ scope.row.ToCurrencyId | CurrencyType | translate}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="BLText"
              
                :label="'汇率'| translate"
              > <!--'汇率',-->
              </el-table-column>
              <el-table-column
                prop="Fee"
              
                :label="'手续费'| translate"
              > <!--'手续费',-->
              </el-table-column>
              <el-table-column
                prop="RestAmount"
              
                :label="'实际转入金额'| translate"
              > <!--'实际转入金额',-->
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
</style>
<script>
import { tMath } from "./../../tool/util";

import { translate, CurrencyType, RealCurrencyType } from "@/tool/filters";
import { getList, getConfigArr } from "@/tool/data";
import md5 from "blueimp-md5";

export default {
  components: {
    "dialog-result": () =>
      import(/*webpackChunkName:"cm_dialog"*/ "@/components/dialog/d_result.vue")
  },
  data() {
    return {
      config: null,
      money_exchange: ["我要兑换", "兑换记录"],
      curIndex: 0,
      isCommitting: false,
      query_params: {
        userId: null, //	string	会员id,唯一标识
        token: null //	string	登录成功后,返回的token值
      },

      FromCurrencyId_option: null,
      ToCurrencyId_option: null,
      tab1: {
        FromCurrencyId: {
          value: null,
          errhint: null
        }, //		string	转出钱包ID
        wallet_amount: null, //转出货币余额
        ToCurrencyId: {
          value: null,
          errhint: null
        }, //		string	转入钱包ID
        Amount: {
          value: null,
          errhint: null
        }, //		GetCashFee	兑换金额
        exchange_rate: null, //汇率
        Fee: null, //		string	手续费
        RestAmount: null, //		decimal	实际转入金额
        L2Pwd: null
      },
      account_wallet: null, //
      result_dialog: {
        title: "",
        message: "",
        d_visible: false,
        func() {
          this.d_visible = false;
          location.reload();
        }
      },

      filter: {
        fromCurrencyId: "",
        toCurrencyId: "",
        minDate: "",
        maxDate: ""
      },
      pagenum: 1,
      pageSize: 20,
      total: 0,
      listData: []
    };
  },
  watch: {
    "tab1.FromCurrencyId.value": function(val) {
      let _self = this;
      if (val) {
        _self.getWallet();
        if (_self.tab1.ToCurrencyId.value) {
          _self.getCurrencyConfig();
          if (_self.tab1.Amount.value) {
            _self.getFeeandleave();
          }
        }
      }
    },
    "tab1.ToCurrencyId.value": function(val) {
      let _self = this;
      if (val && _self.tab1.FromCurrencyId.value) {
        _self.getCurrencyConfig();
        if (_self.tab1.Amount.value) {
          _self.getFeeandleave();
        }
      }
    },
    "tab1.Amount.value": function(val) {
      val = Number(val);
      let _self = this;
      if (val) {
        let result = tMath.minus(_self.account_wallet, val);
        // _self.tab1.wallet_amount = result;
        if (_self.tab1.FromCurrencyId.value && _self.tab1.ToCurrencyId.value) {
          _self.getFeeandleave();
        }
      }
    },
    account_wallet: function(val) {
      val = Number(val);
      let _self = this;
      let result = tMath.minus(val, _self.tab1.Amount.value);
      _self.tab1.wallet_amount = result;
    }
  },
  mounted() {
    let _self = this;
    _self.query_params.token = _self.$store.state.token;
    _self.query_params.userId = _self.$store.getters.getUserId;
    _self.changeTab(0);

    //获取货币兑换的汇率  即比率
    _self.axios
      .get("/api/Financial/GetCurrencyChangeConfig", {
        params: _self.query_params
      })
      .then(res => {
        if (res.Code == "0") {
          this.config = res.Data;
          this.FromCurrencyId_option = getConfigArr(
            this.config,
            CurrencyType,
            "FromCurrencyId"
          );
          this.ToCurrencyId_option = getConfigArr(
            this.config,
            CurrencyType,
            "ToCurrencyId"
          );
        }
      })
      .catch(err => {
        _self.tab1.exchange_rate = null;
      });
  },
  methods: {
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
    getWallet() {
      //获取钱包余额
      let _self = this;
      let promise = _self.axios.get("/api/Financial/GetWalletAmount", {
        params: {
          userId: _self.query_params.userId, //	string	会员id,唯一标识
          walletId: _self.tab1.FromCurrencyId.value, //int	钱包id
          token: _self.query_params.token //string	登录成功后,返回的token值
        }
      });
      promise
        .then(res => {
          if (res.Code == "0") {
            _self.account_wallet = Number(res.Data);
          }
        })
        .catch(err => {});
    },
    getCurrencyConfig() {
      for (var i = 0; i < this.config.length; i++) {
        var item = this.config[i];
        if (
          item.FromCurrencyId == this.tab1.FromCurrencyId.value &&
          item.ToCurrencyId == this.tab1.ToCurrencyId.value
        ) {
          this.tab1.exchange_rate = item.FromBLValue + ":" + item.ToBLValue;
        }
      }
    },
    getFeeandleave() {
      let _self = this;
      _self.axios
        .post("/api/Financial/GetCurrencyChangeFee", {
          FromCurrencyId: _self.tab1.FromCurrencyId.value,
          ToCurrencyId: _self.tab1.ToCurrencyId.value,
          Amount: _self.tab1.Amount.value
        })
        .then(res => {
          if (res.Code == "0") {
            _self.tab1.Fee = res.Data.Fee;
            _self.tab1.RestAmount = res.Data.RestAmount;
          }
        })
        .catch(err => {
          _self.tab1.Fee = null;
          _self.tab1.RestAmount = null;
        });
    },
    changeTab(index) {
      let _self = this;
      _self.curIndex = index;
      if (index == 1) {
        if (!_self.listData || _self.listData.length <= 0) {
          _self.getTabData();
        }
      } else if (index == 0) {
      }
    },
    tocheckExchange() {
      //校验兑换参数
      let _self = this;
      if (!_self.tab1.FromCurrencyId.value) {
        _self.$message({
          showClose: true,
          message: translate("转出货币") + translate("不能为空"),
          type: "error"
        });
        return;
      }
      if (!_self.tab1.ToCurrencyId.value) {
        _self.$message({
          showClose: true,
          message: translate("转入货币") + translate("不能为空"),
          type: "error"
        });
        return;
      }
      if (!_self.tab1.Amount.value) {
        _self.$message({
          showClose: true,
          message: translate("转出金额") + translate("不能为空"),
          type: "error"
        });
        return;
      }
      if (!_self.tab1.L2Pwd) {
        _self.$message({
          showClose: true,
          message: translate("二级密码") + translate("不能为空"),
          type: "error"
        });
        return;
      }

      _self.postData();
    },
    postData() {
      //货币兑换提交
      let _self = this;
      if (_self.isCommitting) {
        return;
      }
      _self.isCommitting = true;
      _self.axios
        .post("/api/Financial/UserCurrencyChange", {
          userId: _self.query_params.userId, //	string	会员id,唯一标识
          token: _self.query_params.token, //		string	登录成功后,返回的token值
          FromCurrencyId: _self.tab1.FromCurrencyId.value, //		string	转出钱包ID
          ToCurrencyId: _self.tab1.ToCurrencyId.value, //		string	转入钱包ID
          Amount: _self.tab1.Amount.value, //		GetCashFee	兑换金额
          RestAmount: _self.tab1.RestAmount, //		decimal	实际转入金额
          Fee: _self.tab1.RestAmount, //		string	手续费
          L2Pwd: md5(_self.tab1.L2Pwd)
        })
        .then(res => {
          if (res.Code == "0") {
            //兑换成功
            _self.result_dialog.title = translate("提示");
            _self.result_dialog.message = translate("我要兑换成功");
            _self.result_dialog.d_visible = true;
          }
          _self.isCommitting = false;
        })
        .catch(err => {
          _self.isCommitting = false;
        });
    },
    getTabData() {
      //获取兑换记录数据
      let _self = this;
      _self.axios
        .post("/api/Financial/GetCurrencyChangeList", {
          userId: _self.query_params.userId, //	string	会员id,唯一标识
          token: _self.query_params.token, //	string	登录成功后,返回的token值
          PageNum: _self.pagenum, //	int	页码
          fromCurrencyId: this.filter.fromCurrencyId,
          toCurrencyId: this.filter.toCurrencyId,
          minDate: this.filter.minDate,
          maxDate: this.filter.maxDate
        })
        .then(res => {
          if (res.Code == "0") {
            _self.listData = res.Data.Data;
            _self.total = Number(res.Data.ItemCount);
          }
        })
        .catch(err => {
          _self.listData = [];
        });
    },
    handleSizeChange(val) {
      _self.getTabData();
    },
    handleCurrentChange(val) {
      _self.getTabData();
    }
  }
};
</script>
