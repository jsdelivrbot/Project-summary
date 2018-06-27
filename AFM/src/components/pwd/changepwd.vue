<template>
  <!--update pwd-->
    <div class="container changepwd marTop330">
      <form  @submit.prevent="checkSave">
        <div class="form-fr">
          <div class="con-title-fr">
            <div class="sub-fr"></div>
            <span class="con-title">
              {{'修改密码'| translate}}
            </span>
          </div>
          <div class="desc com-changepwd-desc">
            <div class="input-ar">
              <label>
                {{'会员编号'| translate}}
                </label>
              <span class="input-area tx">{{userCode}}</span>
            </div>
            <div class="input-ar">
              <label><i class="iconfont red">&#xe609;</i>
              {{'密码级别'| translate}}
              </label>
              <div class="right">
                <el-select  class="input-area"  v-model="params.PwdType" :placeholder="'--请选择--' | translate" >
                  <el-option
                    v-for="item in pwdlevel_option"
                    :key="item.value"
                    :label="item.label | translate"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span class="errHint"></span>
              </div>
            </div>
            <div class="input-ar">
              <label><i class="iconfont red">&#xe609;</i>
              {{'原密码'| translate}}
              </label>
              <div class="right">
                <input type="password" class="input-area"
                       v-model="params.OldPwd"
                       @keyup.enter="focusNext('changepwd_4')"/>
                <span class="errHint"></span>
              </div>
            </div>
            <div class="input-ar">
              <label><i class="iconfont red">&#xe609;</i>
              {{'新密码'| translate}}
              </label>
              <div class="right">
                <input type="password" class="input-area" id="changepwd_4"
                       v-model="params.NewPwd" @keyup.enter="focusNext('changepwd_5')"/>
                <span class="errHint"></span>
              </div>
            </div>
            <div class="input-ar">
              <label><i class="iconfont red">&#xe609;</i>
              {{'确认新密码'| translate}}
              </label>
              <div class="right">
                <input type="password" class="input-area"
                       v-model="confirmNewPwd" id="changepwd_5" @keyup.enter="focusNext('changepwd_6')"/>
                <span class="errHint"></span>
              </div>
            </div>
            <div class="input-ar">
              <label><i class="iconfont red">&#xe609;</i>
              {{'验证码'| translate}}
              </label>
              <div class="right">
                <input type="text" class="input-area"
                       v-model="params.Captha"
                       :placeholder="'请输入手机上收到的短信验证码' | translate"
                       id="changepwd_6"/>
              
                <captcha></captcha>
                <span class="errHint"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-ar ">
          <input type="submit" class="btn red-btn com-btn"
                 :value="'确定' | translate"/>
        </div>
      </form>
      <dialog-result :data="result_dialog"></dialog-result>
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
import captcha from "@/components/common/captcha";
export default {
  components: {
    "dialog-result": () =>
      import(/*webpackChunkName:"cm_dialog"*/ "@/components/dialog/d_result.vue"),
    captcha
  },
  data() {
    return {
      userCode: null,
      confirmNewPwd: null,
      params: {
        token: null, //	string	登录成功后,返回的token值
        userId: null, //	string	会员id,唯一标识
        PwdType: null, //	int	密码类型
        OldPwd: null, //	string	旧密码
        NewPwd: null, //	string	新密码
        Captha: null
      },
      pwdlevel_option: getList(['一级密码', '二级密码'], 1),
      isCommitting: false,
      result_dialog: {
        title: "",
        message: "",
        d_visible: false
      }
    };
  },
  mounted() {
    let _self = this;
    _self.userCode = _self.$store.state.defaultTJcode;
    _self.params.token = _self.$store.state.token;
    _self.params.userId = _self.$store.getters.getUserId;
  },
  methods: {
    focusNext(name) {
      let _self = this;
      document.getElementById(name).focus();
    },
    checkSave() {
      //验证保存密码
      let _self = this;
      if (!_self.params.PwdType) {
        //密码级别
        _self.$message({
          showClose: true,
          message: translate("密码级别") + translate('不能为空'),
          type: "error"
        });
        return;
      }
      if (!_self.params.OldPwd) {
        _self.$message({
          showClose: true,
          message: translate("原密码") + translate('不能为空'),
          type: "error"
        });
        return;
      }
      if (!_self.params.NewPwd) {
        _self.$message({
          showClose: true,
          message: translate("新密码") + translate('不能为空'),
          type: "error"
        });
        return;
      }
      if (!_self.confirmNewPwd) {
        _self.$message({
          showClose: true,
          message: translate("确认新密码") + translate('不能为空'),
          type: "error"
        });
        return;
      } else if (_self.confirmNewPwd != _self.params.NewPwd) {
        _self.$message({
          showClose: true,
          message: translate("新密码不一致"),
          type: "error"
        });
        return;
      }

      if (!_self.params.Captha) {
        _self.$message({
          showClose: true,
          message: translate("验证码") + translate('不能为空'),
          type: "error"
        });
        return;
      }

      let tparams = _self.getParam();
      _self.postData(tparams);
    },
    getParam() {
      //获取需要提交的参数
      let _self = this;
      //待办...
    },
    postData() {
      //提交修改数据
      let _self = this;
      if (_self.isCommitting) {
        return;
      }
      _self.isCommitting = true;
      _self.axios
        .post("/api/user/Modifypwd", _self.params)
        .then(res => {
          if (res.Code == "0") {
            //修改密码成功
            _self.result_dialog.title = translate("提示");
            _self.result_dialog.message = translate("修改密码成功");
            _self.result_dialog.d_visible = true;
            _self.result_dialog.func = function() {
              location.reload();
            };
          } else {
            _self.$message({
              showClose: true,
              message: translate("修改密码失败"),
              type: "error"
            });
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
