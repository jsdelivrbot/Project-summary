<template id="network-node1">
  <div class="box" v-bind="dealRegister(ndata)">
    <div  class="box-header" v-if="ndata">
      <div class="shuline" v-show="!ndata.isTop"></div>
      <a class="content" ref="clicknode" @click="currentNetWork">
        <img :src="'/static/img/c'+ndata.LevelId+'.png'"/>
        <span>{{ndata.UserCode}}</span>
        <span v-show="false">{{ndata.UserId}}</span>
      </a>
      <div class="shuline" v-show="ndata.child && ndata.child.length > 0"></div>
    </div>
    <div v-if="ndata" class="box-child" v-show="ndata.child&&ndata.child.length>0">
      <template v-for="item in ndata.child">
         <network-node1 :ndata="item"  v-if="item != null"></network-node1>
      </template>
    </div>
  </div>

</template>
<style lang="less">
  @import (reference) "../../style/css/main.less";
  .box {
    .col;
    .item-center;
    position: relative;
    margin-left: 50px;
  }

  .box:last-child:after {
    content: ' ';
    width: 50%;
    height: 1px;
    background: #fff;
    position: absolute;
    right: 0;
    top: -1px;
  }

  .box:first-child:before {
    content: ' ';
    width: 50%;
    height: 1px;
    background: #fff;
    position: absolute;
    left: 0;
    top: -1px;

  }

  .box:first-child {
    margin-left: 0;
  }

  .box-header .shuline {
    display: block;
    width: 1px;
    height: 16px;
    background: #707980;
    margin: 0 auto;
  }

  .box-header .content {
    width: 155px;
    height: 155px;
    .col;
    .con-center;
    .item-center;
  }

  .box-header .content img {
    width: 86px;
    height: 90px;
  }

  .box-header .content span {
    font-size: 13px;
    color: #797979;
    padding-top: 10px;
  }
  .box-header .register.content{
    .col;
    justify-content: flex-start;
  }
  .box-header .register.content  span{
    color: #d5b053;
    font-size:13px;
    padding:0 30px;
  }


  .box-child {
    .row;
    border-top: 1px solid #707980;
  }



</style>
<script>
  import {  Popover } from 'element-ui'
  import Vue from 'vue'
  Vue.use(Popover)
    import { translate } from '@/tool/filters'

  export default {
    name:'networkNode1',
    props:['ndata'],
    data () {
      return {
        popover_data: {
          name: '',
          new: [null, null],//新增业绩
          sum: [null, null],//累计业绩
          equal: [null, null],//对等余额
          team: [null, null],//团队
        },
      }
    },
    methods:{
      dealRegister(data) {
        if (data && data.child) {
          if (data.child.length == 0) {
            data.child[0] = null;
            data.child[1] = null;
          }
          if (data.child.length == 1) {
            var pos = data.child[0].JDPosition >= 1 ? Number(data.child[0].JDPosition) - 1 : 0;
            var registerPos = 1 - pos;
            data.child[pos] = data.child[0];
            data.child[registerPos] = null;
          }
        }
      },
      currentNetWork(){
       var UserId = this.$refs.clicknode.children[2].innerText;
       var UserCode = this.$refs.clicknode.children[1].innerText;
       this.postUderId = UserId;
       this.postUserCode = UserCode;
      
       this.$store.commit('GET_NETWORK',this.postUserCode)
      //  this.$emit('rebind-network',this.postUderId)
      }
    }
  }
</script>
