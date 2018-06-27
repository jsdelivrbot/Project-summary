<template>
  <!--关联账号-->
  <div class="container marTop330 associate">
    <div class="com-div-fr m-b-lg">
      <form @submit.prevent="checkSave">
        <div class="form-fr ">
          <div class="con-title-fr">
            <div class="sub-fr"></div>
            <span class="con-title">
              {{'关联账号' | translate}}
              </span>
          </div>
          <div class="desc com-changepwd-desc">
           
            <div class="input-ar">
              <label><i class="iconfont red">&#xe609;</i>
              {{'关联账号' | translate}}
              </label>
              <div class="right">
                <input type="text" class="input-area" v-model="params.glUserCode" />
                <span class="errHint"></span>
              </div>
            </div>
            <div class="input-ar">
              <label><i class="iconfont red">&#xe609;</i>
              {{'验证码' | translate}}
              </label>
              <div class="right">
                <input type="text" class="input-area" v-model="params.captcha" :placeholder="'请输入手机上收到的短信验证码' | translate" id="changepwd_6" />
                <captcha></captcha>
              </div>
            </div>
            <div class="input-ar">
              <label><i class="iconfont red">&#xe609;</i>
              {{'二级密码' | translate}}
              </label>
              <div class="right">
                <input type="password" class="input-area" id="changepwd_4" v-model="params.l2Pwd" />
              </div>
            </div>
            <div class="btn-ar ">
              <input type="submit" class="btn red-btn com-btn" :value="'关联注册' | translate"/>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="fullwidth com-div-fr">
      <div class="con-title-fr">
        <div class="sub-fr"></div>
        <span class="con-title">
          {{'关联列表' | translate}}
          </span>
      </div>
      <div class="mtable">
        <div class="table-fr">
          <el-table
            :data="tableDate"
            style="width: 100%"
            stripe
            border
            height="250">
            <el-table-column
              fixed
              type="index"
              :label="'序号' | translate"
              width="100">
            </el-table-column>
            <el-table-column
              prop="UserCode"
              :label="'会员编号' | translate"
            >
              <template slot-scope="scope">
                  <span @click="checkUser(scope.row)" class="c_green btn_pointer">{{ scope.row.UserCode }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="NickName"
              :label="'姓名'  | translate"
            >
            </el-table-column>
            <el-table-column
              prop="GLZhuUserDate"
            
              :label="'关联时间'  | translate"
            >
            </el-table-column>
            <el-table-column
              prop="GLZhuUserDate"
            
              :label="'操作'  | translate"
            >
              <template slot-scope="scope">
                  <span @click="btnCancel(scope.row.UserId)" class="c_green btn_pointer">{{ '取消关联' | translate}}</span>
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
@import (reference) "./../../style/css/main.less";

.market-share {
  padding-bottom: 57px;
}

.market-share .mtable {
  border-top: 1px solid #e5e5e5;
}

@import "./../../style/css/com_table.less";
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
} // Large devices (desktops, 992px and up)
@media (min-width: 992px) {
}
// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1199px) {
}
</style>

<script>
import { getOption } from "./../../tool/data";
import { translate } from "@/tool/filters";
import captcha from "@/components/common/captcha2";
import md5 from "blueimp-md5";

export default {
  components: {
    "dialog-result": () =>
      import(/*webpackChunkName:"cm_dialog"*/ "@/components/dialog/d_result.vue"),
    captcha
  },
  data() {
    return {
      userInfo: {
        token: this.$store.state.token,
        userId: this.$store.getters.getUserId
      },
      pagenum: 1,
      pageSize: 20,
      total: 0,
      tableDate: [],

      params: {
        token: this.$store.state.token,
        userId: this.$store.getters.getUserId,
        captcha: null,
        l2Pwd: null,
        glUserCode: null
      }
    };
  },
  mounted() {
    let _self = this;
    _self.userCode = _self.$store.state.defaultTJcode;
  },
  methods: {
    // 登录关联账户
    checkUser(data) {
      var params = {
        UserCode: data.UserCode,
        IsValidPin: "false",
        IsValidCaptcha: "false"
      };
      this.axios
        .post("/api/user/GetZiUserPwd", {
          token: this.params.token,
          userId: data.UserId
        })
        .then(res => {
          params.L1pwd = md5(res.Data.L1Pwd);

          this.axios
            .post("/api/user/login", params)
            .then(res => {
              let t_token = res.Token;
              let userObj = res.Data;
              let obj = {
                token: t_token,
                user: userObj
              };
              localStorage.setItem("amf_user", JSON.stringify(obj));
              this.$store.commit("CHANGE_USER");
              this.$router.push({ name: "indexc" }, function() {
                location.reload();
              });
            })
            .catch(err => {});
        });
    },
    // 取消关联
    btnCancel(id) {
      this.axios
        .post("/api/user/RemoveGLZiUser", {
          token: this.userInfo.token,
          userId: this.userInfo.userId,
          ziUserId: id
        })
        .then(res => {
          this.$message({
            message: translate("取消关联成功"),
            type: "success",
            duration: 1 * 1000,
            onClose: () => {
              this.getTabData();
            }
          });
        })
        .catch(err => {});
    },
    handleSizeChange() {
      this.getTabData();
    },
    handleCurrentChange() {
      this.getTabData();
    },
    focusNext(name) {
      let _self = this;
      document.getElementById(name).focus();
    },
    // 关联注册
    checkSave() {
      //验证保存密码
      if (!this.params.glUserCode) {
        //密码级别
        this.$message({
          message: translate("关联账号") + translate("不能为空"),
          type: "error",
          duration: 1 * 1000
        });
        return;
      }
      if (!this.params.captcha) {
        //密码级别
        this.$message({
          message: translate("验证码") + translate("不能为空"),
          type: "error",
          duration: 1 * 1000
        });
        return;
      }
      if (!this.params.l2Pwd) {
        //密码级别
        this.$message({
          message: translate("二级密码") + translate("不能为空"),
          type: "error",
          duration: 1 * 1000
        });
        return;
      }
      this.params.l2Pwd = md5(this.params.l2Pwd);
      this.axios
        .post("/api/user/CreateGLZiUser", this.params)
        .then(res => {
          this.$message({
            type: "success",
            duration: 1 * 1000,
            message: "成功",
            onClose: function() {
              location.reload();
            }
          });
        })
        .catch(err => {});
    },
    getTabData() {
      this.axios
        .post("/api/user/GetMyGLZiUser", {
          token: this.$store.state.token,
          userId: this.$store.getters.getUserId,
          PageNum: this.pagenum
        })
        .then(res => {
          this.tableDate = res.Data.Data;

          this.total = res.Data.ItemCount; // 总条数
        })
        .catch(err => {});
    }
  },
  mounted() {
    this.getTabData();
  }
};
</script>
