<template>
  <!--激活用户对话框-->
  <el-dialog :visible.sync="data.d_visible"
             :modal-append-to-body="true"
             :append-to-body = "true"
             class="common-dialog active">
    <div slot="title">
      <div class="con-title-fr">
        <div class="sub-fr"></div>
        <span class="con-title">
          {{'会员激活'| translate}}
        </span>
      </div>
    </div>
    <div class="m-dialog-content desc">
      <div class="input-ar" v-for="key in Object.keys(data.contData)">
        <label>{{data.contData[key].name}}</label>
        <span class="input-area  tx">{{data.contData[key].value}}</span>
      </div>
      <div class="input-ar">
        <label><i class="iconfont red">&#xe609;</i>{{level.name}}</label>
        <div class="right">
          <el-select class="input-area" v-model="level.value" :placeholder="'--请选择--'| translate">
            <el-option
              v-for="item in levelOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span class="errHint">{{level.errhint}}</span>
        </div>
      </div>
      <div class="input-ar">
        <label><i class="iconfont red">&#xe609;</i>{{costType.name}}</label>
        <div class="right">
          <el-select class="input-area" v-model="costType.value" :placeholder="'--请选择--'| translate">
            <el-option
              v-for="item in costType_option"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span class="errHint">{{costType.errhint}}</span>
        </div>
      </div>
      <div class="input-ar">
        <label><i class="iconfont red">&#xe609;</i>{{L2Pwd.name}}</label>
        <div class="right">
          <input class="input-area" type="password" v-model="L2Pwd.value"/>
          <span class="errHint">{{L2Pwd.errhint}}</span>
        </div>
      </div>

    </div>
    <div slot="footer" class="m-dialog-footer">
      <a style="color: #dc4b3c;" href="javascript:;"  class="com-btn red-fr-btn">
        {{'取消'| translate}}
      </a>
      <a href="javascript:;" @click="tocheckActivate" class="btn com-btn red-btn">
        {{'激活'| translate}}
        </a>
   </div>
  </el-dialog>
</template>
<style lang="less">
@import (reference) "../../style/css/main.less";
@import (reference) "../../style/css/com_dialog.less";
@import "../../style/css/edit_common.less";
.m-dialog-footer {
  .row;
  .item-center;
  .con-center;
  font-size: 13px;
  padding-bottom: 40px;
  .btn:first-child {
    margin-right: 50px;
  }
}
.active .m-dialog-content {
  padding: 20px 30/@rem;
}

.active .m-dialog-content .input-ar .right > .input-area {
  width: 80%;
}

@media (min-width: 992px) {
  .active .m-dialog-content {
    padding-left: 60/@rem;
  }
  .active .m-dialog-content .input-ar .right > .input-area {
    width: 276/@rem;
  }
}
</style>
<script>
import { Dialog } from "element-ui";
import Vue from "vue";
Vue.use(Dialog);
import { getOption } from "./../../tool/data";
import { translate } from "@/tool/filters";
import md5 from "blueimp-md5";

export default {
  props: ["data"],
  data() {
    return {
      level: {
        name: translate("消费配套"),
        value: "",
        errhint: ""
      },
      costType: {
        name: translate("扣款方式"),
        value: "",
        errhint: ""
      },
      L2Pwd: {
        name: translate("二级密码"),
        value: "",
        errhint: ""
      },

      levelOption: [...getOption(this, "level_option")],
      costType_option: [getOption(this, "costType_option")],

      params: {
        userId: null, //	string	被激活会员id,唯一标识
        token: null, //string	登录成功后,返回的token值
        JihuoUserId: null, //string	激活会员ID,唯一标识JihuoForUser
        walletId: null, //int	扣款货币
        l2Pwd: null, //	string	二级密码
        levelId: null
      },
      isCommitting: false
    };
  },
  watch: {
    "data.userId": function(val) {
      let _self = this;
      _self.params.userId = val;
    }
  },
  mounted() {
    let _self = this;

    _self.params.token = _self.$store.state.token;
    _self.params.JihuoUserId = _self.$store.getters.getUserId;
  },
  methods: {
    tocheckActivate() {
      //校验激活
      let _self = this;
      if (!_self.level.value) {
        _self.$message({
          showClose: true,
          message: _self.level.name + translate("不能为空"),
          type: "warning"
        });
        return;
      }
      _self.params.levelId = _self.level.value;
      if (!_self.costType.value) {
        _self.$message({
          showClose: true,
          message: _self.costType.name + translate("不能为空"),
          type: "warning"
        });
        return;
      }
      _self.params.walletId = _self.costType.value;
      if (!_self.L2Pwd.value) {
        _self.$message({
          showClose: true,
          message: _self.L2Pwd.name + translate("不能为空"),
          type: "warning"
        });
        return;
      }
      _self.params.l2Pwd = md5(_self.L2Pwd.value);
      _self.toPostData(_self.params);
    },
    toPostData(tparams) {
      let _self = this;
      if (_self.isCommitting) {
        return;
      }
      _self.isCommitting = true;
      _self.axios
        .post("/api/user/JihuoForUser", tparams)
        .then(res => {
          if (res.Code == "0") {
            _self.$emit("active-success");
          }
          _self.isCommitting = false;
        })
        .catch(err => {
          _self.isCommitting = false;
        });
    }
  }
};
</script>
