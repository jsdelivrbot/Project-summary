import request from 'src/util/request'

export function login(username, password) {
    return request({
        url: '/user/login',
        method: 'post',
        data: 'scope=&grant_type=password&username=' + username + '&password=' + password
    })
}

export function logout() {
    return request({
        url: '/api/User/LoginOut',
        method: 'post'
    })
}

export function getCaptchaCode() {
    return request({
        url: '/api/Common/GetCaptcha',
        method: 'get'
    })
}