<template>
  <!--奖励明细-->
  <div class="container marTop330 award">
    <div class="com-div-fr">
      <div class="con-title-fr is-tab">
        <div class="sub-fr"></div>
        <div class=" tab-fr">
          <div class="tab " @click="changeTab(index)" :class="curIndex==index?'active':''" v-for="(item,index) in award_detail">
            <span>{{item | translate}}</span>
          </div>
        </div>
      </div>
      <div class="mtable" v-show="curIndex == 0">
        <!--'收益报表'-->
        <div class="mtable">
          <div class="com-filter-ar  ">
            <div class="minput-area">
              <span style="flex:none;width:70px;font-size: 13px;">
                {{'日期'| translate}}
                </span>
              <div class="mrange-fr">
                <el-date-picker 
                value-format="yyyy/MM/dd HH:mm:ss"
                class="mrange" v-model="filterArr[0].minDate" type="datetime" :placeholder="'选择日期时间'| translate">
                </el-date-picker>
                <span class="m-l m-r">{{'至'| translate}}</span>
                <el-date-picker 
                value-format="yyyy/MM/dd HH:mm:ss"
                class="mrange" v-model="filterArr[0].maxDate" type="datetime" :placeholder="'选择日期时间'| translate">
                </el-date-picker>
              </div>
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
            :data="tableData['0']"
            style="width: 100%" stripe border height="250">
              <el-table-column 
              prop="CreateDate"
              fixed :label="'日期' | translate" width="100">
              </el-table-column>
              <el-table-column 
              prop="Field_1"
              :label="'分享值'| translate">
              </el-table-column>
              <el-table-column 
              prop="Field_2"
              :label="'平衡值'| translate">
              </el-table-column>
              <el-table-column 
              prop="Field_3"
              :label="'培育值'| translate">
              </el-table-column>
              <el-table-column 
              v-if="PrizeIsOpen.IsOpenJDPrize"
              prop="Field_4"
              :label="'幸福见点'| translate">
              </el-table-column>
              <el-table-column 
              v-if="PrizeIsOpen.IsOpenJYPrize"
              prop="Field_5"
              :label="'交易奖'| translate">
              </el-table-column>
              <el-table-column 
              prop="Field_6"
              :label="'静态收益'| translate">
            </el-table-column>
          </el-table>
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
      </div>
        </div>
        <div class="mtable" v-show="curIndex == 1">
          <!--'动态收益明细'-->
          <div class="mtable">
        <div class="com-filter-ar  ">
            <div class="minput-area">
              <span style="flex:none;width:70px;font-size: 13px;">
                {{'日期'| translate}}
                </span>
              <div class="mrange-fr">
                <el-date-picker 
                value-format="yyyy/MM/dd HH:mm:ss"
                
                class="mrange"
                                v-model="filterArr[1].minDate"
                                type="datetime"
                                :placeholder="'选择日期时间'| translate">
                </el-date-picker>
                <span class="m-l m-r">{{'至'| translate}}</span>
                <el-date-picker 
                value-format="yyyy/MM/dd HH:mm:ss"
                
                class="mrange"
                                v-model="filterArr[1].maxDate"
                                type="datetime"
                                :placeholder="'选择日期时间'| translate">
                </el-date-picker>
              </div>
              <!-- <el-select class="jihuo" v-model="filterArr[2].status" :placeholder="'激活状态'| translate">
                <el-option
                  v-for="item in filterArr[1].option"
                  :key="item.value"
                  :label="item.label| translate"
                  :value="item.value">
                </el-option>
              </el-select> -->
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
            :data="tableData['1']"
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
              :label="'奖励类型'| translate"
            >
              <template slot-scope="scope">
                  <span>{{ scope.row.Field | FieldType | translate}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="Total"
            
              :label="'奖励总额'| translate"
            >
            </el-table-column>
            <el-table-column
              prop="Currency_5"
            
              :label="'幸运指数'| translate"
            >
            </el-table-column>
            <el-table-column
              prop="Currency_2"
            
              :label="'消费积分'| translate"
            >
            </el-table-column>
            <!-- <el-table-column
              prop="Currency_3"
            
              :label="'福利基金'| translate"
            >
            </el-table-column> -->
            <el-table-column
              prop="Currency_4"
              :label="'爱心基金'| translate"
            >
            </el-table-column>
            <!-- <el-table-column
              prop="Currency_1"
              :label="'发展基金'| translate"
            >
            </el-table-column> -->
            <el-table-column
              prop="Description"
              :label="'来源'| translate"
            >
            </el-table-column>
          </el-table>
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
        </div>
        <div class="mtable" v-show="curIndex == 2">
          <!--'静态收益明细'-->
          <div class="mtable">
        <div class="com-filter-ar  ">
            <div class="minput-area">
              <span style="flex:none;width:70px;font-size: 13px;">
                {{'日期'| translate}}
                </span>
              <div class="mrange-fr">
                <el-date-picker 
                value-format="yyyy/MM/dd HH:mm:ss"
                class="mrange"
                                v-model="filterArr[2].minDate"
                                type="datetime"
                                :placeholder="'选择日期时间'| translate">
                </el-date-picker>
                <span class="m-l m-r">{{'至'| translate}}</span>
                <el-date-picker 
                value-format="yyyy/MM/dd HH:mm:ss"
                class="mrange"
                                v-model="filterArr[2].maxDate"
                                type="datetime"
                                :placeholder="'选择日期时间'| translate">
                </el-date-picker>
              </div>
              

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
            :data="tableData['2']"
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
              prop="Total"
            
              :label="'收益总额'| translate"
            >
            </el-table-column>
            <el-table-column
              prop="XFZSAmount"
            
              :label="'幸福指数'| translate"
            >
            </el-table-column>
            <el-table-column
              prop="XFJFAmount"
            
              :label="'消费积分'| translate"
            >
            </el-table-column>
            <!-- <el-table-column
              prop="FLJJAmount"
            
              :label="'福利基金'| translate"
            >
            </el-table-column> -->
            <el-table-column
              prop="XFZSAmount"
            
              :label="'幸福指数'| translate"
            >
            </el-table-column>
            <!-- <el-table-column
              prop="FeeAmount"
              :label="'手续费'| translate"
            >
            </el-table-column> -->
          </el-table>
          <div class="mpagination">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="paginationArr[2].pagenum"
                :page-sizes="[10, 20]"
                :page-size="paginationArr[2].pageSize"
                layout="sizes,prev, pager, next, jumper"
                :total="paginationArr[2].total">
              </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="less">
@import (reference) "./../../style/css/main.less";
@import "./../../style/css/com_table_header.less";
@import "./../../style/css/com_table.less";
.award {
  padding: 0 30/@rem;
  padding-bottom: 57px;
}
</style>

<script>
import { translate } from "@/tool/filters";

export default {
  data() {
    return {
      PrizeIsOpen: {
        IsOpenJDPrize: true,
        IsOpenJYPrize: true
      },
      award_detail: ["收益报表", "动态收益明细", "静态收益明细"],
      curIndex: 0,
      filterArr: [
        {
          minDate: "",
          maxDate: ""
        },
        {
          minDate: "",
          maxDate: ""
        },
        {
          minDate: "",
          maxDate: ""
        }
      ],
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
        },
        {
          pagenum: 1,
          pageSize: 20,
          total: 0
        }
      ],

      tableData: {
        0: [],
        1: [],
        2: []
      }
    };
  },
  methods: {
    // 重置
    btnReset() {
      // 重置filter
      for (var i = 0; i < this.filterArr.length; i++) {
        var item = this.filterArr[i];
        for (var k in item) {
          item[k] = "";
        }
      }
      this.getTabData();
    },
    btnSearch() {
      // 查询
      this.getTabData();
    },
    changeTab(index) {
      //改变tab
      let _self = this;
      // for(var k in this.paginationArr) {
      //   this.paginationArr[k].pagenum
      // }
      // 重置
      this.paginationArr[index] = {
        pagenum: 1,
        pageSize: 20,
        total: 0
      };
      _self.curIndex = index;
      _self.getTabData();
    },
    getTabData() {
      //获取tab data数据
      var params = {
        token: this.$store.state.token,
        userId: this.$store.getters.getUserId,
        PageNum: this.paginationArr[this.curIndex + ""].pagenum,
        minDate: this.filterArr[this.curIndex + ""].minDate,
        maxDate: this.filterArr[this.curIndex + ""].maxDate
      };
      var url;
      if (this.curIndex == 0) {
        // 收益报表
        url = "/api/Financial/GetPrizeSummary";
      } else if (this.curIndex == 1) {
        // 动态收益明细
        url = "/api/Financial/GetDTPrizeDetail";
      } else if (this.curIndex == 2) {
        // 静态收益明细
        url = "/api/Financial/GetJTPrizeDetail";
      }

      this.axios
        .post(url, params)
        .then(res => {
          this.tableData[this.curIndex + ""] = res.Data.Data;
          this.paginationArr[this.curIndex].total = res.Data.ItemCount; // 总条数
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

    //奖金开启、关闭
    this.axios.post("/api/Financial/PrizeIsOpen").then(res => {
      this.PrizeIsOpen = res.Data;
    });
  }
};
</script>
