import Vue from 'vue';
import App from './App';
import * as custom from './util/filters';
const attachFastClick = require('fastclick');
window.addEventListener('load', function() {
    attachFastClick.attach(document.body);
}, false);
Object.keys(custom).forEach(key => {
    Vue.filter(key, custom[key]);
});
window.$t = function(val) {
    return custom.translate(val);
}

window.$getPlatform = function() {
    var u = navigator.userAgent,
        app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器   
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 
    return {
        android: isAndroid,
        ios: isiOS
    }
}

window.$dataFormat = function(dateValue, format) {
    format = format || '{yyyy-MM-dd HH:mm}';
    format = format.replace(/}/g, '').replace(/{/g, '');
    try {
        let date = new Date(dateValue);
        let dateYMD = format.split(' ')[0] || '';
        let dateHM = format.split(' ')[1] || '';
        let arrDate = dateYMD.split('-').concat(dateHM.split(':'));
        let res = "";
        let leftPad = function(val) {
            return val > 9 ? val : ("0" + val);
        }
        let matchObjs = {
            "yyyy": function() {
                let val = date.getFullYear();
                return val + "-";
            },
            "MM": function() {
                var val = date.getMonth();
                return leftPad(val + 1) + "-";
            },
            "dd": function() {
                var val = date.getDate();
                return leftPad(val) + " ";
            },
            "HH": function() {
                var val = date.getHours();
                return leftPad(val) + ":";
            },
            "mm": function() {
                var val = date.getMinutes();
                return leftPad(val);
            }
        }
        arrDate.forEach(v => {
            if (!matchObjs[v]) return true;
            res += matchObjs[v]();
        })
        return res;
    } catch (e) {
        console.log("[ERROR] 日期格式无法转换")
    }
}
import store from './store';
import router from './router';
import 'common/js/rem';
import 'src/style/other.scss';

import VueQriously from "vue-qriously";
Vue.use(VueQriously);

import Vant from 'vant';
import { Toast } from 'vant';
import 'vant/lib/vant-css/index.css';
import 'src/style/app.scss';
Vue.use(Vant);
window.$mask = (message) => {
    Toast.loading({
        mask: true,
        duration: 0,
        message: message || $t('加载中')
    });
}

import topBar from "src/common/components/top_bar";
import appTitle from "src/common/components/app_title";

Vue.component('top-bar', topBar)
Vue.component('app-title', appTitle)

// 设置默认语言
localStorage.setItem('lang', localStorage.getItem('lang') || 'zh-CN');

new Vue({
    el: '#app',
    store,
    router,
    Vant,
    render: h => h(App),
    created() {
        this.$store.dispatch("Init");
    },
    mounted() {},
    watch: {
        '$store.getters.loading': function() {
            if (this.$store.getters.loading) {
                this.$toast.loading({
                    duration: 0, // 持续展示 toast
                    forbidClick: true, // 禁用背景点击
                });
            } else {
                this.$toast.clear();
            }
        }
    }
});