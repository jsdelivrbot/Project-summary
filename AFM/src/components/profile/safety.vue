<template>
    <div class="container marTop330 associate safety">
        <div v-if="!isBind">
            <el-row :gutter="20">
                <el-col :md="12" :xs="24">
                    <div class="com-div-fr m-b-lg safety_data">
                        <div class="form-fr ">
                            <div class="con-title-fr">
                                <div class="sub-fr"></div>
                                <span class="con-title">
                                              {{'验证数据' | translate}}
                                              </span>
                            </div>
                            <div class="desc com-changepwd-desc">
                                <!-- <img :src="googleData.src"> -->
                                <p class="safety_data_msg" v-text="googleData.msg"></p>
                                <div id="cpybtn2" class="btn_sm btn_sm_red" :data-clipboard-text="googleData.msg">
                                    {{'秘钥(点击复制)' | translate}}
                                </div>
                                <div class="safety_desc">
                                   <ol>
                                        <li>{{'在应用市场中搜索“Google Authenticator”下载安装' | translate}}</li>
                                        <li>{{'在“账户设置”里添加新用户—“输入提供的密钥”，账户名随便填写（自己知道即可），输入密钥即可生成验证码'  | translate}}</li>
                                        <li>{{'做过验证的用户每次登陆需输入验证码' | translate}}</li>
                                    </ol>
                                </div>
                                    
                                <!-- <div :data-clipboard-text="msg" id="cpybtn2" class="btn_sm btn_sm_red">
                                            复制链接
                                        </div> -->
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :md="12" :xs="24">
                    <div class="com-div-fr m-b-lg safety_bind">
                        <div class="form-fr ">
                            <div class="con-title-fr">
                                <div class="sub-fr"></div>
                                <span class="con-title">
                                              {{'绑定谷歌验证' | translate}}
                                        </span>
                            </div>
                            <div class="desc com-changepwd-desc">
                                <div class="safety_bind_input">
                                    <input v-model="pin" type="password" class="input-area" :placeholder="'请输入PIN' | translate">
                                </div>
                                <div @click="btnBind" class="btn_sm btn_sm_red">
                                    {{'绑定' | translate}}
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-else>
            <div class="com-div-fr m-b-lg safety_data">
                <div class="form-fr ">
                    <div class="con-title-fr">
                        <div class="sub-fr"></div>
                        <span class="con-title">
                            {{'谷歌验证' | translate}}
                        </span>
                    </div>
                    <div class="desc com-changepwd-desc">
                        <p class="safety_data_msg">{{'谷歌验证已绑定' | translate}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { translate } from "@/tool/filters";
import Clipboard from "clipboard";
export default {
  data() {
    return {
      isBind: false,
      googleData: {
        msg: "",
        src: "24"
      },
      params: {
        token: this.$store.state.token,
        userId: this.$store.getters.getUserId
      },
      pin: ""
    };
  },
  methods: {
    //   绑定谷歌验证
    btnBind() {
      if (this.pin == "") {
        this.$message({
          type: "error",
          message: translate("请输入PIN")
        });
        return;
      }

      this.axios
        .post("/api/user/BindGoogleAuth", {
          token: this.params.token,
          userId: this.params.userId,
          pin: this.pin
        })
        .then(res => {
          this.$message({
            message: translate("成功"),
            type: "success",
            duration: 1 * 1000,
            onClose: () => {
              location.reload();
            }
          });
        })
        .catch(err => {});
    }
  },
  mounted() {
    this.axios
      .post("/api/user/GetGoogleBindData", {
        token: this.params.token,
        userId: this.params.userId
      })
      .then(res => {
        this.googleData.msg = res.Data.manualEntrySetupCode;
        this.googleData.src = res.Data.qrCodeImageUrl;
        this.isBind = res.Data.IsBind;
      })
      .catch(err => {});

    this.$nextTick(function() {
      var clipboard2 = new Clipboard("#cpybtn2");
      clipboard2.on("success", e => {
        //复制成功
        this.$message({
          message: translate("复制成功"),
          type: "success",
          duration: 1* 1000
        });
        e.clearSelection();
      });
    });
  }
};
</script>

