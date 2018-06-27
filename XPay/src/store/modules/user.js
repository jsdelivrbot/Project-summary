import { login, logout } from 'src/api/login';
import {  GetCurrentUser } from 'src/api/user';
import { getToken, setToken, removeToken } from 'src/util/auth';
import Cookies from 'js-cookie';

const user = {
  state: {
    token: getToken(),
    userInfo: JSON.parse(localStorage.getItem('userInfo'))
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },

  actions: {
    // 登录
    Login({ commit, dispatch }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          console.log(response)
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          dispatch('GetInfo')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息 
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        GetCurrentUser(state.token).then(response => {
          localStorage.setItem('userInfo', JSON.stringify(response.data));
          commit('SET_USERINFO', response.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_USERINFO', '')
          localStorage.removeItem('userInfo');
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_USERINFO', '')
        localStorage.removeItem('userInfo');
        removeToken()
        resolve()
      })
    },

   
  }
}

export default user
