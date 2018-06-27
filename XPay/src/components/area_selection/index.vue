<template>
  <van-popup v-model="show" class="area-selection-wrap">
    <div class="area-selection backPadding bgWhite">
      <top-bar :has-back="false" @back="changeShow" :back-type="2"><span slot="content">{{'区域选择' | translate}}</span></top-bar>
      <div class="area-selection__top">
        <div class="area-selection__top-left">
          <i class="dIcon dIcon_coutry"></i>
          <span>{{'当前选择的国家/地区' | translate}}</span>
        </div>
        <div class="area-selection__top-right">
          {{value == 0 ? '中国' : value | translate}}
        </div>
      </div>
      <div class="dCell-list">
        <div  @click="changeValue(item)" class="dCell" v-for="(item, index) in listData" :key="index">
          <div class="dCell__title" v-text="item.name"></div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    value: {
      type: null,
      default: 0,
    }
  },
  data() {
    return {
      popupShow: this.show
    };
  },
  computed:{
    listData(){
      if(!this.$store.state.clientData) return [];
      return this.$store.state.clientData.country
    }
  },
  methods: {
    changeShow() {
      this.$emit('update:show', false);
    },
    changeValue(value) {
      this.$emit('update', value);
      this.$emit('update:show', false);
    }
  }
};
</script>

<style>

</style>
