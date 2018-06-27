<template>
    <!--级别升级-->
    <div class="container marTop330 upgrade_user">
      <div class="com-div-fr">
        <div class="con-title-fr is-tab">
          <div class="sub-fr"></div>
          <div class=" tab-fr">
            <div class="tab " @click="changeTab(index)" :class="curIndex==index?'active':''"
                 v-for="(item,index) in titleArr">
              <span>{{item | translate}}</span> 
            </div>
          </div>
        </div>
        <!--我要升级-->
        <form class="com-changepwd-desc desc"  @submit.prevent="tocheckUpgrade"
              v-show="curIndex == '0'">
          <div class="input-ar" v-for="key in Object.keys(contData)">
            <label>
              <i class="iconfont red" v-show="contData[key].isType == 2">&#xe609;</i>{{contData[key].name}}
            </label>
            <template v-if="contData[key].isType == 1">
              <span class="input-area tx">{{contData[key].value}}</span>
            </template>
            <template v-else>
              <div class="right">
                <template v-if="key=='LevelId'">
                  <el-select @change="GetChangeLevelKKInfo" class="input-area" v-model="contData.LevelId.value" :placeholder="'--请选择--' | translate" >
                    <el-option
                      v-for="item in availLevel_option"
                      :key="item.Value"
                      :label="item.Text| translate"
                      :value="item.Value" >
                    </el-option>
                  </el-select>
                </template>
                <template v-else>
                  <el-select :disabled="disabled" class="input-area" v-model="contData.walletId.value" :placeholder="'--请选择--' | translate" >
                    <el-option
                      v-for="item in costType_option"
                      :key="item.value"
                      :label="item.label | translate" 
                      :value="item.value" >
                    </el-option>
                  </el-select>
                </template>
                <span class="errHint">{{contData[key].errhint}}</span>
                <span style="width: 100%;" v-show="key=='walletId' && wallet">
                  {{'当前余额'| translate}}
                  ：
                  {{wallet}}</span>
              </div>
            </template>
          </div>
          <div class="btn-ar">
            <input type="submit" class="btn com-btn red-btn" :value="'升级' | translate"  style="margin-right: 40px;"/>
            <router-link tag="a" to="/finance/recharge" href="javascript:;" class="btn com-btn purple-btn">
            {{'前往充值中心'| translate}}
            </router-link>
          </div>

        </form>
        <!--升级记录-->
        <div class="mtable" v-show="curIndex == 1">
          <div class="com-filter-ar">
            <div class="minput-area">
              <span style="flex:none;width:70px;font-size: 13px;">
                {{'创建日期'| translate}}
                </span>
              <div class="mrange-fr">
                <el-date-picker size="small"
                                value-format="yyyy/MM/dd HH:mm:ss"
                                v-model="filter.minDate"
                                type="datetime"
                                :placeholder="'选择日期时间'| translate">
                </el-date-picker>
                <span class="m-l m-r">{{'至'| translate}}</span>
                <el-date-picker size="small"
                                value-format="yyyy/MM/dd HH:mm:ss"
                                v-model="filter.maxDate"
                                type="datetime"
                                :placeholder="'选择日期时间'| translate">
                </el-date-picker>
              </div>
              <el-select class="jihuo" v-model="filter.Status" :placeholder="'--审核状态--' | translate">
                <el-option
                  v-for="item in state_option"
                  :key="item.value"
                  :label="item.label| translate"
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
              id="table1"
              :data="tableData['1']"
              style="width: 100%"
              stripe
              border
              height="300">
              <el-table-column
                fixed
                :label="'升级前级别'| translate"
                width="100"
                >
                <template slot-scope="scope">
                    <span>{{ scope.row.BeforeLevelId | LevelType}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="CreateDate"
                :label="'升级后级别'| translate"
              >
                <template slot-scope="scope">
                    <span>{{ scope.row.AfterLevelId | LevelType}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="FTJFAmount"
                :label="'扣款方式'| translate"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.HasKCJHB">
                    {{'激活积分+激活币' | translate}}
                  </span>
                  <span v-else>
                    {{'激活积分' | translate}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="JHBAmount"
                :label="'扣除金额'| translate"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.HasKCJHB">
                    {{scope.row.FTJFAmount + '+' + scope.row.JHBAmount}}
                  </span>
                  <span v-else>
                    {{scope.row.FTJFAmount}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="CreateDate"
                :label="'创建日期'| translate"
              >
              </el-table-column>
              <el-table-column
                :label="'状态'| translate"
              >
                <template slot-scope="scope">
                  <div>
                    {{StatusType(scope.row.Status)}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="CreateDate"
                :label="'操作'| translate"
              > 
                <template slot-scope="scope">
                  <span v-if="scope.row.Status === 1" @click="btnCancel(scope.row.Id)"  class="c_green btn_pointer">
                     {{'取消激活'| translate}}
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="mpagination">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="paginationArr[0].pagenum"
                :page-sizes="[10, 20]"
                :page-size="paginationArr[0].pageSize"
                layout="sizes,prev, pager, next, jumper"
                :total="paginationArr[0].total">
              </el-pagination>
          </div>
        </div>
        <!--复投记录-->
        <div class="mtable" v-show="curIndex == 2">
          <div class="table-fr">
            <el-table
              id="table2"
              :data="tableData['2']"
              style="width: 100%"
              stripe
              border
              height="250">
              <el-table-column
                prop="UserCode"
                fixed
                :label="'复投人'| translate"
                width="150">
              </el-table-column>
              <el-table-column
                prop="ZiUserCode"
                :label="'投资账户'| translate"
              >
              </el-table-column>
              <el-table-column
                prop="Investment"
                :label="'投资额'| translate"
              >
              </el-table-column>
              <el-table-column
                :label="'扣除货币类型'| translate"
              >
                <template slot-scope="scope">
                    <span>{{ scope.row.HasKCJHB ? '激活积分': '复投积分'}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="CreateDate"
              
                :label="'复投积分金额'| translate"
              >
              </el-table-column>
              <el-table-column
                prop="CreateDate"
              
                :label="'激活积分金额'| translate"
              >
              </el-table-column>
              <el-table-column
                prop="CreateDate"
              
                :label="'时间'| translate"
              >
              </el-table-column>
            </el-table>
          </div>
          <div class="mpagination">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="paginationArr[1].pagenum"
                :page-sizes="[10, 20]"
                :page-size="paginationArr[1].pageSize"
                layout="sizes,prev, pager, next, jumper"
                :total="paginationArr[1].total">
              </el-pagination>
          </div>


        </div>

      </div>
      <dialog-result :data="result_dialog"></dialog-result>

    </div>
</template>
<style lang="less">
@import (reference) "./../../style/css/main.less";
@import "./../../style/css/com_table_header.less";
@import "./../../style/css/com_table.less";
@import "./../../style/css/edit_common.less";

.upgrade_user {
  padding-bottom: 56px;
}

.upgrade_user form .btn-ar {
  .row;
  .item-center;
  padding: 50/@rem 0;
  padding-bottom: 0;
  font-size: 13px;
}

.upgrade_user .mtable {
  border-top: 1px solid #e5e5e5;
}

@media (min-width: 768px) {
  .upgrade_user form .btn-ar {
    justify-content: flex-start;
  }
}
</style>
<script>
import { getOption, getList } from "./../../tool/data";
import { getValueInarr } from "./../../tool/util";

import { translate, LevelType } from "@/tool/filters";

export default {
  components: {
    "dialog-result": () =>
      import(/*webpackChunkName:"cm_dialog"*/ "@/components/dialog/d_result.vue")
  },
  watch: {
    "contData.walletId.value": function(val) {
      let _self = this;
      if (val) {
        _self.getWallet();
      }
    }
  },
  data() {
    return {
      disabled: true,
      titleArr: ["我要升级", "升级记录", "复投记录"],
      result_dialog: {
        title: "",
        message: "",
        d_visible: false,
        func() {
          this.d_visible = false;
          location.reload();
        }
      },
      curIndex: 0,
      query_params: {
        userId: null, //	string	会员id,唯一标识
        token: null //	string	登录成功后,返回的token值
      },

      availLevel_option: [],
      levelOption: [...getOption(this, "level_option")],
      costType_option: getList(["激活积分"], 1),
      contData: {
        UserCode: {
          isType: 1,
          name: translate("会员编号"),
          value: null
        },
        NickName: {
          isType: 1,
          name: translate("姓名"),
          value: null
        },
        old_LevelId: {
          isType: 1,
          name: translate("当前等级"),
          value: null
        },
        LevelId: {
          isType: 2,
          name: translate("升级级别"),
          value: null,
          errhint: ""
        },
        walletId: {
          isType: 2,
          name: translate("扣款方式"),
          value: null,
          errhint: ""
        }
      },
      wallet: null, //钱包余额
      post_params: {
        userId: null, //	string	会员id,唯一标识
        token: null, //	string	登录成功后,返回的token值
        LevelId: null, //	int	要升级到的级别
        walletId: null //	int	扣款货币
      },
      isCommitting: false,

      paginationArr: [
        {
          pagenum: 1,
          pageSize: 20,
          total: 0
        },
        {
          pagenum: 1,
          pageSize: 20,
          total: 0
        }
      ],
      filter: {
        Status: null,
        minDate: "",
        maxDate: ""
      },
      state_option: [
        {
          label: translate("审核中"),
          value: 1
        },
        {
          label: translate("审核通过"),
          value: 2
        }
      ],

      tableData: {
        1: [],
        2: []
      }
    };
  },
  mounted() {
    let _self = this;
    _self.query_params.token = _self.$store.state.token;
    _self.query_params.userId = _self.$store.getters.getUserId;

    let user = _self.$store.state.user || null;

    if (user) {
      _self.contData.UserCode.value = user.UserCode;
      _self.contData.NickName.value = user.NickName;
      let pre_levelId = Number(user.LevelId);
      this.contData.old_LevelId.value = LevelType(
        this.$store.state.user.LevelId
      );
      this.contData.NickName.value = this.$store.state.user.NickName;
    }
    _self.getAvailLevel();
  },

  methods: {
    // 状态，1、审核中，2、审核通过
    StatusType(id) {
      if (id === 1) {
        return translate("审核中");
      } else if (id === 2) {
        return translate("审核通过");
      }
    },
    // 取消激活
    btnCancel(id) {
      this.axios
        .post("/api/user/DeleteChangeLevel", {
          token: this.query_params.token,
          userId: this.query_params.userId,
          changeLevelId: id
        })
        .then(res => {
          this.$message({
            message: translate("取消激活成功"),
            type: "error",
            duration: 1 * 1000
          });
          this.getTabData();
        })
        .catch(err => {});
    },
    // 升级扣款信息
    GetChangeLevelKKInfo(val) {
      this.axios
        .post("api/user/GetChangeLevelKKInfo", {
          token: this.query_params.token,
          userId: this.query_params.userId,
          LevelId: val
        })
        .then(res => {
          var datas = res.Data;
          if (datas.IsOpenJHB) {
            this.costType_option = getList(["激活积分+激活币"], 1);
          }
          // 拿到值后解除禁用
          this.disabled = false;
        })
        .catch(err => {});
    },
    // 重置
    btnReset() {
      // 重置filter
      for (var k in this.filter) {
        this.filter[k] = "";
      }
      this.getTabData();
    },
    btnSearch() {
      // 查询
      this.getTabData();
    },
    getTabData() {
      let _self = this;
      if (_self.curIndex == 1) {
        _self.getUpgradeHistory();
      } else if (_self.curIndex == 2) {
        _self.getRecastHistory();
      }
    },
    changeTab(index) {
      let _self = this;
      _self.curIndex = index;
      _self.getTabData();
    },
    getWallet() {
      //获取钱包余额
      let _self = this;
      let promise = _self.axios.get("/api/Financial/GetWalletAmount", {
        params: {
          userId: _self.query_params.userId, //	string	会员id,唯一标识
          walletId: _self.contData.walletId.value, //int	钱包id
          token: _self.query_params.token //string	登录成功后,返回的token值
        }
      });
      promise
        .then(res => {
          if (res.Code == "0") {
            _self.wallet = Number(res.Data);
          }
        })
        .catch(err => {});
    },
    getAvailLevel() {
      //获取可升级的级别和钱包余额
      let _self = this;
      let promise1 = _self.axios.get("/api/user/GetLevel", {
        params: _self.query_params
      });
      promise1
        .then(res => {
          let resData = res.data;
          if (res.Code == "0") {
            _self.availLevel_option = res.Data;
          } else {
            _self.availLevel_option = [];
          }
        })
        .catch(err => {});
    },
    tocheckUpgrade() {
      //校验升级数据
      let _self = this;
      if (!_self.contData.LevelId.value) {
        _self.$message({
          showClose: true,
          message:
            translate(_self._self.contData.LevelId.name) + "" + translate("不能为空"),
          type: "error"
        });
        return;
      }
      _self.post_params.LevelId = _self.contData.LevelId.value;
      if (!_self.contData.walletId.value) {
        _self.$message({
          showClose: true,
          message:
            translate(_self._self.contData.walletId.name) + "" + translate("不能为空"),
          type: "error"
        });
        return;
      }
      _self.post_params.walletId = _self.contData.walletId.value;

      _self.post_params.token = _self.query_params.token;
      _self.post_params.userId = _self.query_params.userId;

      _self.toPostData();
    },
    toPostData() {
      let _self = this;
      if (_self.isCommitting) {
        return;
      }
      _self.isCommitting = true;
      _self.axios
        .post("/api/user/LevelChange", _self.post_params)
        .then(res => {
          if (res.Code == "0") {
            //升级成功
            _self.result_dialog.d_visible = true;
            _self.result_dialog.message = translate("升级成功");
            _self.result_dialog.title = translate("提示");
          }
          _self.isCommitting = false;
        })
        .catch(err => {
          _self.isCommitting = false;
        });
    },
    getUpgradeHistory() {
      //获取升级记录
      this.axios
        .post("/api/user/LevelChangeRecord", {
          userId: this.query_params.userId, //	string	会员id,唯一标识
          token: this.query_params.token, //	string	登录成功后,返回的token值
          PageNum: this.paginationArr["0"].pagenum,
          minDate: this.filter.minDate,
          maxDate: this.filter.maxDate,
          Status: this.filter.Status
        })
        .then(res => {
          this.tableData["1"] = res.Data.Data;
          this.paginationArr["1"].total = res.Data.ItemCount; // 总条数
        })
        .catch(err => {});
    },
    getRecastHistory() {
      //获取复投记录
      this.axios
        .post("/api/user/FuTouZiUserecord", {
          userId: this.query_params.userId, //	string	会员id,唯一标识
          token: this.query_params.token, //	string	登录成功后,返回的token值
          PageNum: this.paginationArr["1"].pagenum
        })
        .then(res => {
          this.tableData["2"] = res.Data.Data;
          this.paginationArr["2"].total = res.Data.ItemCount; // 总条数
        })
        .catch(err => {});
    },
    handleSizeChange(val) {
      let _self = this;
      _self.pagenum[_self.curIndex] = val;
      _self.getTabData();
    },
    handleCurrentChange(val) {
      let _self = this;
      _self.pageSize[_self.curIndex] = val;
      _self.getTabData();
    }
  }
};
</script>
