/**
 * Created by qiangxl on 2018/3/20.
 */
const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  clientData: state => state.clientData,
  loading: state => state.detail.loading
};
export default getters;
