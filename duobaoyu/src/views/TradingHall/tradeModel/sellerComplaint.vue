<template>
    <div class="model_Box_wrapper checkInfo_model BuyerComplaint_model">
        <div class="model_Box">
            <div class="Title">
                <img src="static/imgs/sellercomplaint.png">
            </div>
            <div class="close" @click="close">
                <img src="static/imgs/close_page.png">
            </div>
            <div class="content">
                <!-- <div class="info_item input_group">
                    <label class="label">投诉内容</label>
                    <select class="input_common select_common">
                      <option value="1">证明图片做假</option>
                    </select>
                </div> -->
                <div class="info_item input_group">
                    <label class="label">备注信息</label>
                    <textarea v-model="Remark" class="input_form input_common"></textarea>
                </div>
            </div>
            <div class="text_center">
                <button class="btn_yellowBg" @click="btnSubmit">
                    <img src="static/imgs/confirm.png">
                  </button>
            </div>
        </div>
    </div>
</template>

<script>
import * as ajax from "@/api/common";
export default {
  props: ["model", "bindFun"],
  data() {
    return {
      Remark: "",
      isOpen: false
    };
  },

  methods: {
    btnSubmit() {
 
      ajax
        .post("/api/help/Tousu", {
          hdId: this.model.formData.HdId,
          Remark: this.Remark
        })
        .then(response => {
          this.success(response.Message);
          this.bindFun();
          this.close();
        });
    },
    close() {
      this.$emit("close-sllerComplaint", this.isOpen);
    }
  }
};
</script>

<style>

</style>
