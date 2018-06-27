<template>
  <div class="boxWhite backPadding">
    <top-bar :back-type="2"><div slot="content" class="padding_15">{{'订单详情' | translate}}</div></top-bar>
    <!-- 现金订单 -->
    <div v-if="type === 0">
      <app-title class="m__wrap_30">
        <span class="text-blue" slot="right">{{'等待买家付款' | translate}}</span>
      </app-title>
      <div class="order-detail">
        <van-steps :active="stateMsg.active">
          <van-step>{{'买家下单' | translate}}</van-step>
          <van-step>{{'商家接单' | translate}}</van-step>
          <van-step>{{'买家提货' | translate}}</van-step>
          <van-step>{{'交易完成' | translate}}</van-step>
        </van-steps>
        <div class="order-detail__msg">
          <div class="order-detail__msg-top">
            卖家信息
          </div>
          <div class="order-detail__msg_list">
            <p>用户名：火星人（UID:117862）</p>
            <p>手机号码：18612345678</p>
            <p>真实姓名：李明</p>
            <p>收款银行：交通银行</p>
            <p>收款账号：4302 0419 **** 5459</p>
            <div @click="complainShow" class="dButton dButton__xs order-detail__msg-complain">
              {{'投诉' | translate}}
            </div>
          </div>
        </div>
        <div class="order-detail__upload">
          <div class="order-detail__upload-title">
            {{'上传凭证' | translate}}
          </div>
          <div class="order-detail__upload-content">
            <div class="complain__imgList">
              <div class="complain__imgItem complain__imgItem_after">
                <div class="complain__imgItem_after-close">
                  <i class="dIcon dIcon_close"></i>
                </div>
                <img src="data:image/png;base64,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"
                  class="complain__imgItem_after-img">
              </div>
              <div class="complain__imgItem complain__imgItem_before"></div>
            </div>
          </div>
          <div class="tips">支持jpg/png/gif/jpeg文件不超过500KB</div>
        </div>
        <div class="position__footer position__footer_sm">
          <div v-if="stateMsg.buttonMsg" class="m-b dButton dButton__large dButton_blue">
            {{stateMsg.buttonMsg | translate}}
          </div>
        </div>
      </div>
      <van-popup v-model="complainData.show" position="bottom">
        <div class="setting__language order-detail__complain">
          <div class="m__wrap_30">
            <div class="setting__language-header">
              <h3>
                {{'投诉' | translate}}
              </h3>
              <div @click="complainData.show = false" class="setting__language-header-right">
                {{'取消' | translate}}
              </div>
            </div>
          </div>
          <div class="m__wrap_30">
            <textarea placeholder="请输入内容" class="formItem__textarea"></textarea>
          </div>
          <div class="setting__language-footer m__wrap_30">
            <div @click="complainConfirm" class="dButton dButton__large dButton_blue">{{'确定' | translate}}</div>
          </div>
        </div>
      </van-popup>
    </div>
    <!-- 余额订单 -->
    <div v-if="type === 1">
      <app-title class="m__wrap_30">
        <div slot="left" class="padding_15">{{'订单详情' | translate}}</div>
      </app-title>
      <div class="order-detail__msg">
          <div class="order-detail__msg-top2 m__wrap_30">
            卖家信息
          </div>
          <div class="order-detail__msg_list">
            <p>用户名：火星人（UID:117862）</p>
            <p>手机号码：18612345678</p>
            <p>真实姓名：李明</p>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        type: -1,
        stateMsg: {
          active: 0,
          buttonMsg: "付款"
        },
        complainData: {
          show: false,
          value: ""
        },
        id:-1
      };
    },
    methods: {
      complainShow() {
        this.complainData.show = true;
        this.complainData.value = "";
      },
      complainConfirm() {
        this.complainData.show = false;
      }
    },
    created() {
      this.id = this.$route.params.id || -1;
      console.log(this.id);
      this.type = Number(this.$route.params.type);
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/style/util.scss";
  .order-detail {
    .van-step__circle-container {
      background-image: url("detail-2.png");
    }
    .van-step--process {
      .van-step__circle-container {
        width: f(26);
        height: f(26);
        top: f(75);
        background-image: url("detail-3.png");
      }
    }
    .van-step--finish {
      .van-step__circle-container {
        background-image: url("detail-1.png");
      }
    }
  }
  .dIcon_close {
    background-image: url("icon-42.png");
  }
</style>
