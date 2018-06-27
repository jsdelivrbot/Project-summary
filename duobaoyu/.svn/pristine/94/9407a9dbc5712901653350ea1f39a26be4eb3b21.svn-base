<template>
    <div class="choose_Address">
        <div class="choose">
            <div class="address" @click="selectAddress">
                <img v-if="!isSelected" src="static/imgs/select_03.png">
                <img v-else src="static/imgs/selected_03.png">
                湖南省金帆大厦
            </div>
            <div class="info">
                <div class="tel">11111111111</div>
                <div class="name">小米</div>
            </div>
        </div>
        <div class="add" @click="add">
            <img src="static/imgs/plus.png">
            新增收货地址
        </div>
        
    </div>
</template>

<script>
    export default {
        data(){
            return{
                isSelected:false
            }
        },
        methods:{
            add(){
                this.$router.push({path:'/shop/cart/pay/address'})
            },
            selectAddress(){
                this.isSelected=!this.isSelected
            }
        }
    }
</script>

<style>

</style>
