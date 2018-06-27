// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import axios from 'axios';

// 过滤器
import * as filterItem from './tool/filters'
Object.keys(filterItem).forEach(key => {
    Vue.filter(key, filterItem[key])
})


// 样式
import "@/style/css/app2.less";
import "@/style/app.scss";
// ele
import {
    Pagination,
    Dialog,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    Input,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimePicker,
    Popover,
    Tooltip,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tag,
    Tree,
    Alert,
    Slider,
    Icon,
    Row,
    Col,
    Upload,
    Badge,
    Card,
    Rate,
    Steps,
    Step,
    Carousel,
    CarouselItem,
    ColorPicker,
    Transfer,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Loading,
    MessageBox,
    Message,
    Notification
} from 'element-ui'

// 二维码
import VueQriously from "vue-qriously"
Vue.use(VueQriously)


Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Input)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Alert)
Vue.use(Slider)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Badge)
Vue.use(Card)
Vue.use(Rate)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(ColorPicker)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

/* ele组件多语言S */
import en from 'element-ui/lib/locale/lang/en'
import ko from 'element-ui/lib/locale/lang/ko'
import th from 'element-ui/lib/locale/lang/th'
import zhCN from 'element-ui/lib/locale/lang/zh-CN'
import zhTW from 'element-ui/lib/locale/lang/zh-TW'
import locale from 'element-ui/lib/locale'
var langType = localStorage.getItem('lang');
if (langType == 'en') {
    locale.use(en)
} else if (langType == 'ko') {
    locale.use(ko)
} else if (langType == 'th') {
    locale.use(th)
} else if (langType == 'zh-CN') {
    locale.use(zhCN)
} else if (langType == 'zh-TW') {
    locale.use(zhTW)
} else {
    locale.use(zhCN)
}
/* ele组件多语言E */






// axios 配置
axios.defaults.timeout = 5000;
var baseURL1 = location.protocol + '//' + process.env.API1;
var baseURL2 = location.protocol + '//' + process.env.API2;
axios.defaults.baseURL = baseURL2;
axios.defaults.transformRequest = [function(data, headers) {
    const serializedData = []
    for (const k in data) {
        if (data[k]) {
            serializedData.push(`${k}=${encodeURIComponent(data[k])}`)
        }
    }

    return serializedData.join('&')
}];



axios.interceptors.response.use(function(response) {
    // Do something with response data
    // response.data.Code = 216;
    if (response.data.Code && response.data.Code !== 0) {
        if (response.data.Code === 100) {
            //无权限
            localStorage.removeItem('amf_user');
            MessageBox.alert(translate('你已被登出，请重新登录'), translate('确定登出'), {
                confirmButtonText: translate('重新登录'),
                type: 'warning'
            }).then(() => {
                location.reload();
            });
        } else {
            if (response.data.Code == 104) { // 注册提示
                var msg = '';
                for (var i = 0; i < response.data.Data.length; i++) {
                    var item = response.data.Data[i];
                    msg += translate(item['Message']) + ' ,'
                }
                msg = msg.slice(0, -1);
                Message({
                    message: msg,
                    type: 'error',
                    duration: 3 * 1000
                })
            } else if (response.data.Code == 216) { // 系统停用
                router.push({ path: '/disable' });
            } else {
                Message({
                    message: translate(response.data.Message),
                    type: 'error',
                    duration: 1 * 1000
                })
            }

        }
        return Promise.reject('error')
    } else {
        return response.data;
    }
}, function(error) {
    return Promise.reject(error);
});

if (localStorage['amf_user']) {
    store.dispatch('getUser')
}



Vue.prototype.axios = axios;
Vue.prototype.mdebug = function(obj) {
    if (process.env.NODE_ENV == 'development') {
    }
}

// import './style/css/main.less'
Vue.config.productionTip = false


import { langlist } from './tool/data';
import { translate } from './tool/filters';
/* eslint-disable no-new */
store.dispatch("Init").then(res => {
    new Vue({
        el: '#app',
        router,
        store,
        template: '<App/>',
        components: { App },
        created() {
            let _self = this
            let location = window.location
            let search = location.search
            if (!localStorage['lang']) {
                localStorage.setItem('lang', 'zh-CN');
            }
        },
        methods: {
            getParamName(attr) {
                let match = RegExp(`[?&]${attr}=([^&]*)`).exec(window.location.search)
                return match && decodeURIComponent(match[1].replace(/\+/g, ' ')) // url中+号表示空格,要替换掉
            },
        }
    });
    window.addEventListener("storage", e => { "amf_user" === e.key && store.commit("CHANGE_USER"); });
});