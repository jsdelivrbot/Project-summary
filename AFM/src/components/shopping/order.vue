<template>
  <!--订单列表-->
  <div class="market-share container marTop330">
    <div class=" fullwidth com-div-fr">
      <div class="con-title-fr">
        <div class="sub-fr"></div>
        <span class="con-title">
           {{'订单列表'| translate}}
        </span>
      </div>
      <div class="mtable">
        <div class="com-filter-ar  ">
            <div class="minput-area">
              <span style="flex:none;width:70px;font-size: 13px;">
                 {{'提交日期'| translate}}：
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
               <el-select class="jihuo" v-model="filter.status" :placeholder="'状态' | translate">
                <el-option
                  v-for="item in jihuoState_option"
                  :key="item.value"
                  :label="item.text | translate"
                  :value="item.value">
                </el-option>
              </el-select>
              <input class="oinput" v-model="filter.serialNumber" type="text" :placeholder="'订单号' | translate"/>
            </div>
            <div class="mbtn-area" @click="btnReset()">
              <a href="javascript:;" class=" btn white-btn">
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
            :data="tableData"
            style="width: 100%"
            stripe
            border
            height="250">
            <el-table-column
              fixed
              :label="'订单号'| translate"
              prop="SerialNumber"
              width="100">
            </el-table-column>
            <el-table-column
              prop="CreateDate"
              :label="'提交时间'| translate"
            >
            </el-table-column>
            <el-table-column
              prop="Amount"
            
              :label="'订单金额'| translate"
            >
            </el-table-column>
            <el-table-column
              prop="Total"
            
              :label="'实际支付金额'| translate"
            >
            </el-table-column>
            <el-table-column
              :label="'类型'| translate"
            >
             <template slot-scope="scope">
              <span>
                {{scope.row.Type | orderType}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              :label="'状态'| translate"
            >
            <template slot-scope="scope">
              <span>
                {{scope.row.Status | orderStatus}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              :label="'操作'| translate"
              :class="'c_red'"
            >
            <template slot-scope="scope">
              <router-link tag="span" :to="{name: 'mall_order_detail', params: {id: scope.row.Id}}" :class="'c_green btn_pointer'">{{ '订单详情' | translate }}</router-link>
              <span class="c_green btn_pointer" v-if="scope.row.Status == 2" @click="handlerConfirm(scope.row.Id)">{{ '确认收货' | translate }}</span>
              <router-link tag="span" :to="{name: 'mall_order_detail', params: {id: scope.row.Id}}" :class="'c_green btn_pointer'" v-if="scope.row.Status == 0">{{ '订单详情' | translate }}</router-link>
            </template>
            </el-table-column> 
          </el-table>
          <div class="mpagination">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pagenum" :page-sizes="[10, 20]" :page-size="pageSize" layout="sizes,prev, pager, next, jumper" :total="total">
                    </el-pagination>
              </div>
        </div>
      </div>
    </div>
    
    <el-dialog :visible.sync="dialogData.d_visible" class="common-dialog" :class="'dialog_1'">
        <div slot="title">
            <div class="con-title-fr">
                <div class="sub-fr"></div>
                <span class="con-title">{{dialogData.title | translate}}</span>
            </div>
        </div>
        <div class="m-dialog-content">
            <p class="tcenter">{{dialogData.message | translate}}</p>
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
import { translate, orderType, orderStatus } from "@/tool/filters";

export default {
  data() {
    return {
      dialogData: {
        d_visible: false,
        title: "",
        message: "",
        cancel: () => {
          this.dialogData.d_visible = false;
        },
        confirm: function() {}
      },
      tableData: [],
      jihuoState_option: [
        {
          value:1,
          text:'已付款，未发货'
        },
        {
          value:2,
          text:'已发货，未确认'
        },
        {
          value:3,
          text:'已确认，交易完成'
        }
      ],
      value9: "",
      filter: {
        minDate: '',
        maxDate: '',
        status: '',
        serialNumber: ''
      },
      pagenum: 1,
      pageSize: 20,
      total: 0,
     
    };
  },
  created(){
    this.bindTableData()
  },
  methods: {
    bindTableData(){
       var params = {};
        params.token = this.$store.state.token,
        params.userId = this.$store.getters.getUserId,
        params.minDate = this.filter.minDate,
        params.maxDate = this.filter.maxDate,
        params.status = this.filter.status,
        params.serialNumber = this.filter.serialNumber,
        params.PageNum = this.pagenum,
      this.axios.post('/api/mall/OrderList',params).then(res =>{
        
        this.tableData = res.Data.Data;
        this.total = res.Data.ItemCount;
      })
    },
    //查询
    btnSearch(){
      this.bindTableData()
    },
    //重置
    btnReset(){
      for(var x in this.filter){
        this.filter[x] = ''
      }
    },
    handlerConfirm(orderId) {
      this.dialogData.title = translate("温馨提示");
      this.dialogData.message = translate("确认收货吗？");
      this.dialogData.d_visible = true;
      this.dialogData.confirm = () => {
        this.axios.post('/api/mall/CompleteOrder',{
        token: this.$store.state.token,
        userId: this.$store.getters.getUserId,
        orderId: orderId
        }).then(res =>{
          
          this.bindTableData()
        })
        this.dialogData.d_visible = false;
      };
    },
    handleSizeChange() {
      this.bindTableData()
    },
    handleCurrentChange() {
      this.bindTableData()
    }
  }
};
</script>
