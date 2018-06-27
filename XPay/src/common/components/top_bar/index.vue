<template>
    <div ref="topBar" class="topBar clearfix" :class="{topBar__type2: type == 2}">
          <div v-if="hasTopBack" class="topBar__back" @click="back">
              <i v-if="type == 1" class="dIcon dIcon_back"></i>
              <i v-if="type == 2" class="dIcon dIcon_back2"></i>
          </div>
          <div class="topBar__left">
            <slot name="left"></slot>
          </div>
          <div class="topBar__right">
              <slot name="right"></slot>
          </div>
          <div class="topBar__content-wrap">
            <div class="topBar__content">
              <slot name="content"></slot>
            </div>
          </div>
      </div>
</template>

<script>
export default {
  props: {
    backType: {
      type: null,
      default: 1
    },
    hasBack: {
      type: Boolean,
      default: true
    },
    hasTopBack: {
      type: Boolean,
      default: true
    },
    changebar:{
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      type: this.backType
    };
  },
  methods: {
    back() {
      if (!this.hasBack) {
        this.$emit("back");
        return;
      }
      this.$router.go(-1);
    },
    check() {
      if(!this.changebar) return;
      window.scrollY > 36 ? (this.type = 2) : (this.type = 1);
    }
  },
  mounted() {
    if (this.type === 1) {
      window.addEventListener("scroll", this.check);
    }
    if(window.api) {
      $api.fixStatusBar(this.$refs.topBar);
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.check);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/style/util.scss";
.dIcon_back {
  width: f(18);
  height: f(32);
  background-image: url("icon-22.png");
}
.dIcon_back2 {
  width: f(18);
  height: f(32);
  background-image: url("icon_back2.png");
}
</style>
