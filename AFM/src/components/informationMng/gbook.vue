<template>
  <!--奖励明细-->
  <div class="container marTop330 award">
    <div class="com-div-fr">
      <div class="con-title-fr is-tab">
        <div class="sub-fr"></div>
        <div class=" tab-fr">
          <div class="tab " @click="changeTab(index)" :class="curIndex==index?'active':''" v-for="(item,index) in award_detail">
            <span>{{item | translate}}</span>
          </div>
        </div>
      </div>
      <form @submit.prevent="tocheckExchange" class="desc com-changepwd-desc" v-show="curIndex == 0">
        <div class="input-ar">
          <label>
                  <i class="iconfont red">&#xe609;</i>
                  {{'标题'| translate}}
                </label>
          <div class="right">
            <input class="input-area" type="text" v-model="formData.Title.value" />
          </div>
        </div>
        <div class="input-ar">
          <label>
                  <i class="iconfont red">&#xe609;</i>
                  {{'主题'| translate}}
                </label>
          <div class="right">
            <input class="input-area" type="text" v-model="formData.MainTitle.value" />
          </div>
        </div>
        <div class="input-ar">
          <label>
                  <i class="iconfont red">&#xe609;</i>
                  {{'联系方式'| translate}}
                </label>
          <div class="right">
            <input class="input-area" type="text" v-model="formData.SubTitle.value" />
          </div>
        </div>
        <div class="input-ar">
          <label><i class="iconfont red">&#xe609;</i>
                  {{'收信人'| translate}}
                </label>
          <div class="right">
            <el-select class="input-area" v-model="formData.ReceiverType.value" :placeholder="'--请选择--' | translate">
              <el-option v-for="item in sendType" :key="item.value" :label="item.label | translate" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="input-ar" v-if="this.formData.ReceiverType.value != 2">
          <label>
                  <i class="iconfont red">&#xe609;</i>
                  {{'收信人编号'| translate}}
                </label>
          <div class="right">
            <input class="input-area" type="text" v-model="formData.UserCode.value" />
          </div>
        </div>
        <div class="input-ar">
          <label>
                  <i class="iconfont red">&#xe609;</i>
                  {{'内容'| translate}}
                </label>
          <div class="right">
            <el-input type="textarea" :rows="8" :placeholder="'请输入内容'| translate" v-model="formData.Content.value">
            </el-input>
          </div>
        </div>
        <div class="btn-ar">
          <input type="submit" @click="btnSubmit" :value="'提交' | translate" class="btn com-btn red-btn" />
        </div>
      </form>
      <div class="mtable" v-show="curIndex == 1">
        <div class="mtable">
          <div class="com-filter-ar  ">
            <div class="minput-area">
              <span style="flex:none;width:70px;font-size: 13px;">
                    {{'日期'| translate}}
                    </span>
              <div class="mrange-fr">
                <el-date-picker value-format="yyyy/MM/dd HH:mm:ss" class="mrange" v-model="filter.minDate" type="datetime" :placeholder="'选择日期时间'| translate">
                </el-date-picker>
                <span class="m-l m-r">{{'至'| translate}}</span>
                <el-date-picker value-format="yyyy/MM/dd HH:mm:ss" class="mrange" v-model="filter.maxDate" type="datetime" :placeholder="'选择日期时间'| translate">
                </el-date-picker>
              </div>
              <el-select class="jihuo" v-model="filter.status" :placeholder="'--是否未读--'| translate">
                <el-option v-for="item in filter.option" :key="item.value" :label="item.label | translate" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="mbtn-area">
              <a href="javascript:;" class=" btn white-btn" @click="btnReset">
                <span>
                      {{'重置'| translate}}
                      </span>
              </a>
              <a href="javascript:;" @click="btnSearch" class="mbtn-area btn red-btn">
                <span>
                      {{'查询'| translate}}
                      </span>
              </a>
            </div>
          </div>
          <div class="table-fr">
            <el-table :data="tableData" style="width: 100%" stripe border height="250">
              <el-table-column prop="ReceiverDisplayName" fixed :label="'收信人' | translate">
              </el-table-column>
              <el-table-column prop="MainTitle" :label="'标题'| translate">
              </el-table-column>
              <el-table-column prop="Content" :label="'内容'| translate">
              </el-table-column>
              <el-table-column prop="CreateDate" :label="'提交时间'| translate">
              </el-table-column>
              <el-table-column prop="IsRead" :label="'是否未读'| translate">
              </el-table-column>
              <el-table-column :label="'操作'| translate">
                <template slot-scope="scope">
                    <router-link tag="span" :to="{name: 'gbook_detail', params: {id: scope.row.MsgId}}" :class="'c_green btn_pointer'">
                      {{'详情'| translate}}
                    </router-link>
                </template>
              </el-table-column>
          </el-table>
          </div>
         <div class="mpagination">
                    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pagenum" :page-sizes="[10, 20]" :page-size="pageSize" layout="sizes,prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
        </div>
       </div>
    </div>
  </div>
</template>

<style lang="less">
  @import (reference) "./../../style/css/main.less";
  @import "./../../style/css/com_table_header.less";
  @import "./../../style/css/com_table.less";
  .award {
    padding: 0 30/@rem;
    padding-bottom: 57px;
  }
</style>

<script>
  import {
    translate,
    readStatus
  } from "@/tool/filters";
  import {
    getList
  } from "./../../tool/data";
  export default {
    data() {
      return {
        tableData: [],
        sendType: [{
            label: "会员",
            value: 1
          },
          {
            label: "管理员",
            value: 2
          }
        ],
        formData: {
          Title: {
            label: "标题",
            value: ""
          },
          MainTitle: {
            label: "主题",
            value: ""
          },
          SubTitle: {
            label: "联系方式",
            value: ""
          },
          ReceiverType: {
            label: "收信人类型",
            value: ""
          },
          UserCode: {
            label: "收信人编号",
            value: ""
          },
          Content: {
            label: "内容",
            value: ""
          }
        },
        award_detail: ["我要留言", "我的留言"],
        curIndex: 0,
        pagenum: 1,
        pageSize: 20,
        total: 0,
        filter: {
          minDate: "",
          maxDate: "",
          status: "",
          option:[
            {
              label: '是',
              value: true
            },
            {
               label: '否',
              value: false
            }
          ]
        }
      };
    },
    methods: {
     // 重置
    btnReset() {
      // 重置filter
       for (var k in this.filter) {
         this.filter[k] = "";
        }
      this.getTabData();
    },
    btnSearch() {
      // 查询
      this.getTabData();
    },
      // 发送站内信
      reset() {
        for(var x in this.formData){
          this.formData[x].value=''
        }
      },
      btnSubmit() {
        var isUserCode = true;
        // 验证
        for (var k in this.formData) {
          if (this.formData.ReceiverType.value != 2 || k != "UserCode") {
            if (this.formData[k].value === "") {
              this.$message({
                type: "error",
                message: translate("请输入") + translate(this.formData[k].label),
                duration: 1 * 1000
              });
              return;
            }
          } else {
            isUserCode = false;
          }
        }
        // 发送站内信
        var params = {};
        for (var kk in this.formData) {
          params[kk] = this.formData[kk].value;
        }
        if (!isUserCode) {
          delete params["UserCode"];
        }
        params.token = this.$store.state.token,
        params.userId = this.$store.getters.getUserId
        this.axios
          .post("/api/Content/SendEmail", params)
          .then(res => {
            if (res.Code == 0) {
              this.$message({
                type: 'success',
                duration: 1 * 1000,
                message: translate('发送成功')
              })
              this.reset()
            }
          });
      },
      tocheckExchange() {},
      changeTab(index) {
        //改变tab
        let _self = this;
        _self.curIndex = index;
        _self.getTabData();
      },
      getTabData() {
        //获取tab data数据
        var params = {};
        params.token = this.$store.state.token,
        params.userId = this.$store.getters.getUserId,
        params.minDate = this.filter.minDate,
        params.maxDate = this.filter.maxDate,
        params.isRead = this.filter.status,
        params.PageNum = this.pagenum,
        this.axios.post('/api/content/GetEmailList', params).then(res => {
          
          res.Data.Data.forEach(element => {
            element.IsRead = readStatus(element.IsRead)
          });
          this.tableData = res.Data.Data;
          
          this.total = res.Data.ItemCount;
        })
      },
      handleSizeChange() {
        this.getTabData()
      },
      handleCurrentChange() {
        this.getTabData()
      }
    },
    mounted() {
      // 判断是否是要切换到我的留言
      
      
      if (this.$route.params.isEmail) {
        this.curIndex = 1;
        this.getTabData()
      }
      // 发送站内信
      // this.axios
      // .post("/api/Touzi/SendEmail", {
      //   token: this.$store.state.token,
      //   userId: this.$store.getters.getUserId
      // })
      // .then(res => {});
    }
  };
</script>
