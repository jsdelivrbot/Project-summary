<template>
    <div class="balanceRecord backPadding bgWhite">
        <top-bar :back-type="2"><span slot="content">{{'余额记录' | translate}}</span></top-bar>
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
        header: ["业务类型", "数额", "时间"],
        type: 0
      }
    };
  }
};
</script>

<style>

</style>
