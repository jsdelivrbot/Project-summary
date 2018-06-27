<template>
    <div class="model_Box_wrapper  upLoadModel ">
        <div class="model_Box">
            <div class="Title">
                <img src="static/imgs/dakuan.png">
            </div>
            <div class="close" @click="close">
                <img src="static/imgs/close_page.png">
            </div>
            <div class="content">
                <div class="info_item input_group">
                    <label class="label">打款证明上传</label>
                    <!-- <vue-file-upload ref="vueFileUploader" >
                                            <div slot="label" class="upload_icon">
                                                <img src="static/imgs/uploadIcon_03.png">
                                            </div>
                                        </vue-file-upload>
                                        <div class="imgPreview">
                                            <img >
                                        </div> -->
                    <div v-if="!hasImg" class="vue-file-upload">
                        <div class="upload_icon">
                            <img src="static/imgs/uploadIcon_03.png">
                        </div>
                        <input type="file" @change="onFileChange">
                    </div>
                    <div v-if="hasImg" class="vue-file-upload vue-file-upload-preview">
                        <img :src="img" />
                        <button class="cancelImg" @click="removeImage">
                            <img src="static/imgs/close.png">
                        </button>
                    </div>
                </div>
            </div>
            <div class="text_center" @click="btnSubmit">
                <button class="btn btn_yellowBg">
                                                        <img src="static/imgs/confirm.png">
                                                      </button>
            </div>
        </div>
    </div>
</template>

<script>
import * as ajax from "@/api/common";
import VueFileUpload from "vue-file-upload";
export default {
  props: ["model", "bindFun"],
  data() {
    return {
      isOpen: false,
      images: [],
      img: "",
      hasImg: false
    };
  },
  mounted() {},
  methods: {
    btnSubmit() {
      if (this.model.formData) {
        ajax
          .post("/api/help/BuyerPayment", {
            hdId: this.model.formData.HdId,
            imageUrl: this.img
          })
          .then(response => {
            this.close();
            this.bindFun();
          });
      }
    },
    close() {
      this.$emit("close-upLoad", this.isOpen);
    },
    onFileChange: function(e) {
      var dom = e.currentTarget;
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files);
    },
    createImage(file) {
      var vm = this;
      var reader = null;
      var leng = file.length;
      console.log(file);
      for (var i = 0; i < leng; i++) {
        reader = new window.FileReader();
        reader.readAsDataURL(file[i]);
        reader.onload = function(e) {
          vm.images.push(e.target.result);
          console.log(vm.images);
          vm.img = vm.images[0];
          vm.hasImg = true;
        };
      }
    },
    removeImage: function(e) {
      this.images = [];
      this.hasImg = false;
    }
  },
  components: {
    VueFileUpload
  }
};
</script>

<style>

</style>
