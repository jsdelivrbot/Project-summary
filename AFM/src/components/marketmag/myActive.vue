<template>
  <!--update pwd-->
    <div class="container changepwd marTop330">
      <form  @submit.prevent="checkSave">
        <div class="form-fr">
          <div class="con-title-fr">
            <div class="sub-fr"></div>
            <span class="con-title">
              {{'我要激活'| translate}}
            </span>
          </div>
          <div class="desc com-changepwd-desc">
            <el-form  :model="dialogData.formData" label-width="120px">
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
                <el-input :style="{width: '222px'}" type="password" v-model="dialogData.formData.l2Pwd"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="btn-ar ">
          <input type="submit" class="btn red-btn com-btn"
                 :value="'确定' | translate"/>
        </div>
      </form>
    </div>
</template>
<style lang="less">
@import (reference) "./../../style/css/main.less";
@import "../../style/css/com_dialog.less";
@import "../../style/css/edit_common.less";

.changepwd form {
  width: 100%;
  padding: 0 20/@rem;
  .com-box;
  display: block;
}

.changepwd .form-fr {
  .com-div-fr;
  .col;
  width: 100%;
}

.changepwd .btn-ar {
  .row;
  .item-center;
  .con-center;
  padding: 30px 0;
}

@media (min-width: 576px) {
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
  .changepwd form {
    padding: 0;
  }
  .changepwd .btn-ar {
    justify-content: flex-start;
    padding-left: 100/@rem;
  }
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1199px) {
}
</style>
<script>
import { getList } from "./../../tool/data";
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
          ["小学", "中学", "高中", "大学", "硕士", "博士", "博士后"],
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
    // 激活
    checkSave() {
      var _this = this;
      //校验升级数据
      if (!this.dialogData.formData.levelId) {
        this.$message({
          showClose: true,
          message: translate("升级级别") + "" + translate("不能为空"),
          type: "error"
        });
        return;
      }
      if (!this.dialogData.formData.walletId) {
        this.$message({
          showClose: true,
          message: translate("扣款方式") + "" + translate("不能为空"),
          type: "error"
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
        .post("/api/user/JihuoForUser", {
          userId: this.$store.getters.getUserId,
          token: this.$store.state.token,
          beiJihuoUserId: this.$store.getters.getUserId,
          LevelId: this.dialogData.formData.levelId,
          walletId: this.dialogData.formData.walletId,
          l2Pwd: md5(this.dialogData.formData.l2Pwd)
        })
        .then(res => {
          var amf_user = JSON.parse(localStorage.getItem("amf_user"));
          amf_user.user.IsValid = true;
          localStorage.setItem("amf_user", JSON.stringify(amf_user));
          //升级成功
          this.$message({
            message: translate("激活成功"),
            type: "success",
            duration: 1 * 1000,
            onClose() {
              _this.$router.push("/");
              location.reload();
            }
          });
        })
        .catch(err => {});
    }
  }
};
</script>
