<template>
  <!--奖励明细-->
  <div class="container marTop330 award">
    <div v-if="!isCheck">
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
        <div class="mtable">
          <div class="com-filter-ar  ">
            <div class="minput-area">
              <span style="flex:none;width:70px;font-size: 13px;">
                {{'出售日期'| translate}}
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
              <input class="oinput" type="text" v-model="filterArr[0].sellUserCode" :placeholder="'卖家编号' | translate"/>
              <input class="oinput" type="text" v-model="filterArr[0].serialNumber" :placeholder="'流水号' | translate"/>
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
          <div style="margin: 18px 38px 0;" class="clearfix">
            <router-link to="currency/record" tag="div" :class="'btn_sm btn_sm_red fr'" :style="{background: '#707980'}">
              {{'购买记录' | translate}}
            </router-link>
          </div>
         
          <div class="table-fr" v-if="tableData['0']">
            <el-table 
            :data="tableData['0']"
            style="width: 100%" stripe border height="250">
              <el-table-column 
              type="index"
              fixed 
              :label="'序号' | translate" width="100">
              </el-table-column>
              <el-table-column 
              prop="SerialNumber"
              :label="'流水号'| translate">
              </el-table-column>
              <el-table-column 
              prop="UserCode"
              :label="'卖家编号'| translate">
              </el-table-column>
              <el-table-column 
              :label="'诚信星级'| translate">
                <template slot-scope="scope">
                  <i class="icon_star" v-for="item in (scope.row.Xinyu > 0 ? scope.row.Xinyu : 0)"></i>
                </template>
              </el-table-column>
              <el-table-column 
              :label="'出售货币'| translate">
                <template slot-scope="scope">
                  <span>{{ scope.row.TradeCurrencyId | CurrencyType | translate}}</span>
                </template>
              </el-table-column>
                
              <el-table-column 
              prop="Total"
              :label="'出售金额'| translate">
              </el-table-column>
              <el-table-column 
              prop="Rest"
              :label="'剩余数额'| translate">
              </el-table-column>
              <el-table-column 
              :label="'接受货币'| translate">
                <template slot-scope="scope">
                  <span>{{ scope.row.RealCurrencyId | RealCurrencyType | translate}}</span>
                </template>
              </el-table-column>
              <el-table-column 
              prop="ReaCurrencyTotal"
              :label="'应付金额'| translate">
              </el-table-column>
              <el-table-column 
              prop="CreateDate"
              :label="'出售时间'| translate">
              </el-table-column>
              <el-table-column 
              :label="'状态'| translate">
                <template slot-scope="scope">
                  <span>{{ scope.row.Status | jyStatusType | translate}}</span>
                </template>
              </el-table-column>
              <el-table-column :label="'操作'| translate">
                <template slot-scope="scope">
                  <span @click="btnBuy(scope.row)" class="c_green btn_pointer">
                    {{'购买'| translate}}
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
       </div>

        
       <div class="mtable" v-show="curIndex == 1">
         
         <div class="table-fr">
           <div class="order_detail_item" style="border: 0; border-bottom: 1px solid #e1e1e1; ">
              <div class="order_detail_item_inner">
                <el-row :gutter="24">
                  <el-col :span="12" :xs="24">
                    <div class="input-ar">
                      <label>
                        <i class="iconfont red"></i>
                         {{'出售货币'| translate}}
                      </label> 
                      <div class="right">
                        <el-select @change="GetWalletAmount" v-model="sellData.formData.sellCurrencyId" :placeholder="'--请选择--'| translate">
                          <el-option
                            v-for="item in selectData.sellCurrency"
                            :key="item.value"
                            :label="item.label | translate"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="input-ar">
                      <label>
                        {{'出售货币余额'| translate}}
                      </label> 
                      <div class="right" v-text="sellData.data.WalletAmount"></div>
                    </div>
                    <div class="input-ar">
                      <label>
                        <i class="iconfont red"></i>
                        {{'出售数额'| translate}}
                      </label> 
                      <div class="right">
                        <el-input @change="GetSellFee" v-model="sellData.formData.total" ></el-input>
                      </div>
                    </div>
                    <div class="input-ar">
                      <label>
                        {{'手续费'| translate}}
                      </label> 
                      <div class="right" v-text="sellData.data.Fee">
                      </div>
                    </div>
                    <div class="input-ar">
                      <label>
                        {{'实际出售数额'| translate}}
                      </label> 
                      <div class="right" v-text="sellData.data.RestAmount">
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12" :xs="24">
                    <div class="input-ar">
                      <label>
                        <i class="iconfont red"></i>
                         {{'接受货币'| translate}}
                      </label> 
                      <div class="right">
                        <el-select @change="GetCurrencyChangeConfig" v-model="sellData.formData.realCurrencyId" :placeholder="'--请选择--'| translate">
                          <el-option
                            v-for="item in selectData.RealCurrency"
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
                      <div class="right" >
                        {{this.sellData.data.FromBLValue + ':' + this.sellData.data.ToBLValue}}
                      </div>
                    </div>
                    <div class="input-ar">
                      <label>
                         {{'实际收款金额'| translate}}
                      </label> 
                      <div class="right" v-text="sellData.data.RealAccount">
                      </div>
                    </div>
                    <div class="input-ar">
                      <label>
                        <i class="iconfont red"></i>
                         {{'二级密码'| translate}}
                      </label> 
                      <div class="right">
                        <el-input type="password" v-model="sellData.formData.l2Pwd"></el-input>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <div style="text-align: center; padding: 10px 0;">
                  <div class="btn_sm btn_sm_red" @click="btnSell">
                    {{'出售'| translate}}
                  </div>
                </div>
              </div>
            </div>
         </div>
         <div class="order_detail_item_title " style="margin-left: 38px;">
          {{'挂卖记录'| translate}}
        </div>
         <div class="mtable">
          <div class="com-filter-ar  ">
            <div class="minput-area">
              <span style="flex:none;width:70px;font-size: 13px;">
                {{'出售日期'| translate}}
                </span>
              <div class="mrange-fr">
                <el-date-picker
                value-format="yyyy/MM/dd HH:mm:ss"
                 class="mrange" v-model="filterArr[1].minDate" type="datetime" :placeholder="'选择日期时间'| translate">
                </el-date-picker>
                <span class="m-l m-r">{{'至'| translate}}</span>
                <el-date-picker 
                value-format="yyyy/MM/dd HH:mm:ss"
                class="mrange" v-model="filterArr[1].minDate" type="datetime" :placeholder="'选择日期时间'| translate">
                </el-date-picker>
              </div>
              <input class="oinput" type="text" v-model="filterArr[1].serialNumber" :placeholder="'流水号' | translate"/>
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
            style="width: 100%" stripe border height="250">
              <el-table-column 
              prop="SerialNumber"
              fixed :label="'流水号' | translate" width="100">
              </el-table-column>
              <el-table-column 
              :label="'出售货币'| translate">
                <template slot-scope="scope">
                  <span>{{ scope.row.TradeCurrencyId | CurrencyType | translate}}</span>
                </template>
              </el-table-column>
              <el-table-column 
              prop="Tax"
              :label="'手续费'| translate">
              </el-table-column>
              <el-table-column 
              prop="Total"
              :label="'实际出售金额'| translate">
              </el-table-column>
              <el-table-column 
              :label="'接受货币'| translate">
                <template slot-scope="scope">
                  <span>{{ scope.row.RealCurrencyId | RealCurrencyType | translate}}</span>
                </template>
              </el-table-column>
              <el-table-column 
              prop="ReaCurrencyTotal"
              :label="'应付金额'| translate">
              </el-table-column>
              <el-table-column 
              prop="ReaCurrencyAmount"
              :label="'已收款金额'| translate">
              </el-table-column>
              <el-table-column 
              prop="Rest"
              :label="'剩余数额'| translate">
              </el-table-column>
              <el-table-column 
              prop="CreateDate"
              :label="'出售时间'| translate">
              </el-table-column>
              <el-table-column 
              :label="'状态'| translate">
                <template slot-scope="scope">
                  <span>{{ scope.row.Status | jyStatusType | translate}}</span>
                </template>
              </el-table-column>
              <el-table-column 
              width="140px"
              :label="'操作'| translate">
                <template slot-scope="scope">
                  <router-link :to="{ name: 'currencyDetail', params: {id: 234}}" :class="'c_green btn_pointer'" tag="span" >
                      {{'出售详情'| translate}}
                  </router-link>
                </template>
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
                      {{ confirmData.data.PayType | zfType}}
                    </span>
                  </div>
                  <div class="input-ar">
                    <label>
                      {{'支付凭证'| translate}}
                    </label> 
                    <div class="img_pz2">
                      <img-preview v-if="confirmData.data.ImgPath" :src="confirmData.data.ImgPath | getImgUrlFilter" :imgClass="{'img_block':  true}"></img-preview>
                      <span v-else>N/A</span>
                    </div>
                </div>
                </div>
              </div>
            </div>
            <div class="order_detail_bottom">
              <div class="btn_sm btn_sm_white m-r-lg" @click="checkData.cancel">
                {{'取消'| translate}}
              </div>
              <div class="btn_sm btn_sm_red" @click="checkData.confirm">
                {{'确认收款'| translate}}
              </div>
            </div>
          </div>
        </div>
    </div>
    

    <!-- 购买 -->
    <el-dialog :visible.sync="dialogData_buy.d_visible" class="common-dialog" :class="'dialog_1'">
        <div slot="title">
            <div class="con-title-fr">
                <div class="sub-fr"></div>
                <span class="con-title">{{dialogData_buy.title | translate}}</span>
            </div>
        </div>
        <div class="m-dialog-content">
          <div class="input_wrap" v-if="dialogData_buy.data">
            <el-form  :model="dialogData_buy.formData" label-width="140px">
              <el-form-item :label="'购买货币' | translate" >
                <div>
                  {{dialogData_buy.data.TradeCurrencyId | CurrencyType | translate}}
                </div>
              </el-form-item>
              <el-form-item :label="'剩余数额' | translate" >
                <div v-text="dialogData_buy.data.Rest"></div>
              </el-form-item>
              <el-form-item :label="'购买数额' | translate" :class="'is-required'">
                <el-input @change="buyConfig" type="text" v-model="dialogData_buy.formData.total"></el-input>
              </el-form-item>
              <el-form-item :label="'接受货币' | translate" >
                <div>
                  {{ dialogData_buy.data.RealCurrencyId | RealCurrencyType | translate}}
                </div>
              </el-form-item>
              <el-form-item :label="'应付金额' | translate" >
                <div v-text="dialogData_buy.RealTotal"></div>
              </el-form-item>
              <el-form-item :label="'二级密码' | translate" :class="'is-required'">
                <el-input type="password" v-model="dialogData_buy.formData.l2Pwd"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div slot="footer" style="padding-bottom: 40px;font-size: 13px;">
            <div class="row con-betwwen item-center">
                <a href="javascript:;" @click="dialogData_buy.cancel" class="btn white-btn com-btn" style="font-size: 13px;">{{'取消' | translate}}</a>
                <a href="javascript:;" @click="dialogData_buy.confirm" class="btn red-btn com-btn" style="font-size: 13px;">{{'确定' | translate}}</a>
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
        <div slot="footer" style="padding-bottom: 40px;font-size: 13px;">
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
                <div v-text="dialogData_detail.data.SerialNumber"></div>
              </el-form-item>
              <el-form-item :label="'打款金额' | translate" >
                <div v-text="dialogData_detail.data.ReaCurrencyTotal"></div>
              </el-form-item>
              <el-form-item :label="'打款人' | translate" >
                <div v-text="dialogData_detail.data.BuyUserCode"></div>
              </el-form-item>
              <el-form-item :label="'打款联系方式' | translate" >
                <div v-text="dialogData_detail.data.BuyMobile"></div>
              </el-form-item>
              <el-form-item :label="'收款人' | translate" >
                <div v-text="dialogData_detail.data.SellUserCode"></div>
              </el-form-item>
              <el-form-item :label="'收款人联系方式' | translate" >
                <div v-text="dialogData_detail.data.SellMobile"></div>
              </el-form-item>
              <el-form-item :label="'支付方式' | translate" >
                <div>
                  {{dialogData_detail.data.PayType | zfType}}
                </div>
              </el-form-item>
              <el-form-item :label="'支付凭证' | translate" >
                <div class="img_pz2">
                  <img-preview v-if="dialogData_detail.data.ImgPath" :src="dialogData_detail.data.ImgPath | getImgUrlFilter" :imgClass="{'img_block':  true}"></img-preview>
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
                  {{'卖家申诉'| translate}}
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
import {
  translate,
  RealCurrencyType,
  CurrencyType,
  jyStatusType
} from "@/tool/filters";
import { getList } from "./../../tool/data";
import md5 from "blueimp-md5";
import imgPreview from "@/components/common/imgPreview";

export default {
  components: {
    imgPreview
  },
  data() {
    return {
      // 确认付款检查，提交
      checkData: {
        id: "",
        cancel: () => {
          this.isCheck = false;
        },
        confirm: () => {
          // 卖家-确认收款
          this.axios
            .post("/api/help/SellerConfirm", {
              token: this.params.token,
              userId: this.params.userId,
              hdId: this.checkData.id
            })
            .then(res => {
              this.$message({
                message: translate("确认收款成功"),
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
      confirmData: {
        data: {},
        formData: {
          payType: "",
          imageUrl: "",
          id: ""
        }
      },
      isCheck: false,
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
      // 汇率
      // 配置
      config: {
        huilv: {},
        sell: {},
        buy: {}
      },
      params: {
        token: this.$store.state.token,
        userId: this.$store.getters.getUserId
      },
      // 购买
      dialogData_buy: {
        RealTotal: "",
        d_visible: false,
        title: "",
        message: "",
        data: {},
        formData: {
          total: "",
          l2Pwd: ""
        },
        cancel: () => {
          this.dialogData_buy.d_visible = false;
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
        data: {},
        formData: {
          content: "",
          type: ""
        },
        cancel: () => {
          this.dialogData_detail.d_visible = false;
        },
        confirm: function() {}
      },

      // 卖出表单数据
      sellData: {
        data: {
          WalletAmount: "",
          Fee: "",
          RestAmount: "",
          FromBLValue: "",
          ToBLValue: "",
          RealAccount: ""
        },
        formData: {
          sellCurrencyId: "",
          realCurrencyId: "",
          l2Pwd: "",
          total: ""
        }
      },
      selectData: {
        sellCurrency: [
          {
            label: "幸福指数",
            value: 3
          },
          {
            label: "幸运指数",
            value: 4
          }
        ],
        RealCurrency: getList(
          ["人民币", "美元", "欧元", "港币", "韩元", "泰铢"],
          1
        )
      },
      formData: {},
      award_detail: ["买入", "卖出"],
      curIndex: 0,

      filterArr: [
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
        }
      ],
      tableData: {
        0: [],
        1: []
      }
    };
  },
  methods: {
    // 确认收款款返回
    confirmBack() {
      this.isCheck = false;
    },
    // 卖家显示申诉
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
    //卖家确认收款
    btnConfirmSk(id) {
      this.isCheck = true;
      this.checkData.id = id;
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
    // 购买金额限制
    buyConfig(val) {
      if (
        val < this.config.buy.BuyMin ||
        val > this.config.buy.BuyMax ||
        val % this.config.buy.BuyMul != 0
      ) {
        this.$message({
          message:
            translate("金额最小为") +
            this.config.buy.BuyMin +
            translate("最大为") +
            this.config.buy.BuyMax +
            translate("且必须是") +
            this.config.buy.BuyMul +
            translate("的整数倍"),
          type: "error",
          duration: 3 * 1000
        });
        return false;
      } else {
        
        this.axios
          .post("/api/help/GetbuyTotal", {
            token: this.params.token,
            userId: this.params.userId,
            sellGDId: this.dialogData_buy.data.SellGDId,
            total: val
          })
          .then(res => {
            this.dialogData_buy.RealTotal = res.Data.RealTotal;
          })
          .catch(err => {});
      }
    },
    // 匹配汇率参数
    GetCurrencyChangeConfig(val) {
      for (var i = 0; i < this.config.huilv.length; i++) {
        var item = this.config.huilv[i];
        if (
          item.FromCurrencyId == this.sellData.formData.sellCurrencyId &&
          item.ToCurrencyId == this.sellData.formData.realCurrencyId
        ) {
          this.sellData.data.FromBLValue = item.FromCurrencyBLValue;
          this.sellData.data.ToBLValue = item.ToCurrencyBLValue; // 真实货币
        }
      }
    },
    // 货币交易——卖单获取手续费,收款金额
    GetSellFee(val) {
      if (
        val < this.config.sell.SellMin ||
        val > this.config.sell.SellMax ||
        val % this.config.sell.SellMul != 0
      ) {
        this.$message({
          message:
            translate("金额最小为") +
            this.config.sell.SellMin +
            translate("最大为") +
            this.config.sell.SellMax +
            translate("且必须是") +
            this.config.sell.SellMul +
            translate("的整数倍"),
          type: "error",
          duration: 3 * 1000
        });
        return;
      }
      this.axios
        .post("/api/help/GetSellFee", {
          token: this.params.token,
          userId: this.params.userId,
          Amount: val
        })
        .then(res => {
          var data = res.Data;
          this.sellData.data.Fee = data.Fee;
          this.sellData.data.RestAmount = data.RestAmount;
        })
        .catch(err => {});
    },
    // 获取钱包余额
    GetWalletAmount(val) {
      
      this.axios
        .post("/api/Financial/GetWalletAmount", {
          token: this.params.token,
          userId: this.params.userId,
          walletId: val
        })
        .then(res => {
          this.sellData.data.WalletAmount = res.Data;
          this.GetCurrencyChangeConfig();
        })
        .catch(err => {});
    },
    // 出售
    btnSell() {
      if (this.sellData.formData.sellCurrencyId == "") {
        this.$message({
          message: translate("请输入") + translate("出售货币"),
          type: "error",
          duration: 1 * 1000
        });
        return;
      }
      if (this.sellData.formData.total == "") {
        this.$message({
          message: translate("请输入") + translate("出售数额"),
          type: "error",
          duration: 1 * 1000
        });
        return;
      }
      if (
        this.sellData.formData.total < this.config.sell.SellMin ||
        this.sellData.formData.total > this.config.sell.SellMax ||
        this.sellData.formData.total % this.config.sell.SellMul != 0
      ) {
        this.$message({
          message:
            translate("金额最小为") +
            this.config.sell.SellMin +
            translate("最大为") +
            this.config.sell.SellMax +
            translate("且必须是") +
            this.config.sell.SellMul +
            translate("的整数倍"),
          type: "error",
          duration: 3 * 1000
        });
        return;
      }
      if (this.sellData.formData.realCurrencyId == "") {
        this.$message({
          message: translate("请输入") + translate("接受货币"),
          type: "error",
          duration: 1 * 1000
        });
        return;
      }
      if (this.sellData.formData.l2Pwd == "") {
        this.$message({
          message: translate("请输入") + translate("二级密码"),
          type: "error",
          duration: 1 * 1000
        });
        return;
      }

      // 出售
      this.axios
        .post("/api/help/CreateSellTrade", {
          token: this.params.token,
          userId: this.params.userId,
          sellCurrencyId: this.sellData.formData.sellCurrencyId,
          realCurrencyId: this.sellData.formData.realCurrencyId,
          l2Pwd: md5(this.sellData.formData.l2Pwd),
          total: this.sellData.formData.total
        })
        .then(res => {
          this.$message({
            message: translate("出售成功"),
            type: "success",
            duration: 1 * 1000
          });
          // 重置
          for (var k in this.sellData) {
            var item = this.sellData[k];
            for (var kk in item) {
              item[kk] = "";
            }
          }
          this.getTabData();
        })
        .catch(err => {});
    },
    //获取tab data数据
    getTabData() {
      var url,
        params = {
          token: this.params.token,
          userId: this.params.userId,
          PageNum: this.paginationArr[this.curIndex + ""].pagenum,
          minDate: this.filterArr[this.curIndex + ""].minDate,
          maxDate: this.filterArr[this.curIndex + ""].maxDate,
          sellUserCode: this.filterArr[this.curIndex + ""].sellUserCode,
          serialNumber: this.filterArr[this.curIndex + ""].serialNumber
        };
      if (this.curIndex == 0) {
        // 货币交易——买入页列表
        url = "/api/help/GetSellWaitHelpList";
      } else if (this.curIndex == 1) {
        // 货币交易——挂卖记录
        url = "/api/help/GetSellHelpList";
      }

      this.axios
        .post(url, params)
        .then(res => {
          this.tableData[this.curIndex + ''] = res.Data.Data;
          this.paginationArr[this.curIndex].total = res.Data.ItemCount; // 总条数
        })
        .catch(err => {});
    },
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
    // 查询
    btnSearch() {
      this.getTabData();
    },
    // 显示购买
    btnBuy(data) {
      
      // 重置
      for (var k in this.dialogData_buy.formData) {
        this.dialogData_buy.formData[k] = "";
      }

      this.dialogData_buy.data = data;
      this.dialogData_buy.title = translate("购买货币");
      this.dialogData_buy.d_visible = true;
      this.dialogData_buy.confirm = () => {
        if (this.dialogData_buy.formData.total == "") {
          this.$message({
            message: translate("购买数额") + translate("不能为空"),
            type: "error",
            duration: 1 * 1000
          });
          return;
        }
        if (
          this.dialogData_buy.formData.total < this.config.buy.BuyMin ||
          this.dialogData_buy.formData.total > this.config.buy.BuyMax ||
          this.dialogData_buy.formData.total % this.config.buy.BuyMul != 0
        ) {
          this.$message({
            message:
              translate("金额最小为") +
              this.config.buy.BuyMin +
              translate("最大为") +
              this.config.buy.BuyMax +
              translate("且必须是") +
              this.config.buy.BuyMul +
              translate("的整数倍"),
            type: "error",
            duration: 3 * 1000
          });
          return;
        }
        if (this.dialogData_buy.formData.l2Pwd == "") {
          this.$message({
            message: translate("二级密码") + translate("不能为空"),
            type: "error",
            duration: 1 * 1000
          });
          return;
        }
        // 购买
        this.axios
          .post("api/help/CreateBuyTrade", {
            token: this.params.token,
            userId: this.params.userId,
            sellGDId: this.dialogData_buy.data.SellGDId,
            total: this.dialogData_buy.formData.total,
            l2Pwd: md5(this.dialogData_buy.formData.l2Pwd)
          })
          .then(res => {
            this.$message({
              message: translate("购买成功"),
              type: "success",
              duration: 1 * 1000,
              onClose: () => {
                this.dialogData_buy.d_visible = false;
              }
            });
            this.getTabData();
          })
          .catch(err => {});
      };
    },
    // 显示详情
    btnDetail(id) {
      

      this.dialogData_detail.title = translate("查看详情");
      this.dialogData_detail.d_visible = true;

      this.axios
        .post("/api/help/GetTradeDetail", {
          token: this.params.token,
          userId: this.params.userId,
          detailId: id
        })
        .then(res => {
          this.dialogData_detail.data = res.Data;
        })
        .catch(err => {});

      this.dialogData_detail.confirm = () => {
        this.dialogData_detail.d_visible = false;
      };
    },
    // 显示撤销
    btnCancle(id) {
      this.dialogData_cancel.title = translate("温馨提示");
      this.dialogData_cancel.message = translate("确认撤销购买吗？");
      this.dialogData_cancel.d_visible = true;
      this.dialogData_cancel.confirm = () => {
        
        this.dialogData_cancel.d_visible = false;
      };
    },
    tocheckExchange() {},
    changeTab(index) {
      //改变tab
      this.curIndex = index;
      if (this.curIndex == 1) {
        // 重置
        for (var k in this.sellData) {
          var item = this.sellData[k];
          for (var kk in item) {
            item[kk] = "";
          }
        }
      }
      this.getTabData();
    },

    handleSizeChange() {
      this.getTabData();
    },
    handleCurrentChange() {
      this.getTabData();
    }
  },
  watch: {
    // 计算实际出款金额
    sellData: {
      handler: function() {
        if (
          this.sellData.data.FromBLValue &&
          this.sellData.data.ToBLValue &&
          this.sellData.formData.total
        ) {
          this.sellData.data.RealAccount =
            this.sellData.data.ToBLValue /
            this.sellData.data.FromBLValue *
            this.sellData.data.RestAmount;
        }
      },
      deep: true
    }
  },
  mounted() {
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
        });

    this.getTabData();
    // 货币交易——汇率参数
    this.axios
      .post("/api/help/GetHuiLvForRealCurrency")
      .then(res => {
        this.config.huilv = res.Data;
      })
      .catch(err => {});

    // 货币交易——挂卖金额限制
    this.axios
      .post("/api/help/GetSellTotalXZ", {
        token: this.params.token,
        userId: this.params.userId
      })
      .then(res => {
        this.config.sell = res.Data;
      })
      .catch(err => {});

    // 货币交易——挂买金额限制
    this.axios
      .post("/api/help/GetBuyTotalXZ", {
        token: this.params.token,
        userId: this.params.userId
      })
      .then(res => {
        this.config.buy = res.Data;
      })
      .catch(err => {});
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
