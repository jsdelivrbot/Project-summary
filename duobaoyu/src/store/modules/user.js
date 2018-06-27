import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, getUserId, setUserId } from '@/utils/auth'

const user = {
    state: {
        token: getToken(),
        id: getUserId(),
        name: '',
        avatar: '',
        roles: []
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_ID: (state, id) => {
            state.id = id
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },

    actions: {
        // 登录
        Login({ commit }, userInfo) {
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                login(username, userInfo.password,userInfo.validateCode,userInfo.sessionId).then(response => {
                    console.log(response)
                    const data = response
                    console.log(data.Token)
                    setToken(data.Token);
                    commit('SET_TOKEN', data.Token)
                    setUserId(data.Data.UserId);
                    commit('SET_ID', data.Data.UserId)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetInfo({ commit, state }) {
            console.log(2222, state);
            return new Promise((resolve, reject) => {
                getInfo(state.id, state.token).then(response => {
                    const data = response.Data;
                    //debugger;
                    console.log('userInfo',response);
                    commit('SET_ROLES', data.UserCode)
                    commit('SET_NAME', data.NickName)
                    commit('SET_AVATAR', data)
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
                    commit('SET_ROLES', [])
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
                removeToken()
                resolve()
            })
        }
    }
}

export default user