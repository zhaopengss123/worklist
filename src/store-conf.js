/**
 * @module 定义全局Store
 */

import Vuex from 'vuex';
import LoginStore from '@/store/login-store';
import MenuStore from '@/store/menu-store';

export default (Vue) => {
  Vue.use(Vuex);
  return new Vuex.Store({
    modules: {
      LoginStore,
      MenuStore
    }
  });
}