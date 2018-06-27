<template>
    <div class="setting backPadding boxWhite">
        <top-bar :back-type="2">
            <span slot="content">{{'设置' | translate}}</span>
        </top-bar>
        <div class="dCell-list">
            <div class="dCell" @click="chooseUploadType">
                <div class="dCell__title">
                    <img class="main__topBar-msg-logo logo-icon" :src="userInfo.avatarOriginalPath">
                </div>
                <div class="dCell__value">{{userInfo.id}}</div>
                <i class="van-icon dCell__right-icon van-icon-arrow"></i>
            </div>
            <router-link to="/userCenter_setting_editName" tag="div" :class="'dCell'">
                <div class="dCell__title">{{'昵称' | translate}}</div>
                <div class="dCell__value">{{userInfo.nickName}}</div>
                <i class="van-icon dCell__right-icon van-icon-arrow"></i>
            </router-link>
            <div class="dCell" @click="popupType = 'LANGUAGE';popupShow = true">
                <div class="dCell__title">{{'多语言' | translate}}</div>
                <div class="dCell__value">{{lang[languageType] | translate}}</div>
                <i class="van-icon dCell__right-icon van-icon-arrow"></i>
            </div>
            <router-link to="/userCenter_setting_editVersions" tag="div" :class="'dCell'">
                <div class="dCell__title">{{'版本' | translate}}</div>
                <div class="dCell__value">{{versions}}</div>
                <i class="van-icon dCell__right-icon van-icon-arrow"></i>
            </router-link>
            <router-link to="/userCenter_setting_editAbouts" tag="div" :class="'dCell'">
                <div class="dCell__title">{{'关于' | translate}}</div>
                <div class="dCell__value">&nbsp;</div>
                <i class="van-icon dCell__right-icon van-icon-arrow"></i>
            </router-link>
        </div>
        <div class="position__footer position__footer_md">
            <div @click="quit" class="dButton dButton__large dButton_blue">{{'退出登录' | translate}}</div>
        </div>
        <van-popup v-model="popupShow" position="bottom">
            <div v-if="popupType === 'LANGUAGE'" class="setting__language">
                <div class="m__wrap_30">
                    <div class="setting__language-header">
                        <h3>
                            {{'选择多语言' | translate}}
                        </h3>
                        <div @click="popupShow = false" class="setting__language-header-right">
                            {{'取消' | translate}}
                        </div>
                    </div>
                </div>
                <div class="dCell-list">
                    <div class="dCell" :class="{languageActive: languageType === 'en-US'}" @click="selectLanguge('en-US')">
                        <div class="dCell__title">English</div>
                        <i v-if="languageType === 'en'" class="dCell__right-icon van-icon van-icon-success"></i>
                    </div>
                    <div class="dCell" :class="{languageActive: languageType === 'zh-CN'}" @click="selectLanguge('zh-CN')">
                        <div class="dCell__title">简体中文</div>
                        <i v-if="languageType === 'ch'" class="dCell__right-icon van-icon van-icon-success"></i>
                    </div>
                </div>
                <div class="setting__language-footer m__wrap_30">
                    <div @click="languageSubmit" class="dButton dButton__large dButton_blue">{{'确定' | translate}}</div>
                </div>
            </div>
             <div v-else class="setting__language">
                <div class="m__wrap_30">
                    <div class="setting__language-header">
                        <h3>
                            {{'修改头像' | translate}}
                        </h3>
                        <div @click="popupShow = false" class="setting__language-header-right">
                            {{'取消' | translate}}
                        </div>
                    </div>
                </div>
                <div class="dCell-list m__vertical_50">
                    <div class="dCell align-center" @click="uploadAvatar('camera')">相册选择</div>
                    <div class="dCell align-center" @click="uploadAvatar('photo')">拍照上传</div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { uploadAvatar } from '../../../api/user';
import {
    getToken,
    removeToken
} from 'src/util/auth'
export default {
  data() {
    return {
      popupShow: false,
      languageType: localStorage.lang,
      userInfo:null,
      versions:this.$store.getters.clientData.versions,
      filename:null,
      lang:{
          "zh-CN":"简体中文",
          "en-US":"English"
      },
      popupType:"LANGUAGE",
      serverPath: process.env.PROTOCOL +  process.env.BASE_API
    };
  },
  created(){
      let userInfo = eval("("+localStorage.userInfo+")");
      userInfo.avatarOriginalPath = userInfo.avatarOriginalPath ? (this.serverPath + userInfo.avatarOriginalPath) : '/static/img/default-man.png';
      userInfo.avatarThumbnailPath = userInfo.avatarThumbnailPath ? (this.serverPath + userInfo.avatarThumbnailPath) : '/static/img/default-man.png';
      this.userInfo = userInfo;
  },
  methods: {
    quit() {
      this.$store.dispatch("FedLogOut").then(() => {
        this.$router.push("/login");
      });
    },
    selectLanguge(type) {
      this.languageType = type;
      localStorage.lang = type;
    },
    languageSubmit() {
      this.popupShow = false;
    },
    //修改头像
    uploadAvatar:function(type){
        this.popupShow = false;
    },
    chooseUploadType:function(){
        if(!window.plus){
            this.popupShow = true;
            this.popupType = "AVATRA";
            return;
        }
        let $this = this;
        plus.nativeUI.actionSheet( {title:"修改头像",cancel:"取消",buttons:[{title:$t('相册选择')},{title:$t('拍照上传')}]}, function(e){
            if(e.index === 0) return;
            if(e.index === 1){
                plus.gallery.pick( path =>{
                    $this.compressImage(path);
                }, error =>{
                    console.log("cancel");
                }, {
                    filter : "image"
                } );
                return;
            }
            if(e.index === 2){
                const cmr = plus.camera.getCamera();
                cmr.captureImage(res =>{
                    plus.gallery.save( res, successCB =>{
                        $this.compressImage(res);
                    }, errorCB =>{
                        console.log(errorCB)
                    } );
                },error=>{
                    console.log('cancel');
                },{
                    filename:"_doc/camera/" + new Date().getTime() + "_xpay.jpg",
                    format:"jpg"
                })
            }
            
        });
    },
    //图片压缩
    compressImage(path){
        let $this = this;
        if(!window.plus) return;
        $mask("提交中");
        plus.zip.compressImage({
            src:path,
            format:"png",
            dst:"_doc/camera/" + new Date().getTime() + "_xpay.png",
            quality:100,
            width:"100px"
        }, res =>{
            $this.submitUpload(res.target);
        }, error =>{
            $this.$toast($t("图片压缩失败"));
        });
    },
    submitUpload(path){
        if(!window.plus) return;
        let $this = this;
        let task = plus.uploader.createUpload( this.serverPath + "/api/FileInfo/UploadAvatar", {
                method:"POST"
            }, function ( t, status ) {
                $this.$toast.clear();
                if(status != 200){
                    $this.$toast($t("更新头像失败"));
                    return;
                }
                let res = JSON.parse(t.responseText);
                if(res.code !== 20000){
                    $this.$toast($t(res.message || "更新头像失败"));
                    return;
                }
                let userInfo = eval("("+JSON.stringify($this.userInfo)+")");
                userInfo.avatarOriginalPath = res.data.originalPath;
                userInfo.avatarThumbnailPath = res.data.thumbnailPath;
                $this.userInfo.avatarOriginalPath = $this.serverPath + res.data.originalPath;
                $this.userInfo.avatarThumbnailPath = $this.serverPath + res.data.thumbnailPath;
                localStorage.userInfo = JSON.stringify(userInfo);
                $this.$toast($t("更新头像成功"));
            }
        );
        task.addFile(path,{key:"file"});
        task.setRequestHeader("Authorization",'Bearer ' + getToken());
        task.start();
    }
  },
  mounted() {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/style/util.scss";
    div.align-center{
        text-align: center;
        justify-content: center;
        border-top: 1px solid #c1c1c1c1;
        &::after{
            height: 0;
        }
    }
    .dCell.align-center:last-child{
        border-bottom: 1px solid #c1c1c1c1;
    }
    .m__vertical_50{
        margin: f(100) 0;
    }
</style>
