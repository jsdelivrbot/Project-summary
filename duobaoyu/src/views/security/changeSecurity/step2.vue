<template>
  <div class="modify_mibao_wrapper">
    <div class="modify_mibao_Box">
       <div class="Title">
        <img src="static/imgs/newMibao.png">
      </div>
      <div class="close" @click="close">
        <img src="static/imgs/close_page.png">
      </div>
      <form class="mibao_form newMibaoForm">
         <div class="input_group inline_12 input_group_inline input_group_inline_clearfix">
                <label class="label">密保问题</label>
                <select class="input_common select_common" v-model="secretSecurityQuestion">
                   <option   :value="key"  v-if="SecretSecurityData" v-for="(item,key,index) in SecretSecurityData" :key="index" >{{item}}</option>
                </select>
        </div>
         <div class="input_group inline_12 input_group_inline input_group_inline_clearfix">
                <label class="label">答案</label>
               <input type="text"  v-model="secretSecurityText" class="input_form input_common">
        </div>
        <div class="stext_center">
          <button @click="submitNewMibao" class="btn_yellowBg">
            <img src="static/imgs/submit.png">
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import * as ajax from "@/api/common";
export default {
  data() {
    return {
      SecretSecurityData: false,
      isOpen: false,
      deitalData: false,
      secretSecurityQuestion:1,
      secretSecurityText:null,
      mibaoForm: {
        answer: "",
        errorText: "答案错误"
      }
    };
  },
  created: function() {
    this.bind();
  },
  methods: {
    bind() {
      ajax.post("/api/user/getuserinfo", {}).then(response => {
        var data = response.Data;
        this.deitalData = response.Data;
      });

      this.SecretSecurityData = this.$store.getters.clientData.enumData.SecretSecurity;
      //   console.log(this.SecretSecurityData);
    },
    close() {
      this.$emit("close-newMibao", this.isOpen);
    },
    submitNewMibao() {
      ajax.post("/api/User/ModifyMibao", {
          oldsecretSecurityQuestion:this.deitalData.SecretSecurityId,
          oldsecretSecurityText:this.deitalData.SecretSecurityMatchText,
          secretSecurityQuestion:this.secretSecurityQuestion,
          secretSecurityText:this.secretSecurityText,
      }).then(response => {
        var data = response.Data;
        this.deitalData = response.Data;
        this.$router.push('/PersonalCenter/index');
        location.reload();
      });
    }
  }
};
</script>

<style>

</style>
