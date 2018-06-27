<template>
  <!--登录界面-->
  <div class="login">
    <div class="container fullwidth">
      <div class="login-fr">
        <div class="logo-fr">
          <img :src="'/static/img/logo.png'" class="logo"/>
          <i class="iconfont" style="font-size:26px;color: #878787;">&#xe608;</i>
          <span style="font-size: 18px;color: #464646;">{{'会员管理系统' | translate}}</span>
        </div>
        <div class="input-form">
          <!--语言选项-->
          <div class="row" style="justify-content: flex-end;">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link lang-fr">
                <img :src="'/static/img/' + langType + '.png'" class="langImg">
                {{curlang.title}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="changeLanguage(lang.value)" :disabled="curlang.value== lang.value ?true:false" 
                  :key="index"  v-for="(lang,index) in langlist">
                  <a>
                    <img :src="'/static/img/' + lang.value + '.png'" class="langImg">
                    {{lang.title}}</a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          </div>

          <form @submit.prevent="tocheck">
            <div class="input-area">
              <i class="iconfont">&#xe63a;</i>
              <input id="name" @keyup.enter="focusNext('pwd')" type="text" v-model="params.UserCode" :placeholder="'请输入会员编码' | translate"/>
            </div>
            <div class="input-area">
              <i class="iconfont">&#xe6a1;</i>
              <input id="pwd" @keyup.enter="focusNext('pin')" type="password" v-model="params.L1pwd" :placeholder="'请输入密码' | translate"/>
              <i class="iconfont">&#xe601;</i>
            </div>
            <div class="input-area">
              <i class="iconfont">&#xe6a1;</i>
              <input id="pwd" @keyup.enter="focusNext('pin')" type="password" v-model="params.Pin" :placeholder="'请输入PIN' | translate"/>
            </div>
            <div class="tw-input-area">
              <div class="input-area left">
                <i class="iconfont">&#xe67a;</i>
                <input id="pin" type="text" v-model="params.Captcha" maxlength="5" :placeholder="'请输入验证码' | translate"/>
              </div>
              <div class="input-area code-fr" @click="changeCodeimg">
                <img class="code-img" :src="codeImg" />
              </div>

            </div>
            <div class="som-tip">
              <label class="check-fr">
                <!-- <input type="checkbox" v-model="isMemory"/>
                <i class="iconfont m-check-box">{{isMemory ? '&#xe641;' : ''}}</i>
                <span>{{'下次自动登录' | translate}}</span> -->
              </label>
              <router-link to="/fpwd" href="javascript:;">{{'忘记密码' | translate}}</router-link>
            </div>
            <input class="btn red-btn login-btn" type="submit" :value="'登录' | translate" >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
@import (reference) "../style/css/main.less";
.som-tip {
  .check-fr {
    span {
      color: #5f5c5c;
    }
  }
}
.login {
  min-height: 100%;
  .fullwidth;
  background-image: url("/static/img/login_bg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: #fff;
}

.login .container {
  height: 100%;
  min-height: 100%;
  .col;
  align-items: center;
}

.login-fr {
  .col;
  .con-center;
  .item-center;
  padding: 145px 30/@rem;
}

.login .logo-fr {
  .row;
  align-items: baseline;
  .con-center;
  width: auto;
  min-height: 37/@rem;
}

.login .input-form {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8/@rem;
  margin-top: 25px;
  width: 100%;
  padding: 0 32/@rem;
}

.login .input-area {
  width: 100%;
  min-height: 45px;
  border-radius: 4/@rem;
  box-shadow: 0 1px 0 0 #fff;
  background-color: #fff;
  margin-bottom: 17px;
  .row;
  .item-center;
}

.login .input-area i {
  font-size: 20px;
  padding: 0 15/@rem;
  color: #a5a5a5;
}

.login .input-area input {
  outline: none;
  border: none;
  border-left: 2px solid #eee;
  height: 30px;
  padding-left: 15/@rem;
  font-size: 13px;
  flex: auto;
  color: #a5a5a5;
}

.login .tw-input-area {
  .row;
  .item-center;
  .con-betwwen;
}

.login .input-area .left {
  flex: 2;
}

.login .code-fr {
  min-width: 104px;
  height: 100%;
  .col;
  .con-center;
  .item-center;
  flex: 1;
  margin-left: 10/@rem;
}

.login .code-img {
  min-width: 104px;
  height: 45px;
}

.login .login-btn {
  width: 100%;
  height: 45px;
  line-height: 45px;
  font-size: 14px;
  margin: 31px 0;
  border-width: 0;
}

.login .som-tip {
  .row;
  .con-betwwen;
  .item-center;
  color: #9d9d9d;
  font-size: 13px;
}

.login .som-tip a {
  color: #9d9d9d;
  font-size: 13px;
}

.login .lang-fr {
  display: block;
  color: #fff;
  height: 30px;
  line-height: 30px;
  border-radius: 4/@rem;
  background: rgba(0, 0, 0, 0.6);
  padding: 0 20px;
  margin-top: 26px;
  margin-bottom: 20px;
  margin-right: 0;
}

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) {
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
  .login .container {
    align-items: center;
  }

  .login-fr {
    padding-left: 25%;
    padding-right: 0;
    min-height: 397/@rem;
  }

  .input-form {
    width: 363/@rem;
    // height: 397/@rem;
  }

  .login .code-fr {
    min-width: 104/@rem;
  }
  .login .code-img {
    min-width: 104/@rem;
  }
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1199px) {
}

@media (max-width: 767px) {
  .login {
    background-size: 508%;
    background-position: center -224px;
    background-size: 552%;
    background-position: center -305px;
  }
  .login .input-form {
    margin-top: 5px;
  }
}
</style>
<script>
import md5 from "blueimp-md5";
import { Dropdown, DropdownMenu, DropdownItem } from "element-ui";
import Vue from "vue";
import { langlist } from "./../tool/data";
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
import { translate } from "@/tool/filters";
export default {
  data() {
    return {
      isMemory: true,
      langlist: langlist,
      curlang: {},
      params: {
        UserCode: '', //	string	会员编号,登录帐号
        L1pwd: '', //	string	用户密码(需要先MD5加密再传值)
        Captcha: '', //string	yanzhengma
        Pin: ''
      },
      codeImg: "-1",
      langType: localStorage.getItem('lang')
    };
  },
  mounted() {
    let _self = this;
    for (var i = 0; i < langlist.length; i++) {
      var item = langlist[i];
      if (item.value == localStorage["lang"]) {
        _self.curlang = item;
      }
    }
    this.changeCodeimg();
  },
  methods: {
    changeLanguage(lang) {
      if(lang.indexOf(0) === 0) return;
      localStorage["lang"] = lang;
      location.reload();
    },
    changeCodeimg() {
      let _self = this;
      _self.axios
        .get("/api/user/GetCaptcha")
        .then(res => {
          _self.codeImg = res.Data.captchaUrl + "?d=" + Math.random();
        })
        .catch(err => {});
    },
    tocheck() {
      //验证参数或者处理参数
      let _self = this;
      if (!_self.params.UserCode) {
        _self.$message({
          showClose: true,
          message: translate("会员编号不能为空"),
          type: "error"
        });
        return;
      }
      if (!_self.params.L1pwd) {
        _self.$message({
          showClose: true,
          message: translate("密码不能为空"),
          type: "error"
        });
        return;
      }
      if (!_self.params.Captcha) {
        _self.$message({
          showClose: true,
          message: translate("验证码不能为空"),
          type: "error"
        });
        return;
      }
      



      let tparams = JSON.parse(JSON.stringify(_self.params));
      tparams.L1pwd = md5(tparams.L1pwd);
      tparams['IsValidPin'] = true;
      tparams['IsValidCaptcha'] = true;
      _self.topost(tparams);
    },
    focusNext(name) {
      let _self = this;
      document.getElementById(name).focus();
    },
    topost(tparams) {
      //提交表单
      // tparams.IsValidPin =  "false";
      this.axios
        .post("/api/user/login", tparams)
        .then(res => {
          if (res.Code == "0") {
            let t_token = res.Token;
            let userObj = res.Data;
            let obj = {
              token: t_token,
              user: userObj
            };
            localStorage.setItem("amf_user", JSON.stringify(obj));
            this.$store.commit("CHANGE_USER");
            this.$router.push("/");
            
          }
        })
        .catch(err => {
        });
    }
  }
};
</script>
