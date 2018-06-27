import { GetDictDatas, getVersions } from 'src/api/common';
import { GetCurrentUser } from 'src/api/user';
const clientData = {
    state: {
        enums: {},
        country: {},
        update: false,
        globalTranslate: {},
        versions: '1.0.0.0',
        countryValue: {
            code: "CHN",
            mobileCode: "86",
            name: "中国"
        }
    },
    mutations: {
        SET_ClientData: (state, data) => {
            state.enums = data.enums;
            state.country = data.country;
            state.globalTranslate = data.globalTranslate;
            state.update = true;
        },
        SET_COUNTRY_VALUE: (state, data) => {
            state.countryValue = data;
        },
        SET_VERSIONS: (state, data) => {
            state.versions = data;
        }

    },
    actions: {
        Init({ commit }) {
            return new Promise((resolve, reject) => {
                getVersions({}).then(versions => {
                    // commit('SET_VERSIONS', versions.data);  提示有新版本
                    GetDictDatas({}).then(response => {
                        commit('SET_ClientData', response.data);
                        resolve();
                    }).catch(error => {
                        let rejectError = {
                            type: "DictDatas",
                            error: error
                        };
                        reject(rejectError);
                    });
                }).catch(error => {
                    let rejectError = {
                        type: "Versions",
                        error: error
                    };
                    reject(rejectError);
                });
            })
        },
        getVersions({ commit }) {
            return new Promise((resolve, reject) => {
                getVersions({}).then(response => {
                    commit('SET_VERSIONS', response.data);
                    resolve();
                    //console.log(3, this.state.clientData)
                }).catch(error => {
                    reject(error);
                });
            })
        },
        changeCountryValue({ commit }, data) {
            commit('SET_COUNTRY_VALUE', data);
        }
    }
}

export default clientData