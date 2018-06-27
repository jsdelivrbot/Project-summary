<template id="network-node">
  <div class="box" v-bind="dealRegister(ndata)">
    <el-popover v-if="ndata" ref="popover4" placement="right" width="225" @show="topopover(ndata)" trigger="hover">
      <div class="sm-table">
        <div class="sm-tr">
          <span style="font-size: 14px;">{{popover_data.NickName}}</span>
        </div>
        <div class="sm-tr">
          <div class="half">
            <span>
                {{'左'| translate}}
                </span>
          </div>
          <div class="half">
            <span>
                {{'右'| translate}}
                </span>
          </div>
        </div>
        <div class="sm-tr">
          <span>
              {{'业绩'| translate}}
              </span>
        </div>
        <div class="sm-tr">
          <!--业绩-->
          <div class="half">
            <span>
                {{popover_data.new[0]}}
                </span>
          </div>
          <div class="half">
            <span>
                {{popover_data.new[1]}}
                </span>
          </div>
        </div>
        <div class="sm-tr">
          <span>
              {{'累计'| translate}}
              </span>
        </div>
        <div class="sm-tr">
          <!--累计-->
          <div class="half">
            <span>
                {{popover_data.sum[0] + popover_data.sum[1]}}
                </span>
          </div>
        </div>
        <div class="sm-tr">
          <span>
              {{'对等余额'| translate}}
              </span>
        </div>
        <div class="sm-tr">
          <!--对等余额-->
          <div class="half">
            <span>{{popover_data.equal[0]}}</span>
          </div>
          <div class="half">
            <span>{{popover_data.equal[1]}}</span>
          </div>
        </div>
        <div class="sm-tr">
          <span>
              {{'团队人数'| translate}}
              </span>
        </div>
        <div class="sm-tr">
          <!--团队人数-->
          <div class="half">
            <span>{{popover_data.team}}</span>
          </div>
          <!-- <div class="half">
              <span>{{popover_data.team[1]}}</span>
            </div> -->
        </div>
      </div>
      <div slot="reference" class="box-header" >
        <!-- <div class="shuline" v-show="!ndata.isTop"></div> -->
        <!-- 点击以展开当前用户为起点的安置图 -->
        <!-- <a class="content" ref="clicknode" @hover="topopover(ndata)" @click="currentNetWork"> -->
        <a class="content" ref="clicknode" @hover="topopover(ndata)">
          <img :src="'/static/img/c'+ ndata.LevelId+'.png'" />
          <span>{{ndata.UserCode}}</span>
          <span v-show="false">{{ndata.UserId}}</span>
        </a>
        <div class="shuline" v-show="ndata.child && ndata.child.length > 0"></div>
      </div>
    </el-popover>
    <div v-if="ndata" class="box-child" v-show="ndata.child&&ndata.child.length> 0" >
      <template v-for="(item, index) in ndata.child" >
          <div class="box" v-if="item == null ">
            <div class="box-header">
              <div class="shuline" ></div>
              <div class="content register">
                <span @click="register(ndata.UserCode, index)" style="cursor:pointer"><i class="iconfont"></i>
                {{'注册'| translate}}
                </span>
              </div>
            </div>
          </div>
          <network-node :ndata="item"  v-else-if="item != null"></network-node>
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
  content: " ";
  width: 50%;
  height: 1px;
  background: #fff;
  position: absolute;
  right: 0;
  top: -1px;
}
.box:first-child:before {
  content: " ";
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
.box-header .register.content {
  .col;
  justify-content: flex-start;
}
.box-header .register.content span {
  color: #d5b053;
  font-size: 13px;
  padding: 0 30px;
}
.box-child {
  .row;
  border-top: 1px solid #707980;
}
</style>

<script>
import { Popover } from "element-ui";
import Vue from "vue";
Vue.use(Popover);
import { translate } from "@/tool/filters";
export default {
  name: "networkNode",
  props: ["ndata"],
  data() {
    return {
      popover_data: {
        name: "",
        new: [null, null], //新增业绩
        sum: [null, null], //累计业绩
        equal: [null, null], //对等余额
        team: 0 //团队
      },
      postUderId: ""
    };
  },
  mounted() {},
  methods: {
    topopover(data) {
      let _self = this;
      _self.popover_data.name = data.NickName; //'测试张三'
      _self.popover_data.new = [data.LeftAdd, data.RightAdd]; //新增业绩
      _self.popover_data.sum = [data.LeftAdd, data.RightAdd]; //累计业绩
      _self.popover_data.equal = [data.LeftRest, data.RightRest]; //对等余额
      _self.popover_data.team = data.JDLeftChildCount + data.JDRightChildCount; //团队人数
    },
    dealRegister(data) {
      if (data && data.child) {
        if (data.child.length == 0) {
          data.child[0] = null;
          data.child[1] = null;
        }
        if (data.child.length == 1) {
          var pos =
            data.child[0].JDPosition >= 1
              ? Number(data.child[0].JDPosition) - 1
              : 0;
          var registerPos = 1 - pos;
          data.child[pos] = data.child[0];
          data.child[registerPos] = null;
        }
      }
    },
    currentNetWork() {

      var UserId = this.$refs.clicknode.children[2].innerText;
      var UserCode = this.$refs.clicknode.children[1].innerText;
      this.postUderId = UserId;
      this.postUserCode = UserCode;

      this.$store.commit("GET_NETWORK", this.postUserCode);
      //  this.$emit('rebind-network',this.postUderId)
    },
    //注册
    register(UserCode, index) {
      this.$router.push({
        name: "register1",
        params: {
          UserCode: UserCode,
          position: ++index
        }
      });
    }
  }
};
</script>
