export default {
    state: {
      loading: false,
      provList: null
    },
    mutations: {
      set_loading: (state, res) => {
        state.loading = res;
      },
      set_provinceList: (state, list) => {
        state.provList = list;
      }
    },
    actions: {

    }
};
