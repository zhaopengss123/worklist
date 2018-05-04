export default {
  state: {
    userInfo: ''
  },
  mutations: {
    /* ------------------------ 保存用户信息 ------------------------ */
    setUserInfo(state, params) {
      window.localStorage.setItem('userInfo', JSON.stringify(params));
      state.userInfo = params;
    }
  },
  actions: {

  }
}