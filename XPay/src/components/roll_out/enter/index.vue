<template>
  <div>
    <top-bar :back-type="2">
       <span slot="content">{{type === 0 ? '转出' : '转入' | translate}}</span>
      <router-link :to="'/roll_out/'+type+'/rollRecord'" tag="span" slot="right">
        {{type === 0 ? '转出记录' : '转入记录' | translate}}</router-link>
    </top-bar>
    <div class="m__wrap_30 p__b_80">
      <div class="formItem__wrap">
        <div class="formItem__title">
          {{'对方账户' | translate}}
        </div>
        <div class="formItem">
          <input  v-model.trim="uid" :class="{'error':!uid && hasValidate}" :placeholder="'输入手机号/UID' | translate" type="text" class="inputItem">
          <div class="formItem_border"></div>
        </div>
      </div>
    </div>
    <div class="position__footer position__footer_lg">
        <div @click="getOtherUserInfo" :class="'m-b dButton dButton__large dButton_blue'">{{'下一步' | translate}}</div>
        <router-link :to="'/roll_out/'+type+'/exchange'" tag="div" :class="'dButton dButton__large dButton_borderBlue'">{{'兑换积分' | translate}}</router-link>
    </div>
  </div>
</template>

<script>
  import { GetOtherUser } from 'src/api/user';
  export default {
    data() {
      return {
         type: 0,
         hasValidate:false,
         uid:""
      };
    },
    mounted() {
      this.type = this.$route.params.type*1;
    },
    methods: {
      getOtherUserInfo(){
        this.hasValidate = true;
        if(!this.uid) return;
        $mask();
        GetOtherUser({
          keywords: this.uid
        }).then(res =>{
          this.$toast.clear();
          if(!res.data){
            this.$toast($t("用户UID或手机号不存在"));
            return;
          }
          this.nextGo();
        }).catch(error =>{
          console.error('[ERROR]' + error);
        })
      },
      nextGo() {
        if(this.type === 0) {
          this.$router.push({name: "roll_out_next", params: {uid: this.uid,type:0}});
        } else if(this.type === 1) {
          this.$router.push('/rollOut_nextQr');
        }
      }
    }
  };
</script>
