<template>
  <div class="login_Box">
    <div class="login_header">
      <img src="static/imgs/login_headerText.png">
    </div>
    <div class="login_form_box">
        <div class="forgrtPassword">
          <router-link tag="span" to="/login/forget" class="forgetPassword">忘记密码</router-link>
        </div>
      <form class="login_form" :model="loginForm">
        <div class="form_item">
          <img src="static/imgs/form_user.png">
          <input type="text" v-verify="loginForm.username" v-model="loginForm.username" placeholder="用户名">
          <span class="formValidateText" v-remind="loginForm.username"></span>
         
        </div>
        <div class="form_item">
          <img src="static/imgs/form_password.png">
          <input type="password" v-verify="loginForm.password" v-model="loginForm.password" placeholder="密码">
          <span class="formValidateText" v-remind="loginForm.password"></span>
        </div>
        <div class="validateBox">
          <div class="validate_item form_item">
            <img src="static/imgs/form-validate.png">
            <input type="text" placeholder="验证码" v-verify="loginForm.validateCode" v-model="loginForm.validateCode">
            <span class="formValidateText" v-remind="loginForm.validateCode"></span>
          </div>
          <div class="validate_right">
            <img class="validateImg" :src="imgValidate.basechange+imgValidate.imgBase64">
            <img class="refresh" src="static/imgs/form-refresh.png" @click="getValidate">
          </div>
        </div>
        <img class="login_form_foot" src="static/imgs/login_form_foot.png">
        <!-- <img class="login_form_left" src="static/imgs/foot_left.png">
         <img class="login_form_right" src="static/imgs/login_form_right.png"> -->
        <div class="login_box" @click="handleLogin">
          登录
        </div>
        
      </form>
    </div>
  </div>
</template>

<script>
  import {
    onlyNumber
  } from '@/utils/filters';
  import {
    isvalidUsername
  } from '@/utils/validate';
  import * as ajax from "@/api/common";
  export default {
    name: 'login',
    data() {
      // const validateUsername = (rule, value, callback) => {
      //   if (!isvalidUsername(value)) {
      //     callback(new Error('请输入正确的用户名'))
      //   } else {
      //     callback()
      //   }
      // }
      // const validatePass = (rule, value, callback) => {
      //   if (value.length < 5) {
      //     callback(new Error('密码不能小于5位'))
      //   } else {
      //     callback()
      //   }
      // }
      return {
        userAgent :'',
        loginForm: {
          username: '',
          password: '',
          validateCode: "",
          sessionId: ''
        },
        imgValidate: {
          basechange: 'data:image/png;base64,',
          sessionId: '',
          imgBase64: "",
        },
      }
    },
    verify: {
      loginForm: {
        username: [
          "required",
          {
            minLength: 2,
            message: "用户名不得小于两位"
          }
        ],
        password: [
          "required",
          // {
          //   minLength: 1,
          //   message: "密码不得小于位"
          // }
        ],
        validateCode: [
          "required"
        ]
      }
    },
    created() {
      this.getValidate();
      this.userAgent = navigator.userAgent;
    },
    methods: {
      // showPwd() {
      //   if (this.pwdType === 'password') {
      //     this.pwdType = ''
      //   } else {
      //     this.pwdType = 'password'
      //   }
      // },
      getValidate() {
        ajax.post('/api/user/GetVerifyCode', {}).then(response => {
          console.log(response);
          this.loginForm.sessionId = response.Data.sessionId
          this.imgValidate.imgBase64 = response.Data.img64;
        })
      },
      handleLogin() {
        if (this.$verify.check()) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({
              path: '/'
            })
          }).catch(() => {
            //debugger;
            this.loading = false
            this.getValidate();
          })
        }
      }
    },
    // computed:{
    //   password(){
    //     return this.loginForm.password
    //   }
    // },
    // watch : {
    //   password(newVal,oldVal){
      
    //     onlyNumber(newVal)
    //   }
    // }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
