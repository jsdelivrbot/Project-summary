import request from 'src/util/request'

// 获取当前最新版本
export function GetVersion() {
    return request({
        url: '/api/Common/GetVersion',
        method: 'get'
    })
}

// 获取图形验证码
export function GetCaptcha() {
    return request({
        url: '/api/Common/GetCaptcha',
        method: 'get'
    })
}

// 手机或邮箱验证码
export function SendSmsCode(data) {
    return request({
        url: '/api/Common/SendVerificationCode',
        method: 'post',
        data: data
    })
}

//获取字典信息
export function GetDictDatas(data) {
    return request({
        url: '/api/Common/GetDictDatas',
        method: 'get'
    })
}

//获取app版本
export function getVersions() {
    return request({
        url: '/api/Common/GetVersion',
        method: 'get'
    })
}

//获取app版本
export function getTradeConfigs(currency) {
    return request({
        url: '/api/Common/GetTradeConfigs',
        method: 'get',
        params: { currency: currency }
    })
}