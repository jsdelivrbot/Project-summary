<template>
    <div class="h5plus-barcode-box" v-if="open">
        <div class="barcode-tool">
            <div class="topBar__back"  @click="goBack">
                <i class="dIcon dIcon_back"></i>
            </div>
            <i class="dIcon dIcon_photo" @click="pickImage"></i>
            <div class="topBar__right" @click="openOrCloseFlash">
                <i class="dIcon dIcon_flashlight"></i>
            </div>
        </div>
        <div id="h5plus-barcode" :style="style" >
			<div style="height:40%"></div>
			<p class="tip">...载入中...</p>
        </div>
    </div>
</template>
<script>
export default {
  data(){
      return {
          scan:null,
          style:null,
          flash:false
      }
  },
  props:{
    open:{
        type:Boolean,
        default:false
    },
    successBack:{
        type:Boolean,
        default:false
    }
  },
  //需要dom加载完，需要拿到(id#h5plus-barcode)的元素
  mounted:function(){
      this.plusready();
  },
  methods:{
      //h5 plus 功能需要plusready 后才能使用
      plusready:function(){
          if(!window.plus) return;
          const $this = this;
         this.style = {
             height: (document.documentElement.clientHeight - 40) + "px"
         }
         this.$nextTick(function(){
            this.initBarCode();
         });

          //backbutton 返回事件
         plus.key.addEventListener('backbutton', function() { 
            // 事件处理 
            $this.goBack();
        }, false); 
      },
      //初始化barcode
      initBarCode:function(){
          if(!window.plus) {
              console.error('[ERROR] NOT SUPPORT'); 
              return;
          }
          this.scan = new plus.barcode.Barcode("h5plus-barcode");
          this.scan.onmarked = this.marked;
          if(open) this.scan.start({conserve:true,filename:'_doc/barcode/'});
      },
      //打开关闭闪光灯
      openOrCloseFlash:function(){
        if(!this.scan || !window.plus) return;
        this.flash = !this.flash;
        this.scan.setFlash(this.flash);
      },
      //选择图片
      pickImage:function(){
        if(!this.scan || !window.plus) return;
        let $this = this;
        plus.gallery.pick( function(path){
            $this.scanImage(path);
        }, function(){
            console.log( "[CANCEL] Pick Image");
        }, {
            animation:true,
            filter:"image"
        } );
      },
      //扫描处理
      marked:function(type, result){
        let typeName = "未知类型";
        switch(type){
            case plus.barcode.QR:
                typeName = 'QR';
                break;
            case plus.barcode.EAN13:
                typeName = 'EAN13';
                break;
            case plus.barcode.EAN8:
                typeName = 'EAN8';
                break;
            case plus.barcode.CODE128:
                typeName = 'CODE128';
                break;
        };
        const data = {
            type:typeName,
            value:result
        };
        this.eventSuccess(data);
      },
      //通过图片识别条形码或者二维码
      scanImage:function(path){
        if(!window.plus) return;
        const filter = [plus.barcode.QR,plus.barcode.EAN13,plus.barcode.EAN8,plus.barcode.CODE128];
        let $this = this;
        plus.barcode.scan( path, function(type,value,file){
            const data = {
                type:type,
                value:value
            };
            $this.eventSuccess(data);
            //识别成功
        }, function(){
            $this.eventFail();
           console.log("[ERROR] Scan Fail");
        }, filter);
      },
      //返回
      goBack:function(){
          if(this.scan) this.scan.close();
          this.$emit('back');
      },
      //成功返回事件
      eventSuccess:function(data){
        if(this.scan) this.scan.close();
        this.$emit("success",data);
      },
      eventFail:function(){
        if(this.scan) this.scan.close();
        this.$emit("error");
      }
  },
  watch:{
      open:function(){
            if(!this.open || !this.scan) return;
            this.$nextTick(function(){
                this.scan.start({conserve:true,filename:'_doc/barcode/'});
            })
      }
  }
}
</script><style rel="stylesheet/scss" lang="scss" scoped>
@import "src/style/util.scss";
    div.h5plus-barcode-box{
        .topBar__right {
            height: 40px;
            line-height: 40px;
            padding: 0 f(20);
        }
        .dIcon_back {
            width: f(18);
            height: f(32);
            background-image: url("../../../../../static/img/icon-22.png");
        }
        .dIcon_flashlight {
            width: f(40);
            height: f(40);
            background-image: url("../../../../../static/img/flashlight.png");
            margin-right: f(15);
        }
        .dIcon_photo{
            width: f(60);
            height: f(60);
            position: absolute;
            left: 50%;
            top:50%;
            margin-top: - f(30);
            margin-left: - f(30);
            background-image: url("../../../../../static/img/photo.png");
        }
        i.icno-photo{
            font-size: f(50);
            height: 100%;
            margin: 0;
            padding: 0;
            line-height: 40px;
            padding: 0 f(20);
        }
        div.topBar__back{
            padding: f(22) f(30);
            height: 100%;
            margin: 0;
        }
        div#h5plus-barcode {
            background: #000000;
            width: 100%;
            position: absolute;
            top: 40px;
            bottom: 0;
            z-index: 1;
            text-align: center;
            .tip {
                color: #FFFFFF;
                font-weight: bold;
                text-shadow: 0px -1px #103E5C;
            }
        }
        div.barcode-tool{
            width: 100%;
            height: 40px;
            position: absolute;
            top: 0;
            line-height: 40px;
            text-align: center;
            color: #FFF;
            z-index: 2;
            background-color: #000000;
        }
    }
    
</style>


