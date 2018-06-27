import * as ajax from "@/api/common";
const cacheKey = "common.clientData";
const clientData = {
    state: {
        enumData: localStorage[cacheKey] ? JSON.parse(localStorage[cacheKey]) : {},
    },
    mutations: {
        SET_ClientData: (state, data) => {
            localStorage[cacheKey] = JSON.stringify(data);
            state.enumData = data;
            console.log(state);
        }
    },
    actions: {
        Init({ commit }) {
            return new Promise((resolve, reject) => {
                if (false && localStorage[cacheKey]) {
                    resolve()
                } else {

                    ajax.post("/api/help/HelpDicInfo", {}).then(response => {
                        var dic = new Object();


                        for (var key in response.Data.SecretSecurity) {

                            var item = response.Data.SecretSecurity[key];
                            response.Data.SecretSecurity[key] = item.Text;
                        }

                        console.log('SET_ClientData', response.Data);
                        commit('SET_ClientData', response.Data);
                        resolve()
                    }).catch(error => {
                        reject(error)
                    });
                }

            });
        }
    }
}

export default clientData