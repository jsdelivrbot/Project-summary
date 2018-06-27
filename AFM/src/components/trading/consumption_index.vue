<template>
  <!--消费指数交易中心-->
  <div class="container edit_profile ">
    <div class="marTop330 com-register-fr">
      <div class="mhalf m-b-lg Exchanges_expoent_left">
        <div class="con-title-fr">
          <div class="sub-fr"></div> <span class="con-title">
                            {{'我的消费指数'| translate}}
                          </span></div>
        <div class="com-register-desc">
          <el-table :data="priceData" style="width: 100%" max-height="280" :stripe="true" :show-summary="true" :class="'table-redTop'">
            <el-table-column prop="Price" :label="'买入价'| translate">
            </el-table-column>
            <el-table-column prop="Count" :label="'当前持有量'| translate">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="mhalf m-b-lg Exchanges_expoent_right">
        <div class="con-title-fr">
          <div class="sub-fr"></div> <span class="con-title">
                            {{'我的交易指数'| translate}}
                          </span></div>
        <div class="com-register-desc">
          <div class="Exchanges_expoent_right_bar">
            <div class="Exchanges_expoent_right_bar_bx clearfix">
              <span>
                    {{'总计收益'| translate}}
                    </span>
              <i v-text="userInfo.IncomeTotal"></i>
            </div>
          </div>
          <div class="Exchanges_expoent_right_bar">
            <div class="Exchanges_expoent_right_bar_bx clearfix">
              <span>
                    {{'实拿收益'| translate}}
                    </span>
              <i v-text="userInfo.RealIncome"></i>
            </div>
          </div>
          <div class="Exchanges_expoent_right_bar">
            <div class="Exchanges_expoent_right_bar_bx clearfix">
              <span>
                    {{'已提现收益'| translate}}
                    </span>
              <i v-text="userInfo.RemittanceTotal"></i>
            </div>
          </div>
          <div class="Exchanges_expoent_right_bar">
            <div class="Exchanges_expoent_right_bar_bx clearfix">
              <span>
                    {{'剩余可提现收益'| translate}}
                    </span>
              <i v-text="userInfo.WalletAmount"></i></div>
          </div>
          <div class="Exchanges_expoent_right_btn clearfix">
            <router-link to="/finance/cash">
              <input type="submit" class="btn red-btn com-btn fl" :value="'提现'| translate">
            </router-link>
            <router-link to="consume/record" tag="span">
              <input type="submit" class="btn red-btn com-btn fr" :value="'交易记录'| translate">
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="Exchanges_expoent_bottom container ">
      <div class="mhalf m-b-lg ">
        <div class="con-title-fr">
          <div class="sub-fr"></div>
          <span class="con-title">
                            {{'消费指数价格变化'| translate}}
                          </span>
        </div>
        <div class="com-register-desc">
          <div class="Exchanges_expoent_bottom_btnList clearfix">
            <div class="Exchanges_expoent_bottom_btnList_btn">
              <span>
                    {{'当前价格'| translate}}
                    :</span>
              <i v-text="userInfo.CurrentPrice"></i>
            </div>
            <div class="Exchanges_expoent_bottom_btnList_btn">
              <span>
                    {{'当前价格已成交量'| translate}}
                    :</span>
              <i v-text="userInfo.RiseLimit"></i>
            </div>
            <div class="Exchanges_expoent_bottom_btnList_btn">
              <span>
                    {{'涨价还需成交量'| translate}}
                    :</span>
              <i v-text="userInfo.RiseBase - userInfo.RiseLimit"></i>
            </div>
          </div>
          <div class="Exchanges_expoent_bottom_date">
            <!-- <div class="com-filter-ar">
              <div class="minput-area">
                <div class="mrange-fr">
                  <el-date-picker 
                  value-format="yyyy/MM/dd HH:mm:ss"
                  class="mrange" v-model="minDate" type="datetime" :placeholder="'选择日期时间'| translate">
                  </el-date-picker>
                  <span class="m-l m-r">{{'至'| translate}}</span>
                  <el-date-picker 
                  value-format="yyyy/MM/dd HH:mm:ss"
                  class="date" v-model="maxDate" type="datetime" :placeholder="'选择日期时间'| translate">
                  </el-date-picker>
                </div>
                <div class="mbtn-area">
                  <a @click="toggleEchart(5)" href="javascript:;" class=" btn white-btn">
                    <span>
                    重置
                    </span>
                  </a>
                  <a @click="toggleEchart(4)" href="javascript:;" class="mbtn-area btn red-btn">
                    <span>
                      查询
                    </span>
                  </a>
                </div>
              </div>
              <div class="mbtn-area">
                <div class="Exchanges_expoent_bottom_date_list">
                  <ul class="clearfix">
                    <li :class="{active: 1 == selectDate}" @click="toggleEchart(1)">
                      24{{'小时'| translate}}
                    </li>
                    <li :class="{active: 2 == selectDate}" @click="toggleEchart(2)">
                      {{'周'| translate}}
                    </li>
                    <li :class="{active: 3 == selectDate}" @click="toggleEchart(3)">
                      {{'月'| translate}}
                    </li>
                  </ul>
                </div>
              </div>
            </div> -->
            <div class="Exchanges_expoent_bottom_date_inner">
              <div ref="chartBox" class="Exchanges_expoent_bottom_date_inner_chart">
              </div>
            </div>
          </div>
          <div class="Exchanges_expoent_bottom_tips clearfix">
            <div class="Exchanges_expoent_bottom_tips_msg fl">
              <span>{{'温馨提示：您已参与了' | translate}}</span>
              {{ userInfo.SplitTime | SplitTimeType}}
              <span>{{'次拆分，参与下次拆分条件' | translate}}</span>
              （{{userInfo.ZTHasComplete ? '已完成' : '未完成' | translate}}）；
              <span>{{'参与下次复投条件' | translate}}</span>
              （{{userInfo.FTHasComplete ? '已完成' : '未完成' | translate}}）
            </div>
            <div class="Exchanges_expoent_bottom_tips_btn">
              <div v-if="!userInfo.FTHasComplete" class="btn-fillet fr " @click="handlerFuTou">
                {{'复投'| translate}}
              </div>
              <router-link v-if="!userInfo.ZTHasComplete" to="/market/register" tag="div" :class="'btn-fillet fr m-r-lg'">
                {{'推荐'| translate}}
              </router-link>
               <div v-if="userInfo.NeedYDJH" class="btn-fillet fr m-r-sm" @click="handlerYDJiHuo">
                {{'原点激活'| translate}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogData.d_visible" class="common-dialog" :class="'dialog_1'">
      <div slot="title">
        <div class="con-title-fr">
          <div class="sub-fr"></div>
          <span class="con-title">{{dialogData.title | translate}}</span>
        </div>
      </div>
      <div class="m-dialog-content">
        <p class="tcenter">{{dialogData.message | translate}}</p>
      </div>
      <div slot="footer"  style="padding-bottom: 40px;font-size: 13px;">
        <div class="row con-betwwen item-center">
          <a href="javascript:;" @click="dialogData.cancel" class="btn white-btn com-btn" style="font-size: 13px;">{{'取消' | translate}}</a>
          <a href="javascript:;" @click="dialogData.confirm" class="btn red-btn com-btn" style="font-size: 13px;">{{'确定' | translate}}</a>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { translate } from "@/tool/filters";
import echarts from "echarts";
import { parseTime } from "@/tool/index";
export default {
  data() {
    return {
      priceData: [],
      params: {
        token: this.$store.state.token,
        userId: this.$store.getters.getUserId
      },
      userInfo: {},
      dialogData: {
        d_visible: false,
        title: "",
        message: "",
        cancel: () => {
          this.dialogData.d_visible = false;
        },
        confirm: function() {}
      },
      echartLine: null,
      echartData: {
        x: null,
        y: null
      },
      echartOption: null,
      selectDate: 1,
      minDate: null,
      maxDate: null,
      tableData: [
        {
          date: "0.022",
          name: "6891"
        },
        {
          date: "0.022",
          name: "689411"
        },
        {
          date: "0.023",
          name: "68931"
        },
        {
          date: "0.0432",
          name: "6891"
        },
        {
          date: "0.0432",
          name: "6891"
        }
      ]
    };
  },
  methods: {
    // 复投
    handlerFuTou() {
      this.dialogData.title = translate("提示");
      this.dialogData.message = translate("确认要复投吗");
      this.dialogData.d_visible = true;
      this.dialogData.confirm = () => {
        this.axios
          .post("/api/user/FuTouZiUser", {
            token: this.params.token,
            userId: this.params.userId
          })
          .then(res => {
            this.$message({
              message: translate("复投成功"),
              duration: 1 * 1000,
              type: "success",
              onClose: () => {
                location.reload();
              }
            });
          })
          .catch(err => {});
      };
    },
    // 原点激活
    handlerYDJiHuo() {
      this.dialogData.title = translate("提示");
      this.dialogData.message = translate("确认要原点激活吗");
      this.dialogData.d_visible = true;
      this.dialogData.confirm = () => {
        this.axios
          .post("/api/user/YDJiHuoSelf", {
            token: this.params.token,
            userId: this.params.userId
          })
          .then(res => {
            this.$message({
              message: translate("原点激活成功"),
              duration: 1 * 1000,
              type: "success",
              onClose: () => {
                location.reload();
              }
            });
          })
          .catch(err => {});
      };
    },
    // 分价格数据
    toggleEchart(id) {
      // 重置
      this.echartData.x = [];
      this.echartData.y = [];

      var minDate,
        maxDate = parseTime(new Date(), "{y}/{m}/{d} {h}:{i}:{s}");

      if (id) {
        this.selectDate = id;
      } else {
        this.selectDate = 1;
      }

      if (this.selectDate === 1) {
        minDate = parseTime(
          new Date(new Date().valueOf() - 24 * 60 * 60 * 1000),
          "{y}/{m}/{d} {h}:{i}:{s}"
        );
      } else if (this.selectDate === 2) {
        minDate = parseTime(
          new Date(new Date().valueOf() - 7 * 24 * 60 * 60 * 1000),
          "{y}/{m}/{d} {h}:{i}:{s}"
        );
      } else if (this.selectDate === 3) {
        minDate = parseTime(
          new Date(new Date().valueOf() - 30 * 24 * 60 * 60 * 1000),
          "{y}/{m}/{d} {h}:{i}:{s}"
        );
      } else if (this.selectDate === 4) {
        // 查询
        minDate = this.minDate;
        maxDate = this.maxDate;
      } else if (this.selectDate === 5) {
        // 重置
        this.minDate = "";
        this.maxDate = "";
        this.selectDate = 1;
        minDate = parseTime(
          new Date(new Date().valueOf() - 24 * 60 * 60 * 1000),
          "{y}/{m}/{d} {h}:{i}:{s}"
        );
      }

      this.echartOption = {
        title: {
          text: ""
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          top: "4%",
          left: "4%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.echartData.x,
          axisLine: {
            lineStyle: {
              color: "#7f9aa8"
            }
          }
        },
        yAxis: {
          min: 0.2,
          max: 0.4,
          type: "value",
          maxInterval: 0.01,
          axisLine: {
            lineStyle: {
              color: "#7f9aa8"
            }
          }
        },
        series: [
          {
            type: "line",
            smooth: true,
            symbolSize: 8,
            data: this.echartData.y,
            itemStyle: {
              normal: {
                color: "#49da90"
              }
            }
          }
        ]
      };

      this.echartLine.showLoading({
        color: "#c23531",
        textColor: "#fff",
        maskColor: "rgba(0,0,0, 0.8)",
        zlevel: 0
      });

      // 请求
      this.axios
        .post("/api/stock/GetStockNet", {
          token: this.params.token,
          userId: this.params.userId,
          minDate: minDate,
          maxDate: maxDate
        })
        .then(res => {
          var data = res.Data;

          for (var i = 0; i < data.length; i++) {
            var item = data[i];
            this.echartData.x.push(
              parseTime(new Date(item.CreateDate), "{y}-{m}-{d}")
            );
            this.echartData.y.push(item.Price);
          }
          this.echartLine.setOption(this.echartOption);
          this.echartLine.hideLoading();
        })
        .catch(err => {
          this.echartLine.hideLoading();
        });
    }
  },
  mounted() {
    //  消费指数交易——首页数据
    this.axios
      .post("/api/stock/GetUserInfoForStock", {
        token: this.params.token,
        userId: this.params.userId
      })
      .then(res => {
        this.userInfo = res.Data;
      })
      .catch(err => {});

    // 买入价，持有量
    this.axios
      .post("/api/Stock/GetMyStockPriceForIndex", {
        token: this.params.token,
        userId: this.params.userId
      })
      .then(res => {
        this.priceData = res.Data;
      })
      .catch(err => {});
    this.echartLine = echarts.init(this.$refs.chartBox);
    this.toggleEchart();
    window.onresize = () => {
      setTimeout(() => {
        this.echartLine.resize();
      }, 100);
    };
  }
};
</script>
