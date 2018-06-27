<template>
  <!--注册-->
  <div class="container register">
    <div class="marTop330 fullwidth register-fr com-register-fr">
      <div class="mhalf">
        <div class="part1">
          <div class="con-title-fr">
            <div class="sub-fr"></div>
            <span class="con-title">
              {{'账户信息'| translate}}
              </span>
          </div>
          <div class="desc com-register-desc">
            <div class="input-ar">
              <label><i class="iconfont red">&#xe609;</i>{{part1.UserCode.name | translate}}</label>
              <div class="right">
                <input class="input-area " type="text" v-model="part1.UserCode.value"
                       @keyup.enter="focusNext('part1_2')"/>
                <a class="btn red-btn subright con-center" href="javascript:;" @click="createUserno">
                  <span>{{part1.UserCode.subname | translate}}</span>
                </a>
                <span class="errHint">{{part1.UserCode.errhint | translate}}</span>
              </div>
            </div>
            <div class="input-ar">
              <label><i class="iconfont red">&#xe609;</i>{{part1.TJUserCode.name | translate}}</label>
              <div class="right">
                  <span v-if="register_dialog.register_way == 1"
                        style="line-height: 40px;">{{part1.TJUserCode.value | translate}}</span>
                <input class="input-area" type="text" v-model="part1.TJUserCode.value" id="part1_2"
                       @keyup.enter="focusNext('part1_3')" v-else/>
                <span class="errHint">{{part1.TJUserCode.errhint | translate}}</span>
              </div>
            </div>
            <div class="input-ar">
              <label><i class="iconfont red">&#xe609;</i>{{part1.JDUserCode.name | translate}}</label>
              <div class="right">
                <input class="input-area" type="text" v-model="part1.JDUserCode.value" id="part1_3"/>
                <span class="errHint">{{part1.JDUserCode.errhint | translate}}</span>
              </div>
            </div>
            <div class="input-ar">
              <label><i class="iconfont red">&#xe609;</i>{{part1.JDPosition.name | translate}}</label>
              <div class="right">
                <el-select class="input-area" v-model="part1.JDPosition.value" :placeholder="'--请选择--' | translate">
                  <el-option
                    v-for="item in jsPos_option"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span class="errHint">{{part1.JDPosition.errhint | translate}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="part2">
          <div class="con-title-fr">
            <div class="sub-fr"></div>
            <span class="con-title">
              {{'密码信息'| translate}}
            </span>
          </div>
          <div class="desc com-register-desc">
            <div class="input-ar">
              <label><i class="iconfont red">&#xe609;</i>{{part2.L1Pwd.name | translate}}</label>
              <div class="right">
                <input class="input-area" type="password" v-model="part2.L1Pwd.value"
                       @keyup.enter="focusNext('part2_2')"/>
                <span class="m-l-sm">{{'默认为' | translate}}“123456”</span>
                <span class="errHint">{{part2.L1Pwd.errhint | translate}}</span>
              </div>
            </div>
            <div class="input-ar">
              <label><i class="iconfont red">&#xe609;</i>{{part2.ConfirmL1Pwd.name | translate}}</label>
              <div class="right">
                <input class="input-area" type="password" v-model="part2.ConfirmL1Pwd.value" id="part2_2"
                       @keyup.enter="focusNext('part2_3')"/>
                <span class="errHint">{{part2.ConfirmL1Pwd.errhint | translate}}</span>
              </div>
            </div>
            <div class="input-ar">
              <label><i class="iconfont red">&#xe609;</i>{{part2.L2Pwd.name | translate}}</label>
              <div class="right">
                <input class="input-area" type="password" v-model="part2.L2Pwd.value"/>
                <span class="m-l-sm">{{'默认为' | translate}}“123456”</span>
                <span class="errHint">{{part2.L2Pwd.errhint | translate}}</span>
              </div>
            </div>
            <div class="input-ar">
              <label><i class="iconfont red">&#xe609;</i>{{part2.ConfirmL2Pwd.name | translate}}</label>
              <div class="right">
                <input class="input-area" type="password" v-model="part2.ConfirmL2Pwd.value" id="part2_3"/>
                <span class="errHint">{{part2.ConfirmL2Pwd.errhint | translate}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="part3">
          <div class="con-title-fr">
            <div class="sub-fr"></div>
            <span class="con-title">
              {{'其他信息'| translate}}
            </span>
          </div>
          <div class="desc com-register-desc">
            <div class="input-ar">
              <label><i class="iconfont rpad10">&#xe635;</i>
                {{'支付宝账号'| translate}}
                </label>
              <div class="right">
                <input class="input-area" type="text"
                       v-model="part3.AlipayCode.value"
                       @keyup.enter="focusNext('part3_1')"/>
                <span class="errHint">{{part3.AlipayCode.errhint | translate}}</span>
              </div>
            </div>
            <div class="input-ar">
              <label><i class="iconfont rpad10">&#xe600;</i>
              {{'微信账号'| translate}}
              </label>
              <div class="right">
                <input class="input-area" type="text"
                       v-model="part3.WebChat.value" id="part3_1"
                       @keyup.enter="focusNext('part4_1')"/>
                <span class="errHint">{{part3.WebChat.errhint | translate}}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="mhalf">
        <div class="part4">
          <div class="con-title-fr">
            <div class="sub-fr"></div>
            <span class="con-title">
              {{'个人信息'| translate}}
            </span>
          </div>
          <div class="desc com-register-desc">
            <div class="input-ar">
              <label><i class="iconfont red">&#xe609;</i>{{part4.NickName.name | translate}}</label>
              <div class="right">
                <input class="input-area" type="text" v-model="part4.NickName.value" id="part4_1"/>
                <span class="errHint">{{part4.NickName.errhint | translate}}</span>
              </div>

            </div>
            <div class="input-ar">
              <label>{{part4.CertyType.name | translate}}</label>
              <div class="right">
                <el-select class="input-area" v-model="part4.CertyType.value" :placeholder="'--请选择--' | translate">
                  <el-option
                    v-for="item in identify_option"
                    :key="item.value"
                    :label="item.label | translate"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span class="errHint">{{part4.CertyType.errhint | translate}}</span>
              </div>
            </div>
            <div class="input-ar">
              <label>{{part4.CertyCode.name | translate}}</label>
              <div class="right">
                <input class="input-area" type="text" v-model="part4.CertyCode.value"/>
                <span class="errHint">{{part4.CertyCode.errhint | translate}}</span>
              </div>
            </div>
            <div class="input-ar">
              <label><i class="iconfont red">&#xe609;</i>{{part4.Mobile.name | translate}}</label>
              <div class="right">
                <input class="input-area" type="text" v-model="part4.Mobile.value"/>
                <span class="errHint">{{part4.Mobile.errhint | translate}}</span>
              </div>
            </div>
            <div class="input-ar">
              <label>{{part4.Email.name | translate}}</label>
              <div class="right">
                <input class="input-area" type="text" v-model="part4.Email.value"/>
                <span class="errHint">{{part4.Email.errhint | translate}}</span>
              </div>
            </div>
            <div class="input-ar">
              <label>{{part4.CountryId.name | translate}}</label>
              <div class="right">
                <el-select class="input-area" v-model="part4.CountryId.value" :placeholder="'--请选择--' | translate">
                  <el-option
                    v-for="item in CountryId_option"
                    :key="item.Value"
                    :label="item.Text | translate" 
                    :value="item.Value">
                  </el-option>
                </el-select>
                <span class="errHint">{{part4.CountryId.errhint | translate}}</span>
              </div>
            </div>
          </div>

        </div>
        <div class="part5">
          <div class="con-title-fr">
            <div class="sub-fr"></div>
            <span class="con-title">
              {{'银行信息'| translate}}
              </span>
          </div>
          <div class="desc com-register-desc">
            <div class="input-ar">
              <label>{{part5.BankName.name | translate}}</label>
              <div class="col" style="flex: auto;">
                <div class="right">
                  <div class="input-area row">
                    <label class="radio-fr">
                      <input type="radio" value="1" name="bankname" v-model="bankname_type"/>
                      <i class="iconfont red">{{bankname_type == 1 ? '&#xe61d;' : '&#xe607;'}}</i>
                      {{'开户行'| translate}}
                      </label>
                    <el-select style="flex: auto;" v-show="bankname_type == 1" v-model="part5.BankName.value" :placeholder="'--请选择--' | translate">
                      <el-option
                        v-for="item in bank_option"
                        :key="item"
                        :label="item | translate"
                        :value="item">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="right">
                  <div class="input-area row" style="margin-top: 10px;">
                    <label class="radio-fr">
                      <input type="radio" value="2" name="bankname" v-model="bankname_type"/>
                      <i class="iconfont red">{{bankname_type == 2 ? '&#xe61d;' : '&#xe607;' | translate}}</i>
                      {{'选择银行'| translate}}
                    </label>
                    <div style="flex: auto;" v-show="bankname_type == 2">
                      <input class="register-com-input" style="width: 100%;text-indent: 15px;" type="text"
                             v-model="part5.BankName.value"/>
                    </div>
                  </div>
                </div>
                <div class="right">
                  <span class="errHint">{{part5.BankName.errhint | translate}}</span>
                </div>
              </div>
            </div>
            <div class="input-ar">
              <label>{{part5.BankAddress.name | translate}}</label>
              <div class="right">
                <input class="input-area" type="text" v-model="part5.BankAddress.value"/>
                <span class="errHint">{{part5.BankAddress.errhint | translate}}</span>
              </div>
            </div>
            <div class="input-ar">
              <label>{{part5.BankUserName.name | translate}}</label>
              <div class="right">
                <input class="input-area" type="text" v-model="part5.BankUserName.value"/>
                <span class="errHint">{{part5.BankUserName.errhint | translate}}</span>
              </div>
            </div>
            <div class="input-ar">
              <label>{{part5.BankCode.name | translate}}</label>
              <div class="right">
                <input class="input-area" type="text" v-model="part5.BankCode.value"/>
                <span class="errHint">{{part5.BankCode.errhint | translate}}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="btn-fr">
      <a href="javascript:;"
         @click="checkRegister" class="btn red-btn">
         {{'注册'| translate}}
         </a>
      <label class="check-fr" style="font-size: 13px;">
        <input type="checkbox" v-model="isMemory"/>
        <i class="iconfont m-check-box">{{isMemory ? '&#xe641;' : ''}}</i>
        <span style="color:#fff;">
          {{'同意'| translate}}
          </span>
        <router-link  target="_blank" to="/protocol" style="color:#fff;">
        《{{'注册协议'| translate}}》
        </router-link>
      </label>
    </div>
      <dialog-register :data="register_dialog"
                       v-on:to-activate="toActivate">
      </dialog-register>
      <dialog-activate  :data="activate_dialog"
                       v-on:active-success="activeSuccess">
      </dialog-activate>
      <dialog-result :data="result_dialog"></dialog-result>

    <!-- 激活 -->
    <el-dialog :visible.sync="dialogData.d_visible" class="common-dialog" :class="'dialog_1'">
        <div slot="title">
            <div class="con-title-fr">
                <div class="sub-fr"></div>
                <span class="con-title">{{dialogData.title | translate}}</span>
            </div>
        </div>
        <div class="m-dialog-content">
          <div class="input_wrap" v-if="dialogData.data">
            <el-form  :model="dialogData.formData" label-width="120px">
              <el-form-item :label="'会员编号' | translate" >
                <div v-text="dialogData.data.UserCode"></div>
              </el-form-item>
              <el-form-item :label="'姓名' | translate" >
                <div v-text="dialogData.data.NickName"></div>
              </el-form-item>
              <el-form-item :label="'手机号码' | translate" >
                <div v-text="dialogData.data.Mobile"></div>
              </el-form-item>
              <el-form-item :label="'推荐人编号' | translate" >
                <div v-text="dialogData.data.TJUserCode"></div>
              </el-form-item>
              <el-form-item :label="'安置人编号' | translate" >
                <div v-text="dialogData.data.JDUserCode"></div>
              </el-form-item>
              <el-form-item :label="'安置位置' | translate" >
                <div>
                  {{ dialogData.data.JDPosition | JDPositionType | translate}}
                </div>
              </el-form-item>
              <el-form-item :label="'消费配餐' | translate" :class="'is-required'">
                <el-select 
                @change="GetKouKuanInfo"
                class="jihuo" v-model="dialogData.formData.levelId" :placeholder="'--请选择--' | translate">
                  <el-option
                    v-for="item in selectData.level"
                    :key="item.value"
                    :label="item.label | translate"
                    :value="item.value">
                  </el-option>
                </el-select>
                <div class="input_tips" v-if="dialogData.dataKoukuan">{{'激活积分金额：' | translate}}<span v-text="dialogData.dataKoukuan.JHJFAmount"></span></div>
                <div class="input_tips" v-if="dialogData.dataKoukuan">{{'是否扣除激活币：' | translate}}{{ dialogData.dataKoukuan.IsOpenJHB ? '扣除' : '不扣除' | translate}}</div>
                <div class="input_tips" v-if="dialogData.dataKoukuan">{{'激活币金额：' | translate}}<span v-text="dialogData.dataKoukuan.JHBAmount"></span></div>
              </el-form-item>
              <el-form-item :label="'扣款方式' | translate" :class="'is-required'">
                <el-select 
                @change="GetWalletAmount"
                class="jihuo" :disabled="dialogData.disabled" v-model="dialogData.formData.walletId" :placeholder="'--请选择--' | translate">
                  <el-option
                    v-for="item in selectData.currencyType"
                    :key="item.value"
                    :label="item.label | translate"
                    :value="item.value">
                  </el-option>
                </el-select>
                <div class="input_tips" v-if="dialogData.dataAmount">当前余额：<span v-text="dialogData.dataAmount.Amount"></span></div>
              </el-form-item>
              <el-form-item :label="'二级密码' | translate" :class="'is-required'">
                <el-input type="password" v-model="dialogData.formData.l2Pwd"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div slot="footer" style="padding-bottom: 40px;font-size: 13px;">
            <div class="row con-betwwen item-center">
                <a href="javascript:;" @click="dialogData.cancel" class="btn white-btn com-btn" style="font-size: 13px;">{{'取消' | translate}}</a>
                <a href="javascript:;" @click="dialogData.confirm" class="btn red-btn com-btn" style="font-size: 13px;">{{'确定' | translate}}</a>
            </div>
        </div>
    </el-dialog>

    <!-- 分享注册成功 -->
    <el-dialog :visible.sync="dialogDataShare.d_visible" class="common-dialog" :class="'dialog_1'">
          <div slot="title">
              <div class="con-title-fr">
                  <div class="sub-fr"></div>
                  <span class="con-title">{{'温馨提示' | translate}}</span>
              </div>
          </div>
          <div class="m-dialog-content" style="padding-top: 20px;">
              <p class="p_text">{{'注册成功，请登录并激活账号！' | translate}}</p>
              <p class="p_text">{{'激活方式：进入“市场管理-我要激活”页面升级激活。' | translate}}</p>
              <p class="p_text">{{'注意：如果24小时没有激活，账号将自动删除。' | translate}}</p>
          </div>
          <div slot="footer" style="padding-top: 20px; padding-bottom: 30px;font-size: 13px;">
              <div class="row con-betwwen item-center">
                  <a href="javascript:;" @click="dialogDataShare.confirm" class="btn red-btn com-btn" style="font-size: 13px; margin: 0 auto;">{{'确定' | translate}}</a>
              </div>
          </div>
      </el-dialog>
  </div>
</template>
<style lang="less">
@import (reference) "../../style/css/main.less";
@import "../../style/css/com_dialog.less";
@import "../../style/css/half_fr_common.less";
@import "../../style/css/edit_common.less";
.register .input-ar > label {
  width: 114px !important;
}
.p_text {
  color: #797979;
  text-align: center;
  line-height: 2;
}

.mar10 {
  margin-left: 10/@rem;
}

.rpad10 {
  padding-right: 10px;
}

.register .btn-fr {
  .row;
  .con-center;
  .item-center;
  padding: 33px;
  .btn {
    .com-btn;
    margin-right: 54px;
    font-size: 16px;
  }
  .check-fr {
    font-size: 13px;
  }
}

.register-fr .mhalf > div {
  .com-div-fr;
  margin-bottom: 20px;
}

.register .desc .input-ar .right .subright {
  width: 80px;
  height: 40px;
  .col;
  .item-center;
  font-size: 13px;
  margin-left: 10/@rem;
}

.register .part4,
.register .part5 {
  flex: auto;
}

.register .dia-content {
  border-top: 1px solid #e5e5e5;
  .col;
  .item-center;
  .con-center;
  padding: 48px 10/@rem 30px 10/@rem;
  line-height: 2.5;
}

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) {
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
  .register .btn-fr {
    justify-content: flex-start;
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
import { getList } from "./../../tool/data.js";

import { getOption } from "./../../tool/data";
import { translate } from "@/tool/filters";
import md5 from "blueimp-md5";

export default {
  components: {
    "dialog-result": () =>
      import(/*webpackChunkName:"cm_dialog"*/ "@/components/dialog/d_result.vue"),
    "dialog-register": () =>
      import(/*webpackChunkName:"cm_dialog"*/ "@/components/dialog/d_register.vue"),
    "dialog-activate": () =>
      import(/*webpackChunkName:"cm_dialog"*/ "@/components/dialog/d_activate.vue")
  },
  data() {
    return {
      postionError: false,
      dialogDataShare: {
        d_visible: false,
        title: "",
        message: "",
        cancel: () => {
          this.dialogDataShare.d_visible = false;
        },
        confirm: () => {
          this.$router.push("/login");
        }
      },
      id: null,
      selectData: {
        jihuoState: getList(["已激活", "未激活"], 1),
        currencyType: getList(["激活积分"], 1),
        level: getList(
          ["小学", "中学", "高中", "大学", "硕士", "博士", "博士后"],
          1
        )
      },
      params: {
        token: this.$store.state.token,
        userId: this.$store.getters.getUserId
      },
      // 激活Diaolog
      dialogData: {
        disabled: true,
        d_visible: false,
        title: "",
        message: "",
        formData: {
          levelId: "",
          walletId: "",
          l2Pwd: ""
        },
        data: null,
        dataAmount: null,
        dataKoukuan: null,
        cancel: () => {
          this.dialogData.d_visible = false;
        },
        confirm: function() {}
      },

      result_dialog: {
        title: "",
        message: "",
        d_visible: false
      },
      register_dialog: {
        d_visible: false,
        register_way: 1 //1、分享注册，2、市场管理注册
      },
      isMemory: false,
      jsPos_option: [{ label: "左区", value: 1 }, { label: "右区", value: 2 }],
      identify_option: [
        { label: "身份证", value: 1 },
        { label: "护照", value: 2 }
      ],
      CountryId_option: [], //国家
      bank_option: ["中国银行", "工商银行", "建设银行", "交通银行", "农业银行"], //银行
      bankname_type: 1, //1、select形式  ，2、input形式
      part1: {
        UserCode: {
          isrequire: true,
          value: null,
          errhint: null,
          regx: /^[0-9a-zA-Z]{6,12}$/gim,
          regxTx: "6-12" + translate("位"),
          name: translate("会员编号"),
          subname: translate("自动生成")
        }, //Y	string	会员编号 不能为空,8-11位
        TJUserCode: {
          isrequire: false,
          value: null,
          errhint: null,
          name: translate("推荐人编号")
        }, //	Y	string	推荐人编号
        JDUserCode: {
          isrequire: true,
          value: null,
          errhint: null,
          name: translate("安置人编号")
        }, //	Y	string	安置人编号
        JDPosition: {
          isrequire: true,
          value: null,
          errhint: null,
          name: translate("安置位置")
        } //	Y	int	安置位置
      },
      part2: {
        L1Pwd: {
          isrequire: true,
          value: null,
          errhint: null,
          name: translate("一级密码")
        }, //	Y	string	一级密码 不能为空
        ConfirmL1Pwd: {
          isrequire: true,
          value: null,
          errhint: null,
          name: translate("确认一级密码")
        }, //	Y	string	确认一级密码 不能为空
        L2Pwd: {
          isrequire: true,
          value: null,
          errhint: null,
          name: translate("二级密码")
        }, //	Y	string	二级密码 不能为空
        ConfirmL2Pwd: {
          isrequire: true,
          value: null,
          errhint: null,
          name: translate("确认二级密码")
        } //	Y	string	确认二级密码 不能为空
      },
      part3: {
        AlipayCode: {
          isrequire: false,
          value: null,
          errhint: null,
          name: translate("支付宝账号")
        }, //	N	string	支付宝账号
        WebChat: {
          isrequire: false,
          value: null,
          errhint: null,
          name: translate("微信账号")
        } //	N	string	微信账号
      },
      part4: {
        NickName: {
          isrequire: true,
          value: null,
          errhint: null,
          name: translate("姓名")
        }, //	Y	string	姓名 不能为空,6-50位
        CertyType: {
          isrequire: false,
          value: null,
          errhint: null,
          name: translate("证件类型")
        }, //	Y	int	证件类型
        CertyCode: {
          isrequire: false,
          value: null,
          errhint: null,
          name: translate("证件号码")
        }, //	Y	string	身份证号
        Mobile: {
          isrequire: true,
          value: null,
          errhint: null,
          name: translate("手机号码")
        }, //	Y	string	手机号码 不能为空
        Email: {
          isrequire: false,
          value: null,
          errhint: null,
          regx: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/g,
          regxTx: translate("正确格式"),
          name: translate("邮箱")
        }, //	Y	string	电子邮箱 正确的邮箱格式
        CountryId: {
          isrequire: false,
          value: null,
          errhint: null,
          name: translate("国家")
        } //	Y	string	国家Id
      },
      part5: {
        BankName: {
          isrequire: false,
          value: null,
          errhint: null,
          name: translate("选择银行")
        }, //	Y	string	开户行
        BankAddress: {
          isrequire: false,
          value: null,
          errhint: null,
          name: translate("所属支行")
        }, //	Y	string	所属支行
        BankUserName: {
          isrequire: false,
          value: null,
          errhint: null,
          name: translate("户名")
        }, //	Y	string	开户姓名
        BankCode: {
          isrequire: false,
          value: null,
          errhint: null,
          name: translate("账号")
        } //	Y	string	卡号
      },
      isCommitting: false,
      defaultTJcode: "",
      activate_dialog: {
        userId: null,
        d_visible: false,
        contData: {
          UserCode: {
            name: "",
            value: ""
          },
          NickName: {
            name: "",
            value: ""
          },
          Mobile: {
            name: "",
            value: ""
          },
          TJUserCode: {
            name: "",
            value: ""
          },
          JDUserCode: {
            name: "",
            value: ""
          },
          JDPosition: {
            name: "",
            value: ""
          }
        }
      }
    };
  },
  watch: {
    bankname_type: function(val) {
      let _self = this;
      _self.part5.BankName.value = null;
    },
    part1: {
      handler: function() {
        if (
          this.part1.TJUserCode.value &&
          this.part1.JDUserCode.value &&
          this.part1.JDPosition.value
        ) {
          this.axios
            .post("/api/user/ValidTJJDUser", {
              tjUserCode: this.part1.TJUserCode.value,
              jdUserCode: this.part1.JDUserCode.value,
              jdPosition: this.part1.JDPosition.value
            })
            .then(res => {
              this.postionError = false;
            })
            .catch(err => {
              this.postionError = true;
            });
        }
      },
      deep: true
    }
  },
  mounted() {
    let _self = this;
    _self.defaultTJcode = _self.$store.state.defaultTJcode;
    let route = _self.$route;
    let path = route.path;
    var reg = /id\=(.*)*/;

    // 安置网络图传参
    var params = this.$route.params;
    if (params.UserCode) {
      this.part1.JDUserCode.value = params.UserCode;
      this.part1.JDPosition.value = params.position * 1;
    }

    if (path.indexOf("/market/register") > -1) {
      _self.register_dialog.register_way = 2;
      _self.part1.TJUserCode.value = this.$store.state.user.UserCode;
    } else if (path.indexOf("/register") > -1) {
      _self.register_dialog.register_way = 1;
      _self.part1.TJUserCode.value = reg.exec(location.hash)[1];
    }

    _self.getCountry();
    this.part2.L1Pwd.value = 123456;
    this.part2.ConfirmL1Pwd.value = 123456;
    this.part2.L2Pwd.value = 123456;
    this.part2.ConfirmL2Pwd.value = 123456;
  },
  methods: {
    // 获取钱包余额
    GetWalletAmount(val) {
      this.axios
        .post("api/Financial/GetWalletAmount", {
          token: this.params.token,
          userId: this.params.userId,
          walletId: val
        })
        .then(res => {
          this.dialogData.dataAmount = { Amount: res.Data };
        })
        .catch(err => {
          this.dialogData.dataAmount = null;
        });
    },
    // 激活扣款信息
    GetKouKuanInfo(val) {
      this.axios
        .post("api/user/GetKouKuanInfo", {
          token: this.params.token,
          userId: this.params.userId,
          LevelId: val
        })
        .then(res => {
          this.dialogData.dataKoukuan = res.Data;
          if (this.dialogData.dataKoukuan.IsOpenJHB) {
            this.selectData.currencyType = getList(["激活积分+激活币"], 1);
          }
          // 拿到值后解除禁用
          this.dialogData.disabled = false;
        })
        .catch(err => {
          this.dialogData.dataKoukuan = null;
        });
    },
    // 显示激活
    btnActive(id) {
      // 重置
      this.dialogData.disabled = true;
      this.dialogData.formData = {
        levelId: "",
        walletId: "",
        l2Pwd: ""
      };
      this.dialogData.data = null;
      this.dialogData.dataAmount = null;
      this.dialogData.dataKoukuan = null;

      // 被激活会员信息
      this.axios
        .post("api/user/GetJHUesrInfo", {
          userId: id // id
        })
        .then(res => {
          this.dialogData.data = res.Data;
        })
        .catch(err => {});

      this.dialogData.title = translate("激活");
      this.dialogData.d_visible = true;

      this.dialogData.confirm = () => {
        if (this.dialogData.formData.levelId == "") {
          this.$message({
            message: translate("请输入消费配套"),
            type: "error",
            duration: 1 * 1000
          });
          return;
        }
        if (this.dialogData.formData.walletId == "") {
          this.$message({
            message: translate("请输入扣款方式"),
            type: "error",
            duration: 1 * 1000
          });
          return;
        }
        if (this.dialogData.formData.l2Pwd == "") {
          this.$message({
            message: translate("请输入二级密码"),
            type: "error",
            duration: 1 * 1000
          });
          return;
        }

        this.axios
          .post("api/user/JihuoForUser", {
            token: this.params.token,
            userId: this.params.userId,
            beiJihuoUserId: id,
            levelId: this.dialogData.formData.levelId,
            walletId: this.dialogData.formData.walletId,
            l2Pwd: md5(this.dialogData.formData.l2Pwd)
          })
          .then(res => {
            this.$message({
              message: translate("激活成功"),
              type: "success",
              duration: 1 * 1000,
              onClose: () => {
                this.dialogData.d_visible = false;
                location.reload();
              }
            });
          })
          .catch(err => {});
      };
    },

    activeSuccess() {
      //激活成功回调
      let _self = this;
      _self.result_dialog.d_visible = true;
      _self.result_dialog.message = translate("激活成功");
      _self.result_dialog.title = translate("提示");
    },
    toActivate() {
      this.btnActive(this.id);
      // let _self = this;
      // _self.mdebug("toActiateUser---");
      // _self.activate_dialog.d_visible = true;
      // for (let key of Object.keys(_self.activate_dialog.contData)) {
      //   let obj = _self.activate_dialog.contData[key];
      //   if (key == "NickName" || key == "Mobile") {
      //     obj.value = _self.part4[key].value;
      //     obj.name = _self.part4[key].name;
      //   } else {
      //     _self.mdebug(key + "--" + JSON.stringify(_self.part1[key]));
      //     if (key == "JDPosition") {
      //       obj.value = _self.part1[key].value.label;
      //     } else {
      //       obj.value = _self.part1[key].value;
      //     }
      //     obj.name = _self.part1[key].name;
      //   }
      // }
    },
    focusNext(name) {
      let _self = this;
      document.getElementById(name).focus();
    },
    createUserno() {
      //生成会员编号
      let _self = this;
      _self.axios
        .get("/api/user/GetRandUserCode")
        .then(res => {
          if (res.Code == "0") {
            _self.part1.UserCode.value = res.Data;
          }
        })
        .catch(err => {});
    },
    getCountry() {
      //获取国家数据
      let _self = this;
      _self.axios
        .get("/api/user/getcountry")
        .then(res => {
          if (res.Code == "0" && Array.isArray(res.Data)) {
            _self.CountryId_option = res.Data;
          }
        })
        .catch(err => {
          _self.CountryId_option = [];
        });
    },
    checkRegister() {
      //校验注册
      let _self = this;
      let arr1 = Object.keys(_self.part1);
      let arr2 = Object.keys(_self.part2);
      let arr3 = Object.keys(_self.part3);
      let arr4 = Object.keys(_self.part4);
      let arr5 = Object.keys(_self.part5);
      let isTrue =
        _self.checkArrisRequire(arr1, _self.part1) &&
        _self.checkArrisRequire(arr2, _self.part2) &&
        _self.checkArrisRequire(arr3, _self.part3) &&
        _self.checkArrisRequire(arr4, _self.part4) &&
        _self.checkArrisRequire(arr5, _self.part5);

      if (isTrue) {
        if (!_self.isMemory) {
          _self.$message({
            showClose: true,
            message: translate("请先同意注册协议"),
            type: "warning"
          });
          return;
        }

        let targetObj = {};
        targetObj = _self.getParams(arr1, _self.part1, targetObj);
        targetObj = _self.getParams(arr2, _self.part2, targetObj);
        targetObj = _self.getParams(arr3, _self.part3, targetObj);
        targetObj = _self.getParams(arr4, _self.part4, targetObj);
        targetObj = _self.getParams(arr5, _self.part5, targetObj);

        _self.postData(targetObj);
      }
    },
    postData(targetObj) {
      if (this.postionError) {
        this.$message({
          message: translate("请先安置左区"),
          type: "error",
          duration: 1 * 1000
        });
        return;
      }
      let _self = this;
      // 会员注册为true，分享链接注册为false
      if (_self.register_dialog.register_way === 1) {
        targetObj.IsUserReg = "false";
      } else if (_self.register_dialog.register_way === 2) {
        targetObj.IsUserReg = true;
      }
      _self.axios
        .post("/api/user/UserRegister", targetObj)
        .then(res => {
          document.body.scrollTop = 0;
          this.id = res.Data;
          if (_self.register_dialog.register_way === 2) {
            //弹出对话框
            _self.register_dialog.d_visible = true;
            //获取注册id dialogVisible
            _self.activate_dialog.userId = null; //....待办
          } else {
            _self.dialogDataShare.d_visible = true;
          }
        })
        .catch(err => {});
    },
    getParams(arr, pObj, tarObj) {
      let _self = this;
      arr.forEach((item, index) => {
        let i = pObj[item];
        tarObj[item] = i.value;
      });
      // for (let key of arr) {
      //   let i = pObj[key];
      //   if (key == "JDPosition") {
      //     tarObj[key] = i.value.value;
      //   } else {
      //     tarObj[key] = i.value;
      //   }
      // }
      return tarObj;
    },
    checkArrisRequire(arr, pObj) {
      //校验数据
      let _self = this;
      for (let key of arr) {
        let i = pObj[key];
        if (i.isrequire) {
          //检查数据
          if (!i.value) {
            i.errhint = translate(i.name) + "" + translate("不能为空");
            return false;
          }
          if (i.regx && new RegExp(i.regx).test(i.value) == false) {
            i.errhint =
              translate(i.name) + "" + translate("必须满足") + "" + i.regxTx;
            return false;
          }
          i.errhint = null;
        } else {
          if (i.value && i.regx && new RegExp(i.regx).test(i.value) == false) {
            i.errhint =
              translate(i.name) + "" + translate("必须满足") + "" + i.regxTx;
            return false;
          }
          i.errhint = null;
        }
      }
      return true;
    }
  }
};
</script>
