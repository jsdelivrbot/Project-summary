<template>
  <div class="container edit_profile">
    <div class="marTop330 com-register-fr">
      <div class="mhalf m-b-lg">
        <div class="con-title-fr">
          <div class="sub-fr"></div>
          <span class="con-title">
            {{'账户信息' | translate}}
          </span>
        </div>
        <div class="com-register-desc">
          <div class="input-ar" v-for="key in Object.keys(part1)">
            <label>{{part1[key].title | translate}}</label>
            <span class="input-area tx">{{part1[key].value | translate}}</span>
          </div>
          <div class="input-ar">
            <label>
              {{'消费套餐'| translate}}
            </label>
            <span class="input-area tx">{{curLevel | LevelType}}</span>
          </div>
        </div>
      </div>
      <div class="mhalf m-b-lg">
        <div class="con-title-fr">
          <div class="sub-fr"></div>
          <span class="con-title">
            {{'个人信息'| translate}}
          </span>
        </div>
        <div class="com-register-desc">
          <div class="input-ar" v-for="key in Object.keys(part2)">
            <label>{{part2[key].title | translate}}</label>
            <span class="input-area tx">{{part2[key].value | translate}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class=" com-register-fr">
      <div class="mhalf m-b-lg">
        <div class="con-title-fr">
          <div class="sub-fr"></div>
          <span class="con-title">
            {{'银行信息'| translate}}
          </span>
        </div>
        <div class="com-register-desc">
          <div class="input-ar" v-for="key in Object.keys(part3)">
            <label>{{part3[key].title | translate}}</label>
            <span class="input-area  tx" v-if="key == 'BankName'">{{part3[key].value | bankType | translate}}</span>
            <span class="input-area  tx" v-else-if="key == 'BankAddress'">{{part3[key].value | translate}}</span>
            <span class="input-area  tx" v-else>{{part3[key].value | translate}}</span>
          </div>
        </div>
      </div>
      <div class="mhalf m-b-lg">
        <div class="con-title-fr">
          <div class="sub-fr"></div>
          <span class="con-title">
            {{'其他信息'| translate}}
          </span>
        </div>
        <div class="com-register-desc">
          <div class="input-ar" v-for="key in Object.keys(part4)">
            <label>{{part4[key].title | translate}}</label>
            <span class="input-area  tx">{{part4[key].value | translate}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
@import (reference) "./../../style/css/main.less";
@import "../../style/css/half_fr_common.less";
@import "../../style/css/edit_common.less";

.edit_profile .mhalf {
  .com-div-fr;
}
</style>
<script>
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
          title: null
        },
        CertyType: {
          value: null,
          title: null
        },
        CertyCode: {
          value: null,
          title: null
        },
        Mobile: {
          value: null,
          title: null
        },
        Email: {
          value: null,
          title: null
        },
        CountryId: {
          value: null,
          title: null
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
      JDPosition: [{ label: "左区", value: 1 }, { label: "右区", value: 2 }],
      CertyType: [{ label: "身份证", value: 1 }, { label: "护照", value: 2 }],
      CountryId: [], //国家
      option_arr: ["JDPosition", "CertyType"]
    };
  },
  mounted() {
    let _self = this;
    _self.query_params.token = _self.$store.state.token;
    _self.query_params.userId = _self.$store.getters.getUserId;

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
  },
  methods: {
    dealCountry(res) {
      //获取国家数据
      let _self = this;
      if (res.Code == "0" && Array.isArray(res.Data)) {
        _self.CountryId = res.Data;
      } else {
        _self.CountryId = [];
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
    },
    setPartObj(index, data) {
      let _self = this;
      let tarObj = _self["part" + index];
      for (let key of Object.keys(tarObj)) {
        tarObj[key].title = this.profile["part" + index]["info"][key];
        if (tarObj[key].title == "证件类型") {
        }
        tarObj[key].value = data[key] ? data[key] : "暂无";
        if (_self.option_arr.indexOf(key) > -1) {
          tarObj[key].value = getValueInarr(
            _self[key],
            "label",
            "value",
            data[key]
          );
        } else if (key == "CountryId") {
          tarObj[key].value = getValueInarr(
            _self[key],
            "Text",
            "Value",
            data[key]
          );
        }
      }
      _self["part" + index] = tarObj;
    }
  }
};
</script>
