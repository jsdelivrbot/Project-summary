import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import router from '@/router'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 15000, // 请求超时时间
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function(data) {
        let ret = ''
        for (let it in data) {

            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret;
    }]
})

// request拦截器
service.interceptors.request.use(config => {
    if (store.getters.token) {
        //debugger;
        config.data['userId'] = store.getters.id;
        config.data['token'] = store.getters.token;

        //config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        /**
         * code为非20000是抛错 可结合自己业务进行修改
         */
        // debugger;
        const res = response.data
        console.log(response);
        // if(res.Code === 101 || res.Code===103){
        //     //debugger;
        //     Message({
        //         message: res.Message,
        //         type: 'error',
        //         duration: 5 * 1000,
        //         customClass: 'requestMessage'
        //     })
        // }
        if (res.Code !== 20000) {
            //debugger;
            Message({
                message: res.Error,
                type: 'error',
                duration: 5 * 1000,
                customClass: 'requestMessage'
            })
          
            // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
            if (res.Code === 50008 || res.Code === 50012 || res.Code === 50014) {
                MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('FedLogOut').then(() => {
                        location.reload() // 为了重新实例化vue-router对象 避免bug
                    })
                })
            }
            return Promise.reject('error')
        } else {
            
            return response.data
        }
    },
    error => {

        if (error.response.status == 401) {
            router.push({
                path: "/login"
            });
        } else {
            console.log('err' + error) // for debug
            Message({
                message: error.message,
                type: 'error',
                duration: 5 * 1000
            })
        }

        return Promise.reject(error)
    }
)

export default service