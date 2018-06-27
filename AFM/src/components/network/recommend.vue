<template>
  <!--推荐网络-->
  <div class="container marTop330 network">
    <div class="com-div-fr">
      <div class="con-title-fr" style="border-bottom:1px solid #e5e5e5;">
        <div class="sub-fr"></div>
        <span class="con-title">
            {{'推荐网络'| translate}}
          </span>
      </div>
      <div class="network-filter">
        <div class="level-fr">
          <img class="lev-img" :src="'/static/img/c'+index+'.png'" v-for="(item,index) in 8" />
        </div>
        <div class="filter-ar">
          <input type="text" v-model="search_userCode" :placeholder="'会员编号'| translate" class="search-input" />
          <a href="javascript:;" @click="tocheck" class="btn com-btn red-btn">
            <i class="iconfont">&#xe718;</i> {{'查询'| translate}}
          </a>
          <!-- <a href="javascript:;" class="btn com-btn purple-btn" @click="Upper_story">
              {{'上一层'| translate}}
            </a>
          <a href="javascript:;" class="btn com-btn purple-btn" @click="topper_story">
              {{'顶层'| translate}}
            </a> -->
        </div>
      </div>
    </div>
    <div class="com-div-fr network-map" id="network_jd">
      <net-node1 :ndata="ndata" :type="net_type"> </net-node1>
    </div>
  </div>
</template>

<style lang="less">
@import (reference) "../../style/css/main.less";
@import "../../style/css/com_network.less";
</style>

<script>
import { translate } from "@/tool/filters";
export default {
  components: {
    "net-node1": () =>
      import(/*webpackChunkName:"netnode"*/ "@/components/network/node2.vue")
  },
  data() {
    return {
      idTop: "",
      refID: "popover4",
      search_userCode: null,
      nodeUderId: "",
      userCode: "",
      params: {
        userId: null, //string	会员id,唯一标识
        TopUserId: null, //string	网络图顶端会员id,唯一标识
        token: null, //	string	登录成功后,返回的token值
        userCode: null //会员编号（点击上一层的时候，需要传网络图第一个会员的安置人人会员编号）
      },
      ndata: null,
      nodeTree: null,
      networkData: null,
      net_type: 1 //1、安置网络  2、推荐网络
    };
  },
  mounted() {
    var user = JSON.parse(localStorage.getItem("amf_user"));
    this.userCode = user.user.UserCode;

    let _self = this;
    _self.params.token = _self.$store.state.token;
    _self.params.userId = _self.$store.getters.getUserId;
    _self.params.TopUserId = _self.params.userId;
    if (_self.params.TopUserId) {
      _self.getNetworkData();
    }

    // 保存顶层的userCode

    this.axios
      .post("/api/user/GetTJTreeData", {
        token: this.$store.state.token,
        userId: this.$store.getters.getUserId,
        userCode: this.userCode,
        isTop: true
      })
      .then(res => {
        this.idTop = res.Data[0].UserCode;
      })
      .catch(err => {});
  },
  methods: {
    tocheck() {
      this.userCode = this.search_userCode;
      this.params.token = this.$store.state.token;
      this.params.userId = this.$store.getters.getUserId;
      this.params.userCode = this.userCode;
      this.params["isTop"] = "";
      this.getNetworkData();
    },
    getNetworkData() {
      let _self = this;
      
      _self.axios
        .post("/api/user/GetTJTreeData", _self.params)
        .then(res => {
          //_self.dealData(res.Data);

          _self.dealData(res.Data);
        })
        .catch(err => {});
    },
    dealData(data) {
      var Tree = {
        tree: null
      };
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var index = i;
        var nodeTree = this.getRootNode(Tree, item, this.userCode);
        this.nodeTree = nodeTree;
        var newTree = this.findNext(nodeTree, item);
        this.ndata = this.constructTree(newTree, item);
      }

      //
    },
    getRootNode(Tree, item, userCode) {
      //
      //this.getNextNode(Tree,item)
      var nodeTree = null;
      if (item.UserCode == userCode) {
        Tree.tree = {
          isTop: true,
          UserId: item.UserId,
          UserCode: item.UserCode,
          NickName: item.NickName,
          TJUserCode: item.TJUserCode,
          LevelId: item.LevelId,
          LeftAdd: item.LeftAdd,
          RightAdd: item.RightAdd,
          LeftRest: item.LeftRest,
          RightRest: item.RightRest,
          Total: item.Total,
          child: []
        };
      }
      nodeTree = Tree.tree;
      return nodeTree;
    },
    getNextNode(Tree, item) {
      var newTree = Tree;
      var posNum;
      if (item.TJUserCode == Tree.UserCode) {
        var pos = item.TJPosition >= 1 ? Number(item.TJPosition) - 1 : 0;
        var registerPos = 1 - pos;
        if (newTree.child == undefined) {
          newTree["child"] = [];
          newTree.child[pos] = item;
        } else {
          newTree.child[pos] = item;
        }
      }
      return newTree;
    },
    constructTree(newTree, item) {
      var new_Tree = newTree;
      var child = [];
      var Tree_child = [];
      if (new_Tree.child.length > 0) {
        for (var i = 0; i < new_Tree.child.length; i++) {
          var pos =
            new_Tree.child[i].TJPosition >= 1
              ? Number(new_Tree.child[i].TJPosition) - 1
              : 0;
          var registerPos = 1 - pos;
          var new_child_tree = this.getNextNode(new_Tree.child[i], item);
          child[pos] = new_child_tree;
        }

        if (new_child_tree.child) {
          this.$set(new_Tree, "child", child);
        }
      }
      return newTree;
    },
    findNext(Tree, item) {
      var newtree = this.getNextNode(Tree, item);
      return newtree;
    },
    //上一层
    Upper_story() {
      this.userCode = this.nodeTree ? this.nodeTree.TJUserCode : this.userCode;
      this.params.userCode = this.userCode;
      this.getNetworkData();
    },
    //顶层
    topper_story() {
      this.params["isTop"] = true;
      this.userCode = this.idTop;
      this.getNetworkData();
    }
  },
  watch: {
    getNodeUserCode(newVal, oldVal) {
      if (newVal) {
        let _self = this;
        _self.params.token = _self.$store.state.token;
        _self.params.userId = _self.$store.getters.getUserId;
        _self.params.userCode = newVal;
        _self.params['isTop'] = '';

        this.userCode = newVal;
        this.getNetworkData();
      }
    }
  },
  computed: {
    getNodeUserCode() {
      return this.$store.state.netWork.userCode;
    }
  }
};
</script>
