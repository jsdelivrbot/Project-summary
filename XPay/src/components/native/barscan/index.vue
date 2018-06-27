<template>
    <barcode :open="open" @error="barcodeError" @success="barcodeSuccess" @back="goBack()" :success-back="true"></barcode>
</template>
<script>
import barcode from '../../../common/components/native/barcode';
export default {
    data(){
        return {
            open:true
        }
    },
    components:{
        barcode
    },
    methods:{
        barcodeSuccess:function(data){
            this.goBack(JSON.stringify(data));
        },
        barcodeError:function(){
            this.goBack();
        },
        goBack:function(data){
            if(!data){
                this.$router.back();
                return;
            }
            this.$router.push({name: "roll_out_next", params: {barcode: data,type:0}});
        }
    }
}
</script>
