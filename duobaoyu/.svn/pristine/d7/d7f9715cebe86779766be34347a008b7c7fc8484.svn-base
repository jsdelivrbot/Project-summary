import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // 权限
import verify from "vue-verify-plugin";
import * as custom from './utils/filters'
import { Message, MessageBox } from "element-ui";
import * as ajax from "@/api/common";
Vue.use(ElementUI, { locale });
var myRules = {
    minValue: {
        test: function(val) {
            if (val && val > 0) {
                return true
            } else {
                return false
            }
        },
        message:"不能为空且大于0"
    }
};
Vue.use(verify, {
    blur: true,
    rules: myRules//自定义验证方法
});
//alert(1);
Vue.config.productionTip = false
Vue.prototype.success = function(msg) {
    Message({
        message: msg,
        type: "success",
        duration: 5 * 1000,
        customClass: 'requestMessage'
    });
}
Vue.prototype.errorMsg = function(msg) {
    Message({
        message: msg,
        type: "error",
        duration: 5 * 1000,
        customClass: 'requestMessage'
    });
}

//浏览器内核样式修改
// var iosQQ = "Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_1 like Mac OS X) AppleWebKit/604.4.7 (KHTML, like Gecko) Mobile/15C153 QQ/7.5.0.407 V1_IPH_SQ_7.5.0_1_APP_A Pixel/750 Core/UIWebView Device/Apple(iPhone 6) NetType/WIFI QBWebViewType/1"
// var iosWeixin = "Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_1 like Mac OS X) AppleWebKit/604.4.7 (KHTML, like Gecko) Mobile/15C153 MicroMessenger/6.6.5 NetType/WIFI Language/zh_CN"
// var AndridQQ = "User-Agent, MQQBrowser/26 Mozilla/5.0 (Linux; U; Android 2.3.7; zh-cn; MB200 Build/GRJ22; CyanogenMod-7) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"
// var AndriodWeiixn = "Mozilla/5.0 (Linux; Android 5.0.1; GT-I9502 Build/LRX22C; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.121 Mobile Safari/537.36 MicroMessenger/6.1.0.78_r1129455.543 NetType/WIFI"
// console.log(store.getters.userAgent);
// if(navigator.userAgent == iosQQ || navigator.userAgent == AndridQQ || navigator.userAgent == iosWeixin || navigator.userAgent == AndriodWeiixn){
//     alert(1)
//     store.getters.userAgent.weiXinClass = true;
// }

store.dispatch('Init').then(response => {
    Object.keys(custom).forEach(key => {
        Vue.filter(key, custom[key])
    })
    new Vue({
        el: '#app',
        router,
        store,
        template: '<App/>',
        components: { App }
    })

});