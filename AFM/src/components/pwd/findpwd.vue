<template>
  <!--忘记密码-->
  <div class="findpwd">
    <mheader></mheader>
    <div class="container pad108">
      <div class="instruction">
        <span>
          {{'忘记密码'| translate}}
        </span>
        <router-link to="login" href="javascript:;" class="btn red-btn">
          {{'返回登录'| translate}}
        </router-link>
      </div>
      <div class="step-fr">
        <div class="steps">
          <div class="step third " :key="index"
               v-for="(istep,index) in fpwdstep"
               :class="curStep>=index?'done':''" >
            <img :src="'/static/img/step'+(index+1)+'.png'"/>
            <div class="tx-area">
              <span class="tx1">{{istep.tx1 | translate}}</span>
              <span class="tx2">{{istep.info | translate}}</span>
            </div>
          </div>
        </div>

        <div class="step1-content" v-show="curStep==0">
          <div class="part1">
            <span>
              {{'选择找回方式'| translate}}
            </span>
            <div class="line"></div>
          </div>
          <div class="select">
            <div class="s-phone">
              <i class="iconfont">&#xe626;</i>
              <a href="javascript:;"
                 @click="step_way=0;curStep=1;"
                 class="btn red-btn">
                 {{'通过手机找回'| translate}}
                 </a>
            </div>
            <div class="s-email">
              <i class="iconfont">&#xe6a4;</i>
              <a href="javascript:;"
                 @click="step_way=1;curStep=1;"
                 class="btn red-btn">
                 {{'通过邮箱找回'| translate}}
                 </a>
            </div>
          </div>

        </div>
        <div class="step2-content" v-show="curStep == 1">
          <div class="part1">
            <span>
              {{'填写验证信息'| translate}}
            </span>
            <div class="line"></div>
          </div>

          <form @submit.prevent="tocheckStep2" >
            <div class="input-area">
              <label>
                {{'会员编号'| translate}}
              </label>
              <input  class="right" type="text"  v-model="userCode"
                      @keyup.enter="step_way==0?(focusNext('next1')):(focusNext('next2'));"/>
            </div>
            <div class="input-area" v-show="step_way == 0">
              <label>
                {{'手机号码'| translate}}
              </label>
              <input id="next1" class="right" type="text"   v-model="mobile"
                     @keyup.enter="focusNext('next3')"/>
            </div>
            <div class="input-area" v-show="step_way == 1">
              <label>
                {{'邮箱'| translate}}
              </label>
              <input id="next2" class="right" type="text"
                     v-model="email" @keyup.enter="focusNext('next3')"/>
            </div>
            <div class="input-area">
              <label>
                {{'验证码'| translate}}
              </label>
              <div class="right code-ar">
                <input id="next3" type="text"  v-model="captha" />
                <a @click="getCode" href="javascript:;" class="btn black-btn">
                  <span class="tcenter">
                    {{'获取验证码'| translate}}
                  </span></a>
              </div>
            </div>
            <div class="btn-ar">
              <input type="submit" class="btn red-btn" :value="'确定' | translate"/>
              <a class="btn purple-btn" href="javascript:;" @click="curStep = 0;">
                {{'返回上一步'| translate}}
              </a>
            </div>
          </form>

        </div>
        <div class="step3-content" v-show="curStep == 2">
          <div class="part1">
            <span>
              {{'重置密码'| translate}}
            </span>
            <div class="line"></div>
          </div>
          <form @submit.prevent="tochecksetPwd">
            <div class="input-area">
              <label>
                {{'新密码'| translate}}
              </label>
              <input  class="right" type="password" v-model="l1Pwd"
                      @keyup.enter="focusNext('nexts1')"/>
            </div>
            <div class="input-area" >
              <label>
                {{'确认新密码'| translate}}
              </label>
              <input id="nexts1" class="right"
                     v-model="l1PwdConfirm" type="password" />
            </div>
            <div class="btn-ar">
              <input type="submit" class="btn red-btn" :value="'重置密码' | translate"/>
              <a class="btn purple-btn" href="javascript:;" @click="curStep = 1;">
                {{'返回上一步'| translate}}
              </a>
            </div>
          </form>
        </div>

      </div>
      <dialog-result :data="result_dialog"></dialog-result>



    </div>
  </div>
</template>
<style lang="less">
@import (reference) "../../style/css/main.less";
.findpwd {
  .fullwidth;
  background-image: url("../../style/img/pwd_bg.png");
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: 100% 100%;
  background-color: #fff;
}
.findpwd .instruction {
  .row;
  .item-center;
  .con-betwwen;
  padding: 20/@rem;
}
.findpwd .instruction span {
  font-size: 20px;
}
.findpwd .instruction a {
  font-size: 16px;
  min-width: 120px;
  height: 40px;
  line-height: 40px;
}
.pad108 {
  padding-bottom: 108/@rem;
}
.findpwd .step-fr {
  width: 100%;
  border: 1px solid #e5e5e5;
  box-shadow: 0 0 10px 0 #e5e5e5;
  border-radius: 8/@rem;
  margin-top: 16px;
}
.findpwd .step-fr .steps {
  .row;
  align-items: stretch;
  border-top-left-radius: 8/@rem;
  border-top-right-radius: 8/@rem;
}
.findpwd .step-fr .steps .step {
  padding: 16px 0;
  border-bottom: 2px solid #fff;
  .row;
  .con-center;
  .item-center;
}
.findpwd .step-fr .steps .step img {
  width: 36px;
  height: 40px;
}
.findpwd .step-fr .steps .step .tx-area {
  .col;
  padding-left: 24/@rem;
}
.findpwd .step-fr .steps .step .tx-area span {
  font-size: 14px;
  color: #333;
}
.findpwd .step-fr .steps .step .tx-area .tx1 {
  color: #797979;
}
.findpwd .step-fr .steps .step.done {
  border-bottom: 2px solid #dc4b3c;
}
.findpwd .step-fr .steps .step:hover {
  background-color: #e5e5e5;
}
.findpwd .step-fr .steps .step.done .tx-area .tx1 {
  color: #333;
}

.findpwd .part1 {
  .row;
  .item-center;
  padding: 33/@rem;
}
.findpwd .part1 span {
  color: #797979;
  font-size: 16px;
}
.findpwd .part1 .line {
  flex: auto;
  height: 1px;
  margin-left: 30/@rem;
  background-color: #e5e5e5;
}

.findpwd .step1-content .select {
  .row;
  .item-center;
  padding: 30/@rem;
  .con-betwwen;
}
.findpwd .step1-content .select > div {
  width: 45%;
  height: 295px;
  border: 1px solid #e5e5e5;
  -webkit-border-radius: 8/@rem;
  -moz-border-radius: 8/@rem;
  border-radius: 8/@rem;
  box-shadow: 0 0 10px 0 #e5e5e5;
  position: relative;
  margin-bottom: 93px;
  .col;
  .item-center;
  .con-center;
}
.findpwd .step1-content .select > div > i {
  font-size: 70px;
  color: #dc4b3c;
}
.findpwd .step1-content .select > div a {
  padding: 0 35/@rem;
  font-size: 14px;
  // height: 50px;
  line-height: 50px;
}
.findpwd .step1-content .select > div:before {
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  content: " ";
  border: 20/@rem solid #dc4b3c;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-top-left-radius: 8/@rem;
}

.findpwd form {
  display: block;
  .col;
  .con-center;
  .item-center;
  padding: 28/@rem 50/@rem 90/@rem 50/@rem;
  .input-area {
    width: 100%;
    margin-bottom: 30px;
    .row;
    .item-center;
    label {
      display: block;
      height: 40px;
      line-height: 40px;
      width: 100px;
      font-size: 14px;
    }
    .right {
      flex: auto;
    }
  }
  .btn-ar {
    width: 100%;
    .row;
    .item-center;
    justify-content: space-around;
    margin-top: 28px;
    .btn {
      font-size: 16px;
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      min-width: 120px;
    }
    .btn:first-child {
      margin-right: 0;
    }
  }
}
.findpwd input.right {
  text-indent: 25/@rem;
}
.findpwd .step2-content form .input-area .code-ar {
  .row;
  .con-betwwen;
  .item-center;
  input {
    width: 50%;
  }
  .btn {
    width: 40%;
    height: 42px;
    line-height: 1;
    .col;
    .con-center;
    span {
      line-height: 1.1;
      font-size: 13px;
    }
    margin-left: 20/@rem;
  }
}

.findpwd form .input-area input {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  background-color: #fff;
  border: 1px solid #bfbfbf;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}

@media (min-width: 576px) {
  .findpwd .step2-content form .input-area .code-ar {
    input {
      width: 60%;
    }
    .btn {
      width: 30%;
    }
  }
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
  .findpwd .step1-content .select {
    .con-center;
    padding: 0;
  }

  .findpwd .step1-content .select > div {
    width: 250/@rem;
    height: 295/@rem;
  }

  .findpwd .step1-content .select > div:first-child {
    margin-right: 160/@rem;
  }

  .findpwd form {
    align-items: flex-start;
    padding-left: 158/@rem;
    .input-area {
      .right {
        flex: none;
        width: 400/@rem;
      }
    }
    .btn-ar {
      justify-content: flex-start;
      padding-left: 100px;
      .btn:first-child {
        margin-right: 50/@rem;
      }
    }
  }
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1199px) {
}
</style>
<script>
import { translate } from "@/tool/filters";

export default {
  data() {
    return {
      fpwdstep: [
        {
          tx1: "步骤1",
          info: "选择找回方式",
          seltx: "选择找回方式",
          subtx: ["通过手机找回", "通过邮箱找回"]
        },
        {
          tx1: "步骤2",
          info: "填写验证码",
          seltx: "填写验证信息",
          subtx1: "会员编号",
          subtx2: "验证码",
          subtx3: "获取验证码",
          subway0: "手机号码",
          subway1: "邮箱",
          btn1: "确定",
          btn2: "返回上一步"
        },
        {
          tx1: "步骤3",
          info: "重置密码",
          seltx: "重置密码",
          subtx1: "新密码",
          subtx2: "确认新密码",
          btn1: "重置密码",
          btn2: "返回上一步"
        }
      ],
      netStep: 0,
      curStep: 0,
      step_way: 0, //0、手机  1、邮箱
      userCode: null, //	string	会员编号
      mobile: null, //		string	手机号
      email: null, //	string	邮箱
      captha: null,

      l1Pwd: null, //	string	新密码
      l1PwdConfirm: null, //	in

      isSendingcode: false, //是否请求验证码
      isCommitting: false, //是否正在请求

      result_dialog: {
        title: "",
        message: "",
        d_visible: false
      }
    };
  },
  mounted() {
    let _self = this;
  },
  components: {
    "dialog-result": () =>
      import(/*webpackChunkName:"cm_dialog"*/ "@/components/dialog/d_result.vue"),
    mheader: () => import(/* webpackChunkName: "com" */ "@/components/head.vue")
  },
  methods: {
    focusNext(name) {
      let _self = this;
      document.getElementById(name).focus();
    },
    checkparamUme() {
      //校验会员编号、手机/邮箱
      let _self = this;
      if (!_self.userCode) {
        _self.$message({
          showClose: true,
          message: translate("会员编号不能为空"),
          type: "warning"
        });
        return false;
      }
      if (_self.step_way == 0) {
        if (!_self.mobile) {
          _self.$message({
            showClose: true,
            message: translate("手机号码不能为空"),
            type: "warning"
          });
          return false;
        }
      } else if (_self.step_way == 1) {
        if (!_self.email) {
          _self.$message({
            showClose: true,
            message: translate("邮箱不能为空"),
            type: "warning"
          });
          return false;
        }
      }
      return true;
    },
    getCode() {
      //获取验证码
      let _self = this;
      let promise = null;
      if (!_self.checkparamUme()) {
        return;
      }

      if (_self.step_way == 0) {
        promise = _self.axios.post("/api/user/GetAnoMobileCaptcha", {
          userCode: _self.userCode, //	string	会员编号
          mobile: _self.mobile //		string	手机号
        });
      } else if (_self.step_way == 1) {
        promise = _self.axios.post("/api/user/GetEmailCaptcha", {
          userCode: _self.userCode, //	string	会员编号
          email: _self.email //	string	邮箱
        });
      }
      if (_self.isSendingcode) {
        return;
      }
      _self.isSendingcode = true;
      promise
        .then(res => {
          if (res.Code == "0") {
            //成功,开启
            _self.$message({
              showClose: true,
              message: translate("获取验证码成功"),
              type: "success"
            });
          }
          _self.isSendingcode = false;
        })
        .catch(err => {
          _self.isSendingcode = false;
        });
    },
    tocheckStep2() {
      let _self = this;
      //验证码不能为空
      if (!_self.checkparamUme()) {
        return;
      }

      if (!_self.captha) {
        _self.$message({
          showClose: true,
          message: translate("验证码") + translate("不能为空"),
          type: "warning"
        });
        return;
      }
      if (_self.isCommitting) {
        return;
      }
      _self.isCommitting = true;
      //        验证验证码
      _self.axios
        .post("/api/user/FindPwdCaptchaConfirm", {
          userCode: _self.userCode, //	string	会员编号
          captha: _self.captha //	string	验证码
        })
        .then(res => {
          if (res.Code == "0") {
            _self.curStep = 2;
          }
          _self.isCommitting = false;
        })
        .catch(err => {
          _self.isCommitting = false;
        });
    },
    tochecksetPwd() {
      //重置密码
      let _self = this;
      if (!_self.l1Pwd) {
        _self.$message({
          showClose: true,
          message: translate("新密码") + translate("不能为空"),
          type: "warning"
        });
        return;
      }
      if (!_self.l1PwdConfirm) {
        _self.$message({
          showClose: true,
          message: translate("确认新密码") + translate("不能为空"),
          type: "warning"
        });
        return;
      }

      if (_self.l1Pwd != _self.l1PwdConfirm) {
        _self.$message({
          showClose: true,
          message: translate("新密码不一致"),
          type: "warning"
        });
        return;
      }
      if (_self.isCommitting) {
        return;
      }
      _self.isCommitting = true;
      //        验证验证码
      _self.axios
        .post("/api/user/ResetPwd", {
          userCode: _self.userCode, //	string	会员编号
          l1Pwd: _self.l1Pwd, //	string	新密码
          l1PwdConfirm: _self.l1PwdConfirm //	int	确认新密码
        })
        .then(res => {
          if (res.Code == "0") {
            _self.result_dialog.title = translate("提示");
            _self.result_dialog.message = translate(
              "重置密码成功点击确定去登录"
            );
            _self.result_dialog.d_visible = true;
            _self.result_dialog.func = function() {
              _self.$router.replace("/login");
            };
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
