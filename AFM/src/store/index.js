import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import lang from '@/lang/lang';
import en from '@/lang/en.json';
import ko from '@/lang/ko.json';
import th from '@/lang/th.json';
import zhCN from '@/lang/zh-CN.json';
import zhTW from '@/lang/zh-TW.json';

Vue.use(Vuex);

var store = new Vuex.Store({
    state: {
        lang: { title: '中文简体', value: 'zh-CN' },
        user: (JSON.parse(localStorage.getItem("amf_user")) || {}).user || null,
        token: (JSON.parse(localStorage.getItem("amf_user")) || {}).token || null,
        defaultTJcode: ((JSON.parse(localStorage.getItem("amf_user")) || {}).user || {}).UserCode || null,
        globalTranslate: {},
        netWork: {
            userCode: '1'
        },
    },
    getters: {
        getUserId: (state) => {
            let user = state.user;
            if (user && user.UserId) {
                return user.UserId;
            }
            return null;
        },
        globalTranslate: state => state.globalTranslate
    },
    actions: {
        // 刷新页面更新user信息
        getUser(context) {
            var amf_user = JSON.parse(localStorage.getItem("amf_user")) || {};

            axios.post('api/user/getuserinfo', {
                userId: amf_user.user.UserId,
                token: amf_user.token
            }).then(res => {
                context.commit('addUser', res.Data);
            })
        },
        // 初始化多语言
        Init({ commit }) {
            return new Promise((resolve, reject) => {
                var lagnType = localStorage.getItem('lang');
                if (lagnType === 'en') {
                    commit('SET_LANG', en);
                } else if (lagnType === 'ko') {
                    commit('SET_LANG', ko);
                } else if (lagnType === 'th') {
                    commit('SET_LANG', th);
                } else if (lagnType === 'zh-CN') {
                    commit('SET_LANG', zhCN);
                } else if (lagnType === 'zh-TW') {
                    commit('SET_LANG', zhTW);
                }
                resolve();
            }).catch(error => {
                reject(error);
            })
        }
    },
    mutations: {
        CHANGELANG: (state, obj) => {
            state.lang = obj;
        },
        CHANGE_USER: (state) => {
            var amf_user = JSON.parse(localStorage.getItem("amf_user")) || {};

            state.token = amf_user.token || null;

            state.user = amf_user.user || null;
            state.defaultTJcode = amf_user.user && amf_user.user.UserCode ? amf_user.user.UserCode : null;
        },
        // 刷新页面更新user信息
        addUser: (state, obj) => {

            var userId = state.user.UserId;
            state.user = obj;
            state.user.UserId = userId
        },
        // 设置多语言
        SET_LANG: (state, obj) => {
            state.globalTranslate = obj;
        },
        //网络图刷新
        GET_NETWORK: (state, userCode) => {
            state.netWork.userCode = userCode;
        }
    }
});


export default store;