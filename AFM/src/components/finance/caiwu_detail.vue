<template>
  <!--财务明细-->
    <div class="container marTop330 caiwu">
      <div class="com-div-fr">
        <div class="con-title-fr is-tab">
          <div class="sub-fr"></div>
          <div class=" tab-fr">
            <div class="tab "  @click="changeTab(index)"  :class="curIndex==index?'active':''" 
            v-for="(item,index) in caiwu_detail" v-if="index !=6 && index != 8">
              <span>{{item | translate}}</span>
            </div>
          </div>
        </div>
        <div class="mtable">
          <div class="simple-info">
            <img :src="'/static/img/ac'+(curIndex+1)+'.png'">
            <span>{{caiwu_detail[curIndex] | translate}}: <span style="margin-left: 10px; color: #795405">{{balance}}</span></span>
            
          </div>
          <div class="com-filter-ar">
            <div class="minput-area">
              <span style="flex:none;width:70px;font-size: 13px;">
                {{'日期'| translate}}
                </span>
              <div class="mrange-fr">
                <el-date-picker 
                value-format="yyyy/MM/dd HH:mm:ss"
                class="mrange"
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
              <!-- <el-select class="jihuo" v-model="filter.operator" :placeholder="'操作类型'| translate">
                <el-option
                  v-for="item in optType_option"
                  :key="item.value"
                  :label="'item.label'| translate"
                  :value="item.value">
                </el-option>
              </el-select> -->
            </div>
            <div class="mbtn-area">
              <a href="javascript:;" class=" btn white-btn" @click="btnReset">
                <span>
                  {{'重置'| translate}}
                </span>
              </a>
              <a href="javascript:;" class="mbtn-area btn red-btn" @click="btnSearch">
                <span>
                  {{'查询'| translate}}
                  </span>
              </a>

            </div>
          </div>

          <div class="table-fr">
            <el-table
              :data="tableDate[curIndex]"
              style="width: 100%"
              stripe
              border
              height="250"
              :key="curIndex">
              <el-table-column
                fixed
                :label="'日期'| translate"
                prop="CreateDate"
                width="100">
              </el-table-column>
              <el-table-column
                :label="'货币类型'| translate"
              >
                <template slot-scope="scope">
                   <span>{{ scope.row.CurrencyId | CurrencyType | translate}}</span>
                </template>
              </el-table-column>
              <el-table-column
                :label="'操作类型'| translate"
              >
               <template slot-scope="scope">
                   <span>{{ scope.row.FinancialId | FinancialType | translate}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="Amount"
                :label="'收入'| translate"
              >
              </el-table-column>
              <el-table-column
                prop="AfterWalletAmount"
                :label="'余额'| translate"
              >
              </el-table-column>
              <el-table-column
                prop="Description"
                :label="'描述'| translate"
              >
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
.caiwu {
  padding: 0 30/@rem;
  padding-bottom: 57px;
}

.mtable {
  border-top: 1px solid #e5e5e5;
}
.caiwu .simple-info {
  .col;
  .con-center;
  .item-center;
}

.simple-info img {
  margin-top: 46px;
  margin-bottom: 23px;
}

@media (min-width: 768px) {
  .caiwu {
    padding: 0;
  }
}
</style>
<script>
import { translate } from "@/tool/filters";
import Vue from "vue";

export default {
  data() {
    return {
      balance: "",
      CurrencyId: "",
      costType_option: [
        "激活积分",
        "激活币",
        "幸福指数",
        "幸运指数",
        "消费指数",
        "消费积分",
        "福利基金",
        "爱心基金",
        "发展基金",
        "复投积分"
      ],
      caiwu_detail: [
        "激活积分",
        "激活币",
        "幸福指数",
        "幸运指数",
        "消费指数",
        "消费积分",
        "福利基金",
        "爱心基金",
        "发展基金",
        "复投积分"
      ],
      curIndex: 0, //当前tab索引
      filter: {
        minDate: null,
        maxDate: null
      },
      optType_option: [],

      userId: null, //
      token: null, //

      pagenum: 1,
      pageSize: 20,
      total: 0,
      tableDate: {}
    };
  },
  mounted() {
    this.token = this.$store.state.token;
    this.userId = this.$store.getters.getUserId;
    this.getTabData(0);
    this.getBalance(0);
  },
  methods: {
    // 获取钱包余额
    getBalance(id) {
      var walletId = id + 1;
      this.axios
        .post("/api/Financial/GetWalletAmount", {
          token: this.token,
          userId: this.userId,
          walletId: walletId
        })
        .then(res => {
          this.balance = res.Data;
        })
        .catch(err => {});
    },
    //改变tab
    changeTab(index) {
      if (index === 4) {
        // 没有改消费指数，跳转到首页
        this.$router.push("/trade/consume");
      } else {
        this.getBalance(index);
        this.curIndex = index;
        this.getTabData(index);
        // 重置filter
        for (var k in this.filter) {
          this.filter[k] = null;
        }
      }
    },
    // 获取每个表格
    getTabData(index) {
      // if(!index && index != 0) {
      //   index = 1;
      // } else {
      //   index = index + 1;
      // }
      var cId = index + 1;

      let tparams = {
        userId: this.userId, //	string	会员id,唯一标识
        token: this.token, //	string	登录成功后,返回的token值
        pagenum: this.pagenum, //string	每页20条, 获取第几页,默认第1页
        currencyId: cId, // 货币id
        minDate: this.filter.minDate,
        maxDate: this.filter.maxDate
      };

      this.axios
        .post("/api/Financial/GetFinancialDetail", tparams)
        .then(res => {
          if (res.Code == 0) {
            Vue.set(this.tableDate, index, res.Data.Data);
            // this.tableDate[index] = resData.Data;
            this.total = res.Data.ItemCount; // 总条数
          }
        })
        .catch(err => {
          this.tableDate[index] = [];
        });
    },
    // 每页显示条数改变
    handleSizeChange() {
      this.getTabData(this.curIndex);
    },
    // 当前页改变
    handleCurrentChange() {
      this.getTabData();
    },
    // 重置
    btnReset() {
      // 重置filter
      for (var k in this.filter) {
        this.filter[k] = null;
      }
      this.getTabData(this.curIndex);
    },
    // 查询
    btnSearch() {
      this.getTabData(this.curIndex);
    }
  }
};
</script>
