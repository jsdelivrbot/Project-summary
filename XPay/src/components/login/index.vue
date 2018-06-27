<template>
    <div class="login bgWhite">
        <div class="login__logoTop"></div>
        <div class="login__logoBottom"></div>
        <div class="bx1">
            <div class="login__select ">
                <div class="login__select_item active">{{'手机号登录' | translate}}</div>
            </div>
            <div class="login__form ">
                <div class="formItem">
                    <input v-model="formData.username.value" :placeholder="'请输入账号' | translate" type="text" class="inputItem">
                    <div class="formItem_border"></div>
                </div>
                <div class="formItem formItem__suffix">
                    <input v-model="formData.password.value" :placeholder="'请输入登录密码' | translate" :type="eyeShow ? 'text' : 'password'" class="inputItem">
                    <div class="formItem_border"></div>
                    <div class="inputItem_suffix">
                        <i @click="eyeShow = !eyeShow" class="dIcon dIcon__eye" :class="{dIcon__eye2: eyeShow}"></i>
                    </div>
                </div>
                <div  class="login__form-forget">
                  <router-link :to="{name: 'register'}" tag="span">
                        <span>{{'注册' | translate}}</span>
                    </router-link>
                    <router-link :to="{name: 'forgetPwd', params: {type: 0}}" tag="span">
                        <span>{{'忘记密码' | translate}}？</span>
                    </router-link>
                </div>
            </div>
            <div @click="submit" class="dButton dButton__large dButton_blue">{{'登 录' | translate}}</div>
            <div class="enter__language">
                <span>Change English</span>
            </div>
        </div>
    </div>
</template>

<script>
import { reg } from "src/util/form_reg";

export default {
  data() {
    return {
      eyeShow: false,
      formData: {
        username: {
          value: "",
          tips: "请输入账户"
        },
        password: {
          value: "",
          tips: "请输入密码"
        }
      }
    };
  },
  methods: {
    submit() {
      if (!reg(this.formData, this)) {
        return;
      }
      const form = reg(this.formData, this);
      $mask();
      this.$store.dispatch("Login", form).then(res => {
        this.$toast.clear();
        this.$router.push({name: "main", params: {checkIn: true}});
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/style/util.scss";
.login__logoTop {
  background-image: url("./icon_1.png");
}
.login__logoBottom {
  background-image: url("./icon_2.png");
}
.dIcon__eye {
  background-image: url("./icon-44.png");
}
.dIcon__eye2 {
  background-image: url("./icon-60.png");
}
</style>




