<template>
    <div class="backPadding boxWhite">
        <top-bar :back-type="2"><span slot="content">{{'修改昵称' | translate}}</span></top-bar>
        <div class="m__wrap_30 p__b_80">
            <div>
                <div class="formItem__wrap">
                    <div class="formItem">
                        <input v-model.trim="submitData.nickName" :class="{'error':hasValidate && !submitData.nickName}" :placeholder="'请输入昵称' | translate" type="text" class="inputItem">
                        <div class="formItem_border"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="position__footer position__footer_sm">
            <div @click="submit" class="dButton dButton__large dButton_blue">{{'确定' | translate}}</div>
        </div>
    </div>
</template>

<script>
    import { EditNickName } from '../../../../api/user';
    export default {
        data() {
            return {
                hasValidate:false,
                submitData:{
                    nickName: this.$store.getters.userInfo.nickName
                }
            };
        },
        methods: {
            submit() {
                this.hasValidate = true;
                if(!this.submitData.nickName) return;
                $mask("提交中");
                let $this = this;
                EditNickName(this.submitData).then(res =>{
                    $this.$toast.clear();
                    if(res.code !== 20000){
                        $this.$toast($t('修改昵称失败'));
                        return;
                    }
                    $this.$toast($t('修改昵称成功'));
                    let userInfo = eval("("+ localStorage.userInfo+")");
                    userInfo.nickName = $this.submitData.nickName;
                    localStorage.userInfo = JSON.stringify(userInfo);
                    $this.$router.back();
                },error =>{
                    console.log(error);
                })
            }
        },
        created() {
            this.submitData.nickName = eval("("+localStorage.userInfo+")").nickName;
        }
    };
</script>

<style>

</style>
