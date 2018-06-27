<template>
  <!--收货地址列表-->
  <div class="address market-share container marTop330">
    <div class=" fullwidth com-div-fr">
      <div class="con-title-fr">
        <div class="sub-fr"></div>
        <span class="con-title">
                 {{'收货地址列表'| translate}}
              </span>
      </div>
      <div class="mtable">
        <div class="address_addBox clearfix">
          <div class="btn_sm btn_sm_red fl" @click="handlerAdd()">
            + 
            {{'添加新地址'| translate}}
          </div>
        </div>
        <div class="table-fr">
          <el-table :data="tableData" style="width: 100%" stripe border height="250">
            <el-table-column fixed :label="'地址'| translate" prop="Address" width="100">
            </el-table-column>
            <el-table-column prop="Recipient" :label="'收件人'| translate">
            </el-table-column>
            <el-table-column prop="Mobile" :label="'手机号码'| translate">
            </el-table-column>
            <el-table-column prop="ZipCode" :label="'邮编'| translate">
            </el-table-column>
            <el-table-column prop="IsDefault" :label="'默认收货地址'| translate">
            </el-table-column>
            <el-table-column :label="'操作'| translate">
              <template slot-scope="scope">
                     <span class="c_green btn_pointer" @click="handlerEdit(scope.row.Id)">
                       {{'编辑'| translate}}
                       </span>
                     <span class="c_green btn_pointer" @click="handlerDelet(scope.row.Id)">
                       {{'删除'| translate}}
                       </span>
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
          <div class="input_wrap">
            <el-form  :model="formData" label-width="80px">
              <el-form-item :label="'地址' | translate" :class="'is-required'">
                <el-input v-model="formData.Address"></el-input>
              </el-form-item>
              <el-form-item :label="'收件人' | translate" :class="'is-required'">
                <el-input v-model="formData.Recipient"></el-input>
              </el-form-item>
              <el-form-item :label="'手机号码' | translate" :class="'is-required'">
                <el-input v-model="formData.Mobile"></el-input>
              </el-form-item>
              <el-form-item :label="'邮编' | translate" :class="'is-required'">
                <el-input v-model="formData.ZipCode"></el-input>
              </el-form-item>
              <el-form-item  prop="default">
                <el-checkbox-group v-model="checked">
                  <el-checkbox :label="'默认收货地址' | translate" name="default"></el-checkbox>
                </el-checkbox-group>
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
import { translate ,readStatus} from "@/tool/filters";

export default {
  data() {
    return {
      checked:true,
      formData: {
        Address: "",
        Mobile: "",
        Recipient: "",
        ZipCode: "",
        default: false
      },
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
      jihuoState_option: getList(["已付款", "已发货", "已确定"]),
      value9: "",
      filter: {
        status: ""
      },
      pagenum: 1,
      pageSize: 20,
      total: 0,
      minDate: null,
      maxDate: null
    };
  },
  created(){
    this.bindTableData()
  },
  methods: {
    //获取地址列表
      bindTableData(){
        this.axios.post('/api/mall/GetDeliveryAddress',{
          token: this.$store.state.token,
          userId: this.$store.getters.getUserId,
        }).then(res =>{
          
           res.Data.Data.forEach(element => {
            element.IsDefault = readStatus(element.IsDefault)
          });
          this.tableData = res.Data.Data;
          this.total = res.Data.ItemCount;
        })
      },
     // 添加地址
      handlerAdd() {
        // 重置
        for(var x in this.formData){
          this.formData[x] = ''
        }
        this.dialogData.title = translate("添加收货地址");
        this.dialogData.message = translate("确认收货吗？");
        this.dialogData.d_visible = true;
        this.dialogData.confirm = () => {
          if (this.formData.Address == "") {
            this.$message({
              message: translate("请输入地址"),
              type: "error",
              duration: 1 * 1000
            });
            return;
          }
          if (this.formData.Recipient == "") {
            this.$message({
              message: translate("请输入收件人"),
              type: "error",
              duration: 1 * 1000
            });
            return;
          }
          if (this.formData.Mobile == "") {
            this.$message({
              message: translate("请输手机号码"),
              type: "error",
              duration: 1 * 1000
            });
            return;
          }
          if (this.formData.ZipCode == "") {
            this.$message({
              message: translate("请输入邮编"),
              type: "error",
              duration: 1 * 1000
            });
            return;
          }
          
          if(this.checked){
            this.formData.isDefault = true
          }else{
            this.formData.isDefault = 'false'
          }
          this.axios.post('/api/mall/CreateDeliveryAddress',{
             token: this.$store.state.token,
             userId: this.$store.getters.getUserId,
             Address: this.formData.Address,
             Mobile: this.formData.Mobile,
             Recipient: this.formData.Recipient,
             ZipCode: this.formData.ZipCode,
             isDefault: this.formData.isDefault,
          }).then(res =>{
              
              this.bindTableData()
          })
          this.dialogData.d_visible = false;
        };
      },
      //编辑收货地址
    handlerEdit(id) {
       // 重置
        for(var x in this.formData){
          this.formData[x] = ''
        };
         this.dialogData.d_visible = true;
      this.dialogData.title = translate("编辑收货地址");
      this.dialogData.message = translate("确认收货吗？");
      this.dialogData.d_visible = true;
      this.dialogData.confirm = () => {
        
        if (this.formData.Address == "") {
          this.$message({
            message: translate("请输入地址"),
            type: "error",
            duration: 1 * 1000
          });
          return;
        }
        if (this.formData.Recipient == "") {
          this.$message({
            message: translate("请输入收件人"),
            type: "error",
            duration: 1 * 1000
          });
          return;
        }
        if (this.formData.Mobile == "") {
          this.$message({
            message: translate("请输手机号码"),
            type: "error",
            duration: 1 * 1000
          });
          return;
        }
        if (this.formData.ZipCode == "") {
          this.$message({
            message: translate("请输入邮编"),
            type: "error",
            duration: 1 * 1000
          });
          return;
        }
          if(this.checked){
            this.formData.isDefault = true
          }else{
            this.formData.isDefault = 'false'
          }
         this.axios.post('/api/mall/EditDeliveryAddress',{
             token: this.$store.state.token,
             userId: this.$store.getters.getUserId,
             delAddressId: id,
             Address: this.formData.Address,
             Mobile: this.formData.Mobile,
             Recipient: this.formData.Recipient,
             ZipCode: this.formData.ZipCode,
             isDefault: this.formData.isDefault,
          }).then(res =>{
              
              this.bindTableData()
          })
        this.dialogData.d_visible = false;
      };
    },
    //删除收货地址
    handlerDelet(id) {
       this.axios.post('/api/mall/DeleteDeliveryAddress',{
             token: this.$store.state.token,
             userId: this.$store.getters.getUserId,
             delAddressId: id,
          }).then(res =>{
              
              this.bindTableData()
          })
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
