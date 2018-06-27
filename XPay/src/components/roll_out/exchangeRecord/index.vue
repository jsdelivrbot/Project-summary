<template>
    <div class="balanceRecord bgWhite">
        <top-bar :back-type="2"><span slot="content">{{'兑换记录' | translate}}</span></top-bar>
        <record-one :record-data="recordData"></record-one>
    </div>
</template>

<script>
import recordOne from "src/common/components/recordOne";
export default {
  components: {
    recordOne
  },
  data() {
    return {
      recordData: {
        header: ["余额", "兑换积分", "兑换时间"],
        type: 2,
        id: 1
      }
    };
  }
};
</script>

<style>

</style>
