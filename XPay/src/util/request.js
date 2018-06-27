import axios from 'axios';
import store from '../store'
import {
    getToken,
    removeToken
} from 'src/util/auth'
import router from '../router'
import {
    Toast,
    Dialog
} from 'vant';
// 创建axios实例
// var baseURL = process.env.BASE_API;
var baseURL = process.env.PROTOCOL + process.env.BASE_API;
console.log(baseURL + "========baseURL======");
const service = axios.create({
    baseURL: baseURL, // api的base_url
    timeout: 15000 // 请求超时时间,
})

// request拦截器
service.interceptors.request.use(config => {
    // store.state.app.requestLoading.isLoading = true;
    config.headers['lang'] = localStorage.lang // 让每个请求携带语言 请根据实际情况自行修改
    if (store.getters.token) {
        config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
}, error => {
    // store.state.app.requestLoading.isLoading = false;
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        // store.state.app.requestLoading.isLoading = false;
        /**
         * code为非20000是抛错 可结合自己业务进行修改
         */
        var resultData = response.data;
        // store.dispatch('RequestLoad');
        if (resultData['access_token']) {
            resultData = {
                code: 20000,
                data: {
                    token: resultData.access_token
                }
            }
        }
        // console.log('response', resultData);
        const res = resultData;
        if (res.code !== 20000) {
            // store.state.app.requestLoading.isLoading = false;
            Toast({
                    message: res.data || res.message,
                    type: 'fail',
                    duration: 5 * 1000
                })
                // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // store.state.app.requestLoading.isLoading = false;
                Dialog.alert({
                    title: '提示',
                    message: '你已被登出，请重新登录'
                }).then(() => {
                    store.dispatch('FedLogOut').then(() => {
                        location.reload() // 为了重新实例化vue-router对象 避免bug
                    })
                });
            }
            return Promise.reject('error')
        } else {
            // store.state.app.requestLoading.isLoading = false;
            return res;
        }
    },
    error => {
        // store.state.app.requestLoading.isLoading = false;
        if (error.response && error.response.status == 401) {
            removeToken();
            router.replace({
                path: '/login'
            })
        } else {
            var message = error.message;
            if (error.config.url.search('/user/login') > 0) {
                message = error.response.data.error_description;
            }
            console.log('err' + error) // for debug
            Toast({
                message: message,
                type: 'fail',
                duration: 5 * 1000
            })
        }
        return Promise.reject(error)
    }
)

export default service