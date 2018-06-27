<template>
  <!--我的分享-->
  <div class="market-share container marTop330">
    <div class=" fullwidth com-div-fr">
      <div class="con-title-fr">
        <div class="sub-fr"></div>
        <span class="con-title">
           {{'分享列表'| translate}}
        </span>
      </div>
      <div class="mtable">
        <div class="com-filter-ar  ">
            <div class="minput-area">
              <span style="flex:none;width:70px;font-size: 13px;">
                 {{'注册时间'| translate}}
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
              <input v-model="filter.userCode" class="oinput" type="text" :placeholder="'会员编号' | translate"/>
              <input v-model="filter.nickName" class="oinput" type="text" :placeholder="'姓名' | translate "/>
              <el-select :style="{width: '100px'}" class="jihuo input22" v-model="filter.isValid" :placeholder="'激活状态' | translate">
                <el-option
                  v-for="item in selectData.jihuoState"
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
            v-if="tableDate.length > 0"
            :data="tableDate"
            style="width: 100%"
            stripe
            border
            height="250">
            <el-table-column
              fixed
              prop="UserCode"
              :label="'会员编号'| translate"
              width="100">
            </el-table-column>
            <el-table-column
              prop="NickName"
              :label="'姓名'| translate"
            >
            </el-table-column>
            <el-table-column
              prop="LevelId"
              :label="'消费配套'| translate"
            >
              <template slot-scope="scope">
                  <span>{{ scope.row.LevelId | LevelType}}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="'来源'| translate"
            >
              <template slot-scope="scope">
                  <span>{{ FromType(scope.row.FromType) | translate}}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="'是否激活'| translate"
            >
              <template slot-scope="scope">
                  <span>{{ scope.row.IsValid ? '激活' : '未激活' | translate}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="RegisterDate"
              :label="'注册时间'| translate"
            >
            </el-table-column>
            <el-table-column
              prop="JiHuoDate"
            
              :label="'激活时间'| translate"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.JiHuoDate">
                  {{scope.row.JiHuoDate}}
                </div>
                <div v-else>
                  --
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="CreateDate"
            
              :label="'操作'| translate"
            >
              <template slot-scope="scope">
                <a v-if="!scope.row.IsValid" @click="btnActive(scope.row.UserId)" href="javascript:;" class="btn green-link">
                   {{'激活'| translate}}
                </a>
              </template>
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


    <!-- 激活 -->
    <el-dialog :visible.sync="dialogData.d_visible" class="common-dialog" :class="'dialog_1'">
        <div slot="title">
            <div class="con-title-fr">
                <div class="sub-fr"></div>
                <span class="con-title">{{dialogData.title | translate}}</span>
            </div>
        </div>
        <div class="m-dialog-content">
          <div class="input_wrap" v-if="dialogData.data">
            <el-form  :model="dialogData.formData" label-width="120px">
              <el-form-item :label="'会员编号' | translate" >
                <div v-text="dialogData.data.UserCode"></div>
              </el-form-item>
              <el-form-item :label="'姓名' | translate" >
                <div v-text="dialogData.data.NickName"></div>
              </el-form-item>
              <el-form-item :label="'手机号码' | translate" >
                <div v-text="dialogData.data.Mobile"></div>
              </el-form-item>
              <el-form-item :label="'推荐人编号' | translate" >
                <div v-text="dialogData.data.TJUserCode"></div>
              </el-form-item>
              <el-form-item :label="'安置人编号' | translate" >
                <div v-text="dialogData.data.JDUserCode"></div>
              </el-form-item>
              <el-form-item :label="'安置位置' | translate" >
                <div>
                  {{ dialogData.data.JDPosition | JDPositionType | translate}}
                </div>
              </el-form-item>
              <el-form-item :label="'消费配餐' | translate" :class="'is-required'">
                <el-select 
                @change="GetKouKuanInfo"
                class="jihuo" v-model="dialogData.formData.levelId" :placeholder="'--请选择--' | translate">
                  <el-option
                    v-for="item in selectData.level"
                    :key="item.value"
                    :label="item.label | translate"
                    :value="item.value">
                  </el-option>
                </el-select>
                <div class="input_tips" v-if="dialogData.dataKoukuan">{{'激活积分金额：' | translate}}<span v-text="dialogData.dataKoukuan.JHJFAmount"></span></div>
                <div class="input_tips" v-if="dialogData.dataKoukuan">{{'是否扣除激活币：' | translate}}{{ dialogData.dataKoukuan.IsOpenJHB ? '扣除' : '不扣除' | translate}}</div>
                <div class="input_tips" v-if="dialogData.dataKoukuan">{{'激活积分金额：' | translate}}<span v-text="dialogData.dataKoukuan.JHBAmount"></span></div>
              </el-form-item>
              <el-form-item :label="'扣款方式' | translate" :class="'is-required'">
                <el-select 
                @change="GetWalletAmount"
                class="jihuo" :disabled="dialogData.disabled" v-model="dialogData.formData.walletId" :placeholder="'--请选择--' | translate">
                  <el-option
                    v-for="item in selectData.currencyType"
                    :key="item.value"
                    :label="item.label | translate"
                    :value="item.value">
                  </el-option>
                </el-select>
                <div class="input_tips" v-if="dialogData.dataAmount">{{'当前余额：' | translate}}<span v-text="dialogData.dataAmount.Amount"></span></div>
              </el-form-item>
              <el-form-item :label="'二级密码' | translate" :class="'is-required'">
                <el-input type="password" v-model="dialogData.formData.l2Pwd"></el-input>
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


.com-filter-ar .minput-area .jihuo.input22 .el-input__inner {
  width: 100% !important;
}
</style>
<script>
import { getList } from "./../../tool/data.js";
import { translate } from "@/tool/filters";
import md5 from "blueimp-md5";

export default {
  data() {
    return {
      // 激活Diaolog
      dialogData: {
        disabled: true,
        d_visible: false,
        title: "",
        message: "",
        formData: {
          levelId: "",
          walletId: "",
          l2Pwd: ""
        },
        data: null,
        dataAmount: null,
        dataKoukuan: null,
        cancel: () => {
          this.dialogData.d_visible = false;
        },
        confirm: function() {}
      },

      userInfo: {
        token: this.$store.state.token,
        userId: this.$store.getters.getUserId
      },
      selectData: {
        jihuoState: getList(["已激活", "未激活"], 1),
        currencyType: getList(["激活积分"], 1),
        level: getList(
          [
            "小学",
            "中学",
            "高中",
            "大学",
            "硕士",
            "博士",
            "博士后"
          ],
          1
        )
      },
      filter: {
        userCode: "",
        nickName: "",
        isValid: "",
        minDate: "",
        maxDate: ""
      },

      pagenum: 1,
      pageSize: 20,
      total: 0,

      tableDate: []
    };
  },
  methods: {
    // 获取钱包余额
    GetWalletAmount(val) {
      this.axios
        .post("api/Financial/GetWalletAmount", {
          token: this.userInfo.token,
          userId: this.userInfo.userId,
          walletId: val
        })
        .then(res => {
          this.dialogData.dataAmount = { Amount: res.Data };
        })
        .catch(err => {
          this.dialogData.dataAmount = null;
        });
    },
    // 激活扣款信息
    GetKouKuanInfo(val) {
      this.axios
        .post("api/user/GetKouKuanInfo", {
          token: this.userInfo.token,
          userId: this.userInfo.userId,
          LevelId: val
        })
        .then(res => {
          this.dialogData.dataKoukuan = res.Data;
          if (this.dialogData.dataKoukuan.IsOpenJHB) {
            this.selectData.currencyType = getList(["激活积分+激活币"], 1);
          }
          // 拿到值后解除禁用
          this.dialogData.disabled = false;
        })
        .catch(err => {
          this.dialogData.dataKoukuan = null;
        });
    },
    // 显示激活
    btnActive(id) {
      // 重置
      this.dialogData.disabled = true;
      this.dialogData.formData = {
        levelId: "",
        walletId: "",
        l2Pwd: ""
      };
      this.dialogData.data = null;
      this.dialogData.dataAmount = null;
      this.dialogData.dataKoukuan = null;

      // 被激活会员信息
      this.axios
        .post("api/user/GetJHUesrInfo", {
          userId: id // id
        })
        .then(res => {
          this.dialogData.data = res.Data;
        })
        .catch(err => {});

      this.dialogData.title = translate("激活");
      this.dialogData.d_visible = true;

      this.dialogData.confirm = () => {
        
        if (this.dialogData.formData.levelId == "") {
          this.$message({
            message: translate("请输入") + translate("消费配套"),
            type: "error",
            duration: 1 * 1000
          });
          return;
        }
        if (this.dialogData.formData.walletId == "") {
          this.$message({
            message: translate("请输入") + translate("扣款方式"),
            type: "error",
            duration: 1 * 1000
          });
          return;
        }
        if (this.dialogData.formData.l2Pwd == "") {
          this.$message({
            message: translate("请输入") + translate("二级密码"),
            type: "error",
            duration: 1 * 1000
          });
          return;
        }

        this.axios
          .post("api/user/JihuoForUser", {
            token: this.userInfo.token,
            userId: this.userInfo.userId,
            beiJihuoUserId: id,
            levelId: this.dialogData.formData.levelId,
            walletId: this.dialogData.formData.walletId,
            l2Pwd: md5(this.dialogData.formData.l2Pwd)
          })
          .then(res => {
            this.$message({
              message: translate("激活成功"),
              type: "success",
              duration: 1 * 1000,
              onClose: () => {
                this.dialogData.d_visible = false;
                this.getTabData();
              }
            });
          })
          .catch(err => {});
      };
    },
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
    FromType(id) {
      if (id === 1) {
        return "由我注册";
      } else if (id === 2) {
        return "分享链接注册";
      } else if (id === 3) {
        return "后台注册";
      }
    },
    // 获取表格数据
    getTabData() {
      var valid, params;
      if(this.filter.isValid) {
       valid = this.filter.isValid == 1 ? true : false;
       params = {
          token: this.userInfo.token,
          userId: this.userInfo.userId,
          PageNum: this.pagenum,
          userCode: this.filter.userCode,
          nickName: this.filter.nickName,
          isValid: String(valid),
          minDate: this.filter.minDate,
          maxDate: this.filter.maxDate
        }
      } else {
        params = {
          token: this.userInfo.token,
          userId: this.userInfo.userId,
          PageNum: this.pagenum,
          userCode: this.filter.userCode,
          nickName: this.filter.nickName,
          minDate: this.filter.minDate,
          maxDate: this.filter.maxDate
        }
      }
      this.axios
        .post("api/user/GetTJTeamData", params)
        .then(res => {
          this.tableDate = res.Data.Data;

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
