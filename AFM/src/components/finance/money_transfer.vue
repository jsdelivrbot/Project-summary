<template>
  <!--货币转账-->
    <div class="container marTop330 money_transfer">
      <div class="com-div-fr">
        <div class="con-title-fr is-tab" style="border-bottom: 1px solid #e5e5e5;">
          <div class="sub-fr"></div>
          <div class=" tab-fr">
            <div class="tab " @click="changeTab(index)" :class="curIndex==index?'active':''"
                 v-for="(item,index) in money_transfer">
              <span>{{item | translate}}</span>
            </div>
          </div>
        </div>
        <form  @submit.prevent="tocheckTransfer"
               class="desc com-changepwd-desc"
               v-show="curIndex == 0">
          <div class="input-ar">
            <label><i class="iconfont red">&#xe609;</i>
              {{'货币类型'| translate}}
            </label>
            <div class="right">
              <el-select class="input-area" v-model="tab1.CurrencyId.value" :placeholder="'--请选择--' | translate">
                <el-option
                  v-for="item in CurrencyId_option"
                  :key="item.value"
                  :label="item.label | translate"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="input-ar">
            <label>
              {{'账户余额'| translate}}
            </label>
            <span class="input-area tx">{{account_wallet}}</span>
          </div>
          <div class="input-ar">
            <label><i class="iconfont red">&#xe609;</i>
              {{'转入会员'| translate}}
            </label>
            <div class="right">
              <input class="input-area" type="text"
                     v-model="tab1.ToUserCode.value"
                    />
            </div>
          </div>
          <div class="input-ar">
            <label>
              <i class="iconfont red">&#xe609;</i>
              {{'转账金额'| translate}}
            </label>
            <div class="right">
              <input class="input-area" type="text" v-model="tab1.Amount.value"/>
            </div>
          </div>
          <div class="input-ar">
            <label>
              {{'手续费'| translate}}
            </label>
            <span class="input-area tx">{{service_charge + '%'}}</span>
          </div>
          <div class="input-ar">
            <label>
              {{'到账金额'| translate}}
            </label>
            <span class="input-area tx">{{real_amount}}</span>
          </div>
          <div class="input-ar">
            <label><i class="iconfont red">&#xe609;</i>
              {{'二级密码'| translate}}
            </label>
            <div class="right">
              <input class="input-area" type="password"
                     v-model="tab1.L2Pwd.value"
              />
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
                id="s"
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
              <input class="oinput" v-model="filter.toUserCode"  type="text" :placeholder="'转入会员'| translate"/>

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
                :label="'日期'| translate"
                width="100">
              </el-table-column>
              <!--['序号',-->
              <el-table-column
                prop="FromUserCode"
              
                :label="'转出会员'| translate"
                >
                <!--'转出会员',-->
              </el-table-column>
              <el-table-column
                prop="ToUserCode"
              
                :label="'转入会员'| translate"
                >
                <!--'转入会员',-->
              </el-table-column>
              <el-table-column
                prop="CreateDate"
              
                :label="'货币类型'| translate"
              >
                <template slot-scope="scope">
                    <span>{{ scope.row.CurrencyId | CurrencyType | translate}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="Total"
                :label="'转账金额'| translate"
              >
                <!--'转账金额',-->

              </el-table-column>
              <el-table-column
                :label="'手续费'| translate"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.ServiceFee + '%'}}</span>
                </template>
                <!--'手续费',-->

              </el-table-column>
              <el-table-column
                prop="Amount"
              
                :label="'到账金额'| translate"
              >
                <!--'到账金额',-->
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
import { getOption, getList } from "./../../tool/data";

import { translate } from "@/tool/filters";
import md5 from "blueimp-md5";

export default {
  components: {
    "dialog-result": () =>
      import(/*webpackChunkName:"cm_dialog"*/ "@/components/dialog/d_result.vue")
  },
  data() {
    return {
      money_transfer: ["我要转账", "转账记录"],
      curIndex: 0,
      query_params: {
        userId: null, //	string	会员id,唯一标识
        token: null //	string	登录成功后,返回的token值
      },

      filter: {
        minDate: "",
        maxDate: "",
        toUserCode: ""
      },

      pagenum: 1,
      pageSize: 20,
      total: 0,
      tableData: [],

      account_wallet: null, //账户余额
      CurrencyId_option: getList(["激活积分", "激活币"], 1), //货币类型option
      tab1: {
        CurrencyId: {
          value: null
        }, //	int	进行转账的货币类型
        ToUserCode: {
          value: null
        }, //	string	要转入的会员编号
        Amount: {
          value: null
        }, //	decimal	转账金额
        L2Pwd: {
          value: null
        } //	string	二级密码
      },
      service_charge: null, //手续费
      min_Amount: null,
      require_beishu: null,
      real_amount: null, //到账金额
      isCommitting: false,
      result_dialog: {
        title: "",
        message: "",
        d_visible: false,
        func() {
          this.d_visible = false;
          location.reload();
        }
      }
    };
  },
  mounted() {
    // this.getWallet();
    
    let _self = this;
    _self.query_params.token = _self.$store.state.token;
    _self.query_params.userId = _self.$store.getters.getUserId;

    _self.changeTab(0);
  },
  watch: {
    "tab1.CurrencyId.value": function(val) {
      let _self = this;
      if (val) {
        _self.getWallet();
      }
    },
    "tab1.Amount.value": function(val) {
      let _self = this;
      if (val) {
        _self.real_amount = val - val * (this.service_charge / 100);
      }
    }
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
      _self.axios
        .get("/api/Financial/GetWalletAmount", {
          params: {
            userId: _self.query_params.userId, //	string	会员id,唯一标识
            walletId: _self.tab1.CurrencyId.value, //int	钱包id
            token: _self.query_params.token //string	登录成功后,返回的token值
          }
        })
        .then(res => {
          if (res.Code == "0") {
            _self.account_wallet = res.Data;
          }
        })
        .catch(err => {});
    },
    changeTab(index) {
      let _self = this;
      _self.curIndex = index;
      if (index == 1) {
        _self.getTabData();
      } else if (index == 0) {
        _self.getTransferconfig();
      }
    },
    getTransferconfig() {
      //获取转账参数
      let _self = this;
      _self.axios
        .post("/api/Financial/GetTransferConfig", _self.query_params)
        .then(res => {
          let resData = res.Data;
          if (res.Code == "0") {
            _self.service_charge = Number(resData.Tax);
            _self.min_Amount = Number(resData.Min);
            _self.require_beishu = Number(resData.Multiple);
            // _self.tab1.Amount.value = _self.min_Amount;
            
          } else {
          }
        })
        .catch(err => {});
    },
    tocheckTransfer() {
      //校验转账参数
      let _self = this;

      if (!_self.tab1.CurrencyId.value) {
        _self.$message({
          showClose: true,
          message: translate("请选择货币类型"),
          type: "warning"
        });
        return;
      }

      if (!_self.tab1.ToUserCode.value) {
        _self.$message({
          showClose: true,
          message: translate("转入会员不能为空"),
          type: "warning"
        });
        return;
      }

      if (!_self.tab1.Amount.value) {
        _self.$message({
          showClose: true,
          message: translate("转账金额不能为空"),
          type: "warning"
        });
        return;
      } else {
        if (
          _self.tab1.Amount.value < _self.min_Amount ||
          Number(_self.tab1.Amount.value) % _self.require_beishu != 0
        ) {
          _self.$message({
            showClose: true,
            message:
              translate("转账金额必须满足") +
              "(<=" +
              _self.min_Amount +
              "," +
              translate("转账金额") +
              "%" +
              _self.require_beishu +
              "=0)",
            type: "warning"
          });
          return;
        }
      }

      if (!_self.tab1.L2Pwd.value) {
        _self.$message({
          showClose: true,
          message: translate("二级密码不能为空"),
          type: "warning"
        });
        return;
      }

      _self.postTransfer();
    },
    postTransfer() {
      //提交转账
      let _self = this;
      if (_self.isCommitting) {
        return;
      }
      _self.isCommitting = true;
      _self.axios
        .post("/api/Financial/UserTransfer", {
          userId: _self.query_params.userId, //	string	会员id,唯一标识
          token: _self.query_params.token, //	string	登录成功后,返回的token值
          ToUserCode: _self.tab1.ToUserCode.value, //	string	要转入的会员编号
          CurrencyId: _self.tab1.CurrencyId.value, //	int	进行转账的货币类型
          Amount: _self.tab1.Amount.value, //	decimal	转账金额
          L2Pwd: md5(_self.tab1.L2Pwd.value) //	string	二级密码
        })
        .then(res => {
          //转账成功
          _self.result_dialog.title = translate("提示");
          _self.result_dialog.message = translate("转账成功");
          _self.result_dialog.d_visible = true;
          _self.isCommitting = false;
        })
        .catch(err => {
          _self.isCommitting = false;
        });
    },
    getTabData() {
      //获取转账记录
      let _self = this;
      _self.axios
        .post("/api/Financial/GetTransferList", {
          userId: _self.query_params.userId, //	string	会员id,唯一标识
          token: _self.query_params.token, //	string	登录成功后,返回的token值
          PageNum: _self.pagenum, //	int	页码
          toUserCode: this.filter.toUserCode,
          minDate: this.filter.minDate,
          maxDate: this.filter.maxDate
        })
        .then(res => {
          if (res.Code == "0") {
            _self.tableData = res.Data.Data;
            _self.total = res.Data.ItemCount;
          }
        })
        .catch(err => {
          _self.tableData = [];
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
