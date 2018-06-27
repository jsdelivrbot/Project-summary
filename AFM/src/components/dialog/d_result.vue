<template>
  <el-dialog :visible.sync="data.d_visible" class="common-dialog">
    <div slot="title">
      <div class="con-title-fr">
        <div class="sub-fr"></div>
        <span class="con-title">{{data.title | translate}}</span>
      </div>
    </div>
    <div class="m-dialog-content">
      <p class="tcenter">{{data.message | translate}}</p>
    </div>
    <div slot="footer"  style="padding-bottom: 40px;font-size: 13px;">
      <div class="col con-center item-center" >
        <a @click="toclearData"
           class="btn red-btn com-btn" style="font-size: 13px;">
           {{'确定'| translate}}
           </a>
      </div>
    </div>

  </el-dialog>
</template>
<style lang="less">
  @import (reference) "../../style/css/main.less";
  @import (reference) "../../style/css/com_dialog.less";

</style>
<script>
  import {Dialog} from 'element-ui';
  import Vue from 'vue';
  Vue.use(Dialog);
    import { translate } from '@/tool/filters'

  export default {
    props:['data'],
    data () {
      return {}
    },
    methods:{
      toclearData(){
        //清除数据回到当前页面
        let _self = this;
        if(typeof _self.data.func != 'function'){
          location.href=location.href;
        }else{
          _self.data.func();
        }
      },
    }
  }
</script>
