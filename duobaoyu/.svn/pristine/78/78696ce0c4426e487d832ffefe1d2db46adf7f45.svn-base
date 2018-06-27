<template>
  <div class="shop_Car My_order">
    <div class="tab_content">
      <div class="table_head">
        <div class="head_item">流水号</div>
        <div class="head_item">订单状态</div>
        <div class="head_item head_item_3" style="width:15%;">总金额</div>
        <div class="head_item">下单时间</div>
      </div>
      <div class="table_body">
         <div v-if="!hasData" class="body_items no_data">
              订单为空！快去购物吧！
            </div>
        <div class="body_items" v-for="(item,index) in tableData" :key="index">
          <div class="body_item body_item1">
            <div class="item1_box">
             {{item.SerialNumber}}
            </div>
          </div>
          <div class="body_item body_item2">
            <div class="item1_box">
             {{item.Status | orderListStatusFilter}}
            </div>
            <!-- <div class="good_price">
                名称
            </div> -->
          </div>
          <div class="body_item body_item3">
            <div class="amount">{{item.Total}}</div>
          </div>
          <div class="body_item body_item4">
            <div class="good_price">
             {{item.CreateDate}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="shopfoot" v-if="!hasData">
      <pagination :page="page" v-on:first-page="firstPage" v-on:last-page="lastPage" v-on:pre-page="prePage" v-on:next-page="nextPage"></pagination>
    </div>
  </div>
</template>

<script>
  import pagination from '@/components/pagination'
  import * as ajax from "@/api/common";

  export default {
    data() {
      return {
        hasData:true,
        page: {
          defaultPage: '1',
          currentPage: '',
          totalPage: '',
          
        },
        tableData: []
      }
    },
    created(){
      this.bindList()
    },
    methods: {
      bindList() {
        ajax.post('/api/mall/OrderList',{pageNum:this.page.defaultPage}).then(response=>{
            console.log(response);
            if(response.Data.Data.length==0){
              this.hasData=false
            }
            this.tableData=response.Data.Data;
             this.page.totalPage = response.Data.PageCount;
            this.page.currentPage = response.Data.PageNum;
            console.log(this.page.totalPage)
        })
      },
      firstPage(firstPage) {
        this.page.defaultPage = firstPage;
        console.log('f', this.page.defaultPage)
        this.bindList()
      },
      lastPage(lastPage) {
        this.page.defaultPage = lastPage;
        console.log('l', this.page.defaultPage)
        this.bindList()
      },
      prePage(prePage) {
        this.page.defaultPage = prePage;
        console.log('n', this.page.defaultPage)
        this.bindList()
      },
      nextPage(nextPage) {
        this.page.defaultPage = nextPage;
        console.log('p', this.page.defaultPage)
        this.bindList()
      },
    },
    components: {
      pagination
    }
  }
</script>

<style>

</style>
