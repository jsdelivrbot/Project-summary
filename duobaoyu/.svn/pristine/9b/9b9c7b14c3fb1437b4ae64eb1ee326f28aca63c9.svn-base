import request from '@/utils/request'
import Vue from 'vue'

export const path = process.env.BASE_API; // 'http://wx.jumax.dev.sudaotech.com/api/wechat';
export function post(url, data) {
    return request({
        url: path + url,
        method: 'post',
        data: data
    })
}

export function get(url, data) {

    return request({
        url: path + url,
        method: 'Get',
        params: data
    })
}

export function del(url, data) {
    return request({
        url: path + url,
        method: 'DELETE',
        data: data
    })
}
export function put(url, data) {
    return request({
        url: path + url,
        method: 'put',
        data: data
    })
}
export function test(url, data) {
    alert(1)
    console.log('test');
    return {
        aa: '12312'
    }
}