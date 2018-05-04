export default {
  state: {
    menuActive: false
  },
  mutations: {
    menuActiveEdit(state, boolean) {
      state.menuActive = boolean;
    }
  }
}