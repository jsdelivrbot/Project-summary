<template>
  <!--安置网络-->
  <div class="container marTop330 network">

    <div class="com-div-fr" >
      <div class="con-title-fr" style="border-bottom:1px solid #e5e5e5;">
        <div class="sub-fr"></div>
        <span class="con-title">
          {{'安置网络'| translate}}
        </span>
      </div>
      <div class="network-filter">
        <div class="level-fr">
          <img class="lev-img" :src="'/static/img/c'+index+'.png'" v-for="(item,index) in 8"/>
        </div>
        <div class="filter-ar">
          <input type="text" v-model="search_userCode"
                 :placeholder="'会员编号' | translate"
                 class="search-input"/>
          <a href="javascript:;" @click="tocheck"
             class="btn com-btn red-btn">
            <i class="iconfont">&#xe718;</i>
            {{'查询'| translate}}
          </a>
          <a href="javascript:;" class="btn com-btn purple-btn">
            {{'上一层'| translate}}
          </a>
          <a href="javascript:;" class="btn com-btn purple-btn">
            {{'顶层'| translate}}
          </a>
          <a href="javascript:;" class="btn com-btn purple-btn">
            {{'左区底层'| translate}}
          </a>
          <a href="javascript:;" class="btn com-btn purple-btn">
            {{'右区底层'| translate}}
          </a>
        </div>
      </div>
    </div>
    <div class="com-div-fr network-map" id="network_jd">
      <net-node :ndata="ndata" :type="net_type"> </net-node>
    </div>
  </div>
</template>
<style lang="less">
@import (reference) "../../style/css/main.less";
@import "../../style/css/com_network.less";

.el-popover {
  padding: 0;
}

.network .sm-table {
  .col;
}
.sm-tr {
  .row;
  .item-center;
  .con-center;
  padding: 10px 0;
}

.sm-tr span {
  font-size: 12px;
}

.sm-tr .half {
  .row;
  .item-center;
  .con-center;
}

.sm-tr:nth-child(2n) {
  background-color: #f6f6f6;
  color: #909090;
}

.sm-tr:nth-child(2n + 1) {
  background-color: #fff;
  color: #333;
}
</style>
<script>
import { translate } from "@/tool/filters";

export default {
  components: {
    "net-node": () =>
      import(/*webpackChunkName:"netnode"*/ "@/components/network/node.vue")
  },
  data() {
    return {
      refID: "popover4",
      search_userCode: null,
      params: {
        userId: null, //string	会员id,唯一标识
        TopUserId: null, //string	网络图顶端会员id,唯一标识
        token: null, //	string	登录成功后,返回的token值
        userCode: null//会员编号（点击上一层的时候，需要传网络图第一个会员的安置人人会员编号）
      },
      ndata: {
        isTop: true,
        LevelId: 1,
        name: "hy011010",
        child: []
      },
      net_type: 1 //1、安置网络  2、推荐网络
    };
  },
  mounted() {
    let _self = this;
    _self.params.token = _self.$store.state.token;
    _self.params.userId = _self.$store.getters.getUserId;
    _self.params.TopUserId = _self.params.userId;
    if (_self.params.TopUserId) {
      _self.getNetworkData();
    }

    setTimeout(() => {
      
    }, 2000);
  },
  methods: {
    tocheck() {
      let _self = this;
      if (!_self.params.TopUserId) {
        return;
      }
      _self.getNetworkData();
    },
    getNetworkData() {
      let _self = this;
      _self.axios
        .post("/api/user/GetJDTreeData", _self.params)
        .then(res => {
          _self.dealData(res.Data);
        })
        .catch(err => {});
    },
    dealData(data) {
      let _self = this;
      let Tree = { tree: null };
      for (let i of data) {
        let jdObj = _self.getRootNode(Tree, i);
        let toObj = {
          UserId: i.UserId,
          UserCode: i.UserCode,
          NickName: i.NickName,
          LevelId: i.LevelId,
          LeftAdd: i.LeftAdd,
          RightAdd: i.RightAdd,
          LeftRest: i.LeftRest,
          RightRest: i.RightRest,
          Total: i.Total,
          child: []
        };
        let pos = i.JDPosition >= 1 ? Number(i.JDPosition) - 1 : 0;
        _self.findnext(pos, jdObj, toObj);
      }
      _self.ndata = Tree.tree;
      let div_node = document.getElementById("network_jd");
      div_node.scrollLeft = 600;
    },

    getRootNode(Tree, i) {
      let _self = this;
      let jdObj = null;
      if (!Tree.tree || Object.keys(Tree.tree).length == 0) {
        //不存在
        Tree.tree = {
          isTop: true,
          UserId: i.JDUserId,
          UserCode: i.JDUserCode,
          NickName: i.JDNickName,
          LevelId: i.JDLevel,
          child: []
        };
        jdObj = Tree.tree;
      } else {
        jdObj = _self.findNode(Tree.tree, i);
      }
      return jdObj;
    },
    findNode(Tree, i) {
      let _self = this;
      if (Tree.UserId == i.JDUserId) {
        return Tree;
      } else {
        if (Tree.child.length == 2) {
          if (Tree.child[0]) {
            return _self.findNode(Tree.child[0], i);
          }
          if (Tree.child[1]) {
            return _self.findNode(Tree.child[1], i);
          }
        }
      }
    },
    findnext(pos, jdObj, toObj) {
      let _self = this;
      if (jdObj.child.length == 2 && jdObj.child[pos]) {
        _self.findnext(pos, jdObj.child[pos], toObj);
      } else {
        jdObj.child = [null, null];
        jdObj.child[pos] = toObj;
      }
    }
  }
};
</script>
