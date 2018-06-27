<template>
  <!--交易记录-->
  <div class="market-share container marTop330">
    <div class=" fullwidth com-div-fr" style="position: relative;">
      <div class="notice_detail_back">
        <div class="btn_sm" @click="$router.back()">
          <i class="icon_back m-r-sm"></i>{{'返回' | translate}}
        </div>
      </div>
      <div class="con-title-fr">
        <div class="sub-fr"></div>
        <span class="con-title">
           {{'交易记录'| translate}}
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
               <!-- <el-select class="jihuo" v-model="filter.serialNumber" :placeholder="'--拆分次数--' | translate">
                <el-option
                  v-for="item in jihuoState_option"
                  :key="item.value"
                  :label="item.label | translate"
                  :value="item.value">
                </el-option>
              </el-select> -->
              <input class="oinput" v-model="filter.sellUserCode"  type="text" :placeholder="'卖家编号' | translate"/>
              <input class="oinput" v-model="filter.serialNumber"  type="text" :placeholder="'流水号' | translate"/>
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
              :label="'交易时间'| translate"
              prop="CreateDate"
              width="100">
            </el-table-column>
            <el-table-column
              prop="SplitTime"
              :label="'拆分次数'| translate"
            >
            </el-table-column>
            <el-table-column
              prop="Total"
              :label="'成交收益'| translate"
            >
            </el-table-column>
            <el-table-column
              prop="Price"
              :label="'成交价格'| translate"
            >
            </el-table-column>
            <el-table-column
              prop="Count"
              :label="'成交消费指数数量'| translate"
            >
            </el-table-column>
            <el-table-column
              prop="XFZSAmount"
              :label="'实拿收益'| translate"
            >
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
      params: {
        token: this.$store.state.token,
        userId: this.$store.getters.getUserId
      },
      jihuoState_option: getList([
        "0次",
        "1次",
        "2次",
        "3次",
        "4次",
        "5次",
        "6次"
      ]),
      filter: {
        serialNumber: "",
        sellUserCode: "",
        minDate: "",
        maxDate: ""
      },

      pagenum: 1,
      pageSize: 20,
      total: 0,
      tableData: []
    };
  },
  methods: {
    // 重置
    btnReset() {
      // 重置filter
      for (var k in this.filter) {
        this.filter[k] = null;
      }
      this.getTabData();
    },
    // 查询
    btnSearch() {
      this.getTabData();
    },
    // 获取每个表格
    getTabData() {
      this.axios
        .post("/api/stock/GetMyStockList", {
          userId: this.params.userId,
          token: this.params.token,
          PageNum: this.PageNum,
          minDate: this.filter.minDate,
          maxDate: this.filter.maxDate,
          sellUserCode: this.filter.sellUserCode,
          serialNumber: this.filter.serialNumber,
        })
        .then(res => {
          
          this.tableData = res.Data.Data;
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
  }
};
</script>
