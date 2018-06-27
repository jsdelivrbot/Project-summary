<template>
    <div class="imgPreview">
        <img @click="imgMax" :src="src" :class="imgClass" :style="imgStyle">
        <div class="d_mask" :class="{show: isShow}" @click="imgMin">
            <img :src="src" class="imgPreview_img">
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* 图片预览S */
.d_mask {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1111111;
  background: rgba(0, 0, 0, 0.8);
}

.imgPreview_img {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: auto;
  transform: translate(-50%, -50%);
}

@media (max-width: 767) {
  .imgPreview_img {
    width: 60%;
    height: auto;
  }
}

/* 图片预览E */
</style>


<script>
export default {
  props: {
    src: {
      type: String
    },
    imgStyle: {
      type: String
    },
    imgClass: {
      type: Object
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    imgMax() {
      this.isShow = true;
    },
    imgMin() {
      this.isShow = false;
    }
  }
};
</script>



