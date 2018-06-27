<template>
  <div class="container edit_profile">
    <div class="marTop330 com-register-fr">
      <div class="mhalf">
        <div class="con-title-fr">
          <div class="sub-fr"></div>
          <span class="con-title">
             {{'账户信息'| translate}}
            </span>
        </div>
        <div class="com-register-desc">
          <div class="input-ar" v-for="key in Object.keys(part1)">
            <label>
              {{part1[key].title | translate}}
              </label>
            <span class="input-area tx">
              {{part1[key].value | translate}}
              </span>
          </div>
          <div class="input-ar">
            <label>
               {{'消费套餐'| translate}}
              </label>
            <span class="input-area tx">
              {{curLevel | LevelType}}
              </span>
          </div>
        </div>
      </div>
      <div class="mhalf">
        <div class="con-title-fr">
          <div class="sub-fr"></div>
          <span class="con-title">
             {{'个人信息'| translate}}
            </span>
        </div>
        <div class="com-register-desc desc">
          <div class="input-ar">
            <label>
              {{part2.NickName.title | translate}}
              </label>
            <div class="right">
              <input  class="input-area" type="text" v-model="part2.NickName.value" id="part4_1"/>
              <span class="errHint">
                {{part2.NickName.errhint | translate}}
                </span>
            </div>

          </div>
          <div class="input-ar">
            <label>{{part2.CertyType.title | translate}}</label>
            <div class="right">
              <el-select  class="input-area" v-model="part2.CertyType.value" >
                <el-option
                  value-key="value"
                  v-for="item in identify_option"
                  :key="item.value"
                  :label="item.label | translate"
                  :value="item.value">
                </el-option>
              </el-select>
              <span class="errHint">{{part2.CertyType.errhint | translate}}</span>
            </div>
          </div>
          <div class="input-ar">
            <label>{{part2.CertyCode.title | translate}}</label>
            <div class="right">
              <input  class="input-area" type="text" v-model="part2.CertyCode.value"/>
              <span class="errHint">{{part2.CertyCode.errhint | translate}}</span>
            </div>
          </div>
          <div class="input-ar">
            <label>{{part2.Mobile.title | translate}}</label>
            <div class="right">
              <input  class="input-area" type="text" v-model="part2.Mobile.value"/>
              <span class="errHint">{{part2.Mobile.errhint | translate}}</span>
            </div>
          </div>
          <div class="input-ar">
            <label>{{part2.Email.title | translate}}</label>
            <div class="right">
              <input  class="input-area" type="text" v-model="part2.Email.value"/>
              <span class="errHint">{{part2.Email.errhint | translate}}</span>
            </div>
          </div>
          <div class="input-ar">
            <label>{{part2.CountryId.title | translate}}</label>
            <div class="right">
              <el-select  class="input-area" v-model="part2.CountryId.value" >
                <el-option
                  v-for="item in CountryId_option"
                  :key="item.Value"
                  :label="item.Text | translate"
                  :value="item.Value">
                </el-option>
              </el-select>
              <span class="errHint">{{part2.CountryId.errhint | translate}}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class=" com-register-fr">
      <div class="mhalf">
        <div class="con-title-fr">
          <div class="sub-fr"></div>
          <span class="con-title">
             {{'银行信息'| translate}}
            </span>
        </div>
        <div class="com-register-desc desc">
          <div class="input-ar">
            <label>{{part3.BankName.title | translate}}</label>
            <div class="col" style="flex: auto;">
              <div class="right">
                <div class="input-area row">
                  <label class="radio-fr">
                    <input type="radio" value="1" name="bankname" v-model="bankname_type"/>
                    <i class="iconfont red">{{bankname_type==1?'&#xe61d;':'&#xe607;'}}</i>
                     {{'选择银行'| translate}}
                    </label>
                  <el-select style="flex: auto;" v-show="bankname_type == 1"  v-model="part3.BankName.value" >
                    <el-option
                      v-for="item in bank_option"
                      :key="item.value"
                      :label="item.label | translate"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="right">
                <div class="input-area row" style="margin-top: 10px;">
                  <label class="radio-fr">
                    <input type="radio" value="2" name="bankname" v-model="bankname_type"/>
                    <i class="iconfont red">{{bankname_type==2?'&#xe61d;':'&#xe607;' | translate}}</i>
                     {{'自定义'| translate}}
                  </label>
                  <div style="flex: auto;" v-show="bankname_type == 2">
                    <input   class="register-com-input" style="width: 100%;text-indent: 15px;"  type="text"
                         v-model="part3.BankName.value"/>
                  </div>  
                </div>
              </div>
              <div class="right">
                <span class="errHint">{{part3.BankName.errhint | translate}}</span>
              </div>
            </div>
          </div>
          <div class="input-ar">
            <label>{{part3.BankAddress.title | translate}}</label>
            <div class="right">
              <input  class="input-area" type="text" v-model="part3.BankAddress.value"/>
              <span class="errHint">{{part3.BankAddress.errhint | translate}}</span>
            </div>
          </div>
          <div class="input-ar">
            <label>{{part3.BankUserName.title | translate}}</label>
            <div class="right">
              <input  class="input-area" type="text" v-model="part3.BankUserName.value"/>
              <span class="errHint">{{part3.BankUserName.errhint | translate}}</span>
            </div>
          </div>
          <div class="input-ar">
            <label>{{part3.BankCode.title | translate}}</label>
            <div class="right">
              <input  class="input-area" type="text" v-model="part3.BankCode.value"/>
              <span class="errHint">{{part3.BankCode.errhint | translate}}</span>
            </div>
          </div>

        </div>
      </div>
      <div class="mhalf">
        <div class="con-title-fr">
          <div class="sub-fr"></div>
          <span class="con-title">
             {{'其他信息'| translate}}
            </span>
        </div>
        <div class="com-register-desc desc">
          <div class="input-ar">
            <label><i class="iconfont rpad10">&#xe635;</i>
              {{part4.AlipayCode.title | translate}}</label>
            <div class="right">
              <input  class="input-area" type="text"
                      v-model="part4.AlipayCode.value"
                      @keyup.enter="focusNext('part3_1')"/>
              <span class="errHint">
                {{part4.AlipayCode.errhint | translate}}
                </span>
            </div>
          </div>
          <div class="input-ar">
            <label><i class="iconfont rpad10">&#xe600;</i>
              {{part4.WebChat.title | translate}}</label>
            <div class="right">
              <input  class="input-area" type="text"
                      v-model="part4.WebChat.value" id="part3_1"
                      />
              <span class="errHint">{{part4.WebChat.errhint | translate}}</span>
            </div>
          </div>


        </div>
      </div>
    </div>
    <div class="btn-ar">
      <a href="javascript:;" @click="tocheckEdit" class="btn red-btn">
         {{'保存'| translate}}
        </a>
    </div>
  </div>
</template>
<style lang="less">
@import (reference) "./../../style/css/main.less";
@import "../../style/css/half_fr_common.less";
@import "../../style/css/edit_common.less";

.edit_profile .mhalf {
  .com-div-fr;
  margin-bottom: 27px;
}
.edit_profile .btn-ar {
  .row;
  .con-center;
  .item-center;
  padding: 33px;
  padding-top: 0;
  .btn {
    .com-btn;
    font-size: 16px;
  }
}
@media (min-width: 768px) {
  .edit_profile .btn-ar {
    justify-content: flex-start;
    padding-left: 66/@rem;
  }
}
</style>
<script>
import { Select, Option } from "element-ui";
import Vue from "vue";
Vue.use(Select);
Vue.use(Option);
import { getOption } from "./../../tool/data";
import { getValueInarr } from "./../../tool/util";
import { translate } from "@/tool/filters";

export default {
  data() {
    return {
      profile: {
        part1: {
          title: "账户信息",
          info: {
            UserCode: "会员编号",
            TJUserCode: "推荐人编号",
            JDUserCode: "安置人编号",
            JDPosition: "安置位置"
          },
          tx: "消费套餐"
        },
        part2: {
          title: "个人信息",
          info: {
            NickName: "姓名",
            CertyType: "证件类型",
            CertyCode: "证件号码",
            Mobile: "手机号码",
            Email: "邮箱",
            CountryId: "国家"
          }
        },
        part3: {
          title: "银行信息",
          ssubtx1: "选择银行",
          ssubtx2: "自定义",
          info: {
            BankName: "开户行",
            BankAddress: "所属支行",
            BankUserName: "户名",
            BankCode: "账号"
          }
        },
        part4: {
          title: "其他信息",
          info: {
            AlipayCode: "支付宝账号",
            WebChat: "微信账号"
          }
        }
      },
      part1: {
        UserCode: {
          value: null,
          title: null
        },
        TJUserCode: {
          value: null,
          title: null
        },
        JDUserCode: {
          value: null,
          title: null
        },
        JDPosition: {
          value: null,
          title: null
        }
      },
      part2: {
        NickName: {
          value: null,
          title: null,
          errhint: null
        },
        CertyType: {
          value: null,
          title: null,
          errhint: null
        },
        CertyCode: {
          value: null,
          title: null,
          errhint: null
        },
        Mobile: {
          value: null,
          title: null,
          errhint: null
        },
        Email: {
          value: null,
          title: null,
          errhint: null
        },
        CountryId: {
          value: null,
          title: null,
          errhint: null
        }
      },
      part4: {
        AlipayCode: {
          value: null,
          title: null
        },
        WebChat: {
          value: null,
          title: null
        }
      },
      part3: {
        BankName: {
          value: null,
          title: null
        },
        BankAddress: {
          value: null,
          title: null
        }, //  所属支行...
        BankCode: {
          value: null,
          title: null
        },
        BankUserName: {
          value: null,
          title: null
        }
      },

      query_params: {
        userId: null, //	string	会员id,唯一标识
        token: null //	string	登录成功后,返回的token值
      },

      curLevel: null,
      level_option: [
        translate("免费"),
        "小学",
        "中学",
        "高中",
        "大学",
        "硕士",
        "博士",
        "博士后"
      ],
      jsPos_option: [{ label: "左区", value: 1 }, { label: "右区", value: 2 }],
      identify_option: [
        { label: "身份证", value: 1 },
        { label: "护照", value: 2 }
      ],
      CountryId_option: [], //国家
      bank_option: [
        { label: "中国银行", value: "中国银行" },
        { label: "工商银行", value: "工商银行" },
        { label: "建设银行", value: "建设银行" },
        { label: "交通银行", value: "交通银行" },
        { label: "农业银行", value: "农业银行" }
      ], //银行
      bankname_type: 1, //1、select形式  ，2、input形式

      isCommitting: false
    };
  },
  methods: {
    tocheckEdit() {
      //校验资料修改
      let _self = this;
      let tobj = {};
      for (let index = 2; index <= 4; index++) {
        tobj = _self.getparams(tobj, _self["part" + index]);
      }


      if (!tobj.Mobile) {
        _self.$message({
          showClose: true,
          message:
            translate(_self.part2.Mobile.title) + "" + translate("不能为空"),
          type: "warning"
        });
        return;
      }
      // else if (!new RegExp(/^[0-9]{11}$/).test(tobj.Mobile)) {
      //   _self.$message({
      //     showClose: true,
      //     message:
      //       _self.part2.Mobile.title + "" + translate("必须满足") + "[0-9]{11}",
      //     type: "warning"
      //   });
      //   return;
      // }

      tobj.userId = _self.query_params.userId;
      tobj.token = _self.query_params.token;
      _self.postData(tobj);
    },
    getparams(tarobj, partobj) {
      let _self = this;
      for (let key of Object.keys(partobj)) {
        tarobj[key] = partobj[key].value;
      }
      return tarobj;
    },
    postData(params) {
      let _self = this;
      if (_self.isCommitting) {
        return;
      }
      _self.isCommitting = true;
      _self.axios
        .post("/api/user/EditUserInfo", params)
        .then(res => {
          if (res.Code == "0") {
            //成功
            _self.$message({
              showClose: true,
              message: translate("保存成功"),
              type: "success"
            });
          } else {
            _self.$message({
              showClose: true,
              message: translate("保存失败"),
              type: "error"
            });
          }
          _self.isCommitting = false;
        })
        .catch(err => {
          _self.isCommitting = false;
        });
    },
    dealCountry(res) {
      //获取国家数据
      let _self = this;
      if (res.Code == "0" && Array.isArray(res.Data)) {
        _self.CountryId_option = res.Data;
      } else {
        _self.CountryId_option = [];
      }
    },
    dealUserData(res) {
      let _self = this;
      if (res.Code == "0" && res.Data) {
        let data = res.Data;
        for (let index = 1; index <= 4; index++) {
          _self.setPartObj(index, data);
        }
      }
      this.part2.CountryId.value = this.part2.CountryId.value + "";

      this.part3.BankName.value = this.part3.BankName.value;
    },
    setPartObj(index, data) {
      let _self = this;
      let tarObj = _self["part" + index];
      for (let key of Object.keys(tarObj)) {
        tarObj[key].title = this.profile["part" + index]["info"][key];
        tarObj[key].value = data[key] ? data[key] : translate("暂无");
        if (key == "JDPosition") {
          tarObj[key].value = getValueInarr(
            _self["jsPos_option"],
            "label",
            "value",
            data[key]
          );
        } else if (key == "CertyType") {
          tarObj[key].value = Number(data[key]);
        } else if (key == "BankName") {
          _self.bankname_type =
            tarObj[key].value * 1 >= 1 && tarObj[key].value * 1 <= 5 ? 1 : 2;
        }
      }
      _self["part" + index] = tarObj;
    }
  },
  mounted() {
    let _self = this;

    let route = _self.$route;
    _self.query_params.userId = _self.$store.getters.getUserId;
    _self.query_params.token = _self.$store.state.token;
    let promise1 = _self.axios.get("/api/user/getcountry");
    let promise2 = _self.axios.get("/api/user/getuserinfo", {
      params: _self.query_params
    });
    let all = Promise.all([promise1, promise2]);
    all.then(resArr => {
      _self.dealCountry(resArr[0]);
      _self.dealUserData(resArr[1]);
    });

    _self.curLevel =
      _self.$store.state.user && _self.$store.state.user.LevelId
        ? _self.$store.state.user.LevelId
        : "";
  }
};
</script>
